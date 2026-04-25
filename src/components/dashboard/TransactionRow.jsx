const categoryColors = {
  Entertainment: { bg: 'bg-purple-100', text: 'text-purple-700' },
  Income:        { bg: 'bg-emerald-100', text: 'text-emerald-700' },
  Food:          { bg: 'bg-orange-100',  text: 'text-orange-700' },
  Utilities:     { bg: 'bg-blue-100',    text: 'text-blue-700'   },
  Shopping:      { bg: 'bg-pink-100',    text: 'text-pink-700'   },
}

const statusColors = {
  completed: { dot: 'bg-emerald-500', text: 'text-emerald-600', label: 'Completed' },
  pending:   { dot: 'bg-amber-400',   text: 'text-amber-600',   label: 'Pending'   },
}

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

export function TransactionRow({ tx }) {
  const cat    = categoryColors[tx.category] ?? { bg: 'bg-gray-100', text: 'text-gray-600' }
  const status = statusColors[tx.status] ?? statusColors.completed
  const isIncome = tx.amount > 0

  return (
    <div className="flex items-center gap-4 py-3.5 px-1 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 rounded-xl transition-colors -mx-1 px-2">
      {/* Category badge */}
      <span className={`hidden sm:inline-flex text-xs font-medium px-2.5 py-1 rounded-lg flex-shrink-0 ${cat.bg} ${cat.text}`}>
        {tx.category}
      </span>

      {/* Description + date */}
      <div className="flex-1 min-w-0">
        <p className="text-sm font-medium text-gray-900 truncate">{tx.description}</p>
        <p className="text-xs text-gray-400 mt-0.5">{formatDate(tx.date)}</p>
      </div>

      {/* Status */}
      <div className="hidden md:flex items-center gap-1.5 flex-shrink-0">
        <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
        <span className={`text-xs font-medium ${status.text}`}>{status.label}</span>
      </div>

      {/* Amount */}
      <p className={`text-sm font-semibold flex-shrink-0 ${isIncome ? 'text-emerald-600' : 'text-gray-900'}`}>
        {isIncome ? '+' : ''}{tx.amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}
      </p>
    </div>
  )
}
