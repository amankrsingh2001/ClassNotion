import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { useState } from "react";
import { FaEyeSlash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../services/authApi";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConirmPassword] = useState(true);
  const location = useLocation();

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split('/').at(-1);

    const { password, confirmPassword } = input;
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex justify-center items-center">
      <div className="p-20 flex flex-col gap-4 ">
        <h1 className="text-[#F1F2FF] text-4xl font-bold">
          Choose new Password
        </h1>
        <p className="text-[#AFB2BF] text-md">
          Almost done. Enter your new password and youre all set.
        </p>
        <div className=" ">
          <form onSubmit={submitHandler} className="flex flex-col gap-4">
            <div className="flex flex-col relative ">
              <label
                className=" py-[6px] text-white text-xl font-semibold"
                for="password"
              >
                New Password<span className="text-[#EF476F]"> *</span>
              </label>
              <input
                value={input.password}
                onChange={handlePasswordChange}
                id="password"
                name="password"
                type={`${showPassword ? "password" : "text"}`}
                placeholder="Enter your password"
                className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA]"
              />
              <FaEyeSlash
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#AFB2BF] cursor-pointer text-xl absolute right-6 bottom-[15px]"
              />
            </div>

            <div className="flex flex-col relative ">
              <label
                className=" py-[6px] text-white text-xl font-semibold"
                for="confirmPassword"
              >
                Confirm New Password<span className="text-[#EF476F]"> *</span>
              </label>
              <input
                value={input.confirmPassword}
                onChange={handlePasswordChange}
                id="confirmPassword"
                name="confirmPassword"
                type={`${showConfirmPassword ? "password" : "text"}`}
                placeholder="Enter your password"
                className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA]"
              />
              <FaEyeSlash
                onClick={() => setShowConirmPassword(!showConfirmPassword)}
                className="text-[#AFB2BF] cursor-pointer text-xl absolute right-6 bottom-[15px]"
              />
            </div>
            <button
              type="submit"
              className="text-center text-[12px]  py-3 mt-2 rounded-md font-bold text-richblack-600 bg-yellow-50 cursor-pointer"
            >
              Update Password
            </button>
          </form>
        </div>
        <div className="flex w-[75%]">
          <Link className="text-[20px]  text-white " to="/login">
            <GoArrowLeft className="inline " /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
};
export default UpdatePassword;
