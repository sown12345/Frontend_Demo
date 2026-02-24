/**
 * API Response & Error Types
 */

export interface ApiResponse<T = any> {
    status: string;
    message?: string;
    data?: T;
}

export interface ApiError {
    message: string;
    status?: number;
    code?: string;
}
