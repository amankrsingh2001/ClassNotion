import {useForm} from 'react-hook-form'
import Countrycode from '../../data/countrycode.json'
import { useEffect } from 'react'
import toast from 'react-hot-toast'
import { FiSend, FiChevronDown } from 'react-icons/fi'

const Req = () => <span className="text-rose"> *</span>

const ContactPage = () =>{
    const {register, handleSubmit, reset, formState:{errors, isSubmitSuccessful}} = useForm()

    const submitContact = (data) =>{
        toast.success("We will contact you shortly")
        return;
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


    return <div className='glass relative overflow-hidden w-full p-6 sm:p-8 md:p-10'>
      <span aria-hidden="true" className="pointer-events-none absolute -top-24 -right-20 w-72 h-72 rounded-full bg-magenta/20 blur-3xl" />
      <div className="relative">
        <h2 className='h-display text-2xl md:text-4xl text-white mb-3'>
          Got an idea? We’ve got the skills. <span className='text-gradient'>Let’s team up</span>
        </h2>
        <p className='text-white/55 mb-8'>
          Tell us more about yourself and what you’ve got in mind.
        </p>
        <form onSubmit={handleSubmit(submitContact)}>
            <div className='flex flex-col gap-5'>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="flex flex-col">
                  <label htmlFor="firstName" className="field-label">
                    First Name<Req />
                  </label>
                  <input
                    id="firstName"
                    name="firstName"
                    placeholder="First Name"
                    type="text"
                    className="field"
                    {...register("firstName",{required:true})}
                  />
                  {
                    errors.firstName && <span className="field-error">Please enter your First Name</span>
                  }
                </div>

                <div className="flex flex-col">
                  <label htmlFor="lastName" className="field-label">
                    Last Name<Req />
                  </label>
                  <input
                    id="lastName"
                    name="lastName"
                    placeholder="Last Name"
                    type="text"
                    className="field"
                    {...register('lastName',{required:true})}
                  />
                   {
                    errors.lastName && <span className="field-error">Please enter your Last Name</span>
                  }
                </div>
              </div>

              <div className="flex flex-col">
                <label className="field-label" htmlFor="email">
                  Email Address<Req />
                </label>
                <input
                {...register('email',{required:true})}
                  id="email"
                  name="email"
                  placeholder="Enter your email"
                  type="text"
                  className="field"
                />
                 {
                    errors.email && <span className="field-error">Please enter your Email</span>
                  }
              </div>

              <div className="flex flex-col">
                <label className="field-label" htmlFor="contactNumber">
                  Phone Number<Req />
                </label>
                <div className="flex flex-row gap-3">
                  <div className="relative w-28 sm:w-36 shrink-0">
                    <select
                      className="field pl-3 cursor-pointer"
                      defaultValue="+91"
                      name='dropdown'
                      id='dropdown'{...register('countryCode',{required:true})}
                    >
                      {Countrycode.map((it, index) => {
                        return <option key={index} value={it.code} className="bg-surface text-white">{it.code}-{it.country}</option>;
                      })}
                    </select>
                    <FiChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/45" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <input
                      id="contactNumber"
                      name="contactNumber"
                      type="number"
                      placeholder="123 456 789"
                      className="field"
                      {...register('contactNumber',{required:true,minLength:{value:8,message:'Invalid Phone number'},maxLength:{value:10,message:"Invalid Phone number"}})}
                    />
                  </div>
                </div>
                {
                  errors.contactNumber && <span className="field-error">Please enter your Phone Number</span>
                }
              </div>

              <div className='flex flex-col'>
                <label htmlFor='message' className='field-label'>Message</label>
                <textarea type="text" id='message' name='message' rows='5' col='7' placeholder='Enter your Message'
                 className='field resize-y' {...register('message',{required:true})}/>
                  {
                    errors.message && <span className="field-error">Message Box cannot be empty</span>
                  }
              </div>
                 <button type='submit' className='btn btn-gradient btn-lg w-full mt-2'>Send Message <FiSend /></button>
              </div>
        </form>
      </div>
    </div>
}

export default ContactPage;
