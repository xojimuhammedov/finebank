export const INCOME_CATEGORIES = ['Salary', 'Freelance', 'Gift', 'Other income'];
export const EXPENSE_CATEGORIES = [
  'Food & Groceries',
  'Transport',
  'Shopping',
  'Utilities',
  'Entertainment',
  'Health',
  'Education',
  'Other expense',
];
export const ACCOUNTS = ['Cash', 'Uzcard', 'Humo', 'Bank account'];
export const STATUSES = ['completed', 'pending', 'cancelled'];

export const INITIAL_TRANSACTIONS = [
  { id: 't1', date: '2026-04-01', type: 'income', category: 'Salary', account: 'Uzcard', amount: 5000, note: 'April Salary', status: 'completed' },
  { id: 't2', date: '2026-04-03', type: 'expense', category: 'Food & Groceries', account: 'Humo', amount: 150, note: 'Korzinka', status: 'completed' },
  { id: 't3', date: '2026-04-05', type: 'expense', category: 'Transport', account: 'Cash', amount: 20, note: 'Taxi', status: 'completed' },
  { id: 't4', date: '2026-04-10', type: 'income', category: 'Freelance', account: 'Bank account', amount: 1200, note: 'Upwork', status: 'completed' },
  { id: 't5', date: '2026-04-12', type: 'expense', category: 'Utilities', account: 'Uzcard', amount: 100, note: 'Electricity & Internet', status: 'completed' },
  { id: 't6', date: '2026-04-15', type: 'expense', category: 'Shopping', account: 'Humo', amount: 300, note: 'New clothes', status: 'completed' },
  { id: 't7', date: '2026-04-18', type: 'expense', category: 'Entertainment', account: 'Cash', amount: 50, note: 'Cinema', status: 'pending' },
  { id: 't8', date: '2026-04-20', type: 'expense', category: 'Health', account: 'Uzcard', amount: 200, note: 'Dentist', status: 'completed' },
  { id: 't9', date: '2026-04-22', type: 'income', category: 'Gift', account: 'Cash', amount: 100, note: 'Birthday gift', status: 'completed' },
  { id: 't10', date: '2026-04-25', type: 'expense', category: 'Education', account: 'Bank account', amount: 400, note: 'Online course', status: 'cancelled' },
];
