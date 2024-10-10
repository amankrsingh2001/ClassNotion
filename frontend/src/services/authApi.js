import axios from "axios";
import { authApi, profileApi } from "./api";
import { setLoading, setSignUpData, setToken } from "../slices/authSlice";
import { setUser } from "../slices/profileSlice";
import toast from "react-hot-toast";
import { resetCart } from "../slices/cartSlice";


const { SENDOTP_API, SIGNUP_API, LOGIN_API, RESET_PASSWORD_TOKEN, RESET_PASSWORD, CHANGE_PASSWORD } = authApi;
const {  UPDATE_DISPLAY_API, UPDATE_ABOUT_API } = profileApi


export function otpApi(email, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response = await axios.post(
        SENDOTP_API,
        { email },
        { withCredentials: true }
      );

      toast.success('OTP sent successfully')
      navigate("/verify-email");
    } catch (error) {
      toast.error(error.response.data.message)
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  };
}



export function signup(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
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
        toast.error('')
      }
      toast.success("User Created Successfully")
      navigate("/login");
    } catch (error) {
      toast.error('Something Went Wrong ')
      navigate("/signup");
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  };
}




export function setLogin(data, navigate) {
  return async (dispatch) => {
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const { email, password } = data;
      const response = await axios.post(
        LOGIN_API,
        { email, password },
        {
          withCredentials: true,
        }
      );
      window.localStorage.setItem("token", response.data.token)
      window.localStorage.setItem("user",JSON.stringify(response.data.user))
      dispatch(setToken(response.data.token))
      dispatch(setUser(response.data.user))
      toast.success("Logged In Successfully")
      navigate('/')
    } catch (error) {
      toast.error(error.response.data.message)
      navigate('/login')
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  };
}

export function resetPasswordToken(email, setSentEmail){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const response =await axios.post(RESET_PASSWORD_TOKEN, {email})
      setSentEmail(true)
      if(!response.data.success){
        toast.error('Failed to sent Email')
      }
      toast.success('Email sent successfully')
    } catch (error) {
        toast.error("Something Went Wrong")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function resetPassword(password, confirmPassword, token, navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
      try {
        const response = await axios.post(RESET_PASSWORD, {password, confirmPassword, token})

        if(!response.data.success){
          toast.error('Failed to change password')
          throw new Error("Failed to change password")
        }
        toast.success('Reset password successfully')
        navigate('/confirmChange')
      } catch (error) {
          toast.error('Something went wrong')
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
  } 
}

export function logOut(navigate){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      dispatch(setToken(null))
      dispatch(setSignUpData(null))
      dispatch(setUser(null))
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      toast.success("Logged out successfully")
      navigate('/')
    } catch (error) {
      toast.error("Something went wrong")
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function UpdateDispayPicture(formData){
    return async(dispatch)=>{
      const toastId = toast.loading("Loading...")
        dispatch(setLoading(true))
      try{
        
        const File = formData
        const token = localStorage.getItem('token')
        const response = await axios.put(UPDATE_DISPLAY_API, File,{
          headers:{
            'Authorization': `Bearer ${token}`,
          }
        })
        if(!response.data.success){
          toast.error('Failed to update Profile')
        }
        const data = JSON.parse(localStorage.getItem('user'))
        data.image = response.data.data.image
        localStorage.setItem('user',JSON.stringify(data));
        toast.success("Profile updated")
      }catch(error){
        toast.error("Something went wrong")
      }
      dispatch(setLoading(false))
      toast.dismiss(toastId)
    }
    
} 

export function updateAbout(aboutData){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const {
        contactNumber,
        about,
        dateOfBirth,
        profession,
        gender
      } = aboutData
      const token = localStorage.getItem('token')
        const response = await axios.put(UPDATE_ABOUT_API,{
          contactNumber,
          about,
          dateOfBirth,
          profession,
          gender
        } , {
          headers:{
            'Authorization': `Bearer ${token}`,
          }
        })
        if(response.data.success){
          toast.success("Successfully Updated your About")
        }
    } catch (error) {
      toast.error('Something went Wrong')
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}

export function changeNewPassword(formData){
  return async(dispatch)=>{
    const toastId = toast.loading("Loading...")
    dispatch(setLoading(true))
    try {
      const {password, newPassword} = formData;
      const token = localStorage.getItem('token')
        const response = await axios.post(CHANGE_PASSWORD ,{
          password,
          newPassword
        },{
          headers:{
            "Authorization": `Bearer ${token}`
          }
        })
        if(response.data.success){
          toast.success("Updated Password successfully")
        }
    } catch (error) {
        toast.error('Something went wrong')
    }
    dispatch(setLoading(false))
    toast.dismiss(toastId)
  }
}