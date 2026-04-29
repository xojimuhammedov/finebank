import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider } from '@/context/AuthContext'
import { ProtectedRoute, PublicRoute } from './guards'
import { DashboardLayout } from '@/components/layout/DashboardLayout'

// Auth pages
import LoginPage    from '@/pages/auth/LoginPage'
import RegisterPage from '@/pages/auth/RegisterPage'

// Dashboard pages
import DashboardPage      from '@/pages/dashboard/DashboardPage'
import SettingsPage       from '@/pages/settings/SettingsPage'
import BalancesPage       from '@/pages/balances/BalancesPage'
import BillsPage          from '@/pages/bills/BillsPage'
import TransactionsPage   from '@/pages/transactions/TransactionsPage'
import ExpensesPage       from '@/pages/expenses/ExpensesPage'
import GoalsPage          from '@/pages/goals/GoalsPage'
import BudgetsPage        from '@/pages/budgets/BudgetsPage'

// Placeholder for pages not yet built
function ComingSoon({ name }) {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#e6f5f4] flex items-center justify-center mx-auto mb-4">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#299D91" strokeWidth="1.5">
            <path d="M12 6v6l4 2" /><circle cx="12" cy="12" r="10" />
          </svg>
        </div>
        <h2 className="text-lg font-bold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-400 mt-1">Coming soon in the next step</p>
      </div>
    </div>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* Public auth routes */}
          <Route element={<PublicRoute />}>
            <Route path="/login"    element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Route>

          {/* Protected dashboard routes */}
          <Route element={<ProtectedRoute />}>
            <Route element={<DashboardLayout />}>
              <Route path="/dashboard"    element={<DashboardPage />} />
              <Route path="/balances"     element={<BalancesPage />} />
              <Route path="/transactions" element={<TransactionsPage />} />
              <Route path="/bills"        element={<BillsPage />} />
              <Route path="/expenses"     element={<ExpensesPage />} />
              <Route path="/budgets"      element={<BudgetsPage />} />
              <Route path="/goals"        element={<GoalsPage />} />
              <Route path="/settings"     element={<SettingsPage />} />
            </Route>
          </Route>

          {/* Catch-all */}
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}
