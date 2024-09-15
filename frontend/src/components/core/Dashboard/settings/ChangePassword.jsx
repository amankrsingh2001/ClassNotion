import {  useState } from "react"
import toast from "react-hot-toast";
import { FaRegEye } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { changeNewPassword } from "../../../../services/authApi";



const ChangePassword = () =>{
    const dispatch = useDispatch()
    const [currentPassword, setCurrentPassword] = useState(false)
    const [changePassword, setChagnePassword] = useState(false)
    const [formData, setFormData] = useState({
        password:'',
        newPassword:''
    })

    const onChangeHandler = (e) =>{
        setFormData((prev)=>({...prev,[e.target.name]:e.target.value}))
    }

  const currentPasswordHandler = () =>{
    setCurrentPassword(!currentPassword)
}

const changePasswordHandler= () =>{
    setChagnePassword(!changePassword)
}

const submitHandler = (e)=>{
    e.preventDefault();
    if(formData.password === formData.newPassword){
        toast.error('New password cannot be same as Current password')
        return;
    }
    console.log(formData)
    dispatch(changeNewPassword(formData))
    
}


//  className="f"
    return <div className="lg:w-[80%] rounded-md flex flex-col items-center py-6 px-4 gap-6  bg-richblack-800">
        <form onSubmit={submitHandler} className="flex flex-col justify-between w-full gap-7 p-4 ">

          <div className="flex  justify-between ">
          <div className="flex flex-col w-[42%] gap-1 relative">
                  <label className="text-[#F1F2FF]" htmlFor="password">Current Password</label>
                  <input onChange={onChangeHandler} type={`${!currentPassword?"password":"text"}`} name="password" id="password" placeholder="Current Password"  className="p-3 bg-richblack-600 outline-none rounded-lg text-[#c4c8d5]"/>
                  <FaRegEye onClick={currentPasswordHandler}
                    className="cursor-pointer absolute text-xl right-2 bottom-4 text-[#999DAA]"
                  />
              </div>

              <div className="flex flex-col w-[42%] gap-1 relative">
              <label className="text-[#F1F2FF]" htmlFor="newPassword">Change Password</label>
                  <input onChange={onChangeHandler} type={`${!changePassword?"password":"text"}`} name="newPassword" id="newPassword" placeholder="New password" className="p-3 bg-richblack-600 outline-none rounded-lg text-[#c4c8d5]"/>
                  <FaRegEye onClick={changePasswordHandler}
                    className="cursor-pointer absolute text-xl right-2 bottom-4 text-[#999DAA]"
                  />
              </div>
          </div>
       
            <button className="text-black font-semibold  bg-yellow-200 py-3 rounded-md" type="submit">Change Passowrd</button>
          </form>

    </div>
}
export default ChangePassword