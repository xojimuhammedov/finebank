import { useState } from 'react'
import { ArrowLeft, Pencil, ChevronDown, Plus, Settings2 } from 'lucide-react'
import { mockAccounts, mockAccountTransactions } from '@/data/mockData'

// ─── Helpers ─────────────────────────────────────────────────────────────────
const PAGE_SIZE = 4

function fmt(amount) {
  const abs = Math.abs(amount)
  const str = abs.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  return amount < 0 ? `-${str}` : str
}

function fmtDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}

const typeLabel = {
  checking: 'Checking',
  savings:  'Savings',
  invest:   'Investment',
  credit:   'Credit Card',
  loan:     'Loan',
}

// ─── Card Brand Logo ──────────────────────────────────────────────────────────
function CardBrandLogo({ brand }) {
  if (brand === 'mastercard') {
    return (
      <div className="flex items-center gap-0.5 flex-shrink-0">
        <div className="w-5 h-5 rounded-full bg-red-500 opacity-90" />
        <div className="w-5 h-5 rounded-full bg-yellow-400 opacity-90 -ml-2.5" />
      </div>
    )
  }
  if (brand === 'visa') {
    return (
      <span className="text-[#1a1f71] font-bold text-base italic tracking-tight leading-none">
        VISA
      </span>
    )
  }
  return null
}

// ─── Account Grid Card ────────────────────────────────────────────────────────
function AccountGridCard({ account, onDetails }) {
  const [removed, setRemoved] = useState(false)

  if (removed) return null

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col gap-4 hover:shadow-md transition-shadow duration-200">
      {/* Top row: account name + bank + logo */}
      <div className="flex items-start justify-between gap-2">
        <span className="text-sm font-semibold text-gray-800">{account.name}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-gray-400">{account.bankName}</span>
          {account.cardBrand && <CardBrandLogo brand={account.cardBrand} />}
        </div>
      </div>

      {/* Account number */}
      <div>
        <p className="text-lg font-bold text-gray-900 tracking-wide leading-tight">
          {account.accountNumber}
        </p>
        <p className="text-xs text-gray-400 mt-1">Account Number</p>
      </div>

      {/* Balance */}
      <div>
        <p className="text-xl font-bold text-gray-900">
          ${account.balance.toLocaleString('en-US', { minimumFractionDigits: 0 })}
        </p>
        <p className="text-xs text-gray-400 mt-0.5">Total amount</p>
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between pt-1 border-t border-gray-100">
        <button
          onClick={() => setRemoved(true)}
          className="text-sm font-medium text-[#299D91] hover:text-[#1f7a70] transition-colors"
        >
          Remove
        </button>
        <button
          onClick={() => onDetails(account)}
          className="flex items-center gap-1.5 bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-4 py-1.5 rounded-lg transition-colors"
        >
          Details
          <span className="text-white/80">›</span>
        </button>
      </div>
    </div>
  )
}

// ─── Add Accounts Card ────────────────────────────────────────────────────────
function AddAccountsCard() {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 flex flex-col items-center justify-center gap-3 min-h-[220px]">
      <button className="flex items-center gap-2 bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors">
        <Plus size={16} />
        Add Accounts
      </button>
      <button className="flex items-center gap-2 text-sm text-gray-400 hover:text-gray-600 transition-colors">
        <Settings2 size={14} />
        Edit Accounts
      </button>
    </div>
  )
}

// ─── Account Detail View ──────────────────────────────────────────────────────
function AccountDetail({ account, onBack }) {
  const allTxs = mockAccountTransactions[account.id] ?? []
  const [page,  setPage]  = useState(1)
  const [saved, setSaved] = useState(false)

  const visible = allTxs.slice(0, page * PAGE_SIZE)
  const hasMore = visible.length < allTxs.length

  const handleEdit = () => {
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Back */}
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-[#299D91] transition-colors w-fit"
      >
        <ArrowLeft size={16} />
        Back to Balances
      </button>

      {/* Account Details card */}
      <section>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Account Details</h2>
        <div className="bg-white rounded-2xl shadow-sm p-6">
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-10 gap-y-5 mb-6">
            <div>
              <p className="text-xs text-gray-400 mb-1">Bank Name</p>
              <p className="text-sm font-bold text-gray-900">{account.bankName}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Account Type</p>
              <p className="text-sm font-bold text-gray-900">{typeLabel[account.type] ?? account.type}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Balance</p>
              <p className="text-sm font-bold text-gray-900">
                {account.balance.toLocaleString('en-US', { style: 'currency', currency: account.currency })}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-1">Branch Name</p>
              <p className="text-sm font-bold text-gray-900">{account.branchName}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs text-gray-400 mb-1">Account Number</p>
              <p className="text-sm font-bold text-gray-900 tracking-widest">{account.accountNumber}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 pt-3 border-t border-gray-100">
            <button
              onClick={handleEdit}
              className="flex items-center gap-2 bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
            >
              <Pencil size={13} />
              Edit Details
            </button>
            <button className="text-sm font-medium text-gray-500 hover:text-red-500 transition-colors px-2 py-2">
              Remove
            </button>
            {saved && (
              <span className="text-sm text-emerald-600 font-medium">✓ Details updated!</span>
            )}
          </div>
        </div>
      </section>

      {/* Transactions History */}
      <section>
        <h2 className="text-base font-semibold text-gray-700 mb-3">Transactions History</h2>
        <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
          {allTxs.length === 0 ? (
            <div className="py-12 text-center text-sm text-gray-400">
              No transactions found for this account.
            </div>
          ) : (
            <>
              {/* Header */}
              <div className="grid grid-cols-5 px-6 py-3.5 border-b border-gray-100">
                {['Date', 'Status', 'Transaction Type', 'Receipt', 'Amount'].map((h) => (
                  <p key={h} className="text-sm font-semibold text-gray-800">{h}</p>
                ))}
              </div>

              {/* Rows */}
              {visible.map((tx) => (
                <div
                  key={tx.id}
                  className="grid grid-cols-5 px-6 py-4 border-b border-gray-50 last:border-0 hover:bg-gray-50/60 transition-colors"
                >
                  <p className="text-sm text-gray-600">{fmtDate(tx.date)}</p>
                  <p className="text-sm text-gray-600">{tx.status}</p>
                  <p className="text-sm text-gray-600">{tx.type}</p>
                  <p className="text-sm text-gray-500 font-mono">{tx.receipt}</p>
                  <p className={`text-sm font-bold ${tx.amount >= 0 ? 'text-gray-900' : 'text-gray-900'}`}>
                    {tx.amount >= 0
                      ? `$${tx.amount.toFixed(2)}`
                      : `-$${Math.abs(tx.amount).toFixed(2)}`}
                  </p>
                </div>
              ))}

              {/* Load More */}
              {hasMore && (
                <div className="flex justify-center py-5 border-t border-gray-100">
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-10 py-2.5 rounded-xl transition-colors flex items-center gap-2"
                  >
                    Load More
                    <ChevronDown size={15} />
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────
export default function BalancesPage() {
  const [selected, setSelected] = useState(null)

  return (
    <div className="p-8">
      {selected ? (
        <div className="max-w-7xl mx-auto">
          <AccountDetail account={selected} onBack={() => setSelected(null)} />
        </div>
      ) : (
        <>
          <h1 className="text-xl font-bold text-gray-800 mb-6">Balances</h1>

          {/* 3-column grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {mockAccounts.map((acc) => (
              <AccountGridCard key={acc.id} account={acc} onDetails={setSelected} />
            ))}
            <AddAccountsCard />
          </div>
        </>
      )}
    </div>
  )
}
