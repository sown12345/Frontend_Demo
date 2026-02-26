/**
 * Redux Store Types
 */

import { User } from './user';
import type { RootState as StoreRootState } from '@/store';

export type AsyncStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface UserState {
    token: string | null;
    profile: User | null;
    profileStatus: AsyncStatus;
    isLoading: boolean;
    error: string | null;
}

export type RootState = StoreRootState;
