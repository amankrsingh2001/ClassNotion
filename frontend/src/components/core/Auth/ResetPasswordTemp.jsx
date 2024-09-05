import { Link } from "react-router-dom"
import Cpabutton from "../HomePage/Cpabutton"
import { GoArrowLeft } from "react-icons/go";

const ResetPasswordTemp = () =>{
    return <div className="w-screen h-screen bg-richblack-900 flex justify-center items-center">
                <div className="w-[32%] text-white  flex flex-col gap-8  justify-center items-center ">
                  <div className="w-[75%] flex flex-col gap-2">
                  <h1 className="text-3xl ">Reset your password</h1>
                  <p className="text-xs text-[#AFB2BF] pr-4">Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery</p>
                  </div>

                    <div className="w-[75%]">
                           <form className="flex flex-col gap-2">
                            <label className="text-sm " for="email" >
                                    Email Address <span className="text-[#EF476F]"> *</span>
                                </label>
                                <input
                                        id="email"
                                        name="email"
                                        placeholder="mygmail@example.com"
                                        type="text"
                                        className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA]"
                                    />
                           </form>
                    </div>

                    <div className="flex w-[75%] gap-2 flex-col">
                        <Cpabutton active={'true'}>
                            Reset Password
                        </Cpabutton>
                        <Link className="text-sm  " to='/login'>
                        <GoArrowLeft className="inline" /> Back to Login
                        </Link>
                    </div>


                </div>
    </div>
}

export default ResetPasswordTemp