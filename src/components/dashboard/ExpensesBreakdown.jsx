import { ArrowRight, ArrowUp, ArrowDown, Home, Utensils, Car, Film, ShoppingBag, Grid } from 'lucide-react';
import { mockExpensesBreakdown } from '@/data/mockData';

const iconMap = {
  home: Home,
  utensils: Utensils,
  car: Car,
  film: Film,
  'shopping-bag': ShoppingBag,
  grid: Grid,
};

export default function ExpensesBreakdown() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4 col-span-full xl:col-span-2">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">Expenses Breakdown</h2>
        <span className="text-xs text-gray-400 font-medium">*Compare to last month</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {mockExpensesBreakdown.map((item) => {
          const Icon = iconMap[item.icon] || Grid;
          const isUp = item.trend === 'up';
          
          return (
            <div key={item.id} className="bg-gray-50/50 rounded-2xl p-4 border border-gray-100 flex items-center justify-between group cursor-pointer hover:border-[#299D91]/30 transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-gray-100 flex items-center justify-center text-gray-500 group-hover:bg-[#299D91]/10 group-hover:text-[#299D91] transition-colors">
                  <Icon size={18} />
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">{item.category}</p>
                  <p className="text-base font-bold text-gray-900">${item.amount.toFixed(2)}</p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <span className="text-xs text-gray-400">{item.percentage}%*</span>
                    {isUp ? (
                      <ArrowUp size={12} className="text-red-500" />
                    ) : (
                      <ArrowDown size={12} className="text-[#299D91]" />
                    )}
                  </div>
                </div>
              </div>
              <ArrowRight size={18} className="text-gray-300 group-hover:text-[#299D91] transition-colors" />
            </div>
          );
        })}
      </div>
    </div>
  );
}
