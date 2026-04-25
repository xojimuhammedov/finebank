import { ChevronRight, ChevronLeft, ArrowUpRight } from 'lucide-react';

export default function TotalBalanceCard() {
  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-gray-800">Total Balance</h2>
        <span className="text-sm font-semibold text-gray-500">All Accounts</span>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-gray-900">$240,399</span>
      </div>

      <div className="bg-[#299D91] rounded-2xl p-4 flex flex-col gap-4 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-white/80">Account Type</p>
            <p className="text-base font-bold">Credit Card</p>
          </div>
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-red-500 opacity-90" />
            <div className="w-6 h-6 rounded-full bg-yellow-400 opacity-90 -ml-3" />
          </div>
        </div>
        
        <div className="flex items-end justify-between">
          <p className="text-sm font-medium text-white/80 tracking-widest">**** **** **** 2598</p>
          <div className="flex items-center gap-1 font-bold">
            $25000
            <ArrowUpRight size={16} className="bg-white text-[#299D91] rounded-full p-0.5" />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between pt-2">
        <button className="flex items-center gap-1 text-sm font-medium text-gray-400 hover:text-gray-600 transition-colors">
          <ChevronLeft size={16} /> Previous
        </button>
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-[#299D91]"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
          <div className="w-2 h-2 rounded-full bg-gray-200"></div>
        </div>
        <button className="flex items-center gap-1 text-sm font-medium text-gray-800 hover:text-black transition-colors">
          Next <ChevronRight size={16} />
        </button>
      </div>
    </div>
  );
}
