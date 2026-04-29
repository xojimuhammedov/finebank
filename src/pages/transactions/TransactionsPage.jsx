import { useState, useEffect } from 'react';
import { 
  TrendingUp, ArrowDownRight, Wallet, Plus, Search, 
  Edit, Trash2, CheckCircle, Clock, XCircle, Filter, ChevronDown
} from 'lucide-react';
import TransactionModal from './TransactionModal';
import { 
  INITIAL_TRANSACTIONS, INCOME_CATEGORIES, EXPENSE_CATEGORIES, ACCOUNTS, STATUSES 
} from './constants';

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState(() => {
    const saved = localStorage.getItem('finebank_transactions');
    if (saved) return JSON.parse(saved);
    localStorage.setItem('finebank_transactions', JSON.stringify(INITIAL_TRANSACTIONS));
    return INITIAL_TRANSACTIONS;
  });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTx, setEditingTx] = useState(null);
  
  const [filters, setFilters] = useState({
    search: '',
    type: 'all',
    category: 'all',
    account: 'all',
    status: 'all',
    dateFrom: '',
    dateTo: ''
  });

  const [showFilters, setShowFilters] = useState(false);

  // Save to local storage whenever transactions change
  useEffect(() => {
    localStorage.setItem('finebank_transactions', JSON.stringify(transactions));
  }, [transactions]);

  // Totals
  const totals = transactions.reduce((acc, tx) => {
    if (tx.status !== 'completed') return acc;
    if (tx.type === 'income') acc.income += tx.amount;
    if (tx.type === 'expense') acc.expense += tx.amount;
    return acc;
  }, { income: 0, expense: 0 });
  const netResult = totals.income - totals.expense;

  // Filter logic
  const filteredTransactions = transactions.filter(tx => {
    if (filters.search && !tx.note.toLowerCase().includes(filters.search.toLowerCase()) && !tx.category.toLowerCase().includes(filters.search.toLowerCase())) return false;
    if (filters.type !== 'all' && tx.type !== filters.type) return false;
    if (filters.category !== 'all' && tx.category !== filters.category) return false;
    if (filters.account !== 'all' && tx.account !== filters.account) return false;
    if (filters.status !== 'all' && tx.status !== filters.status) return false;
    if (filters.dateFrom && tx.date < filters.dateFrom) return false;
    if (filters.dateTo && tx.date > filters.dateTo) return false;
    return true;
  }).sort((a, b) => new Date(b.date) - new Date(a.date));

  // Handlers
  const handleSave = (tx) => {
    if (editingTx) {
      setTransactions(prev => prev.map(t => t.id === tx.id ? tx : t));
    } else {
      setTransactions(prev => [tx, ...prev]);
    }
    setIsModalOpen(false);
    setEditingTx(null);
  };

  const handleDelete = (id) => {
    if (confirm('Are you sure you want to delete this transaction?')) {
      setTransactions(prev => prev.filter(t => t.id !== id));
    }
  };

  const openEdit = (tx) => {
    setEditingTx(tx);
    setIsModalOpen(true);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value,
      // Reset category if type changes
      ...(name === 'type' ? { category: 'all' } : {})
    }));
  };

  const StatusIcon = ({ status }) => {
    if (status === 'completed') return <CheckCircle size={14} className="text-emerald-500" />;
    if (status === 'pending') return <Clock size={14} className="text-amber-500" />;
    return <XCircle size={14} className="text-rose-500" />;
  };

  const categoriesOptions = filters.type === 'income' 
    ? INCOME_CATEGORIES 
    : filters.type === 'expense' 
      ? EXPENSE_CATEGORIES 
      : [...INCOME_CATEGORIES, ...EXPENSE_CATEGORIES];

  return (
    <div className="p-8 max-w-7xl mx-auto space-y-6">
      
      {/* Header & Totals */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Transactions</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 flex items-center justify-center">
              <TrendingUp className="text-emerald-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Income</p>
              <h3 className="text-2xl font-bold text-gray-900">${totals.income.toFixed(2)}</h3>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-rose-50 flex items-center justify-center">
              <ArrowDownRight className="text-rose-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Total Expense</p>
              <h3 className="text-2xl font-bold text-gray-900">${totals.expense.toFixed(2)}</h3>
            </div>
          </div>
          
          <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
              <Wallet className="text-blue-500" size={24} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500">Net Result</p>
              <h3 className={`text-2xl font-bold ${netResult >= 0 ? 'text-gray-900' : 'text-rose-600'}`}>
                ${netResult.toFixed(2)}
              </h3>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        
        {/* Toolbar */}
        <div className="p-5 border-b border-gray-100 flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex-1 flex gap-3 w-full">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
              <input 
                type="text" 
                name="search"
                value={filters.search}
                onChange={handleFilterChange}
                placeholder="Search by note or category..." 
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border-none rounded-xl text-sm focus:ring-2 focus:ring-[#299D91] outline-none"
              />
            </div>
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={`px-4 py-2 flex items-center gap-2 rounded-xl text-sm font-medium transition-colors ${showFilters ? 'bg-[#299D91]/10 text-[#299D91]' : 'bg-gray-50 text-gray-600 hover:bg-gray-100'}`}
            >
              <Filter size={16} />
              Filters
              <ChevronDown size={14} className={`transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>
          </div>
          
          <button 
            onClick={() => {
              setEditingTx(null);
              setIsModalOpen(true);
            }}
            className="flex items-center gap-2 bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-5 py-2.5 rounded-xl transition-colors shadow-sm shadow-[#299D91]/20 w-full sm:w-auto justify-center"
          >
            <Plus size={18} />
            Add Transaction
          </button>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-5 border-b border-gray-100 bg-gray-50/50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <select name="type" value={filters.type} onChange={handleFilterChange} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]">
              <option value="all">All Types</option>
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            
            <select name="category" value={filters.category} onChange={handleFilterChange} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]">
              <option value="all">All Categories</option>
              {categoriesOptions.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
            
            <select name="account" value={filters.account} onChange={handleFilterChange} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]">
              <option value="all">All Accounts</option>
              {ACCOUNTS.map(a => <option key={a} value={a}>{a}</option>)}
            </select>

            <select name="status" value={filters.status} onChange={handleFilterChange} className="px-3 py-2 border border-gray-200 rounded-lg text-sm bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] capitalize">
              <option value="all">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
            </select>

            <div className="flex items-center gap-2">
              <input type="date" name="dateFrom" value={filters.dateFrom} onChange={handleFilterChange} className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]" />
              <span className="text-gray-400">-</span>
              <input type="date" name="dateTo" value={filters.dateTo} onChange={handleFilterChange} className="w-full px-2 py-2 border border-gray-200 rounded-lg text-xs bg-white outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91]" />
            </div>
          </div>
        )}

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 border-b border-gray-100 bg-gray-50/50">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Date</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Category</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Note</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Account</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">Status</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Amount</p>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider text-right">Actions</p>
            </div>

            {filteredTransactions.length === 0 ? (
              <div className="py-16 flex flex-col items-center justify-center text-gray-400">
                <Search size={40} className="mb-4 text-gray-200" />
                <p>No transactions found.</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-50">
                {filteredTransactions.map((tx) => (
                  <div key={tx.id} className="grid grid-cols-[1fr_1.5fr_1.5fr_1fr_1fr_1fr_80px] gap-4 px-6 py-4 items-center hover:bg-gray-50/60 transition-colors">
                    <p className="text-sm text-gray-600">{tx.date}</p>
                    
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 ${tx.type === 'income' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'}`}>
                        {tx.type === 'income' ? <TrendingUp size={16} /> : <ArrowDownRight size={16} />}
                      </div>
                      <span className="text-sm font-medium text-gray-800">{tx.category}</span>
                    </div>

                    <p className="text-sm text-gray-500 truncate" title={tx.note}>{tx.note || '-'}</p>
                    
                    <p className="text-sm text-gray-600">{tx.account}</p>
                    
                    <div className="flex items-center gap-1.5">
                      <StatusIcon status={tx.status} />
                      <span className="text-sm text-gray-600 capitalize">{tx.status}</span>
                    </div>

                    <p className={`text-sm font-bold text-right ${tx.status === 'cancelled' ? 'line-through text-gray-400' : tx.type === 'income' ? 'text-emerald-600' : 'text-gray-900'}`}>
                      {tx.type === 'income' ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
                    </p>

                    <div className="flex items-center justify-end gap-2">
                      <button onClick={() => openEdit(tx)} className="p-1.5 text-gray-400 hover:text-blue-500 hover:bg-blue-50 rounded-lg transition-colors">
                        <Edit size={16} />
                      </button>
                      <button onClick={() => handleDelete(tx.id)} className="p-1.5 text-gray-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <TransactionModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSave={handleSave}
        initialData={editingTx}
      />
    </div>
  );
}
