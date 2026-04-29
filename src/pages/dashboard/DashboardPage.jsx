import { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import {
  Wallet, TrendingUp, ArrowDownRight, PiggyBank,
  AlertTriangle, CheckCircle, Clock, XCircle,
  ArrowRight, Target, ShieldAlert, CalendarDays,
  ShoppingCart, Car, ShoppingBag, Zap, Film, Heart, GraduationCap, MoreHorizontal,
} from 'lucide-react';
import { INITIAL_TRANSACTIONS } from '@/pages/transactions/constants';
import { INITIAL_BUDGETS } from '@/pages/budgets/constants';
import { INITIAL_GOALS } from '@/pages/goals/constants';

// ─── Helpers ────────────────────────────────────────────────────────────────────
function getStorageData(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function computeGoalStatus(goal) {
  const { savedAmount, targetAmount, deadline } = goal;
  if (savedAmount >= targetAmount) return 'Completed';
  const now = new Date();
  const dl = new Date(deadline);
  const daysLeft = Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
  const progress = targetAmount > 0 ? (savedAmount / targetAmount) * 100 : 0;
  if (daysLeft < 0) return 'Overdue';
  if (daysLeft <= 30 && progress < 70) return 'At risk';
  return 'In progress';
}

function getBudgetStatus(spent, limit) {
  if (spent === 0) return 'Not started';
  const pct = (spent / limit) * 100;
  if (pct >= 100) return 'Exceeded';
  if (pct >= 70) return 'Near limit';
  return 'On track';
}

function daysUntil(dateStr) {
  const diff = Math.ceil((new Date(dateStr) - new Date()) / (1000 * 60 * 60 * 24));
  if (diff < 0) return `${Math.abs(diff)}d overdue`;
  if (diff === 0) return 'Today';
  return `${diff}d left`;
}

const CATEGORY_ICONS = {
  'Food & Groceries': ShoppingCart,
  'Transport': Car,
  'Shopping': ShoppingBag,
  'Utilities': Zap,
  'Entertainment': Film,
  'Health': Heart,
  'Education': GraduationCap,
  'Other expense': MoreHorizontal,
};

// ─── Small reusable pieces ──────────────────────────────────────────────────────
function SectionHeader({ title, linkText, to }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-between mb-4">
      <h2 className="text-base font-bold text-gray-800">{title}</h2>
      {linkText && (
        <button
          onClick={() => navigate(to)}
          className="flex items-center gap-1 text-sm font-medium text-[#299D91] hover:text-[#1f7a70] transition-colors"
        >
          {linkText} <ArrowRight size={14} />
        </button>
      )}
    </div>
  );
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function DashboardPage() {
  const { user } = useAuth();
  const currentMonth = '2026-04';

  // Load all data from localStorage (or fallback)
  const transactions = useMemo(() => getStorageData('finebank_transactions', INITIAL_TRANSACTIONS), []);
  const budgets = useMemo(() => getStorageData('finebank_budgets', INITIAL_BUDGETS), []);
  const goals = useMemo(() => getStorageData('finebank_goals', INITIAL_GOALS), []);

  // ── Transaction totals ─────────────────────────────────────────────────────────
  const monthlyTotals = useMemo(() => {
    return transactions.reduce(
      (acc, tx) => {
        if (tx.status !== 'completed') return acc;
        if (!tx.date.startsWith(currentMonth)) return acc;
        if (tx.type === 'income') acc.income += tx.amount;
        if (tx.type === 'expense') acc.expense += tx.amount;
        return acc;
      },
      { income: 0, expense: 0 }
    );
  }, [transactions, currentMonth]);

  const netSavings = monthlyTotals.income - monthlyTotals.expense;

  // Account balances (from mock)
  const totalBalance = 48295.0;

  // ── Budget data ────────────────────────────────────────────────────────────────
  const budgetData = useMemo(() => {
    const monthBudgets = budgets.filter((b) => b.month === currentMonth);
    let totalLimit = 0;
    let totalSpent = 0;
    const alerts = [];

    monthBudgets.forEach((b) => {
      const spent = transactions
        .filter((tx) => tx.type === 'expense' && tx.status === 'completed' && tx.category === b.category && tx.date.startsWith(b.month))
        .reduce((s, tx) => s + tx.amount, 0);
      totalLimit += b.limit;
      totalSpent += spent;
      const status = getBudgetStatus(spent, b.limit);
      if (status === 'Near limit' || status === 'Exceeded') {
        alerts.push({ ...b, spent, status, progress: (spent / b.limit) * 100 });
      }
    });

    return { totalLimit, totalSpent, remaining: totalLimit - totalSpent, alerts };
  }, [budgets, transactions, currentMonth]);

  // ── Goals data ─────────────────────────────────────────────────────────────────
  const goalsData = useMemo(() => {
    return goals.map((g) => ({
      ...g,
      progress: g.targetAmount > 0 ? (g.savedAmount / g.targetAmount) * 100 : 0,
      status: computeGoalStatus(g),
    }));
  }, [goals]);

  const activeGoals = goalsData.filter((g) => g.status !== 'Completed').slice(0, 3);

  // ── Recent transactions ────────────────────────────────────────────────────────
  const recentTx = useMemo(() => {
    return [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 5);
  }, [transactions]);

  // ── Insights ───────────────────────────────────────────────────────────────────
  const insights = useMemo(() => {
    const list = [];
    if (netSavings > 0) {
      list.push({ type: 'success', text: `You saved $${netSavings.toFixed(2)} this month. Keep it up!` });
    } else if (netSavings < 0) {
      list.push({ type: 'warning', text: `You overspent by $${Math.abs(netSavings).toFixed(2)} this month.` });
    }
    if (budgetData.alerts.length > 0) {
      list.push({ type: 'warning', text: `${budgetData.alerts.length} budget(s) are near limit or exceeded.` });
    }
    const atRiskGoals = goalsData.filter((g) => g.status === 'At risk' || g.status === 'Overdue');
    if (atRiskGoals.length > 0) {
      list.push({ type: 'danger', text: `${atRiskGoals.length} goal(s) need attention.` });
    }
    if (list.length === 0) {
      list.push({ type: 'success', text: 'Everything looks good! Your finances are on track.' });
    }
    return list;
  }, [netSavings, budgetData, goalsData]);

  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Hello, {user?.name?.split(' ')[0] || 'User'} 👋
        </h1>
        <p className="text-sm text-gray-500 mt-1">Here's your financial overview for April 2026</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Wallet className="text-blue-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Balance</p>
            <h3 className="text-xl font-bold text-gray-900">${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
            <TrendingUp className="text-emerald-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Monthly Income</p>
            <h3 className="text-xl font-bold text-emerald-600">${monthlyTotals.income.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
            <ArrowDownRight className="text-rose-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Monthly Expense</p>
            <h3 className="text-xl font-bold text-gray-900">${monthlyTotals.expense.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
            <PiggyBank className="text-violet-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Net Savings</p>
            <h3 className={`text-xl font-bold ${netSavings >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
              ${netSavings.toFixed(2)}
            </h3>
          </div>
        </div>
      </div>

      {/* Insights Bar */}
      <div className="space-y-2">
        {insights.map((insight, i) => (
          <div
            key={i}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium ${
              insight.type === 'success'
                ? 'bg-emerald-50 text-emerald-700'
                : insight.type === 'warning'
                ? 'bg-amber-50 text-amber-700'
                : 'bg-rose-50 text-rose-700'
            }`}
          >
            {insight.type === 'success' ? (
              <CheckCircle size={16} />
            ) : insight.type === 'warning' ? (
              <AlertTriangle size={16} />
            ) : (
              <ShieldAlert size={16} />
            )}
            {insight.text}
          </div>
        ))}
      </div>

      {/* Main Grid: 2 columns */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LEFT: Recent Transactions + Budget Alerts */}
        <div className="lg:col-span-2 space-y-6">
          {/* Recent Transactions */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <SectionHeader title="Recent Transactions" linkText="View All" to="/transactions" />
            {recentTx.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">No transactions yet.</p>
            ) : (
              <div className="divide-y divide-gray-50">
                {recentTx.map((tx) => (
                  <div key={tx.id} className="flex items-center justify-between py-3">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 ${
                          tx.type === 'income' ? 'bg-emerald-50' : 'bg-rose-50'
                        }`}
                      >
                        {tx.type === 'income' ? (
                          <TrendingUp size={16} className="text-emerald-500" />
                        ) : (
                          <ArrowDownRight size={16} className="text-rose-500" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{tx.category}</p>
                        <p className="text-xs text-gray-400">{tx.date} · {tx.account}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-sm font-bold ${
                          tx.status === 'cancelled'
                            ? 'line-through text-gray-400'
                            : tx.type === 'income'
                            ? 'text-emerald-600'
                            : 'text-gray-900'
                        }`}
                      >
                        {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                      </p>
                      {tx.status !== 'completed' && (
                        <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
                          tx.status === 'pending' ? 'bg-amber-50 text-amber-600' : 'bg-gray-100 text-gray-500'
                        }`}>
                          {tx.status}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Budget Usage */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <SectionHeader title="Budget Overview" linkText="Manage Budgets" to="/budgets" />
            <div className="flex items-center justify-between mb-4 px-1">
              <div>
                <p className="text-sm text-gray-500">Budgeted</p>
                <p className="text-lg font-bold text-gray-900">${budgetData.totalLimit.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Spent</p>
                <p className="text-lg font-bold text-gray-900">${budgetData.totalSpent.toFixed(2)}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Remaining</p>
                <p className={`text-lg font-bold ${budgetData.remaining >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
                  ${budgetData.remaining.toFixed(2)}
                </p>
              </div>
            </div>
            {/* Overall progress bar */}
            <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden mb-4">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  budgetData.totalLimit > 0 && (budgetData.totalSpent / budgetData.totalLimit) * 100 >= 100
                    ? 'bg-rose-500'
                    : (budgetData.totalSpent / budgetData.totalLimit) * 100 >= 70
                    ? 'bg-amber-500'
                    : 'bg-emerald-500'
                }`}
                style={{
                  width: `${Math.min(budgetData.totalLimit > 0 ? (budgetData.totalSpent / budgetData.totalLimit) * 100 : 0, 100)}%`,
                }}
              />
            </div>

            {/* Budget Alerts */}
            {budgetData.alerts.length > 0 && (
              <div className="space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Alerts</p>
                {budgetData.alerts.map((b) => {
                  const Icon = CATEGORY_ICONS[b.category] || MoreHorizontal;
                  return (
                    <div
                      key={b.id}
                      className={`flex items-center justify-between px-3 py-2.5 rounded-xl ${
                        b.status === 'Exceeded' ? 'bg-rose-50' : 'bg-amber-50'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className={b.status === 'Exceeded' ? 'text-rose-500' : 'text-amber-500'} />
                        <span className="text-sm font-medium text-gray-800">{b.category}</span>
                      </div>
                      <span className={`text-xs font-semibold ${b.status === 'Exceeded' ? 'text-rose-600' : 'text-amber-600'}`}>
                        {b.progress.toFixed(0)}% · {b.status}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>

        {/* RIGHT: Goals + Quick Actions */}
        <div className="space-y-6">
          {/* Active Goals */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <SectionHeader title="Active Goals" linkText="View All" to="/goals" />
            {activeGoals.length === 0 ? (
              <p className="text-sm text-gray-400 py-6 text-center">All goals completed! 🎉</p>
            ) : (
              <div className="space-y-4">
                {activeGoals.map((goal) => {
                  const pct = Math.min(goal.progress, 100);
                  return (
                    <div key={goal.id} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Target size={14} className="text-[#299D91]" />
                          <span className="text-sm font-medium text-gray-800">{goal.name}</span>
                        </div>
                        <span
                          className={`text-[10px] font-semibold px-2 py-0.5 rounded-full ${
                            goal.status === 'At risk'
                              ? 'bg-amber-50 text-amber-600'
                              : goal.status === 'Overdue'
                              ? 'bg-rose-50 text-rose-600'
                              : 'bg-blue-50 text-blue-600'
                          }`}
                        >
                          {goal.status}
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-500 ${
                            goal.status === 'At risk' ? 'bg-amber-500' : goal.status === 'Overdue' ? 'bg-rose-500' : 'bg-[#299D91]'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>${goal.savedAmount.toFixed(0)} / ${goal.targetAmount.toFixed(0)}</span>
                        <span className="flex items-center gap-1">
                          <CalendarDays size={10} />
                          {daysUntil(goal.deadline)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Quick Navigation */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <h2 className="text-base font-bold text-gray-800 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Transactions', to: '/transactions', icon: ArrowDownRight, color: 'bg-blue-50 text-blue-600' },
                { label: 'Budgets',      to: '/budgets',      icon: Wallet,         color: 'bg-emerald-50 text-emerald-600' },
                { label: 'Goals',        to: '/goals',        icon: Target,         color: 'bg-violet-50 text-violet-600' },
                { label: 'Expenses',     to: '/expenses',     icon: PiggyBank,      color: 'bg-amber-50 text-amber-600' },
              ].map((item) => {
                const Icon = item.icon;
                return (
                  <button
                    key={item.to}
                    onClick={() => navigate(item.to)}
                    className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors"
                  >
                    <div className={`w-10 h-10 rounded-xl ${item.color} flex items-center justify-center`}>
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-semibold text-gray-700">{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Month Summary Mini Card */}
          <div className="bg-gradient-to-br from-[#299D91] to-[#1f7a70] rounded-2xl p-5 text-white">
            <h3 className="text-sm font-semibold opacity-80 mb-3">April 2026 Summary</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="opacity-70">Income</span>
                <span className="font-bold">${monthlyTotals.income.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="opacity-70">Expense</span>
                <span className="font-bold">${monthlyTotals.expense.toFixed(2)}</span>
              </div>
              <div className="h-px bg-white/20 my-1" />
              <div className="flex justify-between">
                <span className="opacity-70">Net Savings</span>
                <span className="font-bold text-base">${netSavings.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
