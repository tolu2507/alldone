import { ApiResponse } from 'src/utils/interface';

export function successResponse<T>(message: string, data: T): ApiResponse<T> {
  return {
    status: 'success',
    message,
    data,
  };
}

export function errorResponse(message: string, error: any): ApiResponse<null> {
  return {
    status: 'error',
    message,
    error,
  };
}
