/**
 * Redux Store Types
 */

import { User } from './user';

export interface UserState {
    token: string | null;
    profile: User | null;
    isLoading: boolean;
    error: string | null;
}

export interface RootState {
    user: UserState;
}
