import React from 'react';
import { Trash2, Edit, StickyNote } from 'lucide-react';
import type { Expense } from '../types';
import { formatCurrency } from '../utils/calculations';

interface ExpenseCardProps {
  expense: Expense;
  onEdit: (expense: Expense) => void;
  onDelete: (id: string) => void;
  onDeleteRequest: (expense: Expense) => void;
}

export const ExpenseCard: React.FC<ExpenseCardProps> = ({ expense, onEdit, onDeleteRequest }) => {
  const handleDelete = () => {
    onDeleteRequest(expense);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 p-4 border border-gray-100 animate-slideUp hover:scale-[1.01]">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-semibold text-gray-900 text-lg">{expense.title}</h3>
            <span
              className={`px-2 py-0.5 text-xs font-medium rounded-full ${
                expense.type === 'shared'
                  ? 'bg-green-100 text-green-700'
                  : 'bg-orange-100 text-orange-700'
              }`}
            >
              {expense.type === 'shared' ? 'Shared' : 'Individual'}
            </span>
          </div>

          <div className="flex items-center gap-3 text-sm text-gray-600 mb-2">
            <div className="flex items-center gap-1.5">
              <div
                className={`w-3 h-3 rounded-full ${
                  expense.paidBy === 'A' ? 'bg-blue-500' : 'bg-purple-500'
                }`}
              ></div>
              <span className="font-medium">
                Paid by {expense.paidBy === 'A' ? 'Fuhad' : 'Jayasurya'}
              </span>
            </div>
            <span className="text-gray-400">•</span>
            <span>
              {new Date(expense.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </span>
          </div>

          {expense.note && (
            <div className="flex items-start gap-1.5 text-sm text-gray-500 mt-2 bg-gray-50 p-2 rounded-lg">
              <StickyNote className="w-4 h-4 mt-0.5 flex-shrink-0" />
              <span className="italic">{expense.note}</span>
            </div>
          )}
        </div>

        <div className="flex flex-col items-end gap-2 ml-4">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(expense.amount)}
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => onEdit(expense)}
              className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition-all hover:scale-110 active:scale-95"
              aria-label="Edit expense"
            >
              <Edit className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              className="p-2 hover:bg-red-50 text-red-600 rounded-lg transition-all hover:scale-110 active:scale-95"
              aria-label="Delete expense"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

