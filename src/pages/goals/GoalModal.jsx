import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { GOAL_CATEGORIES } from './constants';

export default function GoalModal({ isOpen, onClose, onSave, initialData }) {
  const [formData, setFormData] = useState({
    name: '',
    category: GOAL_CATEGORIES[0],
    targetAmount: '',
    deadline: '',
    note: '',
  });

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setFormData({
          name: initialData.name,
          category: initialData.category,
          targetAmount: initialData.targetAmount,
          deadline: initialData.deadline,
          note: initialData.note || '',
        });
      } else {
        setFormData({
          name: '',
          category: GOAL_CATEGORIES[0],
          targetAmount: '',
          deadline: '',
          note: '',
        });
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: initialData?.id || crypto.randomUUID(),
      name: formData.name,
      category: formData.category,
      targetAmount: parseFloat(formData.targetAmount) || 0,
      savedAmount: initialData?.savedAmount || 0,
      deadline: formData.deadline,
      note: formData.note,
      contributions: initialData?.contributions || [],
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-5">
          <h2 className="text-xl font-bold text-gray-800">
            {initialData ? 'Edit Goal' : 'Create Goal'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Goal Name */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Goal Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="e.g. New Laptop"
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
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm bg-white"
            >
              {GOAL_CATEGORIES.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>

          {/* Target Amount */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Target Amount ($)</label>
            <input
              type="number"
              name="targetAmount"
              value={formData.targetAmount}
              onChange={handleChange}
              required
              min="1"
              step="0.01"
              placeholder="0.00"
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
            />
          </div>

          {/* Deadline */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Deadline</label>
            <input
              type="date"
              name="deadline"
              value={formData.deadline}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
            />
          </div>

          {/* Note */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Note (optional)</label>
            <textarea
              name="note"
              value={formData.note}
              onChange={handleChange}
              placeholder="Add a description..."
              rows={2}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm resize-none"
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
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#299D91] hover:bg-[#1f7a70] rounded-xl transition-colors shadow-sm shadow-[#299D91]/20"
            >
              {initialData ? 'Save Changes' : 'Create Goal'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
