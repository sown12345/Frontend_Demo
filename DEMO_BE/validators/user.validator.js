// Validate email format
exports.isValidEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

// Validate username (min 3 chars, alphanumeric + underscore)
exports.isValidUsername = (username) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    return usernameRegex.test(username);
};

// Validate password (min 6 chars)
exports.isValidPassword = (password) => {
    return password && password.length >= 6;
};

// Validate phone number (Vietnamese format)
exports.isValidPhone = (phone) => {
    const phoneRegex = /^(?:\+84|0)[1-9]\d{8}$/;
    return phoneRegex.test(phone);
};

// Validate register input
exports.validateRegister = (data) => {
    const { username, email, password, fullName } = data;
    
    if (!username || !this.isValidUsername(username)) {
        return { valid: false, message: 'Username phải từ 3 ký tự, chỉ chứa chữ, số và _' };
    }
    
    if (!email || !this.isValidEmail(email)) {
        return { valid: false, message: 'Email không hợp lệ' };
    }
    
    if (!password || !this.isValidPassword(password)) {
        return { valid: false, message: 'Mật khẩu phải từ 6 ký tự trở lên' };
    }
    
    if (!fullName || fullName.trim().length === 0) {
        return { valid: false, message: 'Họ và tên không được để trống' };
    }
    
    return { valid: true };
};

// Validate login input
exports.validateLogin = (data) => {
    const { username, password } = data;
    
    if (!username || !password) {
        return { valid: false, message: 'Username và password không được để trống' };
    }
    
    return { valid: true };
};

// Validate update profile input
exports.validateUpdateProfile = (data) => {
    if (data.email && !this.isValidEmail(data.email)) {
        return { valid: false, message: 'Email không hợp lệ' };
    }
    
    if (data.phone && !this.isValidPhone(data.phone)) {
        return { valid: false, message: 'Số điện thoại không hợp lệ' };
    }
    
    return { valid: true };
};
