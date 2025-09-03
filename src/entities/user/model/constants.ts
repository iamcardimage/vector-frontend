import type { UserPermissions, UserRole } from './types';

export const USER_ROLES: Record<UserRole, string> = {
  admin: 'Администратор системы',
  podft: 'Отдел ПОДФТ',
  client: 'Отдел по работе с клиентами',
};

export const USER_PERMISSIONS: Record<UserRole, UserPermissions> = {
  admin: {
    canManageUser: true,
    canViewSecondPart: true,
    canCreateSecondPart: true,
    canEditSecondPart: true,
  },
  podft: {
    canManageUser: false,
    canViewSecondPart: true,
    canCreateSecondPart: true,
    canEditSecondPart: true,
  },
  client: {
    canManageUser: false,
    canViewSecondPart: false,
    canCreateSecondPart: false,
    canEditSecondPart: false,
  },
};

export const DEMO_USERS = [
  {
    id: '1',
    email: 'olesya@vector.ru',
    password: '123456',
    name: 'Олеся ПОД ФТ',
    role: 'podft' as UserRole,
    department: 'ПОД ФТ',
  },
  {
    id: '2',
    email: 'admin@vector.ru',
    password: '123456',
    name: 'Админ',
    role: 'admin' as UserRole,
    department: 'IT Отдел',
  },
];
