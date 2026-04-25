import { ChevronDown, ArrowUp, ArrowDown, Home, Utensils, Car, Film, ShoppingBag, Grid } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockMonthlyExpenses, mockExpensesBreakdown } from '@/data/mockData';

const iconMap = {
  home: Home,
  utensils: Utensils,
  car: Car,
  film: Film,
  'shopping-bag': ShoppingBag,
  grid: Grid,
};

function ExpensesComparisonChart() {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 flex flex-col mb-8">
      <div className="flex items-center justify-between mb-8">
        <button className="flex items-center gap-2 text-sm font-bold text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5">
          Monthly Comparison <ChevronDown size={14} />
        </button>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-full bg-[#299D91]" />
            <span className="text-xs text-gray-500 font-medium">This Week</span>
          </div>
          <div className="flex items-center gap-1.5">
            <div className="w-3 h-2 rounded-full bg-gray-200" />
            <span className="text-xs text-gray-500 font-medium">Last Week</span>
          </div>
        </div>
      </div>

      <div className="h-[250px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={mockMonthlyExpenses} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={4} barSize={12}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 11 }} tickFormatter={(val) => val === 0 ? '$0' : `$${val / 1000}k`} ticks={[0, 2000, 10000, 50000, 250000]} />
            <Tooltip cursor={{ fill: 'transparent' }} />
            <Bar dataKey="lastWeek" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
            <Bar dataKey="thisWeek" fill="#299D91" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

function ExpensesBreakdownList() {
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-xl font-bold text-gray-800">Expenses Breakdown</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockExpensesBreakdown.map((item) => {
          const Icon = iconMap[item.icon] || Grid;
          const isUp = item.trend === 'up';
          
          return (
            <div key={item.id} className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col hover:shadow-md transition-shadow">
              <div className="flex items-center justify-between mb-5 bg-gray-50/50 p-3 rounded-xl border border-gray-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-200 flex items-center justify-center text-gray-500">
                    <Icon size={18} />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">{item.category}</p>
                    <p className="text-lg font-bold text-gray-900">${item.amount.toFixed(2)}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <span className="text-sm font-bold text-gray-900">{item.percentage}%</span>
                    {isUp ? (
                      <ArrowUp size={14} className="text-red-500" />
                    ) : (
                      <ArrowDown size={14} className="text-[#299D91]" />
                    )}
                  </div>
                  <p className="text-[10px] text-gray-400 mt-0.5">Compare to last month</p>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                {item.items.map((subItem, idx) => (
                  <div key={idx} className="flex flex-col">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-bold text-gray-800">{subItem.name}</p>
                      <p className="text-sm font-bold text-gray-800">${subItem.amount.toFixed(2)}</p>
                    </div>
                    <div className="flex items-center justify-between mt-0.5">
                      <p className="text-[11px] text-gray-400 invisible">Spacer</p>
                      <p className="text-[11px] text-gray-400">{subItem.date}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function ExpensesPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Expenses Comparison</h1>
      <ExpensesComparisonChart />
      <ExpensesBreakdownList />
    </div>
  )
}
