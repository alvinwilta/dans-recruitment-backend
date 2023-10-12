export interface Job {
  id: string;
  type: string;
  url: string;
  created_at: string;
  company: string;
  company_url: string;
  location: string;
  title: string;
  description: string;
  how_to_apply: string;
  company_logo: string;
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
