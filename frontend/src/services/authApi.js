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
      navigate("/verify-email");
    } catch (error) {
      console.log(error);
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
      }
      navigate("/login");
    } catch (error) {
      console.log(error.message); //No console
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
      toast.success("Logged In Successfully")

      window.localStorage.setItem("token", response.data.token)
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
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
    } catch (error) {
        console.log(error)
    }
   
  }
}

export function resetPassword(password, confirmPassword, token, navigate){
  return async(dispatch)=>{
      try {
        const response = await axios.post(RESET_PASSWORD, {password, confirmPassword, token})

        if(!response.data.success){
          throw new Error("Failed to change password")
        }
        navigate('/confirmChange')
      } catch (error) {
          console.log(error, error.message)
      }
  } 
}

export function logOut(navigate){
  return async(dispatch)=>{
    dispatch(setToken(null))
    dispatch(setSignUpData(null))
    dispatch(setUser(null))
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    navigate('/')
  }
}