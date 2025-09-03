import { LoginPage } from '@/pages/auth/LoginPage';
import { ClientListPage } from '@/pages/clients/ClientListPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';
import { PrivateLayout } from '@/app/layouts/PrivateLayout';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token');
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!token || !isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />

        <Route
          element={
            <PrivateRoute>
              <PrivateLayout />
            </PrivateRoute>
          }
        >
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/clients" element={<ClientListPage />} />
        </Route>

        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;