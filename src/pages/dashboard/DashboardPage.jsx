import { useAuth } from '@/context/AuthContext'
import TotalBalanceCard from '@/components/dashboard/TotalBalanceCard'
import GoalsCard from '@/components/dashboard/GoalsCard'
import UpcomingBillCard from '@/components/dashboard/UpcomingBillCard'
import RecentTransactionCard from '@/components/dashboard/RecentTransactionCard'
import StatisticsChart from '@/components/dashboard/StatisticsChart'
import ExpensesBreakdown from '@/components/dashboard/ExpensesBreakdown'

export default function DashboardPage() {
  const { user } = useAuth()

  return (
    <div className="p-8 max-w-7xl mx-auto flex flex-col gap-6">
      <div className="flex items-center justify-between mb-2">
        <h1 className="text-xl font-bold text-gray-900">
          Hello {user?.name?.split(' ')[0] || 'User'}
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="flex flex-col gap-6 lg:col-span-1">
          <TotalBalanceCard />
          <RecentTransactionCard />
        </div>
        
        <div className="flex flex-col gap-6 lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <GoalsCard />
            <UpcomingBillCard />
          </div>
          <StatisticsChart />
        </div>
      </div>

      <ExpensesBreakdown />
    </div>
  )
}
