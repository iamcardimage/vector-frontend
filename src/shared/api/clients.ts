
import { BaseApi } from './base';

export class ClientsApi extends BaseApi {
  static async getClients<T>(
    token: string,
    params: {
      page?: number;
      per_page?: number;
      needs_second_part?: boolean;
      sp_status?: 'draft' | 'completed';
    } = {}
  ): Promise<T> {
    const search = new URLSearchParams();

    if (params.page) search.set('page', String(params.page));
    if (params.per_page) search.set('per_page', String(params.per_page));
    if (typeof params.needs_second_part === 'boolean') {
      search.set('needs_second_part', String(params.needs_second_part));
    }
    if (params.sp_status) search.set('sp_status', params.sp_status);

    const qs = search.toString();
    const endpoint = `/clients${qs ? `?${qs}` : ''}`;

    return this.request<T>(endpoint, {
      headers: this.getAuthHeaders(token),
    });
  }
}