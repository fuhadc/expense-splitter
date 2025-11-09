import type { Expense } from '../types';

export interface Balance {
  totalA: number;
  totalB: number;
  totalShared: number;
  owedBy: 'A' | 'B' | 'none';
  owedAmount: number;
}

export const calculateBalance = (expenses: Expense[]): Balance => {
  let totalA = 0;
  let totalB = 0;
  let totalShared = 0;

  expenses.forEach((expense) => {
    if (expense.type === 'shared') {
      totalShared += expense.amount;
      if (expense.paidBy === 'A') {
        totalA += expense.amount;
      } else {
        totalB += expense.amount;
      }
    } else {
      // Individual expense
      if (expense.paidBy === 'A') {
        totalA += expense.amount;
      } else {
        totalB += expense.amount;
      }
    }
  });

  // Calculate who owes whom
  // For shared expenses, each person should pay half
  const sharedExpensesByA = expenses
    .filter((e) => e.type === 'shared' && e.paidBy === 'A')
    .reduce((sum, e) => sum + e.amount, 0);

  const sharedExpensesByB = expenses
    .filter((e) => e.type === 'shared' && e.paidBy === 'B')
    .reduce((sum, e) => sum + e.amount, 0);

  // Person A paid this much for shared, but should only pay half
  const aShareOfShared = totalShared / 2;
  const aShouldGetBack = sharedExpensesByA - aShareOfShared;
  const bShouldGetBack = sharedExpensesByB - aShareOfShared;

  const owedAmount = Math.abs(aShouldGetBack - bShouldGetBack);
  const owedBy: 'A' | 'B' | 'none' =
    aShouldGetBack > bShouldGetBack ? 'B' : aShouldGetBack < bShouldGetBack ? 'A' : 'none';

  return {
    totalA,
    totalB,
    totalShared,
    owedBy,
    owedAmount,
  };
};

export const getMonthlyTotals = (expenses: Expense[], monthsBack: number = 6) => {
  const now = new Date();
  const months: { month: string; total: number }[] = [];

  for (let i = monthsBack - 1; i >= 0; i--) {
    const date = new Date(now.getFullYear(), now.getMonth() - i, 1);
    const monthStr = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' });
    const year = date.getFullYear();
    const month = date.getMonth();

    const total = expenses
      .filter((e) => {
        const expenseDate = new Date(e.date);
        return expenseDate.getFullYear() === year && expenseDate.getMonth() === month;
      })
      .reduce((sum, e) => sum + e.amount, 0);

    months.push({ month: monthStr, total });
  }

  return months;
};

export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
  }).format(amount);
};

