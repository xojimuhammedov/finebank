import { mockBills } from '@/data/mockData'

// ─── Brand Logos (SVG inline) ─────────────────────────────────────────────────
function BrandLogo({ logo }) {
  if (logo === 'figma') {
    return (
      <div className="flex items-center gap-2.5 w-28">
        {/* Figma-style icon */}
        <div className="flex-shrink-0 w-8 h-10 relative">
          <div className="absolute top-0 left-0 w-4 h-4 rounded-tl-full rounded-tr-full rounded-bl-full bg-[#F24E1E]" />
          <div className="absolute top-0 right-0 w-4 h-4 rounded-tr-full rounded-br-full bg-[#FF7262]" />
          <div className="absolute top-3 left-0 w-4 h-4 rounded-full bg-[#1ABCFE]" />
          <div className="absolute bottom-0 left-0 w-4 h-4 rounded-bl-full rounded-br-full rounded-tr-full bg-[#0ACF83]" />
          <div className="absolute bottom-3 right-0 w-4 h-4 rounded-tr-full rounded-br-full bg-[#A259FF]" />
        </div>
        <span className="text-base font-semibold text-gray-800">Figma</span>
      </div>
    )
  }
  if (logo === 'adobe') {
    return (
      <div className="flex items-center gap-2.5 w-28">
        <div className="flex-shrink-0 w-8 h-8 bg-[#FA0F00] flex items-center justify-center rounded">
          <svg viewBox="0 0 24 24" width="18" height="18" fill="white">
            <path d="M13.966 22.624l-1.69-4.281H7.467l3.494-9.141 5.966 13.422zM.674 0l7.859 22.624H3.698L.6 13.564H.3L0 0zM23.326 0l-.3 13.564h-.3l-3.097 9.06H15.67L23.326 0z" />
          </svg>
        </div>
        <span className="text-base font-semibold text-gray-800">Adobe</span>
      </div>
    )
  }
  if (logo === 'notion') {
    return (
      <div className="flex items-center gap-2.5 w-28">
        <div className="flex-shrink-0 w-8 h-8 bg-black flex items-center justify-center rounded">
          <span className="text-white font-bold text-sm">N</span>
        </div>
        <span className="text-base font-semibold text-gray-800">Notion</span>
      </div>
    )
  }
  if (logo === 'slack') {
    return (
      <div className="flex items-center gap-2.5 w-28">
        <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center">
          <svg viewBox="0 0 24 24" width="28" height="28">
            <path fill="#E01E5A" d="M5.042 15.165a2.528 2.528 0 0 1-2.52 2.523A2.528 2.528 0 0 1 0 15.165a2.527 2.527 0 0 1 2.522-2.52h2.52v2.52z"/>
            <path fill="#E01E5A" d="M6.313 15.165a2.527 2.527 0 0 1 2.521-2.52 2.527 2.527 0 0 1 2.521 2.52v6.313A2.528 2.528 0 0 1 8.834 24a2.528 2.528 0 0 1-2.521-2.522v-6.313z"/>
            <path fill="#36C5F0" d="M8.834 5.042a2.528 2.528 0 0 1-2.521-2.52A2.528 2.528 0 0 1 8.834 0a2.528 2.528 0 0 1 2.521 2.522v2.52H8.834z"/>
            <path fill="#36C5F0" d="M8.834 6.313a2.528 2.528 0 0 1 2.521 2.521 2.528 2.528 0 0 1-2.521 2.521H2.522A2.528 2.528 0 0 1 0 8.834a2.528 2.528 0 0 1 2.522-2.521h6.312z"/>
            <path fill="#2EB67D" d="M18.956 8.834a2.528 2.528 0 0 1 2.522-2.521A2.528 2.528 0 0 1 24 8.834a2.528 2.528 0 0 1-2.522 2.521h-2.522V8.834z"/>
            <path fill="#2EB67D" d="M17.688 8.834a2.528 2.528 0 0 1-2.523 2.521 2.527 2.527 0 0 1-2.52-2.521V2.522A2.527 2.527 0 0 1 15.165 0a2.528 2.528 0 0 1 2.523 2.522v6.312z"/>
            <path fill="#ECB22E" d="M15.165 18.956a2.528 2.528 0 0 1 2.523 2.522A2.528 2.528 0 0 1 15.165 24a2.527 2.527 0 0 1-2.52-2.522v-2.522h2.52z"/>
            <path fill="#ECB22E" d="M15.165 17.688a2.527 2.527 0 0 1-2.52-2.523 2.526 2.526 0 0 1 2.52-2.52h6.313A2.527 2.527 0 0 1 24 15.165a2.528 2.528 0 0 1-2.522 2.523h-6.313z"/>
          </svg>
        </div>
        <span className="text-base font-semibold text-gray-800">Slack</span>
      </div>
    )
  }
  if (logo === 'aws') {
    return (
      <div className="flex items-center gap-2.5 w-28">
        <div className="flex-shrink-0 w-8 h-8 bg-[#FF9900] flex items-center justify-center rounded">
          <span className="text-white font-bold text-xs">AWS</span>
        </div>
        <span className="text-base font-semibold text-gray-800">AWS</span>
      </div>
    )
  }
  return (
    <div className="w-28 flex items-center gap-2">
      <div className="w-8 h-8 rounded bg-gray-200" />
      <span className="text-sm text-gray-600">{logo}</span>
    </div>
  )
}

// ─── Bills Page ───────────────────────────────────────────────────────────────
export default function BillsPage() {
  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-xl font-bold text-gray-800 mb-6">Upcoming Bills</h1>

      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Table header */}
        <div className="grid grid-cols-[100px_140px_1fr_160px_120px] px-6 py-4 border-b border-gray-100">
          <p className="text-sm font-semibold text-gray-800">Due Date</p>
          <p className="text-sm font-semibold text-gray-800">Logo</p>
          <p className="text-sm font-semibold text-gray-800">Item Description</p>
          <p className="text-sm font-semibold text-gray-800">Last Charge</p>
          <p className="text-sm font-semibold text-gray-800 text-right">Amount</p>
        </div>

        {/* Rows */}
        {mockBills.map((bill, idx) => (
          <div
            key={bill.id}
            className={`grid grid-cols-[100px_140px_1fr_160px_120px] px-6 py-5 items-center ${
              idx !== mockBills.length - 1 ? 'border-b border-gray-100' : ''
            } hover:bg-gray-50/60 transition-colors`}
          >
            {/* Due Date box */}
            <div className="border border-gray-200 rounded-xl w-14 text-center py-1.5 flex-shrink-0">
              <p className="text-xs text-gray-500 leading-tight">{bill.dueMonth}</p>
              <p className="text-xl font-bold text-gray-900 leading-tight">{bill.dueDay}</p>
            </div>

            {/* Logo */}
            <BrandLogo logo={bill.logo} />

            {/* Description */}
            <div className="pr-6">
              <p className="text-sm font-bold text-gray-900 mb-1">{bill.title}</p>
              <p className="text-xs text-gray-400 leading-relaxed line-clamp-3">{bill.description}</p>
            </div>

            {/* Last Charge */}
            <p className="text-sm text-gray-600">{bill.lastCharge}</p>

            {/* Amount */}
            <div className="flex justify-end">
              <span className="border border-gray-200 rounded-lg px-3 py-1.5 text-sm font-bold text-gray-900 min-w-[60px] text-center">
                ${bill.amount}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
