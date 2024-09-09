import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswordToken } from "../../../services/authApi";

const ResetPasswordTemp = () => {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const dispatch = useDispatch();

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setSentEmail));
  };

  return (
    <div className="w-screen h-screen bg-richblack-900 flex justify-center items-center">
      <div className="w-[32%] text-white  flex flex-col gap-4  justify-center items-center ">
        <div className="w-[75%] flex flex-col gap-2">
          {!sentEmail ? (
            <h1 className="text-3xl ">Reset your password</h1>
          ) : (
            <h1 className="text-3xl ">Check Your Email</h1>
          )}
          {!sentEmail ? (
            <p className="text-xs text-[#AFB2BF] pr-4">
              Have no fear. We’ll email you instructions to reset your password.
              If you dont have access to your email we can try account recovery
            </p>
          ) : (
            <p className="text-xs text-[#AFB2BF] pr-4">
              We have sent the reset email to your email {email}
            </p>
          )}
        </div>

        {!sentEmail && (
          <div className="w-[75%] ">
            <form
              className="flex flex-col gap-3"
              onSubmit={resetPasswordHandler}
            >
              <label className="text-sm " for="email">
                Email Address <span className="text-[#EF476F]"> *</span>
              </label>
              <input
                value={email}
                id="email"
                name="email"
                placeholder="mygmail@example.com"
                type="text"
                className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA]"
                onChange={(e) => setEmail(e.target.value)}
              />
              <button
                type="submit"
                className="text-center text-[12px] px-6 py-3 rounded-md font-bold text-richblack-600 bg-yellow-50 cursor-pointer`"
              >
                Reset Password
              </button>
            </form>
          </div>
        )}
        {sentEmail && (
          <button
            type="submit"
            className="md:w-[75%] text-center text-[12px] px-6 py-3 rounded-md font-bold text-richblack-600 bg-yellow-50 cursor-pointer`"
          >
            Resend Email
          </button>
        )}

        <div className="flex w-[75%]">
          <Link className="text-sm  " to="/login">
            <GoArrowLeft className="inline" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordTemp;
