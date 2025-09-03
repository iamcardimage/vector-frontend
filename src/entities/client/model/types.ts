export type SecondPartStatus = 'draft' | 'completed';

export interface ClientSecondPart {
  client_version?: number;
  status?: SecondPartStatus;
  due_at?: string;
}

export type FillStage = 'draft' | 'registration' | 'filled' | 'claim' | 'active' | 'disabled';

export interface Client {
  id: number;
  surname?: string;
  name?: string;
  patronymic?: string;
  birthday?: string;
  contact_email?: string;
  main_phone?: string;
  inn?: string;
  snils?: string;
  external_risk_level?: string;
  risk_level?: string;
  needs_second_part?: boolean;
  second_part_created?: boolean;
  version?: number;
  second_part?: ClientSecondPart | null;
  external_id?: string | null; 
  created_at?: string;
  updated_at?: string;
  is_valid_info?: boolean;
  fill_stage?: FillStage;
}

export interface GetClientsResponse {
  success: boolean;
  clients: Client[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ClientsListFilters {
  needs_second_part?: boolean;
  sp_status?: SecondPartStatus;
}

export interface ClientSecondPart {
  client_version?: number;
  status?: SecondPartStatus;
  due_at?: string;
}

export interface Client {
  id: number;
  surname?: string;
  name?: string;
  patronymic?: string;
  birthday?: string;
  contact_email?: string;
  main_phone?: string;
  inn?: string;
  snils?: string;
  external_risk_level?: string;
  risk_level?: string;
  needs_second_part?: boolean;
  second_part_created?: boolean;
  version?: number;
  second_part?: ClientSecondPart | null;
  external_id?: string | null; 
  created_at?: string;
  updated_at?: string;
  is_valid_info?: boolean;
  is_filled?: boolean;
  fill_stage?: FillStage;
}

export interface GetClientsResponse {
  success: boolean;
  clients: Client[];
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
}

export interface ClientsListFilters {
  needs_second_part?: boolean;
  sp_status?: SecondPartStatus;
}