export type UserRole = 'administrator' | 'podft' | 'clientManagement';


export interface User {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  role: UserRole;
}


export interface AuthState {
  user: User | null;
  isAuth: boolean;
  isLoading: boolean;
  error: string | null;
  token: string | null;
}


export interface UserPermissions {
  canManageUser: boolean;
  canViewSecondPart: boolean;
  canCreateSecondPart: boolean;
  canEditSecondPart: boolean;
}


export interface LoginCredentials {
  email: string;
  password: string;
}


export interface LoginResponse {
  success: true;
  data: {
    token: string;
    expires_at: number;
    user: User;
  };
}


export interface LoginError {
  error: string;
  success: false;
}