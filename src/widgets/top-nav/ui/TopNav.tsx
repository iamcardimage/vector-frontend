import { NavLink } from 'react-router-dom';
import { LogoutButton } from '@/features/auth/logout';

export const TopNav: React.FC = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  const navItems = [
    { to: '/dashboard', label: 'Панель' },
    { to: '/clients', label: 'Клиенты' },
  ];

  const linkBase = 'px-3 py-2 rounded-md text-sm font-medium';
  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `${linkBase} ${isActive ? 'text-blue-600 bg-blue-50' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'}`;

  return (
    <header className="sticky top-0 z-30 bg-white border-b">
      <div className="mx-auto max-w-7xl px-4 h-14 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="text-gray-900 font-semibold">Вектор Капитал</div>
          <nav className="hidden sm:flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-sm text-gray-600">
            {user?.FirstName ? `${user.FirstName} ${user.LastName || ''}` : 'Профиль'}
          </span>
          <LogoutButton variant="outline" size="sm" />
        </div>
      </div>
    </header>
  );
};