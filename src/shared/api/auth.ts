import type { 
    LoginCredentials, 
    LoginResponse, 
    ProfileResponse 
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
  
    static async getRoles(token: string): Promise<{ roles: string[] }> {
      return this.request<{ roles: string[] }>('/auth/roles', {
        headers: this.getAuthHeaders(token),
      });
    }
  }