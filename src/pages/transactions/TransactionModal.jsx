import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useSettings } from '@/context/SettingsContext';
import { STATUSES } from './constants';

export default function TransactionModal({ isOpen, onClose, onSave, initialData }) {
  const { categories, accounts } = useSettings();
  
  const incomeCats = categories.filter(c => c.type === 'income').map(c => c.name);
  const expenseCats = categories.filter(c => c.type === 'expense').map(c => c.name);
  
  // Only show active accounts for new transactions, but include current account for edits even if inactive
  const availableAccounts = accounts.filter(a => a.status === 'active' || (initialData && a.name === initialData.account));

  const [formData, setFormData] = useState({
    type: 'expense',
    date: new Date().toISOString().slice(0, 10),
    category: expenseCats[0] || '',
    account: availableAccounts[0]?.name || '',
    amount: '',
    note: '',
    status: 'completed'
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData(initialData);
      } else {
        setFormData({
          type: 'expense',
          date: new Date().toISOString().slice(0, 10),
          category: expenseCats[0] || '',
          account: availableAccounts[0]?.name || '',
          amount: '',
          note: '',
          status: 'completed'
        });
      }
    }
  }, [isOpen, initialData, expenseCats, availableAccounts]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    setFormData((prev) => {
      const updated = { ...prev, [name]: value };
      
      // Auto-update category list if type changes
      if (name === 'type') {
        updated.category = value === 'income' ? incomeCats[0] : expenseCats[0];
      }
      
      return updated;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      amount: parseFloat(formData.amount) || 0,
      id: formData.id || crypto.randomUUID()
    });
  };

  const currentCategories = formData.type === 'income' ? incomeCats : expenseCats;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Transaction' : 'Add Transaction'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* Type */}
            <div className="col-span-2 flex rounded-lg bg-gray-100 p-1">
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'income' } })}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${formData.type === 'income' ? 'bg-white shadow text-emerald-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => handleChange({ target: { name: 'type', value: 'expense' } })}
                className={`flex-1 py-2 text-sm font-semibold rounded-md transition-colors ${formData.type === 'expense' ? 'bg-white shadow text-rose-600' : 'text-gray-500 hover:text-gray-700'}`}
              >
                Expense
              </button>
            </div>

            {/* Date */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Date</label>
              <input
                type="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
              />
            </div>

            {/* Amount */}
            <div className="space-y-1">
              <label className="text-sm font-medium text-gray-700">Amount</label>
              <input
                type="number"
                name="amount"
                value={formData.amount}
                onChange={handleChange}
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
              />
            </div>

            {/* Category */}
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm bg-white"
              >
                {currentCategories.map(c => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {/* Account */}
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Account</label>
              <select
                name="account"
                value={formData.account}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm bg-white"
              >
                {availableAccounts.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
              </select>
            </div>

            {/* Status */}
            <div className="space-y-1 col-span-2 sm:col-span-1">
              <label className="text-sm font-medium text-gray-700">Status</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm bg-white capitalize"
              >
                {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            {/* Note */}
            <div className="space-y-1 col-span-2">
              <label className="text-sm font-medium text-gray-700">Note</label>
              <input
                type="text"
                name="note"
                value={formData.note}
                onChange={handleChange}
                placeholder="Optional description"
                className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
              />
            </div>
          </div>

          <div className="pt-4 mt-2 border-t border-gray-100 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 rounded-xl transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#299D91] hover:bg-[#1f7a70] rounded-xl transition-colors shadow-sm shadow-[#299D91]/20"
            >
              Save Transaction
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
