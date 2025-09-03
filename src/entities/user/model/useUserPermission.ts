import { useMemo } from 'react';
import { USER_PERMISSIONS } from './constants';
import type { UserPermissions, UserRole } from './types';

export const useUserPermissions = (): UserPermissions => {
  const userRole = localStorage.getItem('userRole') as UserRole;

  const permissions = useMemo(() => {
    if (!userRole || !USER_PERMISSIONS[userRole]) {
      return USER_PERMISSIONS.ClientManagement;
    }
    return USER_PERMISSIONS[userRole];
  }, [userRole]);
  
  return permissions;
};