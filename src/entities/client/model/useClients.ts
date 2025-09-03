import { useEffect, useMemo, useState } from 'react';
import { ClientsApi } from '@/shared/api';
import type { ClientsListFilters, GetClientsResponse, Client } from './types';
import { normalizeClient } from './normalize';

interface UseClientsParams {
  page?: number;
  per_page?: number;
  filters?: ClientsListFilters;
}

export const useClients = (initial: UseClientsParams = {}) => {
  const [page, setPage] = useState<number>(initial.page ?? 1);
  const [perPage, setPerPage] = useState<number>(initial.per_page ?? 10);
  const [filters, setFilters] = useState<ClientsListFilters>(initial.filters ?? {});
  const [data, setData] = useState<Client[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [total, setTotal] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const token = useMemo(() => localStorage.getItem('token') ?? '', []);

  const fetchClients = async () => {
    if (!token) {
      setError('Нет токена авторизации');
      return;
    }
    setIsLoading(true);
    setError(null);
    try {
      const resp = await ClientsApi.getClients<GetClientsResponse>(token, {
        page,
        per_page: perPage,
        ...filters,
      });
      if (resp?.success) {
        const normalized = Array.isArray(resp.clients)
          ? resp.clients.map((c: any) => normalizeClient(c))
          : [];
        setData(normalized);
        setTotalPages(resp.total_pages ?? 1);
        setTotal(resp.total ?? normalized.length ?? 0);
      } else {
        setError('Не удалось загрузить клиентов');
      }
    } catch (e: any) {
      setError(e?.error || e?.message || 'Ошибка загрузки клиентов');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchClients();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, perPage, filters.needs_second_part, filters.sp_status]);

  return {
    data,
    page,
    perPage,
    totalPages,
    total,
    isLoading,
    error,
    setPage,
    setPerPage,
    setFilters,
    refetch: fetchClients,
  };
};