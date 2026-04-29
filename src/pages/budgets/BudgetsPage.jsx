import { useState, useEffect, useMemo } from 'react';
import {
  Plus, Edit, Trash2, Filter, ChevronDown, Search,
  ShoppingCart, Car, ShoppingBag, Zap, Film, Heart, GraduationCap, MoreHorizontal,
  TrendingUp, AlertTriangle, XCircle, MinusCircle,
} from 'lucide-react';
import BudgetModal from './BudgetModal';
import { INITIAL_BUDGETS, BUDGET_STATUSES } from './constants';
import { useSettings } from '@/context/SettingsContext';

// ─── Category icons ────────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  'Food & Groceries': { icon: ShoppingCart,   bg: 'bg-orange-50',  text: 'text-orange-500',  ring: 'ring-orange-200'  },
  'Transport':        { icon: Car,            bg: 'bg-sky-50',     text: 'text-sky-500',     ring: 'ring-sky-200'     },
  'Shopping':         { icon: ShoppingBag,    bg: 'bg-pink-50',    text: 'text-pink-500',    ring: 'ring-pink-200'    },
  'Utilities':        { icon: Zap,            bg: 'bg-amber-50',   text: 'text-amber-500',   ring: 'ring-amber-200'   },
  'Entertainment':    { icon: Film,           bg: 'bg-purple-50',  text: 'text-purple-500',  ring: 'ring-purple-200'  },
  'Health':           { icon: Heart,          bg: 'bg-rose-50',    text: 'text-rose-500',    ring: 'ring-rose-200'    },
  'Education':        { icon: GraduationCap,  bg: 'bg-indigo-50',  text: 'text-indigo-500',  ring: 'ring-indigo-200'  },
  'Other expense':    { icon: MoreHorizontal, bg: 'bg-gray-50',    text: 'text-gray-500',    ring: 'ring-gray-200'    },
};

// ─── Helpers ────────────────────────────────────────────────────────────────────
function getStatus(spent, limit) {
  if (spent === 0) return 'Not started';
  const pct = (spent / limit) * 100;
  if (pct >= 100) return 'Exceeded';
  if (pct >= 70) return 'Near limit';
  return 'On track';
}

const STATUS_STYLE = {
  'On track':    { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: TrendingUp    },
  'Near limit':  { bg: 'bg-amber-50',   text: 'text-amber-600',   icon: AlertTriangle },
  'Exceeded':    { bg: 'bg-rose-50',     text: 'text-rose-600',    icon: XCircle       },
  'Not started': { bg: 'bg-gray-100',   text: 'text-gray-500',    icon: MinusCircle   },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE['Not started'];
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon size={12} />
      {status}
    </span>
  );
}

function formatMonth(ym) {
  const [y, m] = ym.split('-');
  const date = new Date(Number(y), Number(m) - 1);
  return date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
}

function progressColor(pct) {
  if (pct >= 100) return 'bg-rose-500';
  if (pct >= 70) return 'bg-amber-500';
  return 'bg-emerald-500';
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function BudgetsPage() {
  const { categories } = useSettings();
  const expenseCategories = categories.filter(c => c.type === 'expense').map(c => c.name);

  // ── State ──────────────────────────────────────────────────────────────────────
  const [budgets, setBudgets] = useState(() => {
    const saved = localStorage.getItem('finebank_budgets');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('finebank_budgets', JSON.stringify(INITIAL_BUDGETS));
    return INITIAL_BUDGETS;
  });

  const [transactions] = useState(() => {
    const saved = localStorage.getItem('finebank_transactions');
    return saved ? JSON.parse(saved) : [];
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBudget, setEditingBudget] = useState(null);

  const [selectedMonth, setSelectedMonth] = useState('2026-04');
  const [filterCategory, setFilterCategory] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem('finebank_budgets', JSON.stringify(budgets));
  }, [budgets]);

  // ── Compute spent from transactions ────────────────────────────────────────────
  const spentByCategory = useMemo(() => {
    const map = {};
    transactions.forEach((tx) => {
      if (tx.type !== 'expense' || tx.status !== 'completed') return;
      const txMonth = tx.date.slice(0, 7); // "2026-04"
      const key = `${txMonth}__${tx.category}`;
      map[key] = (map[key] || 0) + tx.amount;
    });
    return map;
  }, [transactions]);

  // ── Enrich budgets with computed fields ────────────────────────────────────────
  const enrichedBudgets = useMemo(() => {
    return budgets.map((b) => {
      const spent = spentByCategory[`${b.month}__${b.category}`] || 0;
      const remaining = b.limit - spent;
      const progress = b.limit > 0 ? (spent / b.limit) * 100 : 0;
      const status = getStatus(spent, b.limit);
      return { ...b, spent, remaining, progress, status };
    });
  }, [budgets, spentByCategory]);

  // ── Filtering ──────────────────────────────────────────────────────────────────
  const filteredBudgets = enrichedBudgets.filter((b) => {
    if (b.month !== selectedMonth) return false;
    if (filterCategory !== 'all' && b.category !== filterCategory) return false;
    if (filterStatus !== 'all' && b.status !== filterStatus) return false;
    return true;
  });

  // ── Summary cards ──────────────────────────────────────────────────────────────
  const monthBudgets = enrichedBudgets.filter((b) => b.month === selectedMonth);
  const totalLimit = monthBudgets.reduce((s, b) => s + b.limit, 0);
  const totalSpent = monthBudgets.reduce((s, b) => s + b.spent, 0);
  const totalRemaining = totalLimit - totalSpent;
  const overallProgress = totalLimit > 0 ? (totalSpent / totalLimit) * 100 : 0;

  // ── Handlers ───────────────────────────────────────────────────────────────────
  const handleSave = (data) => {
    if (editingBudget) {
      setBudgets((prev) => prev.map((b) => (b.id === data.id ? data : b)));
    } else {
      setBudgets((prev) => [...prev, data]);
    }
    setIsModalOpen(false);
    setEditingBudget(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this budget?')) {
      setBudgets((prev) => prev.filter((b) => b.id !== id));
    }
  };

  const openEdit = (budget) => {
    setEditingBudget(budget);
    setIsModalOpen(true);
  };

  // Existing categories for the selected month (used to prevent duplicates)
  const existingCategoriesForMonth = budgets
    .filter((b) => b.month === selectedMonth)
    .map((b) => b.category);

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Budgets</h1>
          <p className="text-sm text-gray-500 mt-1">{formatMonth(selectedMonth)}</p>
        </div>
        <div className="flex items-center gap-3">
          <input
            type="month"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
            className="px-3 py-2 border border-gray-200 rounded-xl text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]"
          />
          <button
            onClick={() => {
              setEditingBudget(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-[#299D91]/20"
          >
            <Plus size={18} />
            Create Budget
          </button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Budgeted</p>
          <h3 className="text-2xl font-bold text-gray-900">${totalLimit.toFixed(2)}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Total Spent</p>
          <h3 className="text-2xl font-bold text-gray-900">${totalSpent.toFixed(2)}</h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Remaining</p>
          <h3 className={`text-2xl font-bold ${totalRemaining >= 0 ? 'text-emerald-600' : 'text-rose-600'}`}>
            ${totalRemaining.toFixed(2)}
          </h3>
        </div>
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100">
          <p className="text-sm font-medium text-gray-500 mb-1">Overall Progress</p>
          <h3 className="text-2xl font-bold text-gray-900">{Math.min(overallProgress, 999).toFixed(1)}%</h3>
          <div className="mt-2 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
            <div
              className={`h-full rounded-full transition-all duration-500 ${progressColor(overallProgress)}`}
              style={{ width: `${Math.min(overallProgress, 100)}%` }}
            />
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-medium transition-colors ${
              showFilters
                ? 'bg-[#299D91]/10 text-[#299D91]'
                : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Filter size={16} />
            Filters
            <ChevronDown
              size={14}
              className={`transition-transform ${showFilters ? 'rotate-180' : ''}`}
            />
          </button>
          <p className="text-sm text-gray-500">
            {filteredBudgets.length} budget{filteredBudgets.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]"
            >
              <option value="all">All Categories</option>
              {expenseCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>

            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]"
            >
              <option value="all">All Statuses</option>
              {BUDGET_STATUSES.map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Budget Cards Grid */}
        {filteredBudgets.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-gray-400">
            <Search size={40} className="mb-4 text-gray-200" />
            <p>No budgets found for this month.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-5">
            {filteredBudgets.map((b) => {
              const cfg = CATEGORY_CONFIG[b.category] || CATEGORY_CONFIG['Other expense'];
              const Icon = cfg.icon;
              const pct = Math.min(b.progress, 100);

              return (
                <div
                  key={b.id}
                  className="border border-gray-100 rounded-2xl p-5 hover:shadow-md transition-shadow"
                >
                  {/* Top: Icon + Category + Actions */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}
                      >
                        <Icon size={20} className={cfg.text} />
                      </div>
                      <div>
                        <h4 className="text-sm font-semibold text-gray-800">{b.category}</h4>
                        <StatusBadge status={b.status} />
                      </div>
                    </div>
                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => openEdit(b)}
                        className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                      >
                        <Edit size={16} />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-3">
                    <div
                      className={`h-full rounded-full transition-all duration-700 ease-out ${progressColor(b.progress)}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>

                  {/* Amounts */}
                  <div className="flex items-center justify-between text-sm">
                    <div>
                      <span className="font-bold text-gray-900">${b.spent.toFixed(2)}</span>
                      <span className="text-gray-400"> / ${b.limit.toFixed(2)}</span>
                    </div>
                    <span
                      className={`font-semibold ${
                        b.remaining >= 0 ? 'text-emerald-600' : 'text-rose-600'
                      }`}
                    >
                      {b.remaining >= 0 ? `$${b.remaining.toFixed(2)} left` : `-$${Math.abs(b.remaining).toFixed(2)} over`}
                    </span>
                  </div>

                  {/* Percentage */}
                  <p className="text-xs text-gray-400 mt-1 text-right">
                    {b.progress.toFixed(1)}% used
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal */}
      <BudgetModal
        isOpen={isModalOpen}
        onClose={() => {
          setIsModalOpen(false);
          setEditingBudget(null);
        }}
        onSave={handleSave}
        initialData={editingBudget}
        existingCategories={existingCategoriesForMonth}
        selectedMonth={selectedMonth}
      />
    </div>
  );
}
