import { useState } from 'react';
import { Input } from '@/shared/Input/Input';
import { Button } from '@/shared/Button/Button';
import { useCreateUser } from '../model/useCreateUser';
import type { CreateUserData, User } from '@/entities/user/model/types';

interface CreateUserFormProps {
    onSuccess?: (user: User) => void;
    onCancel?: () => void;
  }

export const CreateUserForm: React.FC<CreateUserFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { createUser, isLoading, error, roles, isLoadingRoles } = useCreateUser();

  const [formData, setFormData] = useState<CreateUserData>({
    email: '',
    password: '',
    first_name: '',
    last_name: '',
    middle_name: '',
    role: 'ClientManagement',
  });

  const [formErrors, setFormErrors] = useState<{
    email?: string;
    password?: string;
    first_name?: string;
    last_name?: string;
    role?: string;
  }>({});

  const validateForm = () => {
    const errors: typeof formErrors = {};

    if (!formData.email) {
      errors.email = 'Email обязателен';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Введите корректный email';
    }

    if (!formData.password) {
      errors.password = 'Пароль обязателен';
    } else if (formData.password.length < 6) {
      errors.password = 'Минимальная длина пароля 6 символов';
    }

    if (!formData.first_name.trim()) {
      errors.first_name = 'Имя обязательно';
    }

    if (!formData.last_name.trim()) {
      errors.last_name = 'Фамилия обязательна';
    }

    if (!formData.role) {
      errors.role = 'Роль обязательна';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    const result = await createUser(formData);
    
    if (result.success && result.user) {
      onSuccess?.(result.user);
      setFormData({
        email: '',
        password: '',
        first_name: '',
        last_name: '',
        middle_name: '',
        role: 'ClientManagement',
      });
      setFormErrors({});
    }
  };

  const handleInputChange = (field: keyof CreateUserData) => (value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof typeof formErrors]) {
      setFormErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-semibold mb-6">Создание нового пользователя</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Input
            type="text"
            label="Имя"
            placeholder="Введите имя"
            value={formData.first_name}
            onChange={handleInputChange('first_name')}
            error={formErrors.first_name}
            disabled={isLoading}
          />

          <Input
            type="text"
            label="Фамилия"
            placeholder="Введите фамилию"
            value={formData.last_name}
            onChange={handleInputChange('last_name')}
            error={formErrors.last_name}
            disabled={isLoading}
          />
        </div>

        <Input
          type="text"
          label="Отчество (необязательно)"
          placeholder="Введите отчество"
          value={formData.middle_name}
          onChange={handleInputChange('middle_name')}
          disabled={isLoading}
        />

        <Input
          type="email"
          label="Email"
          placeholder="Введите email"
          value={formData.email}
          onChange={handleInputChange('email')}
          error={formErrors.email}
          disabled={isLoading}
        />

        <Input
          type="password"
          label="Пароль"
          placeholder="Введите пароль"
          value={formData.password}
          onChange={handleInputChange('password')}
          error={formErrors.password}
          disabled={isLoading}
        />

        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Роль
          </label>
          <select
  value={formData.role}
  onChange={(e) => handleInputChange('role')(e.target.value)}
  disabled={isLoading || isLoadingRoles}
  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
>
  {isLoadingRoles ? (
    <option>Загрузка ролей...</option>
  ) : roles.length > 0 ? (
    roles.map((role) => (
      <option key={role.value} value={role.value}>
        {role.label}
      </option>
    ))
  ) : (
    <>
      <option value="Administrator">Администратор</option>
      <option value="Podft">Отдел ПОДФТ</option>
      <option value="ClientManagement">Отдел по работе с клиентами</option>
    </>
  )}
</select>
          {formErrors.role && (
            <p className="text-sm text-red-600 mt-1">{formErrors.role}</p>
          )}
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex space-x-3 pt-4">
          <Button
            variant="primary"
            disabled={isLoading || isLoadingRoles}
            className="flex-1"
          >
            {isLoading ? 'Создание...' : 'Создать пользователя'}
          </Button>
          
          {onCancel && (
            <Button
              variant="secondary"
              onClick={onCancel}
              disabled={isLoading}
            >
              Отмена
            </Button>
          )}
        </div>
      </form>
    </div>
  );
};