import axios, { AxiosInstance, AxiosError } from 'axios';
import { getToken, removeToken } from './auth';
import { history } from 'umi';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';
const TIMEOUT = 30000; // 30 seconds

/**
 * Public Axios Instance
 * Dùng cho: register, login (không cần authentication)
 */
export const publicAPI: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Private Axios Instance
 * Dùng cho: profile, updateProfile, uploadAvatar (cần authentication)
 * Tự động thêm token vào header
 * Tự động logout khi 401/403
 */
export const privateAPI: AxiosInstance = axios.create({
    baseURL: API_URL,
    timeout: TIMEOUT,
    headers: {
        'Content-Type': 'application/json',
    },
});

/**
 * Request Interceptor - Thêm token vào header
 */
privateAPI.interceptors.request.use(
    (config) => {
        const token = getToken();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor - Handle 401/403 errors
 */
privateAPI.interceptors.response.use(
    (response) => response,
    (error: AxiosError) => {
        const status = error.response?.status;

        // 401 Unauthorized - Token hết hạn hoặc không hợp lệ
        if (status === 401) {
            removeToken();
            history.push('/login');
        }

        // 403 Forbidden - Không có quyền
        if (status === 403) {
            removeToken();
            history.push('/login');
        }

        return Promise.reject(error);
    }
);

/**
 * Default export cho backward compatibility
 */
export default publicAPI;
