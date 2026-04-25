import { createContext, useContext, useState, useCallback } from 'react'
import { findUserByCredentials } from '@/data/mockData'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const stored = localStorage.getItem('finebank_user')
      return stored ? JSON.parse(stored) : null
    } catch {
      return null
    }
  })

  const login = useCallback((email, password) => {
    const found = findUserByCredentials(email, password)
    if (found) {
      const { password: _, ...safeUser } = found
      setUser(safeUser)
      localStorage.setItem('finebank_user', JSON.stringify(safeUser))
      return { success: true, user: safeUser }
    }
    return { success: false, message: 'Email or password is incorrect.' }
  }, [])

  const logout = useCallback(() => {
    setUser(null)
    localStorage.removeItem('finebank_user')
  }, [])

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
