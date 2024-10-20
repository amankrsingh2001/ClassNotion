import React, { useState } from "react";
import { HilightText } from "../HomePage/HilightText";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";


import {  setLogin } from "../../../services/authApi";

const value = [
  {
    value: "Student",
  },
  {
    value: "Instructor",
  },
];

const LoginTemp = ({ image, frame, title, description }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [showPassword, setShowPassword] = useState(true)
  const [active, setActive] = useState(0);


  const [input, setInput] = useState({
        email:'',
        password:''
  })


  const chagneActive = (index) => {
    setActive(index);
  };

const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(setLogin(input, navigate));
}


  return (
    <div className="w-screen min-h-screen bg-richblack-900 flex items-center justify-center">
      <div className="w-11/12 flex justify-around lg:flex-row flex-col ">
        {/**Section 1 */}
        <div className="  p-12 text-white ">
          <div className="p-2 flex flex-col">
            <h1 className="text-4xl py-2">{title}</h1>
            <p className="text-md w-full text-[#AFB2BF]">
              {description}
              <HilightText
                font={"font-edu-sa"}
                text={"Education to future-proof your carrer"}
              />
            </p>
          </div>
          <div className="flex items-start py-8 ">
            <div className="flex bg-[#2C333F] justify-between rounded-full py-[2px] px-2 gap-4 shadow-[0px_2px_2px_#434744]  border-[#2C333F]">
              {value.map((element, index) => {
                return (
                  <p
                    onClick={() => chagneActive(index)}
                    className={`py-2 px-4 cursor-pointer ${
                      active === index ? "bg-richblack-900" : "bg-[2C333F]"
                    } hover:bg-black rounded-full`}
                    key={index}
                  >
                    {element.value}
                  </p>
                );
              })}
            </div>
          </div>

          <div className="w-full flex gap-4 py-6 flex-col">
            <form onSubmit={submitHandler}>
            <div className="flex flex-col ">
              <label className="text-sm py-[6px]" htmlFor="email">
                Email Address <span className="text-[#EF476F]"> *</span>
              </label>
              <input
             
              value = {input.name}
              onChange={(e)=>setInput({...input, [e.target.name]:e.target.value})}
                id="email"
                name="email"
                placeholder="Enter your email"
                className="p-3 bg-[#161D29] outline-none rounded-md text-[#999DAA]"
              />
            </div>
            <div className="flex flex-col relative ">
              <label className="text-sm py-[6px]" htmlFor="password">
                Password<span className="text-[#EF476F]"> *</span>
              </label>
              {
                !showPassword ? (
                <FaEye onClick={()=>{
                  setShowPassword(!showPassword)
                }} className="absolute right-5 bottom-12" />) :( 
                  <FaEyeSlash className="absolute right-5 bottom-12" onClick={()=>{
                    setShowPassword(!showPassword)
                  }} />)
              }
             
              <input
               type={showPassword?"password":'text'}
                value = {input.name}
                onChange={(e)=>setInput({...input, [e.target.name]:e.target.value})}
                id="password"
                name="password"
                placeholder="Enter your password"
                className="p-3 bg-[#161D29] outline-none rounded-md text-[#999DAA]"
              />
              <Link to="/reset-password">
                <p className="text-[#47A5C5] text-xs text-end p-2 ">
                  Forgot Password ?
                </p>
              </Link>
            </div>
            <div>

            {/* <Cpabutton active={true}>Sign In</Cpabutton> */}
          </div>

          <button type="submit" className="w-full p-4 rounded-md bg-yellow-50 text-black">Submit</button>
          </form>
          </div>


         
          
        </div>

        {/*section2 */}
        <div className="w-[45%]  flex relative top-14">
          <div className="w-[full] hidden lg:block drop-shadow-xl relative z-[1] mx-auto">
            <img className="" src={image} />
          </div>

          <div className="w-[full] hidden lg:block absolute right-[52px] top-[24px] z-0">
            <img className="" src={frame} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTemp;
