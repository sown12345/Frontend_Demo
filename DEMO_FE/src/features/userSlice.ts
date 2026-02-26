import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getToken, removeToken } from '@/utils/auth';
import { RegisterRequest, LoginRequest, UpdateProfileRequest, User, UserState } from '@/types';

// User slice chỉ quản lý state đồng bộ.
// Side-effects (API, redirect, toast) được xử lý trong saga.
const userSlice = createSlice({
    name: 'user',
    initialState: {
        // Khởi tạo token từ cookie để giữ trạng thái đăng nhập sau khi reload.
        token: getToken(),
        profile: null,
        profileStatus: 'idle',
        isLoading: false,
        error: null,
    } as UserState,
    reducers: {
        // Pattern chung: request bật loading, success cập nhật dữ liệu, failure cập nhật lỗi.
        registerRequest(state, _action: PayloadAction<RegisterRequest>) {
            state.isLoading = true;
            state.error = null;
        },
        registerSuccess(state) {
            state.isLoading = false;
        },
        registerFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload || 'Register failed';
        },
        loginRequest(state, _action: PayloadAction<LoginRequest>) {
            state.isLoading = true;
            state.error = null;
        },
        loginSuccess(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.token = action.payload;
        },
        loginFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload || 'Login failed';
        },
        fetchProfileRequest(state) {
            state.isLoading = true;
            state.profileStatus = 'loading';
            state.error = null;
        },
        fetchProfileSuccess(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.profile = action.payload;
            state.profileStatus = 'succeeded';
        },
        fetchProfileFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.profileStatus = 'failed';
            state.error = action.payload || 'Fetch profile failed';
        },
        updateProfileRequest(state, _action: PayloadAction<UpdateProfileRequest>) {
            state.isLoading = true;
            state.error = null;
        },
        updateProfileSuccess(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.profile = action.payload;
        },
        updateProfileFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload || 'Update failed';
        },
        uploadAvatarRequest(state, _action: PayloadAction<FormData>) {
            state.isLoading = true;
            state.error = null;
        },
        uploadAvatarSuccess(state, action: PayloadAction<User>) {
            state.isLoading = false;
            state.profile = action.payload;
        },
        uploadAvatarFailure(state, action: PayloadAction<string>) {
            state.isLoading = false;
            state.error = action.payload || 'Upload avatar failed';
        },
        // Logout reset state user và xóa token khỏi cookie.
        logout(state) {
            state.token = null;
            state.profile = null;
            state.profileStatus = 'idle';
            state.error = null;
            removeToken();
        },
        clearError(state) {
            state.error = null;
        },
    },
});

export const {
    registerRequest,
    registerSuccess,
    registerFailure,
    loginRequest,
    loginSuccess,
    loginFailure,
    fetchProfileRequest,
    fetchProfileSuccess,
    fetchProfileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    updateProfileFailure,
    uploadAvatarRequest,
    uploadAvatarSuccess,
    uploadAvatarFailure,
    logout,
    clearError,
} = userSlice.actions;
export default userSlice.reducer;
