// User roles
const ROLES = {
    ADMIN: 'admin',
    USER: 'user',
};

// User genders
const GENDERS = {
    MALE: 'male',
    FEMALE: 'female',
    OTHER: 'other',
};

// HTTP status codes
const HTTP_STATUS = {
    OK: 200,
    CREATED: 201,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    CONFLICT: 409,
    INTERNAL_ERROR: 500,
};

// Error messages
const ERROR_MESSAGES = {
    USER_NOT_FOUND: 'User không tồn tại',
    USER_EXIST: 'User đã tồn tại',
    INVALID_PASSWORD: 'Mật khẩu sai',
    INVALID_TOKEN: 'Token không hợp lệ',
    UNAUTHORIZED: 'Chưa đăng nhập',
    FORBIDDEN: 'Không có quyền truy cập',
    SERVER_ERROR: 'Lỗi server',
    NO_FILE_UPLOAD: 'Không có file upload',
    INVALID_FILE: 'File không hợp lệ',
};

// Success messages
const SUCCESS_MESSAGES = {
    REGISTER_SUCCESS: 'Đăng ký thành công',
    LOGIN_SUCCESS: 'Đăng nhập thành công',
    LOGOUT_SUCCESS: 'Đăng xuất thành công',
    UPDATE_SUCCESS: 'Cập nhật thành công',
    UPLOAD_SUCCESS: 'Tải lên thành công',
};

// File upload config
const UPLOAD_CONFIG = {
    MAX_FILE_SIZE: 2 * 1024 * 1024, // 2MB
    ALLOWED_MIME_TYPES: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    UPLOAD_DIR: 'uploads',
};

// API prefix (can be overridden by process.env.API_PREFIX)
const API_PREFIX = process.env.API_PREFIX || '/api';
module.exports = {
    ROLES,
    GENDERS,
    HTTP_STATUS,
    ERROR_MESSAGES,
    SUCCESS_MESSAGES,
    UPLOAD_CONFIG,
    API_PREFIX,
};
