import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { EXPENSE_CATEGORIES } from '@/pages/transactions/constants';

export default function BudgetModal({ isOpen, onClose, onSave, initialData, existingCategories, selectedMonth }) {
  const [formData, setFormData] = useState({
    month: selectedMonth || '2026-04',
    category: EXPENSE_CATEGORIES[0],
    limit: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          month: initialData.month,
          category: initialData.category,
          limit: initialData.limit,
        });
      } else {
        // Find first available category that doesn't already have a budget for this month
        const availableCategory = EXPENSE_CATEGORIES.find(
          (c) => !existingCategories.includes(c)
        ) || EXPENSE_CATEGORIES[0];

        setFormData({
          month: selectedMonth || '2026-04',
          category: availableCategory,
          limit: '',
        });
      }
    }
  }, [isOpen, initialData, existingCategories, selectedMonth]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      ...formData,
      limit: parseFloat(formData.limit) || 0,
      id: initialData?.id || crypto.randomUUID(),
    });
  };

  // When editing, only allow the current category. When adding, exclude already-budgeted categories.
  const availableCategories = initialData
    ? EXPENSE_CATEGORIES
    : EXPENSE_CATEGORIES.filter((c) => !existingCategories.includes(c));

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Budget' : 'Create Budget'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors"
          >
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Month */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Month</label>
            <input
              type="month"
              name="month"
              value={formData.month}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
            />
          </div>

          {/* Category */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Category</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              disabled={!!initialData}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm bg-white disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {availableCategories.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            {!initialData && availableCategories.length === 0 && (
              <p className="text-xs text-rose-500 mt-1">
                All categories already have budgets for this month.
              </p>
            )}
          </div>

          {/* Monthly Limit */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Monthly Limit ($)</label>
            <input
              type="number"
              name="limit"
              value={formData.limit}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
            />
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
              disabled={!initialData && availableCategories.length === 0}
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#299D91] hover:bg-[#1f7a70] rounded-xl transition-colors shadow-sm shadow-[#299D91]/20 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {initialData ? 'Save Changes' : 'Create Budget'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
