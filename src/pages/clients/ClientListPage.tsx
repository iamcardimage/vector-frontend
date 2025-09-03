import React, { useEffect, useMemo, useState } from 'react';
import { useClients } from '@/entities/client';
import { Button } from '@/shared/Button/Button';
import { Input } from '@/shared/Input/Input';

const fio = (c: { surname?: string; name?: string; patronymic?: string }) =>
  [c.surname, c.name, c.patronymic].filter(Boolean).join(' ') || '-';

const formatDate = (s?: string) => (s ? new Date(s).toLocaleString() : '-');

const SecondPartBadge: React.FC<{ c: any }> = ({ c }) => {
  const needs = !!c.needs_second_part;
  const created = !!c.second_part_created;
  const spStatus: string | undefined = c?.second_part?.status;

  let text = 'Не требуется';
  let cls = 'bg-gray-100 text-gray-700';

  if (needs && !created) {
    text = '2-я часть: в работе';
    cls = 'bg-blue-100 text-blue-700';
  } else if (needs && created && spStatus === 'draft') {
    text = '2-я часть: черновик';
    cls = 'bg-amber-100 text-amber-800';
  } else if (needs && created && spStatus === 'completed') {
    text = '2-я часть: подана';
    cls = 'bg-violet-100 text-violet-800';
  } else if (!needs && created) {
    text = '2-я часть: завершено';
    cls = 'bg-green-100 text-green-700';
  }

  return <span className={`px-2 py-1 rounded text-xs ${cls}`}>{text}</span>;
};

type SortKey = 'id' | 'fio' | 'birthday' | 'created_at' | 'updated_at';
type SortDir = 'asc' | 'desc';

export const ClientListPage: React.FC = () => {
  const {
    data,
    isLoading,
    error,
    page,
    perPage,
    totalPages,
    total,
    setPage,
    setPerPage,
    setFilters,
  } = useClients({ page: 1, per_page: 10 });

  const [sortKey, setSortKey] = useState<SortKey>('id');
  const [sortDir, setSortDir] = useState<SortDir>('desc');

  const [query, setQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  useEffect(() => {
    const t = setTimeout(() => setDebouncedQuery(query.trim().toLowerCase()), 300);
    return () => clearTimeout(t);
  }, [query]);

  const onNeedsChange = (v: string) =>
    setFilters((f) => ({
      ...f,
      needs_second_part: v === '' ? undefined : v === 'true',
    }));

  const onStatusChange = (v: string) =>
    setFilters((f) => ({
      ...f,
      sp_status: (v === '' ? undefined : (v as 'draft' | 'completed')),
    }));

  const onPerPageChange = (v: string) => {
    const n = Number(v) || 10;
    setPerPage(n);
    setPage(1);
  };

  const handleSort = (key: SortKey) => {
    setSortKey((prev) => {
      if (prev === key) {
        setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'));
        return prev;
      }
      setSortDir('asc');
      return key;
    });
  };

  const sortedData = useMemo(() => {
    const val = (item: any, key: SortKey) => {
      if (key === 'fio') return fio(item).toLowerCase();
      if (key === 'birthday') return item.birthday || '';
      if (key === 'created_at') return item.created_at || '';
      if (key === 'updated_at') return item.updated_at || '';
      return item.id ?? 0;
    };

    const arr = [...data];
    arr.sort((a, b) => {
      const va = val(a, sortKey);
      const vb = val(b, sortKey);

      if (typeof va === 'string' || typeof vb === 'string') {
        const aStr = String(va);
        const bStr = String(vb);
        const cmp = aStr.localeCompare(bStr);
        return sortDir === 'asc' ? cmp : -cmp;
      }

      const cmp = (va as number) - (vb as number);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return arr;
  }, [data, sortKey, sortDir]);

  const filteredData = useMemo(() => {
    if (!debouncedQuery) return sortedData;
    return sortedData.filter((c: any) => {
      const haystack =
        [
          fio(c),
          c.main_phone,
          c.contact_email,
          c.id?.toString(),
          c.inn,
          c.snils,
          c.external_id,
        ]
          .filter(Boolean)
          .join(' ')
          .toLowerCase();
      return haystack.includes(debouncedQuery);
    });
  }, [sortedData, debouncedQuery]);

  const SortBtn: React.FC<{ onClick: () => void; active: boolean; dir: SortDir }> = ({
    onClick,
    active,
    dir,
  }) => (
    <button
      className="ml-1 text-xs text-gray-500 hover:text-gray-700"
      onClick={onClick}
      aria-label="Сортировать"
    >
      {active ? (dir === 'asc' ? '▲' : '▼') : '↕'}
    </button>
  );

  return (
    <>
      <div className="flex items-center justify-between mb-4 gap-3 flex-wrap">
        <h1 className="text-xl font-semibold">Клиенты</h1>

        <div className="flex items-center gap-3">
          <div className="w-64">
            <Input
              placeholder="Поиск (ФИО/телефон/e-mail/ID/ИНН/СНИЛС)"
              value={query}
              onChange={setQuery}
            />
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">2-я часть</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              defaultValue=""
              onChange={(e) => onNeedsChange(e.target.value)}
            >
              <option value="">Все</option>
              <option value="true">Требуется</option>
              <option value="false">Не требуется</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">Статус 2-й части</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              defaultValue=""
              onChange={(e) => onStatusChange(e.target.value)}
            >
              <option value="">Все</option>
              <option value="draft">Черновик</option>
              <option value="completed">Завершено</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="text-sm text-gray-600">На странице</label>
            <select
              className="border border-gray-300 rounded-md px-2 py-1 text-sm"
              value={perPage}
              onChange={(e) => onPerPageChange(e.target.value)}
            >
              <option value="10">10</option>
              <option value="20">20</option>
              <option value="50">50</option>
            </select>
          </div>
        </div>
      </div>

      {isLoading && (
        <div className="space-y-2">
          <div className="h-10 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 bg-gray-200 animate-pulse rounded" />
          <div className="h-10 bg-gray-200 animate-pulse rounded" />
        </div>
      )}

      {error && <div className="text-red-600 text-sm">{error}</div>}

      {!isLoading && !error && filteredData.length === 0 && (
        <div className="text-gray-600 text-sm">Нет клиентов по запросу</div>
      )}

      {!isLoading && !error && filteredData.length > 0 && (
        <>
          <div className="overflow-x-auto rounded border border-gray-200">
            <table className="min-w-full bg-white">
              <thead className="bg-gray-50 text-left text-sm text-gray-600">
                <tr>
                  <th className="px-4 py-2">
                    <span className="cursor-pointer select-none" onClick={() => handleSort('id')}>
                      ID
                    </span>
                    <SortBtn onClick={() => handleSort('id')} active={sortKey === 'id'} dir={sortDir} />
                  </th>
                  <th className="px-4 py-2">
                    <span className="cursor-pointer select-none" onClick={() => handleSort('fio')}>
                      ФИО
                    </span>
                    <SortBtn onClick={() => handleSort('fio')} active={sortKey === 'fio'} dir={sortDir} />
                  </th>
                  <th className="px-4 py-2">
                    <span className="cursor-pointer select-none" onClick={() => handleSort('birthday')}>
                      Дата рождения
                    </span>
                    <SortBtn
                      onClick={() => handleSort('birthday')}
                      active={sortKey === 'birthday'}
                      dir={sortDir}
                    />
                  </th>
                  <th className="px-4 py-2">Телефон</th>
                  <th className="px-4 py-2">Почта</th>
                  <th className="px-4 py-2">2-я часть</th>
                  <th className="px-4 py-2">Версия</th>
                  <th className="px-4 py-2">Торговый код</th>
                  <th className="px-4 py-2">Статус клиента</th>
                  <th className="px-4 py-2">Подтв. данных</th>
                  <th className="px-4 py-2">Заполнен</th>
                  <th className="px-4 py-2">
                    <span className="cursor-pointer select-none" onClick={() => handleSort('created_at')}>
                      Создан
                    </span>
                    <SortBtn
                      onClick={() => handleSort('created_at')}
                      active={sortKey === 'created_at'}
                      dir={sortDir}
                    />
                  </th>
                  <th className="px-4 py-2">
                    <span className="cursor-pointer select-none" onClick={() => handleSort('updated_at')}>
                      Обновлён
                    </span>
                    <SortBtn
                      onClick={() => handleSort('updated_at')}
                      active={sortKey === 'updated_at'}
                      dir={sortDir}
                    />
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {filteredData.map((c) => (
                  <tr key={c.id}>
                    <td className="px-4 py-2 text-sm">{c.id}</td>
                    <td className="px-4 py-2 text-sm">{fio(c)}</td>
                    <td className="px-4 py-2 text-sm">{c.birthday || '-'}</td>
                    <td className="px-4 py-2 text-sm">{c.main_phone || '-'}</td>
                    <td className="px-4 py-2 text-sm">{c.contact_email || '-'}</td>
                    <td className="px-4 py-2 text-sm">
                      <SecondPartBadge c={c} />
                    </td>
                    <td className="px-4 py-2 text-sm">{c.version ?? '-'}</td>
                    <td className="px-4 py-2 text-sm">{c.external_id ?? '-'}</td>
                    <td className="px-4 py-2 text-sm">{c.fill_stage ?? '-'}</td>
                    <td className="px-4 py-2 text-sm">{c.is_valid_info ? 'Да' : 'Нет'}</td>
                    <td className="px-4 py-2 text-sm">{c.is_filled ? 'Да' : 'Нет'}</td>
                    <td className="px-4 py-2 text-sm">{formatDate(c.created_at)}</td>
                    <td className="px-4 py-2 text-sm">{formatDate(c.updated_at)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-gray-600">
              Стр. {page} из {totalPages} • Всего: {total} • Отфильтровано: {filteredData.length}
            </div>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                disabled={page <= 1}
                onClick={() => setPage(page - 1)}
              >
                Назад
              </Button>
              <Button
                variant="outline"
                size="sm"
                disabled={page >= totalPages}
                onClick={() => setPage(page + 1)}
              >
                Вперёд
              </Button>
            </div>
          </div>
        </>
      )}
    </>
  );
};