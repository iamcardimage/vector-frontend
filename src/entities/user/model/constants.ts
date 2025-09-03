import type { UserPermissions, UserRole } from './types';

export const USER_ROLES: Record<UserRole, string> = {
  Administrator: 'Администратор системы',
  Podft: 'Отдел ПОДФТ',
  ClientManagement: 'Отдел по работе с клиентами',
};

export const USER_PERMISSIONS: Record<UserRole, UserPermissions> = {
  Administrator: {
    canManageUser: true,
    canViewSecondPart: true,
    canCreateSecondPart: true,
    canEditSecondPart: true,
  },
  Podft: {
    canManageUser: false,
    canViewSecondPart: true,
    canCreateSecondPart: true,
    canEditSecondPart: true,
  },
  ClientManagement: {
    canManageUser: false,
    canViewSecondPart: false,
    canCreateSecondPart: false,
    canEditSecondPart: false,
  },
};