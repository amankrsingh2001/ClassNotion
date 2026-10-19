import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { resetCourseState, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import {  editCourseAPI } from '../../../../../services/courseDetail'
import { useNavigate } from 'react-router-dom'
import { FiArrowLeft, FiGlobe } from 'react-icons/fi'

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
    <div className='glass flex flex-col gap-6 p-5 sm:p-8'>
        <div className='flex flex-wrap items-end justify-between gap-3'>
            <div>
                <p className='eyebrow'>Step 3 of 3</p>
                <h2 className='mt-2 text-2xl font-medium tracking-tight sm:text-3xl'>Publish settings</h2>
            </div>
            <span className='pill'>Almost there</span>
        </div>
        <div className='divider' />
        <form onSubmit={handleSubmit(onSubmit)} className='w-full'>
            <label htmlFor='public' className='group block cursor-pointer'>
                <input type='checkbox' id='public'
                    {...register("public")}
                    className='peer sr-only'
                />
                <div className='relative flex items-center gap-4 overflow-hidden rounded-4xl border border-white/10 bg-white/[0.04] p-5 transition hover:border-white/20 hover:bg-white/[0.06] peer-checked:border-citrus/30 peer-checked:bg-citrus/[0.06] peer-focus-visible:ring-4 peer-focus-visible:ring-orchid/30 sm:gap-6 sm:p-7
                  [&_.sw-track]:bg-white/10 peer-checked:[&_.sw-track]:bg-citrus
                  [&_.sw-knob]:translate-x-0 peer-checked:[&_.sw-knob]:translate-x-6 peer-checked:[&_.sw-knob]:bg-night
                  [&_.sw-glow]:opacity-0 peer-checked:[&_.sw-glow]:opacity-100'>
                    <div className='sw-glow pointer-events-none absolute -left-16 -top-16 h-48 w-48 rounded-full bg-citrus/20 blur-3xl transition-opacity duration-500' />
                    <span className='icon-circle-glass relative h-12 w-12'>
                        <FiGlobe className='text-lg' />
                    </span>
                    <span className='relative flex min-w-0 flex-1 flex-col gap-1'>
                        <span className='text-lg font-medium tracking-tight sm:text-xl'>Make this course public</span>
                        <span className='text-sm text-white/55'>If you mark this course as public, it will be visible to all the students.</span>
                    </span>
                    <span className='sw-track relative h-8 w-14 shrink-0 rounded-full border border-white/10 transition-colors duration-300'>
                        <span className='sw-knob absolute left-1 top-1/2 h-6 w-6 -translate-y-1/2 rounded-full bg-white shadow-card transition-all duration-300' />
                    </span>
                </div>
            </label>

            <div className='divider mt-8' />
            <div className='mt-6 flex flex-wrap justify-end gap-3' >
                <button type='button' onClick={goBack} className='btn btn-glass'>
                    <FiArrowLeft /> Back
                </button>
                <button className='btn btn-gradient'>Save Changes</button>
            </div>
        </form>

    </div>
  )
}

export default PublishCourse
