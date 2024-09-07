import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { toast } from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";
import { signup } from "../../../services/authApi";
import { useDispatch, useSelector } from "react-redux";


const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
    const {signupData} = useSelector(state=>state.auth)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(()=>{

        if(!signupData){
            navigate('/signup')
        }

    },[])

  const submitHandler = (e) =>{
    e.preventDefault();
    const data = {...signupData, otp}
    dispatch(signup(data,navigate))
  }


  return (
    <div className="min-h-[calc(100vh-3.5rem)] w-full flex items-center justify-center p-10">
      <div className="w-[40%] px-14 gap-2 flex py-10 flex-col items-start">
        <h1 className="text-[#F1F2FF] text-3xl">Verify email</h1>
        <p className="text-[#AFB2BF]">
          A verification code has been sent to you.Enter the code below
        </p>
        <div className="flex w-full py-4">
          <form onSubmit={submitHandler}>
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="-"
                  style={{
                    boxShadow: "inset 0px -1px 0px rgba(255, 255, 255, 0.18)",
                  }}
                  className="w-[48px] lg:w-[60px] border-0 bg-richblack-800 rounded-[0.5rem] text-richblack-5 aspect-square text-center focus:border-0 focus:outline-2 focus:outline-yellow-50"
                />
              )}
              containerStyle={{
                justifyContent: "space-between",
                gap: "0 6px",
              }}
            />
            <button
              type="submit"
              className="w-full bg-yellow-50 py-[12px] px-[12px] rounded-[8px] mt-6 font-medium text-richblack-900"
            >
              Verify Email
            </button>
          </form>
        </div>
        <div className="flex w-full justify-between">
        <Link to='/signup'  className="w-[45%] items-center justify-start gap-2 flex">
                <BiArrowBack className="text-white text-center"/>
                <p className=" text-white">Back to login</p>
         </Link>

         <p className="w-[25%]mr-12">Resend It</p>

        </div>
           


      </div>
    </div>
  );
};

export default VerifyEmail;
