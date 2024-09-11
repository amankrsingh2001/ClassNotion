import React, { useEffect, useState } from "react";
import { HilightText } from "../HomePage/HilightText";
import {  useNavigate } from "react-router-dom";
import Cpabutton from "../HomePage/Cpabutton";
import { signUpValue } from "../../../data/signUpData";
import { FaRegEye } from "react-icons/fa";
import { value } from "../../../data/signUpData";
import { useDispatch } from "react-redux";
import { setSignUpData } from '../../../slices/authSlice'
import { toast } from 'react-hot-toast';
import { otpApi } from "../../../services/authApi";

const SignUpTemp = ({ frame, code }) => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const navigate = useNavigate()
  const dispatch = useDispatch();

  const chagneActive = (e, index) => {
    setActive(index);
  };

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const newValue = signUpValue.filter((it, index) => {
      return index === active;
    });
    setData(newValue[0]);
  }, [active]);


  const submitHandler = (e) => {
    e.preventDefault();
    console.log('clikced')
    const signUpData = { ...formData, accountType: value[active].value };

    const {password, confirmPassword} = signUpData;
   if(password !== confirmPassword){
      toast.error("false")
      return
   }

   
    dispatch(setSignUpData(signUpData));
    dispatch(otpApi(signUpData.email, navigate))
 
  };



  const confirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  if (!data) return;

  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex items-center justify-center">
      <div className="w-11/12 flex justify-around items-center ">
        {/**Section 1 */}
        <div className=" w-[40%] px-12  text-white ">
          <div className="p-2 flex flex-col">
            <h1 className="text-3xl mb-4">{data.title}</h1>
            <p className="text-md w-full text-[#AFB2BF]">
              {data.description}
              <HilightText
                font={"font-edu-sa"}
                text={"Education to future-proof your carrer"}
              />
            </p>
          </div>
          <div className="flex items-start py-4 ">
            <div className="flex bg-[#2C333F] justify-between rounded-full py-[2px] px-1 gap-4 shadow-[0px_2px_1px_#434744]  border-[#2C333F]">
              {value.map((element, index) => {
                return (
                  <p
                    onClick={(e) => chagneActive(e, index)}
                    className={`py-2 px-4 cursor-pointer ${
                      active === index
                        ? "bg-richblack-900 text-white"
                        : "text-[#999DAA] bg-[2C333F]"
                    } hover:bg-black rounded-full`}
                    key={index}
                  >
                    {element.value}
                  </p>
                );
              })}
            </div>
          </div>

          <form onSubmit={submitHandler}>
            <div className="w-full flex  py-3 flex-col">
              <div className="flex md:flex-row flex-col justify-between ">
                <div className="flex flex-col md:w-[47%]">
                  <label htmlFor="firstName " className="text-sm py-[6px]">
                    First Name
                  </label>
                  <input
                    onChange={changeHandler}
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA] md:w-full"
                  />
                </div>

                <div className="flex flex-col md:w-[50%] ">
                  <label htmlFor="lastName" className="text-sm py-[6px]">
                    Last Name
                  </label>
                  <input
                    onChange={changeHandler}
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA] md:w-full"
                  />
                </div>
              </div>

              <div className="flex flex-col ">
                <label className="text-sm py-[6px]" htmlFor="email">
                  Email Address <span className="text-[#EF476F]"> *</span>
                </label>
                <input
                  onChange={changeHandler}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="text"
                  className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA]"
                  autoComplete="email"
                />
              </div>

              <div className="flex flex-col">
                <label className="text-sm py-[6px]" htmlFor="contactNumber">
                  Phone Number <span className="text-[#EF476F]"> *</span>
                </label>
                <div className="flex md:flex-row flex-col gap-2 justify-between">
                  <div className="md:w-[18%]">
                    <select
                      className="bg-[#161D29]  md:w-full w-[60%]  text-[#999DAA] rounded-lg text-md text-center py-3 md:h-full outline-none"
                      defaultValue="+91"
                    >
                      {code.map((it, index) => {
                        return <option key={index}>{it.code}</option>;
                      })}
                    </select>
                  </div>

                  <div className="md:w-[78%]">
                    <input
                      onChange={changeHandler}
                      id="contactNumber"
                      name="contactNumber"
                      type="number"
                      placeholder="123 456 789"
                      className="p-3 bg-[#161D29] w-full outline-none rounded-lg text-[#999DAA]"
                    />
                  </div>
                </div>
              </div>

              <div className="flex md:flex-row flex-col justify-between ">
                <div className="flex flex-col md:w-[47%] ">
                  <label htmlFor="password" className="text-sm py-[6px]">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={changeHandler}
                      id="password"
                      name="password"
                      placeholder="Enter password"
                      type={`${showPassword ? "text" : "password"}`}
                      className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA] md:w-full"
                      autoComplete="new-password"
                    />
                    <FaRegEye
                      className="cursor-pointer absolute  right-3 top-4 text-[#999DAA]"
                      onClick={passwordHandler}
                    />
                  </div>
                </div>

                <div className="flex flex-col md:w-[50%] ">
                  <label htmlFor="confirmPassword" className="text-sm py-[6px]">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <input
                      onChange={changeHandler}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="Enter Password"
                      type={`${showConfirmPassword ? "text" : "password"}`}
                      className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA] md:w-full"
                      autoComplete="confirm-newPassword"
                    />
                    <FaRegEye
                      className="cursor-pointer absolute  right-3 top-4 text-[#999DAA]"
                      onClick={confirmPasswordHandler}
                    />
                  </div>
                </div>
              </div>
           
            </div>

            <div>
              <button type="submit">Submit</button>
              <Cpabutton active={true}>Sign Up</Cpabutton>
            </div>
          </form>
        </div>

        {/*section2 */}
        <div className="w-[45%] justify-center flex relative ">
          <div className="w-[75%] drop-shadow-xl relative z-[1] overflow-hidden mx-auto">
            <img
              className="w-full aspect-square object-cover"
              src={data.image}
            />
          </div>

          <div className="w-[75%]  absolute right-14 overflow-hidden top-[24px] z-0">
            <img className="w-full aspect-square object-cover" src={frame} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpTemp;
