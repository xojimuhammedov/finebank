import { useState } from 'react'
import {
  Gamepad2, Shirt, UtensilsCrossed, Film, Car,
  Keyboard, Headphones, Coffee, TrendingUp, ChevronDown,
} from 'lucide-react'
import { mockDetailedTransactions } from '@/data/mockData'

// ─── Category Icon ────────────────────────────────────────────────────────────
const categoryIconMap = {
  gaming:        { icon: Gamepad2,        bg: 'bg-purple-50',  color: 'text-purple-500' },
  clothing:      { icon: Shirt,           bg: 'bg-blue-50',    color: 'text-blue-500'   },
  food:          { icon: UtensilsCrossed, bg: 'bg-orange-50',  color: 'text-orange-500' },
  entertainment: { icon: Film,            bg: 'bg-pink-50',    color: 'text-pink-500'   },
  transport:     { icon: Car,             bg: 'bg-yellow-50',  color: 'text-yellow-600' },
  tech:          { icon: Keyboard,        bg: 'bg-gray-100',   color: 'text-gray-500'   },
  income:        { icon: TrendingUp,      bg: 'bg-emerald-50', color: 'text-emerald-500'},
}

function CategoryIcon({ category }) {
  const cfg = categoryIconMap[category] ?? { icon: Coffee, bg: 'bg-gray-100', color: 'text-gray-400' }
  const Icon = cfg.icon
  return (
    <div className={`w-8 h-8 rounded-lg ${cfg.bg} flex items-center justify-center flex-shrink-0`}>
      <Icon size={15} className={cfg.color} />
    </div>
  )
}

// ─── Tabs ─────────────────────────────────────────────────────────────────────
const TABS = ['All', 'Revenue', 'Expenses']
const PAGE_SIZE = 7

// ─── Transactions Page ────────────────────────────────────────────────────────
export default function TransactionsPage() {
  const [activeTab, setActiveTab] = useState('All')
  const [page, setPage] = useState(1)

  const filtered = mockDetailedTransactions.filter((tx) => {
    if (activeTab === 'Revenue')  return tx.type === 'revenue'
    if (activeTab === 'Expenses') return tx.type === 'expense'
    return true
  })

  const visible = filtered.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < filtered.length

  const handleTabChange = (tab) => {
    setActiveTab(tab)
    setPage(1)
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-5">Recent Transaction</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Tabs */}
        <div className="flex border-b border-gray-100 px-6 pt-1">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => handleTabChange(tab)}
              className={`px-4 py-3 text-sm font-semibold transition-all relative ${
                activeTab === tab
                  ? 'text-[#299D91]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#299D91] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Table header */}
        <div className="grid grid-cols-[2fr_1.2fr_1.2fr_1.2fr_100px] px-6 py-4 border-b border-gray-100">
          <p className="text-sm font-bold text-gray-900">Items</p>
          <p className="text-sm font-bold text-gray-900">Shop Name</p>
          <p className="text-sm font-bold text-gray-900">Date</p>
          <p className="text-sm font-bold text-gray-900">Payment Method</p>
          <p className="text-sm font-bold text-gray-900 text-right">Amount</p>
        </div>

        {/* Rows */}
        {visible.length === 0 ? (
          <div className="py-16 text-center text-sm text-gray-400">
            No transactions found.
          </div>
        ) : (
          <>
            {visible.map((tx, idx) => (
              <div
                key={tx.id}
                className={`grid grid-cols-[2fr_1.2fr_1.2fr_1.2fr_100px] px-6 py-4 items-center ${
                  idx !== visible.length - 1 ? 'border-b border-gray-50' : ''
                } hover:bg-gray-50/60 transition-colors`}
              >
                {/* Item: icon + name */}
                <div className="flex items-center gap-3">
                  <CategoryIcon category={tx.category} />
                  <span className="text-sm font-medium text-gray-800">{tx.item}</span>
                </div>

                {/* Shop name */}
                <p className="text-sm text-gray-500">{tx.shopName}</p>

                {/* Date */}
                <p className="text-sm text-gray-500">{tx.date}</p>

                {/* Payment method */}
                <p className="text-sm text-gray-500">{tx.paymentMethod}</p>

                {/* Amount */}
                <p className={`text-sm font-bold text-right ${
                  tx.type === 'revenue' ? 'text-emerald-600' : 'text-gray-900'
                }`}>
                  {tx.type === 'revenue' ? '+' : ''}${tx.amount.toFixed(2)}
                </p>
              </div>
            ))}

            {/* Load More */}
            {hasMore && (
              <div className="flex justify-center py-5 border-t border-gray-100">
                <button
                  onClick={() => setPage((p) => p + 1)}
                  className="flex items-center gap-2 bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-10 py-2.5 rounded-xl transition-colors"
                >
                  Load More
                  <ChevronDown size={15} />
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}
