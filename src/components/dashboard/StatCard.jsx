import { TrendingUp, TrendingDown, Wallet, ArrowDownCircle, ArrowUpCircle, Target } from 'lucide-react'

const iconMap = {
  wallet:           Wallet,
  'arrow-down-circle': ArrowDownCircle,
  'arrow-up-circle':   ArrowUpCircle,
  target:           Target,
}

const colorMap = {
  up:   { bg: 'bg-emerald-50', text: 'text-emerald-600', icon: TrendingUp },
  down: { bg: 'bg-red-50',     text: 'text-red-500',     icon: TrendingDown },
}

export function StatCard({ stat }) {
  const Icon   = iconMap[stat.icon] ?? Wallet
  const trend  = colorMap[stat.trend]
  const TrendIcon = trend.icon

  return (
    <div className="bg-white rounded-2xl p-5 flex flex-col gap-4 shadow-sm hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="w-11 h-11 rounded-xl bg-[#e6f5f4] flex items-center justify-center">
          <Icon size={20} className="text-[#299D91]" />
        </div>
        <span className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-lg ${trend.bg} ${trend.text}`}>
          <TrendIcon size={13} />
          {stat.change}
        </span>
      </div>
      <div>
        <p className="text-2xl font-bold text-gray-900 tracking-tight">{stat.value}</p>
        <p className="text-sm text-gray-500 mt-0.5">{stat.label}</p>
      </div>
    </div>
  )
}
