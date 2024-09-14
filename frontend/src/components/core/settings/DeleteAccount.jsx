import axios from "axios";
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from 'react-router-dom';
import { profileApi } from "../../../services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../slices/profileSlice";
import { setToken } from "../../../slices/authSlice";

const DeleteAccount = () =>{
    const dispatch = useDispatch()

    const navigate = useNavigate()
    const {  DELETE_USER_ACCOUNT } = profileApi

    const deleteAccountHandler = async() =>{
        try {
            const token = localStorage.getItem('token')
            const response = await axios.delete(DELETE_USER_ACCOUNT,{
                headers:{
                    'Authorization': `Bearer ${token}`
                }
            })
            localStorage.removeItem('user')
            localStorage.removeItem('token')
            dispatch(setUser(null))
            dispatch(setToken(null))
            navigate('/signup')
            toast.success("Your account is successfully Deleted")
        } catch (error) {
            toast.error("Failed to delete your account")
        }
        }

    const cancelHandler = () =>{
        navigate('/dashboard/my-profile')
    }
    
    return <div className="w-full flex flex-col">
        <div className="text-white bg-[#691432] rounded-md w-[80%] gap-4 flex lg:flex-row px-4 py-5" >
        <div className="p-4 text-[#EF4F6F] ">

        <RiDeleteBin6Line  className="drop-shadow-[0_35px_35px_rgba(194, 93, 108,0.25)]"/>
        </div>
        <div className="flex flex-col gap-4">
            <p className="text-[#F1F2FF] text-md font-semibold">Delete Account</p>
            <p className="text-[#F1F2FF] text-xs">Would you like to delete account?</p>
            <p className="text-[#F1F2FF] text-xs">This account contains Paid Courses. Deleting your account will remove all the contain associated with it</p>
            <p className="text-[#D43D63]">I want to delete my account.</p>
        </div>
       
        </div>
        <div className="flex w-[80%] p-4 gap-4 justify-end ">
        <button onClick={deleteAccountHandler} className="bg-yellow-100 text-black rounded-md px-3 py-4 ">Delete My Account</button>
        <button onClick={cancelHandler} className="bg-richblack-500 text-white rounded-md px-3 py-4">Cancel </button>
        </div>
        
    </div>
}

export default DeleteAccount