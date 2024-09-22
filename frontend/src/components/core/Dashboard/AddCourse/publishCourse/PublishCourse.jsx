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
    <div className='rounded-md border-[1px] bg-richblack-700'>
        <p>Publish Course</p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label htmlFor='public'>
                <input type='checkbox' id='public'
                    {...register("public")}
                    className='ml-3'
                />
                Make this Course as Public
                </label>
            </div>
            <div className='flex justify-center gap-x-3'>
                <button type='button' onClick={goBack} className='bg-richblack-400'>
                    Back
                </button>
                <button>Save Changes</button>
            </div>
        </form>

    </div>
  )
}

export default PublishCourse