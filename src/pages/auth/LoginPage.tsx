import { useLogin } from '@/features/auth/login/model/useLogin';
import { LoginForm } from '@/features/auth/login/ui/LoginForm';
import { useNavigate } from 'react-router-dom';

export const LoginPage: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading, error } = useLogin();

  const handleLogin = async (email: string, password: string) => {
    const result = await login({ email, password });

    if (result.success) {
      navigate('/dashboard');
    }
  };
  return (
    <LoginForm
      onSubmit={handleLogin}
      isLoading={isLoading}
      error={error || undefined}
    />
  );
};
