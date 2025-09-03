import { DEMO_USERS, type User } from '@/entities/user';
import { useState } from 'react';

interface LoginCredentials {
  email: string;
  password: string;
}

interface LoginResult {
  success: boolean;
  error?: string;
  user?: User;
}

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (credantials: LoginCredentials): Promise<LoginResult> => {
    setIsLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const demoUser = DEMO_USERS.find(
        (user) =>
          user.email === credantials.email &&
          user.password === credantials.password
      );

      if (demoUser) {
        const user: User = {
          id: demoUser.id,
          email: demoUser.email,
          role: demoUser.role,
          name: demoUser.name,
          department: demoUser.department,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');
        localStorage.setItem('userRole', user.role);
        return { success: true, user };
      } else {
        throw new Error('Не верный email или пароль');
      }
    } catch (err) {
      const errorMassage =
        err instanceof Error ? err.message : 'Произошла ошибка при входе';
      setError(errorMassage);
      return { success: false, error: errorMassage };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading,
    error,
  };
};
