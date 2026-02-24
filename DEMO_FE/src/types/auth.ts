/**
 * Authentication Types
 */

export interface LoginRequest {
    username: string;
    password: string;
}

export interface RegisterRequest {
    username: string;
    email: string;
    password: string;
    fullName: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other';
    address?: string;
}

export interface LoginResponse {
    token: string;
}

export interface UpdateProfileRequest {
    email?: string;
    fullName?: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other';
    address?: string;
}
