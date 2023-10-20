import {Navigate, Route, Routes} from 'react-router-dom'

import AuthPage from '@/pages/auth'
import ProfilePage from '@/pages/profile'
import TestsPage from '@/pages/tests'
import ReceiptDetailsPage from '@/pages/transaction-details/receipt-details'

import ExpensesPage from '../pages/expenses'
import HistoryPage from '../pages/history'
import HomePage from '../pages/home'
import TransactionDetailsPage from '../pages/transaction-details'
import Layout from './layout'
import RequireLoggedIn from './require-logged-in'

const Router = () => (
  <Routes>
    <Route path="auth" element={<AuthPage />} />

    <Route element={<Layout />}>
      <Route element={<RequireLoggedIn />}>
        <Route index element={<HomePage />} />
        <Route path="expenses" element={<ExpensesPage />} />
        <Route path="history" element={<HistoryPage />} />
        <Route path="tests" element={<TestsPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="transaction/:id">
          <Route index element={<TransactionDetailsPage />} />
          <Route path="receipt" element={<ReceiptDetailsPage />} />
        </Route>
      </Route>
    </Route>

    <Route path="*" element={<Navigate to={{pathname: '/'}} />} />
  </Routes>
)

export default Router
