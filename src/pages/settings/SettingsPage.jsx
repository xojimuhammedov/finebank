import { useState, useRef } from 'react'
import { useAuth } from '@/context/AuthContext'
import { Camera, Check } from 'lucide-react'

// ── Shared input style ───────────────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-800">{label}</label>
      {children}
    </div>
  )
}

function TextInput({ value, onChange, placeholder, disabled, prefix }) {
  return (
    <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 overflow-hidden focus-within:border-[#299D91] focus-within:ring-2 focus-within:ring-[#299D91]/20 transition-all">
      {prefix && (
        <span className="px-3 py-3 text-sm text-gray-500 border-r border-gray-200 bg-white select-none">
          {prefix}
        </span>
      )}
      <input
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        className="flex-1 px-4 py-3 text-sm text-gray-700 bg-transparent outline-none placeholder:text-gray-400 disabled:opacity-60 disabled:cursor-not-allowed"
      />
    </div>
  )
}

// ── Account Tab ──────────────────────────────────────────────────────────────
function AccountTab() {
  const { user } = useAuth()
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    name:     user?.name    ?? '',
    email:    user?.email   ?? '',
    username: (user?.email ?? '').split('@')[0],
    phone:    user?.phone   ?? '',
    avatar:   null,
  })
  const [preview, setPreview] = useState(null)
  const [saved,   setSaved]   = useState(false)
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setForm((f) => ({ ...f, avatar: file }))
    setPreview(URL.createObjectURL(file))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    // Mock async save
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-6">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left — fields */}
        <div className="flex-1 flex flex-col gap-5">
          <Field label="Full name">
            <TextInput value={form.name} onChange={set('name')} placeholder="John Doe" />
          </Field>

          <Field label="Email">
            <TextInput value={form.email} onChange={set('email')} placeholder="john@email.com" />
          </Field>

          <Field label="Username">
            <TextInput value={form.username} onChange={set('username')} placeholder="johndoe" />
          </Field>

          <Field label="Phone Number">
            <TextInput
              prefix="+1"
              value={form.phone.replace(/^\+1\s?/, '')}
              onChange={(e) => setForm((f) => ({ ...f, phone: '+1 ' + e.target.value }))}
              placeholder="555 234 5678"
            />
          </Field>
        </div>

        {/* Right — avatar */}
        <div className="flex flex-col items-start gap-2 lg:w-44">
          <p className="text-sm font-semibold text-gray-800">Your Profile Picture</p>
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            className="w-36 h-36 rounded-2xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 hover:border-[#299D91] hover:bg-[#f0f9f8] transition-all group overflow-hidden"
          >
            {preview ? (
              <img src={preview} alt="avatar" className="w-full h-full object-cover" />
            ) : (
              <>
                <Camera size={28} className="text-gray-300 group-hover:text-[#299D91] transition-colors" />
                <span className="text-xs text-gray-400 group-hover:text-[#299D91] transition-colors text-center leading-tight">
                  Upload your<br />photo
                </span>
              </>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleFile}
          />
        </div>
      </div>

      {/* Save button */}
      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 disabled:cursor-not-allowed flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Saving…
            </>
          ) : 'Update Profile'}
        </button>

        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
            <Check size={16} />
            Profile updated!
          </span>
        )}
      </div>
    </form>
  )
}

// ── Security Tab ─────────────────────────────────────────────────────────────
function SecurityTab() {
  const [form, setForm]     = useState({ current: '', newPw: '', confirm: '' })
  const [saved, setSaved]   = useState(false)
  const [error, setError]   = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.current || !form.newPw || !form.confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (form.newPw.length < 6) {
      setError('New password must be at least 6 characters.')
      return
    }
    if (form.newPw !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    setSaved(true)
    setForm({ current: '', newPw: '', confirm: '' })
    setTimeout(() => setSaved(false), 3000)
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-md flex flex-col gap-5">
      <Field label="Current Password">
        <TextInput type="password" value={form.current} onChange={set('current')} placeholder="••••••••" />
      </Field>
      <Field label="New Password">
        <TextInput type="password" value={form.newPw} onChange={set('newPw')} placeholder="Min. 6 characters" />
      </Field>
      <Field label="Confirm New Password">
        <TextInput type="password" value={form.confirm} onChange={set('confirm')} placeholder="Re-enter password" />
      </Field>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
          {error}
        </div>
      )}

      <div className="flex items-center gap-4 pt-2">
        <button
          type="submit"
          disabled={loading}
          className="bg-[#299D91] hover:bg-[#1f7a70] text-white text-sm font-semibold px-6 py-2.5 rounded-xl transition-colors disabled:opacity-60 flex items-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
              </svg>
              Saving…
            </>
          ) : 'Update Password'}
        </button>
        {saved && (
          <span className="flex items-center gap-1.5 text-sm text-emerald-600 font-medium">
            <Check size={16} />
            Password changed!
          </span>
        )}
      </div>
    </form>
  )
}

// ── Main Settings Page ───────────────────────────────────────────────────────
const TABS = ['Account', 'Security']

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState('Account')

  return (
    <div className="p-8 max-w-4xl">
      {/* Card */}
      <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
        {/* Tab bar */}
        <div className="flex border-b border-gray-100 px-6 pt-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-3 text-sm font-semibold transition-all relative ${
                activeTab === tab
                  ? 'text-[#299D91]'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
            >
              {tab}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#299D91] rounded-t-full" />
              )}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="p-6">
          {activeTab === 'Account'  && <AccountTab />}
          {activeTab === 'Security' && <SecurityTab />}
        </div>
      </div>
    </div>
  )
}
