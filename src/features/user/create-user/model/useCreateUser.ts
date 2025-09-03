import { useState, useEffect } from 'react';
import { AuthApi } from '@/shared/api';
import type { 
  CreateUserData, 
  CreateUserResponse, 
  RoleOption,
  ApiError,
  User,
} from '@/entities/user/model/types';

interface CreateUserResult {
  success: boolean;
  error?: string;
  user?: User;
}

export const useCreateUser = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [roles, setRoles] = useState<RoleOption[]>([]);
  const [isLoadingRoles, setIsLoadingRoles] = useState(true);

  
  useEffect(() => {
    const loadRoles = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          console.log('Токен не найден');
          return;
        }

        console.log('Загружаем роли с токеном:', token);
        const response = await AuthApi.getRoles(token);
        console.log('Ответ API ролей:', response);
        
        if (response && response.success && response.data && Array.isArray(response.data)) {
          // API возвращает {success: true, data: [...]} - используем response.data
          setRoles(response.data);
          console.log('Роли загружены:', response.data);
        } else {
          console.log('Неправильная структура ответа ролей:', response);
          // Устанавливаем роли по умолчанию
          setRoles([
            { value: 'Administrator', label: 'Администратор', description: '' },
            { value: 'Podft', label: 'Отдел ПОДФТ', description: '' },
            { value: 'ClientManagement', label: 'Отдел по работе с клиентами', description: '' },
          ]);
        }
      } catch (err) {
        console.error('Ошибка загрузки ролей:', err);
        // Устанавливаем роли по умолчанию при ошибке
        setRoles([
          { value: 'Administrator', label: 'Администратор', description: '' },
          { value: 'Podft', label: 'Отдел ПОДФТ', description: '' },
          { value: 'ClientManagement', label: 'Отдел по работе с клиентами', description: '' },
        ]);
      } finally {
        setIsLoadingRoles(false);
      }
    };

    loadRoles();
  }, []);

  const createUser = async (userData: CreateUserData): Promise<CreateUserResult> => {
    setIsLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Токен авторизации не найден');
      }

      console.log('Отправляем данные на сервер:');
      console.log('userData:', userData);
      console.log('JSON строка:', JSON.stringify(userData, null, 2));
      const response: CreateUserResponse = await AuthApi.createUser(token, userData);
      
      if (response.success) {
        return {
          success: true,
          user: response.data.user
        };
      }
    } catch (err) {
      const apiError = err as ApiError;
      const errorMessage = apiError?.error || 'Произошла ошибка при создании пользователя';
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
    createUser,
    isLoading,
    error,
    roles,
    isLoadingRoles,
  };
};