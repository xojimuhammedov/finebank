import { ChevronDown } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { mockWeeklyStats } from '@/data/mockData';

export default function StatisticsChart() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col h-full">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-bold text-gray-800">Statistics</h2>
      </div>

      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between">
          <button className="flex items-center gap-2 text-sm font-bold text-gray-800 border border-gray-200 rounded-lg px-3 py-1.5">
            Weekly Comparison <ChevronDown size={14} />
          </button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-full bg-[#299D91]" />
              <span className="text-xs text-gray-500 font-medium">This week</span>
            </div>
            <div className="flex items-center gap-1.5">
              <div className="w-3 h-2 rounded-full bg-gray-200" />
              <span className="text-xs text-gray-500 font-medium">Last week</span>
            </div>
          </div>
        </div>

        <div className="h-[200px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={mockWeeklyStats} margin={{ top: 10, right: 0, left: -20, bottom: 0 }} barGap={2} barSize={8}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
              <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} dy={10} />
              <YAxis axisLine={false} tickLine={false} tick={{ fill: '#9CA3AF', fontSize: 10 }} tickFormatter={(val) => val === 0 ? '$0' : `$${val / 1000}k`} ticks={[0, 2000, 10000, 50000, 250000]} />
              <Tooltip cursor={{ fill: 'transparent' }} />
              <Bar dataKey="lastWeek" fill="#E5E7EB" radius={[4, 4, 0, 0]} />
              <Bar dataKey="thisWeek" fill="#299D91" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
