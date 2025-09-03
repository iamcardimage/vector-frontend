const API_BASE_URL = 'http://localhost:8081'; // TODO: Вынести в env переменные

export class BaseApi {
  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;
    
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw errorData;
    }

    return response.json();
  }

  protected static getAuthHeaders(token: string) {
    return {
      Authorization: `Bearer ${token}`,
    };
  }
}