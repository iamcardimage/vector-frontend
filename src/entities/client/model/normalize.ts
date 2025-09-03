import type { Client, FillStage } from './types';

const asString = (v: unknown | null | undefined): string | undefined => {
    if (v === null || v === undefined) return undefined;
    const s = String(v).trim();
    return s.length ? s : undefined;
  };
  
  const fillStageAllowed = new Set<FillStage>([
    'draft',
    'registration',
    'filled',
    'claim',
    'active',
    'disabled',
  ]);
  
  const normalizeFillStage = (v: unknown): FillStage | undefined => {
    const s = asString(v)?.toLowerCase();
    if (!s) return undefined;
    return fillStageAllowed.has(s as FillStage) ? (s as FillStage) : undefined;
  };

export const normalizeClient = (raw: any): Client => {
  // ФИО
  const surname = asString(raw?.surname) ?? asString(raw?.person_info?.surname) ?? asString(raw?.raw?.surname);
  const name = asString(raw?.name) ?? asString(raw?.person_info?.name) ?? asString(raw?.raw?.name);
  const patronymic = asString(raw?.patronymic) ?? asString(raw?.person_info?.patronymic) ?? asString(raw?.raw?.patronymic);

  // Контакты
  const contact_email =
    asString(raw?.contact_email) ??
    asString(raw?.person_info?.contact_email) ??
    asString(raw?.raw?.contact_email);

  const main_phone =
    asString(raw?.main_phone) ??
    asString(raw?.person_info?.main_phone) ??
    asString(raw?.raw?.main_phone);

  // Идентификаторы
  const inn =
    asString(raw?.inn) ??
    asString(raw?.person_info?.inn) ??
    asString(raw?.raw?.inn);

  const snils =
    asString(raw?.snils) ??
    asString(raw?.person_info?.snils) ??
    asString(raw?.raw?.snils);

  // Торговый код: предпочитаем строковый
  const external_id =
    asString(raw?.external_id_str) ??
    asString(raw?.person_info?.external_id) ??
    asString(raw?.raw?.external_id) ??
    (raw?.external_id != null ? String(raw?.external_id) : undefined) ??
    null;

  // ДР: предпочитаем нормализованный ISO сверху
  const birthday =
    asString(raw?.birthday) ??
    asString(raw?.person_info?.birthday) ?? // может быть в формате DD.MM.YYYY — отображаем как есть
    asString(raw?.raw?.birthday);

  // Риск
  const risk_level =
    asString(raw?.risk_level) ??
    asString(raw?.external_risk_level) ??
    asString(raw?.raw?.risk_level) ??
    asString(raw?.raw?.external_risk_level);

  // Таймстампы
  const created_at =
    asString(raw?.created_at) ??
    asString(raw?.created_lk_at) ??
    asString(raw?.raw?.created_at);

  const updated_at =
    asString(raw?.updated_at) ??
    asString(raw?.updated_lk_at) ??
    asString(raw?.raw?.updated_at);

  // Статусы
  const is_valid_info = !!raw?.is_valid_info;
  const is_filled = !!raw?.is_filled;
  const fill_stage =
    normalizeFillStage(raw?.fill_stage) ??
    normalizeFillStage(raw?.raw?.fill_stage) ??
    normalizeFillStage(raw?.person_info?.fill_stage);

  // Вторая часть
  const needs_second_part = !!raw?.needs_second_part;
  const second_part_created = !!raw?.second_part_created;

  // Версия
  const version = typeof raw?.version === 'number' ? raw.version : undefined;

  return {
    id: Number(raw?.id ?? raw?.client_id),
    surname,
    name,
    patronymic,
    birthday,
    contact_email,
    main_phone,
    inn,
    snils,
    external_risk_level: risk_level,
    risk_level,
    needs_second_part,
    second_part_created,
    version,
    second_part: raw?.second_part || null,
    external_id: external_id ?? null,
    created_at,
    updated_at,
    is_valid_info,
    is_filled,
    fill_stage,
  };
};