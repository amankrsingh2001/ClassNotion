import React, { useState } from "react";
import { HilightText } from "../HomePage/HilightText";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { motion } from "motion/react";
import { IoMdArrowBack } from "react-icons/io";

import {  setLogin } from "../../../services/authApi";
import { scales } from "chart.js";

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
    <div className="w-screen min-h-screen bg-[url(/public/assets/Images/alblal.png)] flex items-center justify-center">
      <div className="flex justify-around lg:flex-row flex-col bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl w-full max-w-md  space-y-8">
 
        <div className=" relative p-12 text-white cursor-pointer " >
          <div className=" absolute top-4 right-4 text-end text-xs space-x-1">
          
            <button onClick={()=>navigate('/')} className="inline-block my-auto"><IoMdArrowBack className="text-end inline-block" /> Back to home</button>
          </div>
          <div className="p-2 flex flex-col"  >
          
            <h1 className="text-4xl text-center py-2">{title}</h1>
            <p className="text-md text-center w-full text-[#AFB2BF]">
              {description +" Education to future-proof your carrer"}
             
            </p>
          </div>
      

          <div className="w-full flex gap-4 py-6 flex-col" >
            <form onSubmit={submitHandler} className="space-y-1"> 
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
                className="p-3 bg-transparent border-[1px]  outline-none rounded-xl text-white"
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
                  <FaEyeSlash className="absolute cursor-pointer right-5 bottom-12" onClick={()=>{
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
                className="p-3 bg-transparent border-[1px]  outline-none rounded-xl text-white"
              />
              <Link to="/reset-password">
                <p className="text-blue-200 text-xs text-end p-2 ">
                  Forgot Password ?
                </p>
              </Link>
            </div>
            <div>

            {/* <Cpabutton active={true}>Sign In</Cpabutton> */}
          </div>

          <motion.button  
            whileHover={{ scale: 1, background:"#fff",color:"#0F0F0F", boxShadow:"0px 0px 3px rgb(255,255,255)", transition:{duration:0.5, type:"spring", stiffness:200} }}
            whileTap={{scale:0.7}}
            type="submit" 
            className="w-full px-4 py-3 rounded-xl bg-[#381700] text-white"
>Log In</motion.button>
          </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginTemp;
