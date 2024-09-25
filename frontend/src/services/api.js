const BASE_URL = import.meta.env.VITE_BASE_URL

export const categories = {
    CATEGORIES_API: BASE_URL + "course/showAllCategories",
    CATALOGPAGEDATA_API : BASE_URL + 'course/getCategoryPageDetails'
} 

export const authApi = {
    SENDOTP_API :BASE_URL + 'auth/sendotp',
    SIGNUP_API :BASE_URL + 'auth/signup',
    LOGIN_API: BASE_URL + 'auth/login',
    RESET_PASSWORD_TOKEN : BASE_URL + "auth/reset-password-token",
    RESET_PASSWORD: BASE_URL + 'auth/reset-password',
    CHANGE_PASSWORD: BASE_URL + 'auth/changepassword'
}

export const profileApi = {
    UPDATE_DISPLAY_API : BASE_URL+ "profile/updateDisplayPicture",
    UPDATE_ABOUT_API : BASE_URL + "profile/updateProfile",
    GET_USER_INFO : BASE_URL + "profile/getUserDetails",
    DELETE_USER_ACCOUNT: BASE_URL + "profile/deleteProfile",
    GET_ENROLLED_COURSES : BASE_URL + "profile/getEnrolledCourses"
}

export const courseApi = {
    GET_AVERAGE_RATING : BASE_URL + "course/getAverageRating",
    GET_ALL_COURSE_CATEGORY :BASE_URL + 'course/showAllCategories',
    CREATE_COURSE_API : BASE_URL + 'course/createCourse',
    EDIT_COURSE_API:BASE_URL+"course/editCourse",
    DELETE_COURSE_API:  BASE_URL + 'course/deleteCourse',
    COURSE_GET_FULL_COURSE_DETAILS: BASE_URL + 'course/getCourseDetails',
    CREATE_SECTION_API :BASE_URL + 'course/addSection',
    UPDATE_COURSE_SECTION_API : BASE_URL + 'course/updateSection',
    DELETE_COURSE_SECTION_API : BASE_URL + 'course/deleteSection',
    DELETE_COURSE_SUB_SECTION_API : BASE_URL + 'course/deleteSubSection',
    CREATE_SUB_SECTION_API : BASE_URL + 'course/addSubSection',
    UPDATE_SUB_SECTION_API :  BASE_URL + 'course/updateSubSection',
    GET_INSTRUCTOR_COURSES : BASE_URL + 'course/getInstructorCourses'
}

export const studentEndpoints = {
    COURSE_PAYMENT_APP :BASE_URL + 'payment/capturePayment',
    COURSE_VERIFY_API : BASE_URL + 'payment/verifyPayment',
    SEND_PAYMENT_SUCCESS_EMAIL_API : BASE_URL + 'payment/sendPaymentSuccessEmail'
}