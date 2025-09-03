import { useMemo } from 'react';
import { USER_PERMISSIONS } from './constants';
import type { UserPermissions } from './types';

export const useUserPermissions = (): UserPermissions => {
  const userRole = localStorage.getItem(
    'userRole'
  ) as keyof typeof USER_PERMISSIONS;

  const permissions = useMemo(() => {
    if (!userRole || !USER_PERMISSIONS[userRole]) {
      return USER_PERMISSIONS.client;
    }
    return USER_PERMISSIONS[userRole];
  }, [userRole]);
  return permissions;
};
