import { LogoutButton } from '@/features/auth/logout';
import { useUserPermissions } from '@/entities/user/model/useUserPermission';

export const DashboardPage: React.FC = () => {
  const permissions = useUserPermissions();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Вектор Капитал
          </h1>
          <LogoutButton variant="outline" />
        </div>
        // Обновите секцию с информацией о пользователе (строки 20-35):
        <div className="bg-white rounded-lg shadow p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Информация о пользователе</h2>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-600">Имя:</p>
              <p className="font-medium">{user.FirstName} {user.LastName}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Email:</p>
              <p className="font-medium">{user.Email}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Роль:</p>
              <p className="font-medium">{user.Role}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Отчество:</p>
              <p className="font-medium">{user.MiddleName || 'Не указано'}</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Права доступа</h2>
          <div className="space-y-2">
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${permissions.canManageUser ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>Управление пользователями</span>
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${permissions.canViewSecondPart ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>Просмотр второй части</span>
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${permissions.canCreateSecondPart ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>Создание второй части</span>
            </div>
            <div className="flex items-center">
              <span className={`w-3 h-3 rounded-full mr-3 ${permissions.canEditSecondPart ? 'bg-green-500' : 'bg-red-500'}`}></span>
              <span>Редактирование второй части</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};