import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../Common/IconBtn"
import axios from "axios"
import { useEffect, useState } from "react"
import { profileApi } from "../../../services/api"
import { setUser } from "../../../slices/profileSlice"




const Myprofile = () => {
    const {user} = useSelector(state =>state.profile)
    const [userData, setUserData] = useState({})
    const navigate = useNavigate()
    const { GET_USER_INFO } = profileApi
    const dispatch = useDispatch()



        const getUserDetails = async() =>{
            const token = localStorage.getItem('token')
            const response = await axios.get(GET_USER_INFO,{
                headers:{
                  "Authorization": `Bearer ${token}`
                }
              })
              console.log(response.data)
              localStorage.setItem('user',JSON.stringify(response.data.userDetail))
                dispatch(setUser(response.data.userDetail))
         
        }

        useEffect(()=>{
            getUserDetails()
        }, [])



    return <div className="text-white h-full flex flex-col items-start gap-8 justify-center  w-[80%] p-4 ">
             
                    <h1 className="text-4xl font-medium">My Profile</h1>

                    <div className="p-4  flex justify-between w-full  bg-richblack-800">
                        <div className="flex flex-row gap-2 items-center">
                            <img src={user?.image} alt={`profile-${user.firstName}`}
                                className="aspect-square w-[68px] p-2 rounded-full object-cover"
                            />
                            <div>
                            <p className="text-xl text-[#F1F2FF] font-medium">{user?.firstName +" "+ user?.lastName }</p>
                            <p className="text-[#838894] text-sm">{user.email}</p>
                            </div>
                        </div>
                        <IconBtn  text="Edit" onclick={()=>{navigate('/dashboard/setting')}}/>
                       
                    </div>

                        {/* section2 */}
                        <div className=" p-5 flex justify-between w-full bg-richblack-800">
                            <div className="flex flex-col">
                            <p className="text-xl text-[#F1F2FF] font-medium">About</p>
                            <p className="text-[#838894] text-sm">{user?.additionalDetails?.about || "Write something about Yourself"}</p>
                            </div>
                            
                           
                             {/*  {user?.additionalDetail?.about} fix the above one */}
                             <IconBtn text="Edit" onclick={()=>navigate('/dashboard/setting')}/>
                        </div>
                        {/* section 3 */}
                       
                        <div className="flex justify-between  flex-col gap-4 p-3 w-full  bg-richblack-800">
                            <div className="flex justify-between p-2 items-center">
                            <p className="text-xl text-[#F1F2FF] font-medium " >Personal Details</p>
                            <IconBtn text="Edit" onclick={()=>navigate('/dashboard/setting')}/>
                            </div>
                            <div className="grid grid-cols-2 gap-5 p-3">
                            <div className="flex flex-col gap-1">
                                <p className="text-md text-[#F1F2FF] font-medium">First Name</p>
                                <p className="text-[#838894] text-md">{user?.firstName || "First Name Value"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-md text-[#F1F2FF] font-medium">Last name</p>
                                <p className="text-[#838894] text-md">{user?.lastName || "Last Name Value"}</p>
                            </div>

                            <div className="flex flex-col gap-1" >
                                <p className="text-md text-[#F1F2FF] font-medium">Gender </p>
                                <p className="text-[#838894] text-md">{user?.additionalDetails?.gender || "Enter Your Gender"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-md text-[#F1F2FF] font-medium">Email </p>
                                <p className="text-[#838894] text-md">{user?.email || "Add your Email"}</p>
                            </div>
                      
                            <div className="flex flex-col gap-1">
                                <p className="text-md text-[#F1F2FF] font-medium">Phone Number</p>
                                <p className="text-[#838894] text-md"> {user?.additionalDetails?.contactNumber || "Add your contact"}</p>
                            </div>
                            <div className="flex flex-col gap-1">
                                <p className="text-md text-[#F1F2FF] font-medium">Date of Birth</p>
                                <p className="text-[#838894] text-md">{user?.additionalDetails?.dateOfBirth || "Add your Date Of Birth"}</p>
                            </div>

                            </div>
                           
                         
                        </div>

    </div>
}
export default Myprofile