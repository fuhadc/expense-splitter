import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import type { Expense } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ExpenseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (expense: Expense) => void;
  selectedDate: string;
  editExpense?: Expense | null;
}

export const ExpenseModal: React.FC<ExpenseModalProps> = ({
  isOpen,
  onClose,
  onSave,
  selectedDate,
  editExpense,
}) => {
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState('');
  const [paidBy, setPaidBy] = useState<'A' | 'B'>('A');
  const [type, setType] = useState<'individual' | 'shared'>('shared');
  const [note, setNote] = useState('');
  const [errors, setErrors] = useState<{ title?: string; amount?: string }>({});

  useEffect(() => {
    if (editExpense) {
      setTitle(editExpense.title);
      setAmount(editExpense.amount.toString());
      setPaidBy(editExpense.paidBy);
      setType(editExpense.type);
      setNote(editExpense.note || '');
    } else {
      setTitle('');
      setAmount('');
      setPaidBy('A');
      setType('shared');
      setNote('');
    }
    setErrors({});
  }, [editExpense, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { title?: string; amount?: string } = {};
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    if (!amount || parseFloat(amount) <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const expense: Expense = {
      id: editExpense?.id || uuidv4(),
      title: title.trim(),
      amount: parseFloat(parseFloat(amount).toFixed(2)),
      paidBy,
      type,
      date: selectedDate,
      note: note.trim() || undefined,
    };

    onSave(expense);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-y-auto animate-slideUp">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-2xl font-bold text-gray-900">
            {editExpense ? 'Edit Expense' : 'Add Expense'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close"
          >
            <X className="w-6 h-6 text-gray-500" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-gray-700 mb-2">
              Title *
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.title ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., Groceries, Dinner, Taxi"
            />
            {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
          </div>

          {/* Amount */}
          <div>
            <label htmlFor="amount" className="block text-sm font-semibold text-gray-700 mb-2">
              Amount (₹) *
            </label>
            <input
              id="amount"
              type="number"
              step="0.01"
              min="0"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all ${
                errors.amount ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0.00"
            />
            {errors.amount && <p className="text-red-500 text-sm mt-1">{errors.amount}</p>}
          </div>

          {/* Paid By */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Paid By *</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setPaidBy('A')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  paidBy === 'A'
                    ? 'bg-blue-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-blue-400"></div>
                  Fuhad
                </div>
              </button>
              <button
                type="button"
                onClick={() => setPaidBy('B')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  paidBy === 'B'
                    ? 'bg-purple-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 rounded-full bg-purple-400"></div>
                  Jayasurya
                </div>
              </button>
            </div>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">Type *</label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setType('shared')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  type === 'shared'
                    ? 'bg-green-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Shared
              </button>
              <button
                type="button"
                onClick={() => setType('individual')}
                className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all ${
                  type === 'individual'
                    ? 'bg-orange-500 text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Individual
              </button>
            </div>
          </div>

          {/* Note */}
          <div>
            <label htmlFor="note" className="block text-sm font-semibold text-gray-700 mb-2">
              Note (optional)
            </label>
            <textarea
              id="note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all resize-none"
              placeholder="Add any additional details..."
            />
          </div>

          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 px-4 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 py-3 px-4 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors shadow-lg"
            >
              {editExpense ? 'Update' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

