import {useForm} from 'react-hook-form'
import Countrycode from '../../data/countrycode.json'
import { useEffect } from 'react'

const ContactPage = () =>{
    const {register, handleSubmit, reset, formState:{errors, isSubmitSuccessful}} = useForm()

    const submitContact = (data) =>{
        console.log(data)
    }

    useEffect(()=>{
        if(isSubmitSuccessful){
            reset({
                firstName:'',
                lastName:'',
                email:'',
                contactNumber:'',
                message:'',
                Countrycode:''
            })
        }
    },[reset, isSubmitSuccessful])


    return <div className='lg:w-[40%]  py-12 px-5 shadow-[3px_7px_5px_rgba(1,1,1,0.25)] border-[1px] border-richblack-200 rounded-xl m-10'>
        <form onSubmit={handleSubmit(submitContact)}>
            <div className='flex flex-col gap-6 px-2'>
        <div className=" flex md:flex-row flex-col justify-between ">
                <div className="flex flex-col md:w-[47%]">
                  <label htmlFor="firstName" className="text-sm text-white py-[6px] ">
                    First Name
                    <span className="text-[#EF476F] inline"> *</span>
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA] md:w-full"
                    {...register("firstName",{required:true})}
                  />
                  {
                    errors.firstName && <span>Please enter your Fist Name</span>
                  }
                </div>

                <div className="flex flex-col md:w-[50%] ">
                  <label htmlFor="lastName" className="text-sm text-white py-[6px]">
                    Last Name
                    <span className="text-[#EF476F]"> *</span>
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA] md:w-full"
                    {...register('lastName',{required:true})}
                  />
                   {
                    errors.lastName && <span>Please enter your Last Name</span>
                  }
                </div>
              </div>

              <div className="flex flex-col ">
                <label className="text-sm text-white py-[6px]" htmlFor="email">
                  Email Address <span className="text-[#EF476F]"> *</span>
                </label>
                <input
                {...register('email',{required:true})}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="text"
                  className="p-3 bg-[#161D29] outline-none rounded-lg text-[#999DAA]"
                />
                 {
                    errors.email && <span>Please enter your Email</span>
                  }
              </div>

              <div className="flex flex-col">
                <label className="text-sm py-[6px] text-white" htmlFor="contactNumber">
                  Phone Number <span className="text-[#EF476F]"> *</span>
                </label>
                <div className="flex md:flex-row flex-col gap-2 justify-between">
                  <div className="md:w-[18%]">
                    <select
                      className="bg-[#161D29]  md:w-full w-[60%]  text-[#999DAA] rounded-lg text-md text-center py-3 md:h-full outline-none"
                      defaultValue="+91"
                      name='dropdown'
                      id='dropdown'{...register('countryCode',{required:true})}
                    >
                      {Countrycode.map((it, index) => {
                        return <option key={index} value={it.code}>{it.code}-{it.country}</option>;
                      })}
                    </select>
                  </div>

                  <div className="md:w-[78%]">
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="number"
                      placeholder="123 456 789"
                      className="p-3 bg-[#161D29] w-full outline-none rounded-lg text-[#999DAA]"
                      {...register('contactNumber',{required:true,minLength:{value:8,message:'Invalid Phone number'},maxLength:{value:10,message:"Invalid Phone number"}})}
                    />
                     {
                    errors.contactNumber && <span>Please enter your Phone Number</span>
                  }
                  </div>
                </div>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor='message' className='text-white'>Message</label>
                <textarea type="text" id='message' name='message' rows='4' col='7' placeholder='Enter your Message'
                 className='p-4 rounded-md bg-[#161D29] outline-none text-white' {...register('message',{required:true})}/>
                  {
                    errors.message && <span>Message Box cannot be empty</span>
                  }
              </div>
                 <button type='submit' className='bg-yellow-300 text-richblue-800 rounded-md px-4 py-3 font-bold'>Submit</button>
              </div>
        </form>
    </div>
}

export default ContactPage;