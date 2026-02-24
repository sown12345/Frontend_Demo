import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/services/user';
import { setToken, getToken, removeToken } from '@/utils/auth';
import { handleApiError } from '@/utils/errorHandler';
import {
    RegisterRequest,
    LoginRequest,
    UpdateProfileRequest,
    User,
    UserState,
} from '@/types';

// REGISTER
export const register = createAsyncThunk<User, RegisterRequest, { rejectValue: string }>(
    'user/register',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.registerAPI(data);
            return res.data.data as User;
        } catch (err) {
            const errorInfo = handleApiError(err);
            return rejectWithValue(errorInfo.message);
        }
    }
);

// LOGIN
export const login = createAsyncThunk<string, LoginRequest, { rejectValue: string }>(
    'user/login',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.loginAPI(data);
            // backend wraps payload as { status, message, data }
            const token = res.data?.data?.token;
            if (!token) throw new Error('Token not found in response');
            setToken(token); // Lưu vào cookie thay vì localStorage
            return token;
        } catch (err) {
            const errorInfo = handleApiError(err);
            return rejectWithValue(errorInfo.message);
        }
    }
);

// FETCH PROFILE
export const fetchProfile = createAsyncThunk<User, void, { rejectValue: string }>(
    'user/fetchProfile',
    async (_, { rejectWithValue }) => {
        try {
            const res = await api.getProfileAPI();
            return res.data?.data as User;
        } catch (err) {
            const errorInfo = handleApiError(err);
            return rejectWithValue(errorInfo.message);
        }
    }
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk<User, UpdateProfileRequest, { rejectValue: string }>(
    'user/updateProfile',
    async (data, { rejectWithValue }) => {
        try {
            const res = await api.updateProfileAPI(data);
            return res.data?.data as User;
        } catch (err) {
            const errorInfo = handleApiError(err);
            return rejectWithValue(errorInfo.message);
        }
    }
);

// UPLOAD AVATAR
export const uploadAvatar = createAsyncThunk<User, FormData, { rejectValue: string }>(
    'user/uploadAvatar',
    async (formData, { rejectWithValue }) => {
        try {
            const res = await api.uploadAvatarAPI(formData);
            return res.data?.data as User;
        } catch (err) {
            const errorInfo = handleApiError(err);
            return rejectWithValue(errorInfo.message);
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: getToken(),
        profile: null,
        isLoading: false,
        error: null,
    } as UserState,
    reducers: {
        logout(state) {
            state.token = null;
            state.profile = null;
            state.error = null;
            removeToken();
        },
        clearError(state) {
            state.error = null;
        },
    },

    extraReducers: (builder) => {
        // Register
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state) => {
                state.isLoading = false;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Register failed';
            });

        // Login
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.token = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Login failed';
            });

        // Fetch Profile
        builder
            .addCase(fetchProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(fetchProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(fetchProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Fetch profile failed';
            });

        // Update Profile
        builder
            .addCase(updateProfile.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(updateProfile.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Update failed';
            });

        // Upload Avatar
        builder
            .addCase(uploadAvatar.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(uploadAvatar.fulfilled, (state, action) => {
                state.isLoading = false;
                state.profile = action.payload;
            })
            .addCase(uploadAvatar.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'Upload avatar failed';
            });
    },
});

export const { logout, clearError } = userSlice.actions;
export default userSlice.reducer;
