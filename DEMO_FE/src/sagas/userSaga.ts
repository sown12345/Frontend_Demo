import { message } from 'antd';
import { PayloadAction } from '@reduxjs/toolkit';
import { all, call, put, takeLatest } from 'redux-saga/effects';
import { AxiosResponse } from 'axios';
import { history } from 'umi';
import * as api from '@/services/user';
import { setToken } from '@/utils/auth';
import { handleApiError } from '@/utils/errorHandler';
import {
    fetchProfileFailure,
    fetchProfileRequest,
    fetchProfileSuccess,
    loginFailure,
    loginRequest,
    loginSuccess,
    registerFailure,
    registerRequest,
    registerSuccess,
    updateProfileFailure,
    updateProfileRequest,
    updateProfileSuccess,
    uploadAvatarFailure,
    uploadAvatarRequest,
    uploadAvatarSuccess,
} from '@/features/userSlice';
import { LoginRequest, RegisterRequest, UpdateProfileRequest, User } from '@/types';

type ApiDataResponse<T> = AxiosResponse<{ data?: T }>;

// Worker saga: xử lý nghiệp vụ đăng ký khi nhận registerRequest.
function* handleRegister(action: PayloadAction<RegisterRequest>) {
    try {
        yield call(api.registerAPI, action.payload);
        yield put(registerSuccess());
        yield call(message.success, 'Đăng ký thành công');
        history.push('/login');
    } catch (error) {
        const errorInfo = handleApiError(error);
        yield put(registerFailure(errorInfo.message));
    }
}

function* handleLogin(action: PayloadAction<LoginRequest>) {
    try {
        const response: ApiDataResponse<{ token?: string }> = yield call(api.loginAPI, action.payload);
        const token = response.data?.data?.token;

        if (!token) {
            throw new Error('Token not found in response');
        }

        setToken(token);
        yield put(loginSuccess(token));
        yield call(message.success, 'Đăng nhập thành công');
        history.push('/profile');
    } catch (error) {
        const errorInfo = handleApiError(error);
        yield put(loginFailure(errorInfo.message));
    }
}

function* handleFetchProfile() {
    try {
        const response: ApiDataResponse<User> = yield call(api.getProfileAPI);
        const profile = response.data?.data as User;
        yield put(fetchProfileSuccess(profile));
    } catch (error) {
        const errorInfo = handleApiError(error);
        yield put(fetchProfileFailure(errorInfo.message));
    }
}

function* handleUpdateProfile(action: PayloadAction<UpdateProfileRequest>) {
    try {
        const response: ApiDataResponse<User> = yield call(api.updateProfileAPI, action.payload);
        const profile = response.data?.data as User;
        yield put(updateProfileSuccess(profile));
        yield call(message.success, 'Cập nhật thông tin thành công');
    } catch (error) {
        const errorInfo = handleApiError(error);
        yield put(updateProfileFailure(errorInfo.message));
    }
}

function* handleUploadAvatar(action: PayloadAction<FormData>) {
    try {
        const response: ApiDataResponse<User> = yield call(api.uploadAvatarAPI, action.payload);
        const profile = response.data?.data as User;
        yield put(uploadAvatarSuccess(profile));
        yield call(message.success, 'Cập nhật ảnh đại diện thành công');
    } catch (error) {
        const errorInfo = handleApiError(error);
        yield put(uploadAvatarFailure(errorInfo.message));
    }
}

// Watcher saga: lắng nghe action request và chuyển cho worker tương ứng.
export function* userSaga() {
    yield all([
        takeLatest(registerRequest.type, handleRegister),
        takeLatest(loginRequest.type, handleLogin),
        takeLatest(fetchProfileRequest.type, handleFetchProfile),
        takeLatest(updateProfileRequest.type, handleUpdateProfile),
        takeLatest(uploadAvatarRequest.type, handleUploadAvatar),
    ]);
}
