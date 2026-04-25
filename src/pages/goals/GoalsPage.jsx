import { ChevronDown, Trophy, Target, Pencil, Home, Utensils, Car, Film, ShoppingBag, Grid } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { mockSavingSummary } from '@/data/mockData';

const pieData = [
  { name: 'Achieved', value: 12500 },
  { name: 'Remaining', value: 7500 },
];
const PIE_COLORS = ['#299D91', '#E5E7EB'];

const categoryGoals = [
  { id: 1, name: 'Housing', amount: 250, icon: Home },
  { id: 2, name: 'Food', amount: 250, icon: Utensils },
  { id: 3, name: 'Transportation', amount: 250, icon: Car },
  { id: 4, name: 'Entertainment', amount: 250, icon: Film },
  { id: 5, name: 'Shopping', amount: 250, icon: ShoppingBag },
  { id: 6, name: 'Others', amount: 250, icon: Grid },
];

function SavingsGoalCard() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col justify-between h-full">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-bold text-gray-800">Savings Goal</h2>
        <button className="flex items-center gap-2 text-sm font-medium text-gray-500 border border-gray-200 rounded-lg px-3 py-1.5 hover:bg-gray-50">
          01 May - 31 May <ChevronDown size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex flex-col gap-6">
          <div className="flex gap-3">
            <Trophy size={20} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">Target Achieved</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">$12,500</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Target size={20} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-sm text-gray-500 font-medium">This month Target</p>
              <p className="text-lg font-bold text-gray-900 mt-0.5">$20,000</p>
            </div>
          </div>
        </div>

        <div className="w-[160px] h-[130px] flex flex-col items-center justify-end relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={50}
                outerRadius={70}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute bottom-0 flex flex-col items-center">
            <span className="text-xs text-gray-400 font-medium -mb-1">$0</span>
            <span className="text-xl font-bold text-gray-900">12K</span>
            <span className="text-xs text-gray-400 font-medium -mr-20 -mt-3">$20k</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between mt-6">
        <button className="flex items-center justify-center gap-2 text-sm font-medium text-[#299D91] border border-[#299D91] rounded-full px-6 py-2 hover:bg-[#299D91]/5 transition-colors mx-auto">
          Adjust Goal <Pencil size={14} />
        </button>
      </div>
    </div>
  );
}

function SavingSummaryChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <h2 className="text-lg font-bold text-gray-800">Saving Summary</h2>
          <button className="flex items-center gap-1 text-sm font-medium text-gray-500 hover:text-gray-700">
            Mar 2022 <ChevronDown size={14} />
          </button>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-full bg-[#299D91]" />
            <span className="text-xs text-gray-500 font-medium">This month</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-full bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">Same period last month</span>
          </div>
        </div>
      </div>

      <div className="h-[220px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={mockSavingSummary} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <defs>
              <linearGradient id="colorThisMonth" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#299D91" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#299D91" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={(val) => val === 0 ? '$0' : `$${val}`} ticks={[0, 500, 2000, 5000]} />
            <Tooltip />
            <Area type="monotone" dataKey="lastMonth" stroke="#E5E7EB" strokeWidth={2} strokeDasharray="5 5" fill="none" />
            <Area type="monotone" dataKey="thisMonth" stroke="#299D91" strokeWidth={2} fillOpacity={1} fill="url(#colorThisMonth)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ExpensesGoalsByCategory() {
  return (
    <div className="flex flex-col gap-4 mt-8">
      <h2 className="text-xl font-bold text-gray-800 mb-2">Expenses Goals by Category</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categoryGoals.map((cat) => {
          const Icon = cat.icon;
          return (
            <div key={cat.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500">
                  <Icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{cat.name}</p>
                  <p className="text-lg font-bold text-gray-900">${cat.amount.toFixed(2)}</p>
                </div>
              </div>
              <button className="flex items-center gap-1.5 text-sm font-medium text-[#299D91] border border-[#299D91]/30 rounded-full px-4 py-1.5 hover:bg-[#299D91]/5 transition-colors">
                Adjust <Pencil size={12} />
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function GoalsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Goals</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <SavingsGoalCard />
        </div>
        <div className="lg:col-span-2">
          <SavingSummaryChart />
        </div>
      </div>

      <ExpensesGoalsByCategory />
    </div>
  )
}
