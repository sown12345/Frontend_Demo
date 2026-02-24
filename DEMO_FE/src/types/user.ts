/**
 * User & Profile Types
 */

export interface User {
    _id: string;
    username: string;
    email: string;
    fullName?: string;
    phone?: string;
    gender?: 'male' | 'female' | 'other';
    address?: string;
    avatar?: string;
    role: string;
    createdAt: string;
    updatedAt: string;
}

export interface UserProfile extends User { }
