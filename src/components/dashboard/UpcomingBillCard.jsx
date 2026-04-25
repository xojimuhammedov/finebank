import { ChevronRight } from 'lucide-react';
import { mockBills } from '@/data/mockData';

function BrandLogo({ logo }) {
  if (logo === 'figma') {
    return (
      <div className="flex-shrink-0 w-8 h-10 relative mr-3">
        <div className="absolute top-0 left-0 w-4 h-4 rounded-tl-full rounded-tr-full rounded-bl-full bg-[#F24E1E]" />
        <div className="absolute top-0 right-0 w-4 h-4 rounded-tr-full rounded-br-full bg-[#FF7262]" />
        <div className="absolute top-3 left-0 w-4 h-4 rounded-full bg-[#1ABCFE]" />
        <div className="absolute bottom-0 left-0 w-4 h-4 rounded-bl-full rounded-br-full rounded-tr-full bg-[#0ACF83]" />
        <div className="absolute bottom-3 right-0 w-4 h-4 rounded-tr-full rounded-br-full bg-[#A259FF]" />
      </div>
    );
  }
  if (logo === 'adobe') {
    return (
      <div className="flex-shrink-0 w-8 h-8 bg-[#FA0F00] flex items-center justify-center rounded mr-3">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
          <path d="M13.966 22.624l-1.69-4.281H7.467l3.494-9.141 5.966 13.422zM.674 0l7.859 22.624H3.698L.6 13.564H.3L0 0zM23.326 0l-.3 13.564h-.3l-3.097 9.06H15.67L23.326 0z" />
        </svg>
      </div>
    );
  }
  return <div className="w-8 h-8 rounded bg-gray-200 mr-3" />;
}

export default function UpcomingBillCard() {
  const bills = mockBills.slice(0, 2); // Show only top 2

  return (
    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-4">
      <div className="flex items-center justify-between mb-2">
        <h2 className="text-lg font-bold text-gray-800">Upcoming Bill</h2>
        <button className="text-sm text-gray-400 font-medium hover:text-gray-600 transition-colors flex items-center gap-1">
          View All <ChevronRight size={14} />
        </button>
      </div>

      <div className="flex flex-col gap-3">
        {bills.map((bill) => (
          <div key={bill.id} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-gray-50 rounded-xl w-12 h-12 flex flex-col items-center justify-center border border-gray-100">
                <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">{bill.dueMonth}</span>
                <span className="text-base font-bold text-gray-900 leading-tight">{bill.dueDay}</span>
              </div>
              <div className="flex items-center">
                <BrandLogo logo={bill.logo} />
                <div>
                  <p className="text-sm font-bold text-gray-900">{bill.title}</p>
                  <p className="text-xs text-gray-400 mt-0.5">Last Charge - {bill.lastCharge}</p>
                </div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-900">
              ${bill.amount}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
