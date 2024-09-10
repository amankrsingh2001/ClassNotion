import axios from "axios";
import { authApi } from "./api";
import { apiConnector } from "./apiConnector";
import { setSignUpData, setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import { signUpValue } from '../data/signUpData';
import toast from "react-hot-toast";


const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESET_PASSWORD_TOKEN, RESET_PASSWORD } = authApi;

export function otpApi(email, navigate) {
  return async (dispatch) => {
    try {
      const response = await axios.post(
        SENDOTP_API,
        { email },
        { withCredentials: true }
      );
      if(!response.data.success){
        toast.error('Failed to sent OTP')
      }
      toast.success('OTP sent successfully')
      navigate("/verify-email");
    } catch (error) {
      console.log(error); // remove console
      toast.error('Something Went Wrong')
    }
  };
}

export function signup(data, navigate) {
  return async (dispatch) => {
    const {
      firstName,
      lastName,
      email,
      password,
      confirmPassword,
      contactNumber,
      accountType,
      otp,
    } = data;
    try {
      const response = await axios.post(
        SIGNUP_API,
        {
          firstName,
          lastName,
          email,
          password,
          confirmPassword,
          contactNumber,
          accountType,
          otp,
        },
        { withCredentials: true }
      );

      if (!response.data.success) {
        console.log("Failed to get Response",response);
        toast.error('Failed to create User')
      }
      toast.success("User Created Successfully")
      navigate("/login");
    } catch (error) {
      console.log(error.message); //Remove console
      toast.error('Something Went Wrong ')
      navigate("/signup");
    }
  };
}

export function setLogin(data, navigate) {
  return async (dispatch) => {
    try {
      const { email, password } = data;
      const response = await axios.post(
        LOGIN_API,
        { email, password },
        {
          withCredentials: true,
        }
      );
      if(!response.data.success){
        throw new Error(response.data.message)
      }
      
      window.localStorage.setItem("token", response.data.token)
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      toast.success("Logged In Successfully")
      navigate('/')
    } catch (error) {
      console.log(error.message)
      toast.error('Failed to login')
      navigate('/login')
    }
  };
}

export function resetPasswordToken(email, setSentEmail){
  return async(dispatch)=>{
    try {
      const response =await axios.post(RESET_PASSWORD_TOKEN, {email})
      console.log(response)
      setSentEmail(true)
      if(!response.data.success){
        toast.error('Failed to sent Email')
      }
      toast.success('Email sent successfully')
    } catch (error) {
        console.log(error) //remove console
        toast.error("Something Went Wrong")
    }
   
  }
}

export function resetPassword(password, confirmPassword, token, navigate){
  return async(dispatch)=>{
      try {
        const response = await axios.post(RESET_PASSWORD, {password, confirmPassword, token})

        if(!response.data.success){
          toast.error('Failed to change password')
          throw new Error("Failed to change password")
        }
        toast.success('Reset password successfully')
        navigate('/confirmChange')
      } catch (error) {
          console.log(error, error.message) //remove console
          toast.error('Something went wrong')
      }
  } 
}

export function logOut(navigate){
  return async(dispatch)=>{
    try {
      dispatch(setToken(null))
      dispatch(setSignUpData(null))
      dispatch(setUser(null))
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.success("Logged out successfully")
      navigate('/')
    } catch (error) {
      console.log(error)
      toast.error("Something went wrong")
    }
  }
}