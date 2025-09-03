export type UserRole = 'Administrator' | 'Podft' | 'ClientManagement';


export interface User {
  ID: number;
  Email: string;
  FirstName: string;
  LastName: string;
  MiddleName: string;
  Role: UserRole;
  IsActive?: boolean;
  CreatedAt?: string;
  UpdatedAt?: string;
  PasswordHash?: string;
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

export interface ProfileResponse {
  success: true;
  data: {
    user: User;
  };
}

export interface ApiError {
  error: string;
  success: false;
  message?: string;
}