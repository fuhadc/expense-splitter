import React, { useMemo, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Download, TrendingUp, Users, DollarSign } from 'lucide-react';
import type { Expense } from '../types';
import { calculateBalance, getMonthlyTotals, formatCurrency } from '../utils/calculations';
import { downloadJSON, downloadCSV } from '../utils/storage';
import { ConfirmationModal } from './ConfirmationModal';
import { Toast } from './Toast';
import { ExportModal } from './ExportModal';

interface SummaryScreenProps {
  expenses: Expense[];
}

export const SummaryScreen: React.FC<SummaryScreenProps> = ({ expenses }) => {
  const balance = useMemo(() => calculateBalance(expenses), [expenses]);
  const monthlyTotals = useMemo(() => getMonthlyTotals(expenses, 6), [expenses]);
  const [settleConfirmation, setSettleConfirmation] = useState(false);
  const [exportModalOpen, setExportModalOpen] = useState(false);
  const [toast, setToast] = useState<{ isOpen: boolean; message: string; type: 'success' | 'error' | 'info' }>({
    isOpen: false,
    message: '',
    type: 'success',
  });

  const pieData = [
    { name: 'Fuhad', value: balance.totalA, color: '#3b82f6' },
    { name: 'Jayasurya', value: balance.totalB, color: '#a855f7' },
  ];

  const handleExport = (format: 'csv' | 'json') => {
    try {
      if (format === 'csv') {
        downloadCSV();
        setToast({
          isOpen: true,
          message: 'Expenses exported as CSV successfully!',
          type: 'success',
        });
      } else {
        downloadJSON();
        setToast({
          isOpen: true,
          message: 'Expenses exported as JSON successfully!',
          type: 'success',
        });
      }
    } catch {
      setToast({
        isOpen: true,
        message: 'Failed to export expenses',
        type: 'error',
      });
    }
  };

  const handleSettleUp = () => {
    if (balance.owedBy === 'none') {
      setToast({
        isOpen: true,
        message: 'All settled up! No one owes anyone.',
        type: 'info',
      });
      return;
    }
    
    setSettleConfirmation(true);
  };

  const handleConfirmSettle = () => {
    setSettleConfirmation(false);
    setToast({
      isOpen: true,
      message: 'Settlement recorded! (Demo action)',
      type: 'success',
    });
  };

  return (
    <div className="h-full overflow-y-auto">
      <div className="max-w-4xl mx-auto p-4 space-y-6 pb-24 md:pb-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Summary</h1>
          <button
            onClick={() => setExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-900 text-white rounded-xl hover:bg-gray-800 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span className="hidden sm:inline">Export Data</span>
          </button>
        </div>

        {/* Balance Card */}
        <div className="bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 rounded-2xl shadow-2xl overflow-hidden">
          <div className="bg-white bg-opacity-10 backdrop-blur-lg p-6 text-white">
            <div className="flex items-center gap-2 mb-4">
              <Users className="w-6 h-6" />
              <h2 className="text-xl font-semibold">Balance Status</h2>
            </div>

            {balance.owedBy === 'none' ? (
              <div className="text-center py-8">
                <p className="text-4xl font-bold mb-2">All Settled Up! 🎉</p>
                <p className="text-lg opacity-90">No one owes anyone</p>
              </div>
            ) : (
              <div className="text-center py-8">
                <p className="text-lg opacity-90 mb-2">
                  {balance.owedBy === 'A' ? 'Fuhad' : 'Jayasurya'} owes {balance.owedBy === 'A' ? 'Jayasurya' : 'Fuhad'}
                </p>
                <p className="text-5xl font-bold mb-6">
                  {formatCurrency(balance.owedAmount)}
                </p>
                <button
                  onClick={handleSettleUp}
                  className="px-8 py-3 bg-white text-purple-600 font-semibold rounded-xl hover:bg-gray-100 transition-colors shadow-lg"
                >
                  Settle Up
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Fuhad Total</h3>
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(balance.totalA)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Jayasurya Total</h3>
              <div className="w-3 h-3 rounded-full bg-purple-500"></div>
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(balance.totalB)}</p>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-sm font-medium text-gray-600">Shared Expenses</h3>
              <DollarSign className="w-5 h-5 text-green-500" />
            </div>
            <p className="text-3xl font-bold text-gray-900">{formatCurrency(balance.totalShared)}</p>
          </div>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Pie Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Spending Distribution
            </h3>
            {balance.totalA === 0 && balance.totalB === 0 ? (
              <div className="h-64 flex items-center justify-center text-gray-400">
                No data to display
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={(entry) => {
                      const data = entry as unknown as { name: string; percent: number };
                      return `${data.name}: ${((data.percent || 0) * 100).toFixed(0)}%`;
                    }}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value: number) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
            )}
          </div>

          {/* Bar Chart */}
          <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5" />
              Monthly Spending (Last 6 Months)
            </h3>
            {monthlyTotals.every((m) => m.total === 0) ? (
              <div className="h-64 flex items-center justify-center text-gray-400">
                No data to display
              </div>
            ) : (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={monthlyTotals}>
                  <XAxis
                    dataKey="month"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => value.split(' ')[0]}
                  />
                  <YAxis tick={{ fontSize: 12 }} />
                  <Tooltip
                    formatter={(value: number) => formatCurrency(value)}
                    labelStyle={{ color: '#1f2937' }}
                  />
                  <Bar dataKey="total" fill="#3b82f6" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </div>
        </div>

        {/* All Expenses Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <p className="text-sm text-gray-600">Total Expenses</p>
              <p className="text-2xl font-bold text-gray-900">{expenses.length}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Total Amount</p>
              <p className="text-2xl font-bold text-gray-900">
                {formatCurrency(balance.totalA + balance.totalB)}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Shared Count</p>
              <p className="text-2xl font-bold text-gray-900">
                {expenses.filter((e) => e.type === 'shared').length}
              </p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Individual Count</p>
              <p className="text-2xl font-bold text-gray-900">
                {expenses.filter((e) => e.type === 'individual').length}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Settle Up Confirmation Modal */}
      <ConfirmationModal
        isOpen={settleConfirmation}
        title="Settle Up"
        message={`${balance.owedBy === 'A' ? 'Fuhad' : 'Jayasurya'} owes ${
          balance.owedBy === 'A' ? 'Jayasurya' : 'Fuhad'
        } ${formatCurrency(balance.owedAmount)}. Mark as settled?`}
        confirmLabel="Settle Up"
        cancelLabel="Cancel"
        onConfirm={handleConfirmSettle}
        onCancel={() => setSettleConfirmation(false)}
        type="info"
      />

      {/* Export Modal */}
      <ExportModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onExport={handleExport}
        expenseCount={expenses.length}
      />

      {/* Toast Notification */}
      <Toast
        isOpen={toast.isOpen}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, isOpen: false })}
      />
    </div>
  );
};

