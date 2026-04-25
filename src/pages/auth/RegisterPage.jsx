import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { FinebankLogo } from '@/components/FinebankLogo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function RegisterPage() {
  const navigate = useNavigate()
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' })
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const set = (field) => (e) => setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!form.name || !form.email || !form.password || !form.confirm) {
      setError('Please fill in all fields.')
      return
    }
    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }
    if (form.password !== form.confirm) {
      setError('Passwords do not match.')
      return
    }
    setLoading(true)
    await new Promise((r) => setTimeout(r, 700))
    setLoading(false)
    // In real app: call API. For now redirect to login.
    navigate('/login?registered=1')
  }

  return (
    <div className="min-h-screen bg-[#f0f2f4] flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] bg-white rounded-3xl shadow-xl px-10 py-12 flex flex-col items-center gap-8">

        <FinebankLogo height={28} />

        <div className="w-full text-center">
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="text-sm text-gray-500 mt-1">Join FINEbank.IO today</p>
        </div>

        <form id="register-form" onSubmit={handleSubmit} className="w-full flex flex-col gap-5">

          <div className="flex flex-col gap-2">
            <label htmlFor="reg-name" className="text-[15px] font-semibold text-gray-900">Full Name</label>
            <Input id="reg-name" type="text" placeholder="John Doe" value={form.name} onChange={set('name')} />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reg-email" className="text-[15px] font-semibold text-gray-900">Email Address</label>
            <Input id="reg-email" type="email" placeholder="johndoe@email.com" value={form.email} onChange={set('email')} autoComplete="email" />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reg-password" className="text-[15px] font-semibold text-gray-900">Password</label>
            <div className="relative">
              <Input
                id="reg-password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={set('password')}
                className="pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="reg-confirm" className="text-[15px] font-semibold text-gray-900">Confirm Password</label>
            <Input
              id="reg-confirm"
              type="password"
              placeholder="Re-enter password"
              value={form.confirm}
              onChange={set('confirm')}
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          <Button type="submit" id="register-button" disabled={loading} className="w-full h-14 text-base rounded-xl mt-1">
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Creating account…
              </span>
            ) : 'Sign Up'}
          </Button>
        </form>

        <p className="text-[14px] text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-[#299D91] font-semibold hover:text-[#1f7a70] transition-colors">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
