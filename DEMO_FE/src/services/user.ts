import axios from 'axios';

const API = 'http://localhost:5000/api';

export const registerAPI = (data: any) =>
    axios.post(`${API}/register`, data);

export const loginAPI = (data: any) =>
    axios.post(`${API}/login`, data);

export const getProfileAPI = (token: string) =>
    axios.get(`${API}/profile`, {
        headers: { Authorization: token },
    });

export const updateProfileAPI = (token: string, data: any) =>
    axios.put(`${API}/profile`, data, {
        headers: { Authorization: token },
    });

export const uploadAvatarAPI = (token: string, formData: FormData) =>
    axios.put(`${API}/avatar`, formData, {
        headers: {
            Authorization: token,
            'Content-Type': 'multipart/form-data',
        },
    });
