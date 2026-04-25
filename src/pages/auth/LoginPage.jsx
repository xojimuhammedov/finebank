import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Eye, EyeOff } from 'lucide-react'
import { useAuth } from '@/context/AuthContext'
import { FinebankLogo } from '@/components/FinebankLogo'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Input'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [keepSignedIn, setKeepSignedIn] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    if (!email || !password) {
      setError('Please fill in all fields.')
      return
    }
    setLoading(true)
    // Simulate a small async delay for realism
    await new Promise((r) => setTimeout(r, 600))
    const result = login(email, password)
    setLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.message)
    }
  }

  return (
    <div className="min-h-screen bg-[#f0f2f4] flex items-center justify-center p-4">
      <div className="w-full max-w-[520px] bg-white rounded-3xl shadow-xl px-10 py-12 flex flex-col items-center gap-8">

        {/* Logo */}
        <FinebankLogo height={28} />

        {/* Form */}
        <form
          id="login-form"
          onSubmit={handleSubmit}
          className="w-full flex flex-col gap-6"
        >
          {/* Email */}
          <div className="flex flex-col gap-2">
            <label htmlFor="email" className="text-[15px] font-semibold text-gray-900">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              placeholder="johndoe@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
            />
          </div>

          {/* Password */}
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="text-[15px] font-semibold text-gray-900">
                Password
              </label>
              <Link
                to="/forgot-password"
                className="text-sm font-medium text-[#299D91] hover:text-[#1f7a70] transition-colors"
              >
                Forgot Password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="pr-12"
              />
              <button
                type="button"
                id="toggle-password"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
              </button>
            </div>
          </div>

          {/* Keep signed in */}
          <label htmlFor="keep-signed-in" className="flex items-center gap-3 cursor-pointer select-none">
            <div className="relative">
              <input
                id="keep-signed-in"
                type="checkbox"
                className="sr-only"
                checked={keepSignedIn}
                onChange={(e) => setKeepSignedIn(e.target.checked)}
              />
              <div
                onClick={() => setKeepSignedIn((v) => !v)}
                className={`w-6 h-6 rounded-md border-2 flex items-center justify-center transition-all duration-200 cursor-pointer ${
                  keepSignedIn
                    ? 'bg-[#299D91] border-[#299D91]'
                    : 'bg-white border-gray-300'
                }`}
              >
                {keepSignedIn && (
                  <svg width="14" height="10" viewBox="0 0 14 10" fill="none">
                    <path d="M1 5L5 9L13 1" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </div>
            </div>
            <span className="text-[15px] text-gray-700">Keep me signed in</span>
          </label>

          {/* Error */}
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 text-sm rounded-xl px-4 py-3">
              {error}
            </div>
          )}

          {/* Submit */}
          <Button
            type="submit"
            id="login-button"
            disabled={loading}
            className="w-full h-14 text-base rounded-xl"
          >
            {loading ? (
              <span className="flex items-center gap-2">
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Signing in…
              </span>
            ) : 'Login'}
          </Button>
        </form>

        {/* Register link */}
        <p className="text-[14px] text-gray-500">
          Don&apos;t have an account?{' '}
          <Link
            to="/register"
            id="register-link"
            className="text-[#299D91] font-semibold hover:text-[#1f7a70] transition-colors"
          >
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
