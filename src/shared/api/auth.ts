import type { 
    CreateUserData,
    CreateUserResponse,
    LoginCredentials, 
    LoginResponse, 
    ProfileResponse,
    RoleOption,
    User
  } from '@/entities/user/model/types';
  import { BaseApi } from './base';
  
  export class AuthApi extends BaseApi {
    static async login(credentials: LoginCredentials): Promise<LoginResponse> {
      return this.request<LoginResponse>('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
      });
    }
  
    static async getProfile(token: string): Promise<ProfileResponse> {
      return this.request<ProfileResponse>('/auth/profile', {
        headers: this.getAuthHeaders(token),
      });
    }
  
    static async getRoles(token: string): Promise<{ success: true; data: RoleOption[] }> {
        return this.request<{ success: true; data: RoleOption[] }>('/auth/roles', {
          headers: this.getAuthHeaders(token),
        });
      }

    static async createUser(token: string, userData: CreateUserData): Promise<CreateUserResponse> {
        return this.request<CreateUserResponse>('/auth/users', {
          method: 'POST',
          headers: this.getAuthHeaders(token),
          body: JSON.stringify(userData),
        });
      }
    
      static async getUsers(token: string): Promise<{ success: true; data: { users: User[] } }> {
        return this.request('/auth/users', {
          headers: this.getAuthHeaders(token),
        });
      }
  }