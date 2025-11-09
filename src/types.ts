export interface Expense {
  id: string;
  title: string;
  amount: number;
  paidBy: 'A' | 'B';
  type: 'individual' | 'shared';
  date: string; // ISO string: "2025-04-05"
  note?: string;
}

export type Screen = 'home' | 'add' | 'summary';

