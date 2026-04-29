import { useState, useEffect, useMemo } from 'react';
import {
  Plus, Edit, Trash2, Filter, ChevronDown, Search, PiggyBank,
  Target, CheckCircle, AlertTriangle, Clock, DollarSign,
  Laptop, Shield, Plane, Cpu, Home, Car, MoreHorizontal,
  ChevronRight, CalendarDays,
} from 'lucide-react';
import GoalModal from './GoalModal';
import ContributionModal from './ContributionModal';
import { INITIAL_GOALS, GOAL_STATUSES } from './constants';

// ─── Category Config ────────────────────────────────────────────────────────────
const CATEGORY_CONFIG = {
  'Emergency Fund': { icon: Shield,         bg: 'bg-emerald-50',  text: 'text-emerald-500' },
  'Education':      { icon: Target,         bg: 'bg-indigo-50',   text: 'text-indigo-500'  },
  'Travel':         { icon: Plane,          bg: 'bg-sky-50',      text: 'text-sky-500'     },
  'Electronics':    { icon: Cpu,            bg: 'bg-violet-50',   text: 'text-violet-500'  },
  'Home':           { icon: Home,           bg: 'bg-amber-50',    text: 'text-amber-500'   },
  'Car':            { icon: Car,            bg: 'bg-rose-50',     text: 'text-rose-500'    },
  'Other':          { icon: MoreHorizontal, bg: 'bg-gray-50',     text: 'text-gray-500'    },
};

// ─── Status logic ───────────────────────────────────────────────────────────────
function computeStatus(goal) {
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

const STATUS_STYLE = {
  'In progress': { bg: 'bg-blue-50',    text: 'text-blue-600',    icon: Clock          },
  'Completed':   { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: CheckCircle    },
  'At risk':     { bg: 'bg-amber-50',   text: 'text-amber-600',   icon: AlertTriangle  },
  'Overdue':     { bg: 'bg-rose-50',    text: 'text-rose-600',    icon: AlertTriangle  },
};

function StatusBadge({ status }) {
  const s = STATUS_STYLE[status] || STATUS_STYLE['In progress'];
  const Icon = s.icon;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.text}`}>
      <Icon size={12} />
      {status}
    </span>
  );
}

function progressColor(pct) {
  if (pct >= 100) return 'bg-emerald-500';
  if (pct >= 70) return 'bg-blue-500';
  if (pct >= 40) return 'bg-amber-500';
  return 'bg-gray-400';
}

function daysUntil(deadline) {
  const now = new Date();
  const dl = new Date(deadline);
  const diff = Math.ceil((dl - now) / (1000 * 60 * 60 * 24));
  if (diff < 0) return `${Math.abs(diff)} days overdue`;
  if (diff === 0) return 'Due today';
  return `${diff} days left`;
}

// ─── Main Component ─────────────────────────────────────────────────────────────
export default function GoalsPage() {
  const [goals, setGoals] = useState(() => {
    const saved = localStorage.getItem('finebank_goals');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('finebank_goals', JSON.stringify(INITIAL_GOALS));
    return INITIAL_GOALS;
  });

  const [isGoalModalOpen, setIsGoalModalOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);

  const [isContribModalOpen, setIsContribModalOpen] = useState(false);
  const [contributingGoal, setContributingGoal] = useState(null);

  const [expandedGoal, setExpandedGoal] = useState(null);

  const [filterStatus, setFilterStatus] = useState('all');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    localStorage.setItem('finebank_goals', JSON.stringify(goals));
  }, [goals]);

  // ── Enrich goals ───────────────────────────────────────────────────────────────
  const enrichedGoals = useMemo(() => {
    return goals.map((g) => {
      const remaining = g.targetAmount - g.savedAmount;
      const progress = g.targetAmount > 0 ? (g.savedAmount / g.targetAmount) * 100 : 0;
      const status = computeStatus(g);
      return { ...g, remaining, progress, status };
    });
  }, [goals]);

  // ── Filter ─────────────────────────────────────────────────────────────────────
  const filteredGoals = enrichedGoals.filter((g) => {
    if (filterStatus !== 'all' && g.status !== filterStatus) return false;
    return true;
  });

  // ── Summary cards ──────────────────────────────────────────────────────────────
  const totalTarget = enrichedGoals.reduce((s, g) => s + g.targetAmount, 0);
  const totalSaved = enrichedGoals.reduce((s, g) => s + g.savedAmount, 0);
  const totalRemaining = totalTarget - totalSaved;
  const completedCount = enrichedGoals.filter((g) => g.status === 'Completed').length;

  // ── Handlers ───────────────────────────────────────────────────────────────────
  const handleSaveGoal = (goal) => {
    if (editingGoal) {
      setGoals((prev) => prev.map((g) => (g.id === goal.id ? goal : g)));
    } else {
      setGoals((prev) => [...prev, goal]);
    }
    setIsGoalModalOpen(false);
    setEditingGoal(null);
  };

  const handleDeleteGoal = (id) => {
    if (confirm('Are you sure you want to delete this goal?')) {
      setGoals((prev) => prev.filter((g) => g.id !== id));
      if (expandedGoal === id) setExpandedGoal(null);
    }
  };

  const openEdit = (goal) => {
    setEditingGoal(goal);
    setIsGoalModalOpen(true);
  };

  const openContribution = (goal) => {
    setContributingGoal(goal);
    setIsContribModalOpen(true);
  };

  const handleContribution = (contribution) => {
    if (!contributingGoal) return;
    setGoals((prev) =>
      prev.map((g) => {
        if (g.id !== contributingGoal.id) return g;
        return {
          ...g,
          savedAmount: g.savedAmount + contribution.amount,
          contributions: [...(g.contributions || []), contribution],
        };
      })
    );
    setIsContribModalOpen(false);
    setContributingGoal(null);
  };

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Saving Goals</h1>
          <p className="text-sm text-gray-500 mt-1">Track your progress towards financial goals</p>
        </div>
        <button
          onClick={() => {
            setEditingGoal(null);
            setIsGoalModalOpen(true);
          }}
          className="flex items-center gap-2 bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-[#299D91]/20 w-full sm:w-auto justify-center"
        >
          <Plus size={18} />
          Create Goal
        </button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
            <Target className="text-blue-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Target</p>
            <h3 className="text-2xl font-bold text-gray-900">${totalTarget.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
            <PiggyBank className="text-emerald-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Total Saved</p>
            <h3 className="text-2xl font-bold text-emerald-600">${totalSaved.toFixed(2)}</h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 flex items-center justify-center">
            <DollarSign className="text-amber-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Remaining</p>
            <h3 className={`text-2xl font-bold ${totalRemaining > 0 ? 'text-gray-900' : 'text-emerald-600'}`}>
              ${Math.max(totalRemaining, 0).toFixed(2)}
            </h3>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-violet-50 flex items-center justify-center">
            <CheckCircle className="text-violet-500" size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-500">Completed</p>
            <h3 className="text-2xl font-bold text-gray-900">
              {completedCount}<span className="text-base font-medium text-gray-400">/{enrichedGoals.length}</span>
            </h3>
          </div>
        </div>
      </div>

      {/* Goals List */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-medium transition-colors ${
              showFilters ? 'bg-[#299D91]/10 text-[#299D91]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'
            }`}
          >
            <Filter size={16} />
            Filters
            <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
          </button>
          <p className="text-sm text-gray-500">
            {filteredGoals.length} goal{filteredGoals.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-5 border-b border-gray-100 bg-gray-50/50">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] min-w-[180px]"
            >
              <option value="all">All Statuses</option>
              {GOAL_STATUSES.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        {/* Goal Cards */}
        {filteredGoals.length === 0 ? (
          <div className="py-16 flex flex-col items-center justify-center text-gray-400">
            <Search size={40} className="mb-4 text-gray-200" />
            <p>No goals found.</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-50">
            {filteredGoals.map((goal) => {
              const cfg = CATEGORY_CONFIG[goal.category] || CATEGORY_CONFIG['Other'];
              const Icon = cfg.icon;
              const pct = Math.min(goal.progress, 100);
              const isExpanded = expandedGoal === goal.id;
              const isCompleted = goal.status === 'Completed';

              return (
                <div key={goal.id}>
                  {/* Main Card Row */}
                  <div className="p-5 hover:bg-gray-50/40 transition-colors">
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`w-12 h-12 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                        <Icon size={22} className={cfg.text} />
                      </div>

                      {/* Content */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-3 mb-2">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-800">{goal.name}</h4>
                            <div className="flex items-center gap-2 mt-1">
                              <StatusBadge status={goal.status} />
                              <span className="text-xs text-gray-400 flex items-center gap-1">
                                <CalendarDays size={11} />
                                {daysUntil(goal.deadline)}
                              </span>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-1 flex-shrink-0">
                            {!isCompleted && (
                              <button
                                onClick={() => openContribution(goal)}
                                className="px-3 py-1.5 text-xs font-semibold text-[#299D91] bg-[#299D91]/10 hover:bg-[#299D91]/20 rounded-lg transition-colors"
                              >
                                + Add Money
                              </button>
                            )}
                            <button
                              onClick={() => openEdit(goal)}
                              className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors"
                            >
                              <Edit size={16} />
                            </button>
                            <button
                              onClick={() => handleDeleteGoal(goal.id)}
                              className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors"
                            >
                              <Trash2 size={16} />
                            </button>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden mb-2">
                          <div
                            className={`h-full rounded-full transition-all duration-700 ease-out ${progressColor(goal.progress)}`}
                            style={{ width: `${pct}%` }}
                          />
                        </div>

                        {/* Amounts */}
                        <div className="flex items-center justify-between text-sm">
                          <div>
                            <span className="font-bold text-gray-900">${goal.savedAmount.toFixed(2)}</span>
                            <span className="text-gray-400"> / ${goal.targetAmount.toFixed(2)}</span>
                          </div>
                          <span className="text-xs font-semibold text-gray-500">{goal.progress.toFixed(1)}%</span>
                        </div>

                        {/* Note */}
                        {goal.note && (
                          <p className="text-xs text-gray-400 mt-1.5 truncate">{goal.note}</p>
                        )}

                        {/* Expand contributions */}
                        {goal.contributions && goal.contributions.length > 0 && (
                          <button
                            onClick={() => setExpandedGoal(isExpanded ? null : goal.id)}
                            className="mt-3 flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-[#299D91] transition-colors"
                          >
                            <ChevronRight size={14} className={`transition-transform ${isExpanded ? 'rotate-90' : ''}`} />
                            {goal.contributions.length} contribution{goal.contributions.length !== 1 ? 's' : ''}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Contributions Table (expanded) */}
                  {isExpanded && goal.contributions && (
                    <div className="bg-gray-50/60 px-5 pb-4 pl-[76px]">
                      <div className="border border-gray-100 rounded-xl overflow-hidden bg-white">
                        <div className="grid grid-cols-[1fr_1fr_2fr] gap-4 px-4 py-2.5 bg-gray-50/80 border-b border-gray-100">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</p>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</p>
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</p>
                        </div>
                        {[...goal.contributions].sort((a, b) => new Date(b.date) - new Date(a.date)).map((c) => (
                          <div key={c.id} className="grid grid-cols-[1fr_1fr_2fr] gap-4 px-4 py-2.5 border-b border-gray-50 last:border-0">
                            <p className="text-sm text-gray-600">{c.date}</p>
                            <p className="text-sm font-semibold text-emerald-600 text-right">+${c.amount.toFixed(2)}</p>
                            <p className="text-sm text-gray-500 truncate">{c.note || '-'}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modals */}
      <GoalModal
        isOpen={isGoalModalOpen}
        onClose={() => {
          setIsGoalModalOpen(false);
          setEditingGoal(null);
        }}
        onSave={handleSaveGoal}
        initialData={editingGoal}
      />

      <ContributionModal
        isOpen={isContribModalOpen}
        onClose={() => {
          setIsContribModalOpen(false);
          setContributingGoal(null);
        }}
        onSave={handleContribution}
        goalName={contributingGoal?.name || ''}
      />
    </div>
  );
}
