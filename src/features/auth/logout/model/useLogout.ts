import { useCallback } from 'react';

export const useLogout = () => {
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('userRole');
    
    window.location.href = '/login';
  }, []);

  return {
    logout,
  };
};