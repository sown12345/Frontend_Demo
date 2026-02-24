import { AxiosError } from 'axios';

/**
 * Error Types - Phân loại các lỗi
 */
export enum ErrorType {
    NETWORK_ERROR = 'NETWORK_ERROR',          // Lỗi kết nối mạng
    UNAUTHORIZED = 'UNAUTHORIZED',            // 401 - Chưa đăng nhập
    FORBIDDEN = 'FORBIDDEN',                  // 403 - Không có quyền
    NOT_FOUND = 'NOT_FOUND',                  // 404 - Không tìm thấy
    VALIDATION_ERROR = 'VALIDATION_ERROR',    // 400 - Dữ liệu không hợp lệ
    CONFLICT = 'CONFLICT',                    // 409 - Xung đột (email đã tồn tại)
    SERVER_ERROR = 'SERVER_ERROR',            // 500+ - Lỗi server
    UNKNOWN = 'UNKNOWN',                      // Lỗi không xác định
}

/**
 * Error metadata
 */
export interface ApiErrorInfo {
    type: ErrorType;
    message: string;
    statusCode?: number;
    originalError?: AxiosError;
}

/**
 * Map HTTP status code to ErrorType
 */
const mapStatusToErrorType = (status: number | undefined): ErrorType => {
    if (!status) return ErrorType.NETWORK_ERROR;

    switch (status) {
        case 400:
            return ErrorType.VALIDATION_ERROR;
        case 401:
            return ErrorType.UNAUTHORIZED;
        case 403:
            return ErrorType.FORBIDDEN;
        case 404:
            return ErrorType.NOT_FOUND;
        case 409:
            return ErrorType.CONFLICT;
        case 500:
        case 501:
        case 502:
        case 503:
            return ErrorType.SERVER_ERROR;
        default:
            return status >= 500 ? ErrorType.SERVER_ERROR : ErrorType.UNKNOWN;
    }
};

/**
 * Get user-friendly error message based on ErrorType
 */
const getErrorMessage = (errorType: ErrorType, serverMessage?: string): string => {
    if (serverMessage) return serverMessage;

    const messages: Record<ErrorType, string> = {
        [ErrorType.NETWORK_ERROR]: 'Lỗi kết nối. Vui lòng kiểm tra internet.',
        [ErrorType.UNAUTHORIZED]: 'Phiên làm việc hết hạn. Vui lòng đăng nhập lại.',
        [ErrorType.FORBIDDEN]: 'Bạn không có quyền truy cập.',
        [ErrorType.NOT_FOUND]: 'Dữ liệu không tìm thấy.',
        [ErrorType.VALIDATION_ERROR]: 'Dữ liệu không hợp lệ. Vui lòng kiểm tra lại.',
        [ErrorType.CONFLICT]: 'Dữ liệu đã tồn tại.',
        [ErrorType.SERVER_ERROR]: 'Lỗi server. Vui lòng thử lại sau.',
        [ErrorType.UNKNOWN]: 'Lỗi không xác định.',
    };

    return messages[errorType];
};

/**
 * Handle API errors
 * @param error - Axios error hoặc unknown error
 * @returns ApiErrorInfo với type, message, statusCode
 */
export const handleApiError = (error: unknown): ApiErrorInfo => {
    // Network error (no response)
    if (!error) {
        return {
            type: ErrorType.NETWORK_ERROR,
            message: getErrorMessage(ErrorType.NETWORK_ERROR),
        };
    }

    const axiosError = error as AxiosError<{ message: string }>;

    // Axios error with response
    if (axiosError.response) {
        const status = axiosError.response.status;
        const serverMessage = axiosError.response.data?.message;
        const errorType = mapStatusToErrorType(status);

        return {
            type: errorType,
            message: getErrorMessage(errorType, serverMessage),
            statusCode: status,
            originalError: axiosError,
        };
    }

    // Axios error without response (network error)
    if (axiosError.request) {
        return {
            type: ErrorType.NETWORK_ERROR,
            message: getErrorMessage(ErrorType.NETWORK_ERROR),
            originalError: axiosError,
        };
    }

    // Unknown error
    return {
        type: ErrorType.UNKNOWN,
        message: axiosError.message || getErrorMessage(ErrorType.UNKNOWN),
        originalError: axiosError,
    };
};

/**
 * Check if should logout on error
 * (401 hoặc 403 yêu cầu logout)
 */
export const shouldLogout = (errorType: ErrorType): boolean => {
    return errorType === ErrorType.UNAUTHORIZED || errorType === ErrorType.FORBIDDEN;
};
