import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TicketProvider } from './contexts/TicketContext';
import { Layout } from './components/Layout/Layout';
import { LoginForm } from './components/Auth/LoginForm';
import { RegisterForm } from './components/Auth/RegisterForm';
import { Dashboard } from './components/Dashboard/Dashboard';
import { CreateTicket } from './components/Tickets/CreateTicket';
import { TicketList } from './components/Tickets/TicketList';
import { TicketDetail } from './components/Tickets/TicketDetail';
import { AdminPanel } from './components/Admin/AdminPanel';
import { ProtectedRoute } from './components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <TicketProvider>
        <Router>
          <Layout>
            <Routes>
              <Route path="/login" element={<LoginForm />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/create-ticket"
                element={
                  <ProtectedRoute>
                    <CreateTicket />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets"
                element={
                  <ProtectedRoute>
                    <TicketList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/tickets/:id"
                element={
                  <ProtectedRoute>
                    <TicketDetail />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <ProtectedRoute adminOnly>
                    <AdminPanel />
                  </ProtectedRoute>
                }
              />
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </Layout>
        </Router>
      </TicketProvider>
    </AuthProvider>
  );
}

export default App;