import { Navigate, Route, Routes } from "react-router-dom";

import Layout from "./layout";
import HomePage from "../pages/home";
import ExpensesPage from "../pages/expenses";
import HistoryPage from "../pages/history";
import TransactionDetailsPage from "../pages/transaction-details";
import AuthPage from "@/pages/auth";

const Router = () => (
  <Routes>
    <Route element={<Layout />}>
      <Route index={true} element={<HomePage />} />
      <Route path="auth" element={<AuthPage />} />
      <Route path="expenses" element={<ExpensesPage />} />
      <Route path="history" element={<HistoryPage />} />
      <Route
        path="transaction-details/:id"
        element={<TransactionDetailsPage />}
      />
    </Route>

    <Route path="*" element={<Navigate to={{ pathname: "/" }} />} />
  </Routes>
);

export default Router;
