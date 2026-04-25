// =============================================
// FINEBANK.IO — Mock Data
// =============================================

// ----- Users -----
export const mockUsers = [
  {
    id: "user-001",
    name: "John Doe",
    email: "johndoe@email.com",
    password: "password123",
    role: "admin",
    avatar: null,
    phone: "+1 (555) 234-5678",
    createdAt: "2024-01-15",
    status: "active",
  },
  {
    id: "user-002",
    name: "Jane Smith",
    email: "jane@email.com",
    password: "pass456",
    role: "user",
    avatar: null,
    phone: "+1 (555) 987-6543",
    createdAt: "2024-03-22",
    status: "active",
  },
];

// ----- Auth helpers -----
export const findUserByCredentials = (email, password) => {
  return mockUsers.find(
    (u) => u.email === email && u.password === password
  ) || null;
};

// ----- Dashboard Stats -----
export const mockStats = [
  { id: "s1", label: "Total Balance",   value: "$48,295.00",  change: "+2.4%",  trend: "up",   icon: "wallet" },
  { id: "s2", label: "Income",          value: "$12,540.00",  change: "+8.1%",  trend: "up",   icon: "arrow-down-circle" },
  { id: "s3", label: "Expenses",        value: "$4,320.50",   change: "-1.2%",  trend: "down", icon: "arrow-up-circle" },
  { id: "s4", label: "Savings Goal",    value: "73%",         change: "+5%",    trend: "up",   icon: "target" },
];

// ----- Recent Transactions -----
export const mockTransactions = [
  { id: "t1",  date: "2025-04-24", description: "Netflix Subscription",  category: "Entertainment", amount: -15.99,  status: "completed" },
  { id: "t2",  date: "2025-04-23", description: "Salary Deposit",        category: "Income",        amount: 5200.00, status: "completed" },
  { id: "t3",  date: "2025-04-22", description: "Grocery Store",         category: "Food",          amount: -87.45,  status: "completed" },
  { id: "t4",  date: "2025-04-21", description: "Electric Bill",         category: "Utilities",     amount: -120.00, status: "pending"   },
  { id: "t5",  date: "2025-04-20", description: "Amazon Purchase",       category: "Shopping",      amount: -245.30, status: "completed" },
  { id: "t6",  date: "2025-04-19", description: "Freelance Payment",     category: "Income",        amount: 800.00,  status: "completed" },
  { id: "t7",  date: "2025-04-18", description: "Spotify Premium",       category: "Entertainment", amount: -9.99,   status: "completed" },
  { id: "t8",  date: "2025-04-17", description: "Coffee Shop",           category: "Food",          amount: -6.50,   status: "completed" },
];

// ----- Accounts (Balances) -----
export const mockAccounts = [
  {
    id: "acc-1",
    name: "Credit Card",
    bankName: "Master Card",
    cardBrand: "mastercard",
    branchName: "Downtown Branch",
    type: "credit",
    accountNumber: "3388 4556  8860 8***",
    balance: 25000.00,
    currency: "USD",
    lastFour: "8860",
    color: "#ef4444",
  },
  {
    id: "acc-2",
    name: "Checking",
    bankName: "AB Bank Ltd",
    cardBrand: "visa",
    branchName: "Park Street Branch",
    type: "checking",
    accountNumber: "693 456  69 9****",
    balance: 25000.00,
    currency: "USD",
    lastFour: "0099",
    color: "#299D91",
  },
  {
    id: "acc-3",
    name: "Savings",
    bankName: "Brac Bank Ltd.",
    cardBrand: null,
    branchName: "Commerce Plaza Branch",
    type: "savings",
    accountNumber: "133 456  886 8****",
    balance: 25000.00,
    currency: "USD",
    lastFour: "8868",
    color: "#6366f1",
  },
  {
    id: "acc-4",
    name: "Investment",
    bankName: "AB Bank Ltd",
    cardBrand: null,
    branchName: "Wall Street Branch",
    type: "invest",
    accountNumber: "698 456  866 2****",
    balance: 25000.00,
    currency: "USD",
    lastFour: "6622",
    color: "#f59e0b",
  },
  {
    id: "acc-5",
    name: "Loan",
    bankName: "City Bank Ltd.",
    cardBrand: null,
    branchName: "Midtown Branch",
    type: "loan",
    accountNumber: "363 456  896 6****",
    balance: 25000.00,
    currency: "USD",
    lastFour: "8966",
    color: "#8b5cf6",
  },
];

// ----- Account Transactions (per account) -----
export const mockAccountTransactions = {
  "acc-1": [
    { id: "at1-1", date: "2025-04-24", status: "Complete", type: "Credit", receipt: "8C52d5DKDJ5", amount: 160.00 },
    { id: "at1-2", date: "2025-04-22", status: "Complete", type: "Debit",  receipt: "7A31f2GHKL3", amount: -87.45 },
    { id: "at1-3", date: "2025-04-20", status: "Complete", type: "Credit", receipt: "9D74g8MNOP6", amount: 5200.00 },
    { id: "at1-4", date: "2025-04-18", status: "Pending",  type: "Debit",  receipt: "2B19h4QRST9", amount: -120.00 },
    { id: "at1-5", date: "2025-04-16", status: "Complete", type: "Credit", receipt: "5F62j1UVWX2", amount: 800.00 },
    { id: "at1-6", date: "2025-04-14", status: "Complete", type: "Debit",  receipt: "3G85k7YZAB4", amount: -245.30 },
  ],
  "acc-2": [
    { id: "at2-1", date: "2025-04-23", status: "Complete", type: "Credit", receipt: "8C52d5DKDJ5", amount: 160.00 },
    { id: "at2-2", date: "2025-04-21", status: "Complete", type: "Credit", receipt: "4H29m3CDEF7", amount: 500.00 },
    { id: "at2-3", date: "2025-04-19", status: "Complete", type: "Debit",  receipt: "6J47n5GHIJ8", amount: -75.00 },
    { id: "at2-4", date: "2025-04-17", status: "Pending",  type: "Credit", receipt: "1K83p9KLMN1", amount: 1200.00 },
  ],
  "acc-3": [
    { id: "at3-1", date: "2025-04-22", status: "Complete", type: "Credit", receipt: "8C52d5DKDJ5", amount: 320.00 },
    { id: "at3-2", date: "2025-04-18", status: "Complete", type: "Credit", receipt: "7L56q2OPQR3", amount: 150.00 },
    { id: "at3-3", date: "2025-04-12", status: "Complete", type: "Debit",  receipt: "9M91r6STUV5", amount: -50.00 },
  ],
  "acc-4": [
    { id: "at4-1", date: "2025-04-24", status: "Complete", type: "Credit", receipt: "8C52d5DKDJ5", amount: 160.00 },
    { id: "at4-2", date: "2025-04-24", status: "Complete", type: "Credit", receipt: "8C52d5DKDJ5", amount: 160.00 },
    { id: "at4-3", date: "2025-04-24", status: "Complete", type: "Credit", receipt: "8C52d5DKDJ5", amount: 160.00 },
    { id: "at4-4", date: "2025-04-24", status: "Complete", type: "Debit",  receipt: "2N37s8WXYZ6", amount: -450.00 },
    { id: "at4-5", date: "2025-04-22", status: "Complete", type: "Credit", receipt: "5P74t1ABCD7", amount: 12000.00 },
    { id: "at4-6", date: "2025-04-20", status: "Pending",  type: "Debit",  receipt: "3Q18u4EFGH8", amount: -920.00 },
  ],
  "acc-5": [
    { id: "at5-1", date: "2025-04-24", status: "Complete", type: "Debit",  receipt: "4R71x3NOPQ2", amount: -560.00 },
    { id: "at5-2", date: "2025-04-22", status: "Complete", type: "Debit",  receipt: "7S14y6RSTU3", amount: -560.00 },
    { id: "at5-3", date: "2025-04-20", status: "Pending",  type: "Debit",  receipt: "2T58z9VWXY4", amount: -560.00 },
    { id: "at5-4", date: "2025-04-18", status: "Complete", type: "Credit", receipt: "5U93a2ZABC5", amount: 25000.00 },
  ],
};

// ----- Notifications -----
export const mockNotifications = [
  { id: "n1", title: "Payment Received",  message: "You received $800 from Freelance Client.", time: "2h ago",  read: false },
  { id: "n2", title: "Bill Due Soon",     message: "Electric bill of $120 is due tomorrow.",   time: "5h ago",  read: false },
  { id: "n3", title: "Security Alert",   message: "New login from a different device detected.", time: "1d ago", read: true  },
];

// ----- Bills -----
export const mockBills = [
  {
    id: "bill-1",
    dueMonth: "May",
    dueDay: 15,
    logo: "figma",
    title: "Figma - Yearly Plan",
    description: "For advanced security and more flexible controls, the Professional plan helps you scale design processes company-wide.",
    lastCharge: "14 May, 2022",
    amount: 150,
  },
  {
    id: "bill-2",
    dueMonth: "Jun",
    dueDay: 16,
    logo: "adobe",
    title: "Adobe Inc - Yearly Plan",
    description: "For advanced security and more flexible controls, the Professional plan helps you scale design processes company-wide.",
    lastCharge: "17 Jun, 2022",
    amount: 559,
  },
  {
    id: "bill-3",
    dueMonth: "Jun",
    dueDay: 22,
    logo: "notion",
    title: "Notion - Team Plan",
    description: "Unlimited blocks for teams, collaborative workspace, advanced permissions, and admin tools for your organization.",
    lastCharge: "22 Jun, 2022",
    amount: 96,
  },
  {
    id: "bill-4",
    dueMonth: "Jul",
    dueDay: 5,
    logo: "slack",
    title: "Slack - Pro Plan",
    description: "Unlimited message history, unlimited apps & integrations, group calls with screen sharing.",
    lastCharge: "05 Jul, 2022",
    amount: 87,
  },
  {
    id: "bill-5",
    dueMonth: "Jul",
    dueDay: 18,
    logo: "aws",
    title: "AWS - Monthly Compute",
    description: "Cloud computing services including EC2 instances, S3 storage, and RDS database usage for the month.",
    lastCharge: "18 Jul, 2022",
    amount: 340,
  },
];

// ----- Detailed Transactions -----
export const mockDetailedTransactions = [
  { id: "dt1",  item: "GTR 5",        category: "gaming",         shopName: "Gadget & Gear",  date: "17 May, 2023", paymentMethod: "Credit Card",   amount: 160.00,  type: "expense" },
  { id: "dt2",  item: "Polo shirt",   category: "clothing",       shopName: "XL fashions",    date: "17 May, 2023", paymentMethod: "Credit Card",   amount: 20.00,   type: "expense" },
  { id: "dt3",  item: "Biriyani",     category: "food",           shopName: "Hajir Biriyani", date: "17 May, 2023", paymentMethod: "Credit Card",   amount: 12.00,   type: "expense" },
  { id: "dt4",  item: "Movie ticket", category: "entertainment",  shopName: "Inox",           date: "17 May, 2023", paymentMethod: "Credit Card",   amount: 15.00,   type: "expense" },
  { id: "dt5",  item: "Taxi fare",    category: "transport",      shopName: "Uber",           date: "17 May, 2023", paymentMethod: "Credit Card",   amount: 10.00,   type: "expense" },
  { id: "dt6",  item: "Pizza",        category: "food",           shopName: "Pizza Hit",      date: "17 May, 2023", paymentMethod: "Credit Card",   amount: 20.00,   type: "expense" },
  { id: "dt7",  item: "Keyboard",     category: "tech",           shopName: "Gadget & Gear",  date: "17 May, 2023", paymentMethod: "Credit Card",   amount: 30.00,   type: "expense" },
  { id: "dt8",  item: "Headphones",   category: "tech",           shopName: "SoundZone",      date: "16 May, 2023", paymentMethod: "Debit Card",    amount: 75.00,   type: "expense" },
  { id: "dt9",  item: "Coffee",       category: "food",           shopName: "Starbucks",      date: "16 May, 2023", paymentMethod: "Credit Card",   amount: 6.50,    type: "expense" },
  { id: "dt10", item: "Salary",       category: "income",         shopName: "Employer Co.",   date: "01 May, 2023", paymentMethod: "Bank Transfer", amount: 5200.00, type: "revenue" },
  { id: "dt11", item: "Freelance",    category: "income",         shopName: "Client Inc.",    date: "05 May, 2023", paymentMethod: "PayPal",        amount: 800.00,  type: "revenue" },
  { id: "dt12", item: "Dividend",     category: "income",         shopName: "FINEbank Invest",date: "10 May, 2023", paymentMethod: "Bank Transfer", amount: 320.00,  type: "revenue" },
  { id: "dt13", item: "Bonus",        category: "income",         shopName: "Employer Co.",   date: "15 May, 2023", paymentMethod: "Bank Transfer", amount: 1500.00, type: "revenue" },
];

// ----- Chart Data: Weekly Statistics -----
export const mockWeeklyStats = [
  { name: "17 Sun", thisWeek: 50000, lastWeek: 250000 },
  { name: "18 Mon", thisWeek: 12000, lastWeek: 15000 },
  { name: "19 Tue", thisWeek: 50000, lastWeek: 8000 },
  { name: "20 Wed", thisWeek: 55000, lastWeek: 55000 },
  { name: "21 Thu", thisWeek: 22000, lastWeek: 55000 },
  { name: "22 Fri", thisWeek: 20000, lastWeek: 200000 },
  { name: "23 Sat", thisWeek: 50000, lastWeek: 50000 },
];

// ----- Chart Data: Monthly Expenses Comparison -----
export const mockMonthlyExpenses = [
  { name: "Jan", thisWeek: 200000, lastWeek: 50000 },
  { name: "Feb", thisWeek: 12000, lastWeek: 15000 },
  { name: "Mar", thisWeek: 50000, lastWeek: 8000 },
  { name: "Apr", thisWeek: 55000, lastWeek: 150000 },
  { name: "May", thisWeek: 50000, lastWeek: 55000 },
  { name: "Jun", thisWeek: 45000, lastWeek: 8000 },
  { name: "July", thisWeek: 22000, lastWeek: 55000 },
  { name: "Aug", thisWeek: 20000, lastWeek: 160000 },
  { name: "Sep", thisWeek: 50000, lastWeek: 55000 },
  { name: "Oct", thisWeek: 50000, lastWeek: 55000 },
  { name: "Nov", thisWeek: 20000, lastWeek: 8000 },
  { name: "Dec", thisWeek: 50000, lastWeek: 50000 },
];

// ----- Expenses Breakdown (Categories) -----
export const mockExpensesBreakdown = [
  { id: "eb1", category: "Housing", amount: 250.00, percentage: 15, trend: "up", icon: "home", items: [{ name: "House Rent", amount: 230, date: "17 May 2023" }, { name: "Parking", amount: 20, date: "17 May 2023" }] },
  { id: "eb2", category: "Food", amount: 350.00, percentage: 8, trend: "down", icon: "utensils", items: [{ name: "Grocery", amount: 230, date: "17 May 2023" }, { name: "Restaurant bill", amount: 120, date: "17 May 2023" }] },
  { id: "eb3", category: "Transportation", amount: 50.00, percentage: 12, trend: "down", icon: "car", items: [{ name: "Taxi Fare", amount: 30, date: "17 May 2023" }, { name: "Metro Card bill", amount: 20, date: "17 May 2023" }] },
  { id: "eb4", category: "Entertainment", amount: 80.00, percentage: 15, trend: "down", icon: "film", items: [{ name: "Movie ticket", amount: 30, date: "17 May 2023" }, { name: "iTunes", amount: 50, date: "17 May 2023" }] },
  { id: "eb5", category: "Shopping", amount: 420.00, percentage: 25, trend: "up", icon: "shopping-bag", items: [{ name: "Shirt", amount: 230, date: "17 May 2023" }, { name: "Jeans", amount: 190, date: "17 May 2023" }] },
  { id: "eb6", category: "Others", amount: 650.00, percentage: 23, trend: "up", icon: "grid", items: [{ name: "Donation", amount: 30, date: "17 May 2023" }, { name: "Gift", amount: 20, date: "17 May 2023" }] },
];

// ----- Chart Data: Saving Summary (Line Chart) -----
export const mockSavingSummary = [
  { name: "May 01", thisMonth: 2000, lastMonth: 1500 },
  { name: "May 05", thisMonth: 3500, lastMonth: 2000 },
  { name: "May 10", thisMonth: 1500, lastMonth: 2500 },
  { name: "May 15", thisMonth: 3000, lastMonth: 2000 },
  { name: "May 20", thisMonth: 2500, lastMonth: 2500 },
  { name: "May 25", thisMonth: 4000, lastMonth: 3000 },
  { name: "May 30", thisMonth: 3000, lastMonth: 2500 },
];
