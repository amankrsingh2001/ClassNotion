import { authApi } from "./api"
import { apiConnector } from "./apiConnector"

const {SENDOTP_API, SIGNUP_API} = authApi

export function otpApi(email, navigate){
    return async(dispatch) => {
        try {
            const response = await apiConnector('POST', SENDOTP_API, {
                email,
            })
            console.log(response,"Response")
            navigate('/verify-email')

        } catch (error) {
            console.log(error.message)
        }
    }
}

export function signup(data, navigate){
    return async (dispatch)=>{
        const {firstName, lastName, email, password, confirmPassword, contactNumber, accountType, otp} = data
        try {
            const response = await apiConnector("POST", SIGNUP_API ,{
                firstName,
                lastName,
                email,
                password,
                confirmPassword,
                contactNumber,
                accountType,
                otp
            } )
            console.log(response)
            if(!response.data.success){ 
                console.log('Failed to get Response')
            }
            navigate('/')
        } catch (error) {
            console.log(error.message) //No console
        }   
    }
}