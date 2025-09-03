import { useState } from 'react';
import { AuthApi } from '@/shared/api';
import type { 
  LoginCredentials, 
  User, 
  LoginResponse, 
  ApiError
} from '@/entities/user/model/types';

interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
  token?: string;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credentials: LoginCredentials): Promise<LoginResult> => {
    setIsLoading(true);
    setError(null);
    
    try {
      const response: LoginResponse = await AuthApi.login(credentials);
      
      if (response.success) {
        const { token, user } = response.data;
        
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', user.Role);
        
        return { 
          success: true, 
          user, 
          token 
        };
      }
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError?.error || apiError?.message || 'Произошла ошибка при входе';
      setError(errorMessage);
      return { 
        success: false, 
        error: errorMessage 
      };
    } finally {
      setIsLoading(false);
    }
    
    return { success: false };
  };

  return {
    login,
    isLoading,
    error,
  };
};