import { useState } from 'react';
import { X, DollarSign } from 'lucide-react';

export default function ContributionModal({ isOpen, onClose, onSave, goalName }) {
  const [amount, setAmount] = useState('');
  const [note, setNote] = useState('');
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      id: crypto.randomUUID(),
      amount: parseFloat(amount) || 0,
      date,
      note,
    });
    setAmount('');
    setNote('');
    setDate(new Date().toISOString().slice(0, 10));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6">
        <div className="flex justify-between items-center mb-5">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Add Contribution</h2>
            <p className="text-sm text-gray-500 mt-0.5">{goalName}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Amount */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Amount ($)</label>
            <div className="relative">
              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={16} />
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                required
                min="0.01"
                step="0.01"
                placeholder="0.00"
                className="w-full pl-9 pr-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
              />
            </div>
          </div>

          {/* Date */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Date</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="w-full px-3 py-2 border border-gray-200 rounded-lg outline-none focus:border-[#299D91] focus:ring-1 focus:ring-[#299D91] text-sm"
            />
          </div>

          {/* Note */}
          <div className="space-y-1">
            <label className="text-sm font-medium text-gray-700">Note (optional)</label>
            <input
              type="text"
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="e.g. Monthly saving"
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
              className="px-5 py-2.5 text-sm font-medium text-white bg-[#299D91] hover:bg-[#1f7a70] rounded-xl transition-colors shadow-sm shadow-[#299D91]/20"
            >
              Add Money
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
