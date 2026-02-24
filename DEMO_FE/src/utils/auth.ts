/**
 * Cookie Management Utilities
 * Dùng JavaScript cookies với secure flags
 */

const TOKEN_KEY = 'auth_token';

/**
 * Lưu token vào cookie
 * @param token - JWT token
 * @param days - Số ngày lưu (mặc định 7 ngày)
 */
export const setToken = (token: string, days: number = 7): void => {
    const expires = new Date();
    expires.setTime(expires.getTime() + days * 24 * 60 * 60 * 1000);

    // Set cookie với secure flags
    // Sử dụng SameSite=Lax để tương thích với localhost
    // Secure chỉ hoạt động trên HTTPS (trong production)
    const isProduction = process.env.NODE_ENV === 'production';
    const sameSite = isProduction ? 'SameSite=Strict' : 'SameSite=Lax';
    const secureFlag = isProduction ? 'Secure;' : '';

    const cookieString = `${TOKEN_KEY}=${token}; expires=${expires.toUTCString()}; path=/; ${sameSite}; ${secureFlag}`;
    document.cookie = cookieString;
};

/**
 * Lấy token từ cookie
 * @returns token hoặc null nếu không có
 */
export const getToken = (): string | null => {
    const name = TOKEN_KEY + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
        let cookie = cookieArray[i].trim();
        if (cookie.indexOf(name) === 0) {
            const token = cookie.substring(name.length, cookie.length);
            return token;
        }
    }

    return null;
};

/**
 * Xóa token khỏi cookie
 */
export const removeToken = (): void => {
    document.cookie = `${TOKEN_KEY}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; SameSite=Lax;`;
};

/**
 * Kiểm tra user đã đăng nhập hay chưa
 * @returns true nếu có token
 */
export const isAuthenticated = (): boolean => {
    return getToken() !== null;
};
