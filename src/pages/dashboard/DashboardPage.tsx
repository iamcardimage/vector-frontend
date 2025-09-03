import { useState } from 'react';
import { CreateUserForm } from '@/features/user/create-user';
import { useUserPermissions } from '@/entities/user/model/useUserPermission';
import { Button } from '@/shared/Button/Button';
import type { User } from '@/entities/user';

export const DashboardPage: React.FC = () => {
  const permissions = useUserPermissions();
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  const [showCreateForm, setShowCreateForm] = useState(false);

  const handleUserCreated = (newUser: User) => {
    console.log('Пользователь создан:', newUser);
    setShowCreateForm(false);
    
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">
          Панель администратора
        </h1>
        <p className="text-gray-600 mt-1">Сводка по профилю и правам доступа</p>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
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

      {permissions.canManageUser && (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Управление пользователями</h2>
            {!showCreateForm && (
              <Button 
                variant="primary" 
                onClick={() => setShowCreateForm(true)}
              >
                Создать пользователя
              </Button>
            )}
          </div>

          {showCreateForm ? (
            <CreateUserForm
              onSuccess={handleUserCreated}
              onCancel={() => setShowCreateForm(false)}
            />
          ) : (
            <p className="text-gray-600">
              Нажмите "Создать пользователя" для добавления нового пользователя в систему.
            </p>
          )}
        </div>
      )}
    </div>
  );
};