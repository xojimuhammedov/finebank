import { Pencil, Trophy, Target } from 'lucide-react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Achieved', value: 12500 },
  { name: 'Remaining', value: 7500 },
];
const COLORS = ['#299D91', '#E5E7EB'];

export default function GoalsCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">Goals</h2>
        <span className="text-sm text-gray-500 font-medium">May, 2023</span>
      </div>

      <div className="flex items-center gap-2">
        <span className="text-2xl font-bold text-gray-900">$20,000</span>
        <button className="text-gray-400 hover:text-[#299D91] transition-colors bg-gray-50 p-1.5 rounded-lg border border-gray-100">
          <Pencil size={14} />
        </button>
      </div>

      <div className="flex items-center justify-between mt-2">
        <div className="flex flex-col gap-5">
          <div className="flex gap-3">
            <Trophy size={18} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium">Target Achieved</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">$12,500</p>
            </div>
          </div>
          <div className="flex gap-3">
            <Target size={18} className="text-gray-400 mt-0.5" />
            <div>
              <p className="text-xs text-gray-500 font-medium">This month Target</p>
              <p className="text-sm font-bold text-gray-900 mt-0.5">$20,000</p>
            </div>
          </div>
        </div>

        <div className="w-[120px] h-[100px] flex flex-col items-center justify-end relative">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="100%"
                startAngle={180}
                endAngle={0}
                innerRadius={40}
                outerRadius={55}
                paddingAngle={0}
                dataKey="value"
                stroke="none"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
          <div className="absolute bottom-0 flex flex-col items-center">
            <span className="text-xs text-gray-400 font-medium -mb-1">$0</span>
            <span className="text-sm font-bold text-gray-900">12K</span>
            <span className="text-xs text-gray-400 font-medium -mr-16 -mt-3">$20k</span>
          </div>
        </div>
      </div>
      <p className="text-center text-xs text-gray-500 font-medium mt-2">Target vs Achievement</p>
    </div>
  );
}
