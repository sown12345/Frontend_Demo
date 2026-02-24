import { AxiosResponse } from 'axios';
import { publicAPI, privateAPI } from '@/utils/axiosInstance';
import {
    LoginRequest,
    RegisterRequest,
    UpdateProfileRequest,
    ApiResponse,
    User
} from '@/types';

export const registerAPI = (data: RegisterRequest): Promise<AxiosResponse<ApiResponse<User>>> =>
    publicAPI.post('/register', data);

export const loginAPI = (data: LoginRequest): Promise<AxiosResponse<ApiResponse<{ token: string }>>> =>
    publicAPI.post('/login', data);

export const getProfileAPI = (): Promise<AxiosResponse<ApiResponse<User>>> =>
    privateAPI.get('/profile');

export const updateProfileAPI = (data: UpdateProfileRequest): Promise<AxiosResponse<ApiResponse<User>>> =>
    privateAPI.put('/profile', data);

export const uploadAvatarAPI = (formData: FormData): Promise<AxiosResponse<ApiResponse<User>>> =>
    privateAPI.put('/avatar', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });

