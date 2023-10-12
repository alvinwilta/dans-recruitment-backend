export interface JobShort {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  company_logo: string;
}

export interface Job extends JobShort {
  description: string;
  how_to_apply: string;
}

export interface SearchParam {
  description?: string;
  location?: string;
  is_full_time?: boolean;
}

export interface Pagination {
  page: number;
  limit: number;
}

export interface PaginationResult<T> {
  page: number;
  total: number;
  data: T[];
}
