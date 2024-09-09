const BASE_URL = import.meta.env.VITE_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "course/showAllCategories"
} 

export const authApi = {
    SENDOTP_API :BASE_URL + 'auth/sendotp',
    SIGNUP_API :BASE_URL + 'auth/signup',
    LOGIN_API: BASE_URL + 'auth/login',
    RESET_PASSWORD_TOKEN : BASE_URL + "auth/reset-password-token",
    RESET_PASSWORD: BASE_URL + 'auth/reset-password'
}