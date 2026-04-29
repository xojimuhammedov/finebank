export const DEFAULT_ACCOUNTS = [
  { id: 'acc-cash', name: 'Cash', type: 'Cash', balance: 1000000, currency: 'UZS', status: 'active' },
  { id: 'acc-uzcard', name: 'Uzcard', type: 'Card', balance: 5000000, currency: 'UZS', status: 'active' },
  { id: 'acc-humo', name: 'Humo', type: 'Card', balance: 2500000, currency: 'UZS', status: 'active' },
  { id: 'acc-bank', name: 'Bank Account', type: 'Bank', balance: 15000000, currency: 'UZS', status: 'active' },
];

export const DEFAULT_INCOME_CATEGORIES = [
  { id: 'cat-salary', name: 'Salary', type: 'income', icon: 'Wallet', color: '#10b981' },
  { id: 'cat-freelance', name: 'Freelance', type: 'income', icon: 'Code', color: '#3b82f6' },
  { id: 'cat-gift', name: 'Gift', type: 'income', icon: 'Gift', color: '#ec4899' },
  { id: 'cat-other-inc', name: 'Other income', type: 'income', icon: 'PlusCircle', color: '#6b7280' },
];

export const DEFAULT_EXPENSE_CATEGORIES = [
  { id: 'cat-food', name: 'Food & Groceries', type: 'expense', icon: 'ShoppingCart', color: '#f59e0b' },
  { id: 'cat-transport', name: 'Transport', type: 'expense', icon: 'Car', color: '#3b82f6' },
  { id: 'cat-shopping', name: 'Shopping', type: 'expense', icon: 'ShoppingBag', color: '#8b5cf6' },
  { id: 'cat-utilities', name: 'Utilities', type: 'expense', icon: 'Zap', color: '#10b981' },
  { id: 'cat-entertainment', name: 'Entertainment', type: 'expense', icon: 'Film', color: '#ef4444' },
  { id: 'cat-health', name: 'Health', type: 'expense', icon: 'Heart', color: '#f43f5e' },
  { id: 'cat-education', name: 'Education', type: 'expense', icon: 'Book', color: '#6366f1' },
  { id: 'cat-other-exp', name: 'Other expense', type: 'expense', icon: 'Grid', color: '#6b7280' },
];

export const CURRENCIES = ['UZS', 'USD', 'EUR'];

export const ACCOUNT_TYPES = ['Cash', 'Card', 'Bank', 'Other'];

export const ICONS = [
  'Wallet', 'Code', 'Gift', 'PlusCircle', 'ShoppingCart', 'Car', 'ShoppingBag', 
  'Zap', 'Film', 'Heart', 'Book', 'Grid', 'Coffee', 'Home', 'Phone', 'Tv'
];

export const COLORS = [
  '#10b981', '#3b82f6', '#ec4899', '#6b7280', '#f59e0b', '#8b5cf6', '#ef4444', 
  '#f43f5e', '#6366f1', '#06b6d4', '#84cc16', '#eab308'
];
