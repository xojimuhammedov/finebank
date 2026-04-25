import { NavLink, useNavigate } from 'react-router-dom'
import {
  LayoutGrid,
  CreditCard,
  ArrowLeftRight,
  Receipt,
  PieChart,
  Target,
  Settings,
  LogOut,
  MoreVertical,
} from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { FinebankLogoWhite } from '@/components/FinebankLogoWhite'

const navItems = [
  { to: '/dashboard',    label: 'Overview',      icon: LayoutGrid       },
  { to: '/balances',     label: 'Balances',       icon: CreditCard       },
  { to: '/transactions', label: 'Transactions',   icon: ArrowLeftRight   },
  { to: '/bills',        label: 'Bills',          icon: Receipt          },
  { to: '/expenses',     label: 'Expenses',       icon: PieChart         },
  { to: '/goals',        label: 'Goals',          icon: Target           },
  { to: '/settings',     label: 'Settings',       icon: Settings         },
]

export function Sidebar({ onClose }) {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="flex flex-col h-full w-[200px] bg-[#1a1d23] select-none">
      {/* Logo */}
      <div className="px-6 pt-7 pb-8">
        <FinebankLogoWhite height={16} />
      </div>

      {/* Nav links */}
      <nav className="flex-1 px-4 space-y-0.5 overflow-y-auto">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            end={to === '/dashboard'}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                isActive
                  ? 'bg-[#299D91] text-white'
                  : 'text-[#8b929e] hover:text-white hover:bg-white/5'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <Icon
                  size={18}
                  strokeWidth={1.7}
                  className={isActive ? 'text-white' : 'text-[#8b929e]'}
                />
                {label}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Logout */}
      <div className="px-4 pb-4">
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-[#8b929e] hover:text-white bg-white/5 hover:bg-white/10 transition-all duration-150"
        >
          <LogOut size={18} strokeWidth={1.7} />
          Logout
        </button>
      </div>

      {/* User profile */}
      <div className="mx-3 mb-4 px-3 py-3 rounded-xl bg-white/5 flex items-center gap-2.5">
        <div className="w-9 h-9 rounded-full bg-[#299D91] flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
          {user?.name?.charAt(0) ?? 'U'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-semibold text-white truncate leading-tight">
            {user?.name}
          </p>
          <p className="text-xs text-[#8b929e] truncate leading-tight">View profile</p>
        </div>
        <button className="text-[#8b929e] hover:text-white transition-colors flex-shrink-0">
          <MoreVertical size={16} />
        </button>
      </div>
    </aside>
  )
}
