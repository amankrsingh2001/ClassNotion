import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import {  editCourseAPI } from '../../../../../services/courseDetail'
import { useNavigate } from 'react-router-dom'

const PublishCourse = () => {
    const {register, handleSubmit, setValue, getValues} = useForm()
    const dispatch = useDispatch()
    const {course} = useSelector(state=>state.course)
    const {token} = useSelector(state =>state.auth)
    const navigate = useNavigate()

    useEffect(()=>{
        if(course?.status === COURSE_STATUS.PUBLISHED){
            setValue('public', true)
        }
    })

    const onSubmit = () =>{
        handleCoursePublish()
    }
    const goToCourses = () =>{
        dispatch(resetCourseState())
        navigate('/dashboard/my-courses')
    }

    const handleCoursePublish= async ()=>{
        if(course?.status===COURSE_STATUS.PUBLISHED && getValues("public")===true || (course.status===COURSE_STATUS.DRAFT && getValues("public")===false)){
            //no need to make an api call
            goToCourses()
            return
        }
        const formData = new FormData();
        formData.append("courseId", course._id)
        const courseStatus = getValues("public") ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT
        formData.append("status", courseStatus);
         const result = await editCourseAPI(formData, token)
         if(result){
            goToCourses()
         }

    }

    const goBack = () =>{
        dispatch(setStep(2))
    }

  return (
    <div className='rounded-md border-[1px] bg-richblack-800 flex   flex-col justify-center items-start py-8 px-4 gap-4 mt-8'>
        <p className='text-[#F1F2FF] text-3xl'>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
           <div className='flex gap-4 justify-between'>
           <div className=''>
                <label htmlFor='public'>
                <input type='checkbox' id='public'
                    {...register("public")}
                    className=' border-richblack-700 bg-transparent mr-2 accent-richblack-700'
                />
                Make this Course as Public
                </label>
            </div>

            <div className='text-[#6E727F] relative bottom-14 w-[40%] text-sm'>If you mark this course as public this course will be visible to all the students </div>
           </div>
            <div className='flex justify-center gap-x-3 w-full mt-8 items-center' >
                <button type='button' onClick={goBack} className='bg-richblack-5 py-2 px-4 rounded-sm text-black'>
                    Back
                </button>
                <button className='bg-yellow-5 py-2 px-4 rounded-sm text-black'>Save Changes</button>
            </div>
        </form>

    </div>
  )
}

export default PublishCourse