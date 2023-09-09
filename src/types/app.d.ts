declare namespace App {
  export interface ListResponse<T> {
    page: number;
    perPage: number;
    total: number;
    totalPages: number;
    data: T[];
  }

  export interface Response<T> {
    data?: T;
    error?: unknown;
  }

  export type Callback = {
    onSuccess?: (...args) => void;
    onFailure?: (...args) => void;
    onFinish?: (...args) => void;
  };

  export type Data = any;

  export type TablePaginate = {
    current?: number;
    pageSize?: number;
    total?: number;
  };
}
