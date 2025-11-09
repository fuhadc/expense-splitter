import { Expense } from '../types';

const STORAGE_KEY = 'expenses';

export const loadExpenses = (): Expense[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    return JSON.parse(data) as Expense[];
  } catch (error) {
    console.error('Error loading expenses:', error);
    return [];
  }
};

export const saveExpenses = (expenses: Expense[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(expenses));
  } catch (error) {
    console.error('Error saving expenses:', error);
  }
};

export const addExpense = (expense: Expense): Expense[] => {
  const expenses = loadExpenses();
  expenses.push(expense);
  saveExpenses(expenses);
  return expenses;
};

export const updateExpense = (updatedExpense: Expense): Expense[] => {
  const expenses = loadExpenses();
  const index = expenses.findIndex((e) => e.id === updatedExpense.id);
  if (index !== -1) {
    expenses[index] = updatedExpense;
    saveExpenses(expenses);
  }
  return expenses;
};

export const deleteExpense = (id: string): Expense[] => {
  const expenses = loadExpenses();
  const filtered = expenses.filter((e) => e.id !== id);
  saveExpenses(filtered);
  return filtered;
};

export const exportExpensesJSON = (): string => {
  const expenses = loadExpenses();
  return JSON.stringify(expenses, null, 2);
};

export const downloadJSON = (): void => {
  const json = exportExpensesJSON();
  const blob = new Blob([json], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `expenses-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

