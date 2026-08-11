// API response wrapper
export interface ApiResponse<T> {
  data?: T;
  error?: string;
  message?: string;
}

// Pagination params
export interface PaginationParams {
  page?: number;
  limit?: number;
  search?: string;
}

// Paginated response
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}

// Sort direction
export type SortDirection = 'asc' | 'desc';

// Common entity fields
export interface BaseEntity {
  id: string;
  createdAt: string;
  updatedAt: string;
}
