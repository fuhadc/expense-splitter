import React, { useState, useMemo } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Plus } from 'lucide-react';
import { Expense } from '../types';
import { ExpenseCard } from './ExpenseCard';

interface HomeScreenProps {
  expenses: Expense[];
  onAddExpense: (date: string) => void;
  onEditExpense: (expense: Expense) => void;
  onDeleteExpense: (id: string) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  expenses,
  onAddExpense,
  onEditExpense,
  onDeleteExpense,
}) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Get expenses for the selected month
  const monthExpenses = useMemo(() => {
    const year = selectedDate.getFullYear();
    const month = selectedDate.getMonth();

    return expenses
      .filter((expense) => {
        const expenseDate = new Date(expense.date);
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
      })
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [expenses, selectedDate]);

  // Get dates that have expenses for calendar markers
  const datesWithExpenses = useMemo(() => {
    const dates = new Set<string>();
    expenses.forEach((expense) => {
      dates.add(expense.date);
    });
    return dates;
  }, [expenses]);

  const tileClassName = ({ date }: { date: Date }) => {
    const dateStr = date.toISOString().split('T')[0];
    return datesWithExpenses.has(dateStr) ? 'react-calendar__tile--hasExpense' : '';
  };

  const handleDateClick = (value: Date) => {
    setSelectedDate(value);
  };

  const handleAddClick = () => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    onAddExpense(dateStr);
  };

  const totalMonthAmount = monthExpenses.reduce((sum, expense) => sum + expense.amount, 0);

  return (
    <div className="flex flex-col h-full">
      {/* Calendar Section */}
      <div className="bg-white border-b border-gray-200 pb-4">
        <Calendar
          onChange={(value) => handleDateClick(value as Date)}
          value={selectedDate}
          tileClassName={tileClassName}
          className="mx-auto"
        />
      </div>

      {/* Month Summary */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 shadow-lg">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm opacity-90">
              {selectedDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
            </p>
            <p className="text-3xl font-bold">
              ${totalMonthAmount.toFixed(2)}
            </p>
            <p className="text-sm opacity-90">{monthExpenses.length} expenses</p>
          </div>
          <button
            onClick={handleAddClick}
            className="bg-white text-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl transition-all hover:scale-105"
            aria-label="Add expense"
          >
            <Plus className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* Expenses List */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {monthExpenses.length === 0 ? (
          <div className="text-center py-16">
            <div className="text-gray-400 mb-4">
              <svg
                className="w-24 h-24 mx-auto"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">
              No expenses this month
            </h3>
            <p className="text-gray-500 mb-6">
              Tap the + button to add your first expense
            </p>
          </div>
        ) : (
          <>
            {monthExpenses.map((expense) => (
              <ExpenseCard
                key={expense.id}
                expense={expense}
                onEdit={onEditExpense}
                onDelete={onDeleteExpense}
              />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

