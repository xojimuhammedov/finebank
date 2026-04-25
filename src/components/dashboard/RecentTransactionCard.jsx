import { useState } from 'react';
import { ChevronRight, Gamepad2, Shirt, UtensilsCrossed, Car, Keyboard } from 'lucide-react';
import { mockDetailedTransactions } from '@/data/mockData';

const categoryIconMap = {
  gaming:    { icon: Gamepad2,        bg: 'bg-gray-100',  color: 'text-gray-500' },
  clothing:  { icon: Shirt,           bg: 'bg-gray-100',  color: 'text-gray-500'   },
  food:      { icon: UtensilsCrossed, bg: 'bg-gray-100',  color: 'text-gray-500' },
  transport: { icon: Car,             bg: 'bg-gray-100',  color: 'text-gray-500' },
  tech:      { icon: Keyboard,        bg: 'bg-gray-100',  color: 'text-gray-500'   },
};

function CategoryIcon({ category }) {
  const cfg = categoryIconMap[category] || { icon: Keyboard, bg: 'bg-gray-100', color: 'text-gray-500' };
  const Icon = cfg.icon;
  return (
    <div className={`w-10 h-10 rounded-xl ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={18} className={cfg.color} />
    </div>
  );
}

export default function RecentTransactionCard() {
  const [activeTab, setActiveTab] = useState('All');
  const TABS = ['All', 'Revenue', 'Expenses'];

  const filtered = mockDetailedTransactions
    .filter((tx) => {
      if (activeTab === 'Revenue') return tx.type === 'revenue';
      if (activeTab === 'Expenses') return tx.type === 'expense';
      return true;
    })
    .slice(0, 5); // Show only top 5

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Recent Transaction</h2>
        <button className="text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex gap-6 border-b border-gray-100 mb-4">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`pb-2 text-sm font-semibold transition-all relative ${
              activeTab === tab ? 'text-[#299D91]' : 'text-gray-400 hover:text-gray-600'
            }`}
          >
            {tab}
            {activeTab === tab && (
              <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#299D91] rounded-t-full" />
            )}
          </button>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        {filtered.map((tx) => (
          <div key={tx.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CategoryIcon category={tx.category} />
              <div>
                <p className="text-sm font-bold text-gray-900">{tx.item}</p>
                <p className="text-xs text-gray-400 mt-0.5">{tx.shopName}</p>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-bold text-gray-900">
                ${tx.amount.toFixed(2)}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">{tx.date}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
