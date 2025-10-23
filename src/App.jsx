import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import TicketsList from "./pages/TicketsList";
import TicketNew from "./pages/TicketNew";
import BoardPage from "./pages/BoardPage";
import TicketDetail from "./pages/TicketDetail"; 


export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="tickets" element={<TicketsList />} />
        <Route path="tickets/new" element={<TicketNew />} />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
        <Route path="board" element={<BoardPage />} />
        <Route path="tickets/:id" element={<TicketDetail />} />

      </Route>

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}
