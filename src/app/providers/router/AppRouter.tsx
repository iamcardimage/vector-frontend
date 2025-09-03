import { LoginPage } from '@/pages/auth/LoginPage';
import { ClientListPage } from '@/pages/clients/ClientListPage';
import { DashboardPage } from '@/pages/dashboard/DashboardPage';
import { BrowserRouter, Routes, Navigate, Route } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export const AppRouter: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <DashboardPage />
              </PrivateRoute>
            }
          />
          <Route path="/clientlistpage" element={<ClientListPage />} />

          <Route path="/" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default AppRouter;
