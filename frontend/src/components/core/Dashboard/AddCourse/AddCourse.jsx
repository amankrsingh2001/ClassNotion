import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import RenderSteps from './RenderSteps'
import { BsLightningChargeFill } from "react-icons/bs";

const AddCourse = () => {

    const {user} = useSelector(state =>state.profile)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user.accountType !== "Instructor"){
            navigate('/dashboard')
        }
    },[user.accountType, navigate])

  return (
    <div className=' text-white p-4'>
       <div className='flex gap-2 justify-between '>
       <div className='flex flex-col w-[65%]  gap-8 '>
            <h1 className='text-4xl text-[#F1F2FF] font-medium'>Add course</h1>
            <div className='flex'>
                <RenderSteps/>
            </div>
        </div>
        <div className='border-2 border-[#2C333F] flex bg-[#161D29] rounded-lg flex-col gap-3 px-4 py-5 h-[40%] w-[34%]'>
            <p className='text-xl font-bold text-[#F1F2FF]'><span><BsLightningChargeFill className='text-yellow-100 inline-block'/></span> Code Upload tips</p>
            <ul className='flex flex-col gap-3 text-sm list-disc px-4 py-2 text-[#F1F2FF]'>
                <li>Set the Course Price option or make it free.</li>
                <li>Standard size for the course thumbnail is 1024x576.</li>
                <li>Video section controls the course overview video.</li>
                <li>Course Builder is where you create & organize a course.</li>
                <li>Add Topics in the Course Builder section to create lessons, quizzes, and assignments.</li>
                <li>Information from the Additional Data section shows up on the course single page.</li>
                <li>Make Announcements to notify any important</li>
                <li>Notes to all enrolled students at once.</li>
            </ul>
        </div>
       </div>
    </div>
  )
}

export default AddCourse