import { Button } from '@/shared/Button/Button';
import { useLogout } from '../model/useLogout';

interface LogoutButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  children?: React.ReactNode;
}

export const LogoutButton: React.FC<LogoutButtonProps> = ({
  variant = 'secondary',
  size = 'md',
  className,
  children = 'Выйти',
}) => {
  const { logout } = useLogout();

  const handleLogout = () => {
    if (window.confirm('Вы уверены, что хотите выйти из системы?')) {
      logout();
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleLogout}
      className={className}
    >
      {children}
    </Button>
  );
};