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
import {motion} from "motion/react"
import { AnimatePresence } from "framer-motion";
import { IoMdArrowBack } from "react-icons/io";

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
    <AnimatePresence >

    
    <div className="w-screen min-h-screen bg-[url(/public/assets/Images/alblal.png)] flex items-center justify-center">
      <div className="w-11/12 flex flex-col lg:flex-row justify-around items-center ">
        {/**Section 1 */}
        <div className=" lg:w-[35%]  p-10  text-white bg-white/10 backdrop-blur-2xl rounded-3xl border border-white/20 shadow-2xl ">
           
          <div className="p-2 flex flex-col">
            <motion.h1 key={data.title} initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200 }}
            transition={{ duration: 0.3 }}  className="text-xl mb-4 text-center ">{data.title}</motion.h1>
            <p className="text-md w-full text-[#AFB2BF] text-center text-xs">
              {data.description}
              <HilightText
                font={"font-edu-sa"}
                text={"Education to future-proof your carrer"}
              />
            </p>
          </div>
          <div className="flex justify-center py-2 ">
            <motion.div className="flex bg-yellow-800 w-full justify-between rounded-full   gap-2   border-[#2C333F] ">
              {value.map((element, index) => {
                return (
                  <p
                    onClick={(e) => chagneActive(e, index)}
                    className={`py-2  w-full text-center cursor-pointer transition-all duration-300 ${
                      active === index
                        ? "bg-black text-white"
                        : "text-[#999DAA] bg-[2C333F]"
                    } hover:bg-black rounded-full`}
                    key={index}
                  >
                    {element.value}
                  </p>
                );
              })}
            </motion.div>
          </div>

          <form onSubmit={submitHandler}>
            <div className="w-full flex  py-3 flex-col space-y-2">
              
              <div className="flex flex-col ">
                  <label htmlFor="firstName " className="text-sm py-[3px]">
                    First Name   <span className="text-[#EF476F]"> *</span>
                  </label>
                  <input
                    onChange={changeHandler}
                    id="firstName"
                    name="firstName"
                    placeholder="Jhon"
                    type="text"

                    className="px-3 py-2 bg-transparent border-[1px]  outline-none rounded-xl text-white w-full "
                    required
                  />
                </div>

                <div className="flex flex-col  ">
                  <label htmlFor="lastName" className="text-sm py-[3px]">
                    Last Name  <span className="text-[#EF476F]"> *</span>
                  </label>
                  <input
                    onChange={changeHandler}
                    id="lastName"
                    name="lastName"
                    placeholder="Doe"
                    type="text"
                    className="px-3 py-2 bg-transparent border-[1px]  outline-none rounded-xl text-white w-full"
                  />
                </div>

              <div className="flex flex-col ">
                <label className="text-sm py-[6px]" htmlFor="email">
                  Email Address <span className="text-[#EF476F]"> *</span>
                </label>
                <input
                  onChange={changeHandler}
                  id="email"
                  name="email"
                  placeholder="user@email.com"
                  type="text"
                  className="px-3 py-2 bg-transparent border-[1px]  outline-none rounded-xl text-white w-full"
                  autoComplete="email"
                  required
                />
              </div>

             
              <div className="flex flex-col ">
                  <label htmlFor="password" className="text-sm py-[6px]">
                    Password  <span className="text-[#EF476F]"> *</span>
                  </label>
                  <div className="relative">
                    <input
                      onChange={changeHandler}
                      id="password"
                      name="password"
                      placeholder="your secret password"
                      type={`${showPassword ? "text" : "password"}`}
                      className="px-3 py-2 bg-transparent border-[1px]  outline-none rounded-xl text-white w-full"
                      autoComplete="new-password"
                      required
                    />
                    <FaRegEye
                      className="cursor-pointer absolute  right-3 top-3 text-[#999DAA]"
                      onClick={passwordHandler}
                    />
                  </div>
                </div>
              <div className="flex flex-col  ">
                  <label htmlFor="confirmPassword" className="text-sm py-[6px]">
                    Confirm Password  <span className="text-[#EF476F]"> *</span>
                  </label>
                  <div className="">
                    <input
                      onChange={changeHandler}
                      id="confirmPassword"
                      name="confirmPassword"
                      placeholder="your secret password"

                      type={`${showConfirmPassword ? "text" : "password"}`}
                      className="px-3 py-2 bg-transparent border-[1px]  outline-none rounded-xl text-white w-full"
                      autoComplete="confirm-newPassword"
                      required
                    />
                    
                  </div>
                </div>

                <div className="flex flex-col">
                <label className="text-sm py-[6px]" htmlFor="contactNumber">
                  Phone Number <span className="text-[#EF476F]"> *</span>
                </label>
                <div className="flex md:flex-row flex-col gap-1 justify-between">
                  <div className="md:w-[18%]">
                    <select
                      className="px-3 py-2.5 bg-transparent border-[1px]  outline-none rounded-xl text-white w-full"
                      
                    >
                      {code.map((it, index) => {
                        return <option  key={index}>{`${it.code}-${it.country}`}</option>;
                      })}
                    </select>
                  </div>

                  <div className="md:w-[78%]">
                    <input
                      onChange={changeHandler}
                      id="contactNumber"
                      name="contactNumber"
                      type="tel"
                      placeholder="999 999 9999"
                      className="px-3 py-2 bg-transparent border-[1px]  outline-none rounded-xl text-white w-full"
                      required
                    />
                  </div>
                </div>
              </div>

           
            </div>

            <div>
            <motion.button  
            whileHover={{ scale: 1, background:"#fff",color:"#0F0F0F", boxShadow:"0px 0px 3px rgb(255,255,255)", transition:{duration:0.5, type:"spring", stiffness:200} }}
            whileTap={{scale:0.7}}
            type="submit" 
            className="w-full px-4 mt-3 py-3 rounded-xl bg-[#381700] text-white"
            >Signup</motion.button>
            </div>
          </form>
          <button onClick={()=>navigate('/login')} className="inline-block my-auto text-sm mt-2"><IoMdArrowBack className="text-end inline-block text-sm" /> Account already Exist</button>
        
        </div>

      

       
      </div>
    </div>
    </AnimatePresence>
  );
};

export default SignUpTemp;
