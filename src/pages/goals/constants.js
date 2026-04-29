export const GOAL_CATEGORIES = [
  'Emergency Fund',
  'Education',
  'Travel',
  'Electronics',
  'Home',
  'Car',
  'Other',
];

export const GOAL_STATUSES = ['In progress', 'Completed', 'At risk', 'Overdue'];

export const INITIAL_GOALS = [
  {
    id: 'g1',
    name: 'Laptop Purchase',
    category: 'Electronics',
    targetAmount: 1200,
    savedAmount: 780,
    deadline: '2026-06-30',
    note: 'MacBook Air M4 for freelance work',
    contributions: [
      { id: 'c1', amount: 300, date: '2026-02-15', note: 'Initial deposit' },
      { id: 'c2', amount: 250, date: '2026-03-10', note: 'March savings' },
      { id: 'c3', amount: 230, date: '2026-04-12', note: 'April savings' },
    ],
  },
  {
    id: 'g2',
    name: 'Emergency Fund',
    category: 'Emergency Fund',
    targetAmount: 5000,
    savedAmount: 1850,
    deadline: '2026-12-31',
    note: '6 months of living expenses',
    contributions: [
      { id: 'c4', amount: 500, date: '2026-01-20', note: 'January' },
      { id: 'c5', amount: 500, date: '2026-02-20', note: 'February' },
      { id: 'c6', amount: 450, date: '2026-03-20', note: 'March' },
      { id: 'c7', amount: 400, date: '2026-04-20', note: 'April' },
    ],
  },
  {
    id: 'g3',
    name: 'Travel to Istanbul',
    category: 'Travel',
    targetAmount: 2000,
    savedAmount: 2000,
    deadline: '2026-04-20',
    note: 'Summer vacation trip',
    contributions: [
      { id: 'c8', amount: 800, date: '2026-01-15', note: 'Flights booked' },
      { id: 'c9', amount: 700, date: '2026-02-25', note: 'Hotel deposit' },
      { id: 'c10', amount: 500, date: '2026-03-30', note: 'Final amount' },
    ],
  },
];
