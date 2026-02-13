import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import * as api from '@/services/user';

// REGISTER
export const register = createAsyncThunk(
    'user/register',
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await api.registerAPI(data);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Register failed'
            );
        }
    }
);

// LOGIN
export const login = createAsyncThunk(
    'user/login',
    async (data: any, { rejectWithValue }) => {
        try {
            const res = await api.loginAPI(data);
            localStorage.setItem('token', res.data.token);
            return res.data.token;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Login failed'
            );
        }
    }
);

// FETCH PROFILE
export const fetchProfile = createAsyncThunk(
    'user/fetchProfile',
    async (_, { getState, rejectWithValue }: any) => {
        try {
            const token = getState().user.token;
            const res = await api.getProfileAPI(token);
            return res.data;
        } catch {
            return rejectWithValue('Fetch profile failed');
        }
    }
);

// UPDATE PROFILE
export const updateProfile = createAsyncThunk(
    'user/updateProfile',
    async (data: any, { getState, rejectWithValue }: any) => {
        try {
            const token = getState().user.token;
            const res = await api.updateProfileAPI(token, data);
            return res.data;
        } catch {
            return rejectWithValue('Update failed');
        }
    }
);

// UPLOAD AVATAR
export const uploadAvatar = createAsyncThunk(
    'user/uploadAvatar',
    async (formData: FormData, { getState, rejectWithValue }: any) => {
        try {
            const token = getState().user.token;
            const res = await api.uploadAvatarAPI(token, formData);
            return res.data;
        } catch (err: any) {
            return rejectWithValue(
                err.response?.data?.message || 'Upload avatar failed'
            );
        }
    }
);


const userSlice = createSlice({
    name: 'user',
    initialState: {
        token: localStorage.getItem('token'),
        profile: null,
    },
    reducers: {
        logout(state) {
            state.token = null;
            state.profile = null;
            localStorage.removeItem('token');
        },
    },

    extraReducers: (builder) => {
        builder.addCase(login.fulfilled, (state, action) => {
            state.token = action.payload as string;
        });

        builder.addCase(fetchProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });

        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.profile = action.payload;
        });

        builder.addCase(uploadAvatar.fulfilled, (state, action) => {
            state.profile = action.payload;
        });
    },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;
