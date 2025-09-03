const API_BASE_URL = 'http://localhost:8081';

export class BaseApi {
  protected static async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${API_BASE_URL}${endpoint}`;

    const headers = {
      Accept: 'application/json',
      ...(options.headers || {}),
      'Content-Type': 'application/json; charset=utf-8',
    };

    console.log('🚀 Отправляем запрос:', {
      url,
      method: options.method || 'GET',
      headers,
      body: options.body,
    });

    const response = await fetch(url, { ...options, headers });

    console.log('📡 Получен ответ:', {
      status: response.status,
      statusText: response.statusText,
      headers: Object.fromEntries(response.headers.entries()),
    });

    if (!response.ok) {
      const err = await response.json().catch(() => ({}));
      console.error('❌ Ошибка API:', err);
      throw err;
    }

    const data = await response.json().catch(() => ({}));
    console.log('✅ Успешный ответ:', data);
    return data as T;
  }

  protected static getAuthHeaders(token: string) {
    return { Authorization: `Bearer ${token}` };
  }
}