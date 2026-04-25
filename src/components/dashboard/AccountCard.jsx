const typeIcons = {
  checking: '💳',
  savings:  '🏦',
  invest:   '📈',
}

export function AccountCard({ account }) {
  return (
    <div
      className="relative rounded-2xl p-5 text-white overflow-hidden flex flex-col gap-3 min-h-[140px]"
      style={{ background: `linear-gradient(135deg, ${account.color}dd, ${account.color}99)` }}
    >
      {/* Background decorative circles */}
      <div className="absolute -top-6 -right-6 w-28 h-28 rounded-full bg-white/10" />
      <div className="absolute -bottom-4 -right-2 w-20 h-20 rounded-full bg-white/10" />

      <div className="flex items-start justify-between relative z-10">
        <div>
          <p className="text-xs font-medium text-white/70 uppercase tracking-wider">{account.type}</p>
          <p className="text-base font-semibold mt-0.5">{account.name}</p>
        </div>
        <span className="text-2xl">{typeIcons[account.type] ?? '💳'}</span>
      </div>

      <div className="relative z-10">
        <p className="text-2xl font-bold tracking-tight">
          {account.balance.toLocaleString('en-US', { style: 'currency', currency: account.currency })}
        </p>
        <p className="text-xs text-white/60 mt-1">•••• •••• •••• {account.lastFour}</p>
      </div>
    </div>
  )
}
