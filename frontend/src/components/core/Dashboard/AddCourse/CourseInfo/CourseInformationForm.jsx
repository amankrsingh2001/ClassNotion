import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { courseApi } from '../../../../../services/api'
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import RequirementField from './RequirementField'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import CustomTag from './CustomTag'
import ThumbnailUpload from './ThumbnailUpload'
import { addCourseDetails, editCourseAPI } from '../../../../../services/courseDetail'

const CourseInformationForm = () => {

  const dispatch = useDispatch()
  const {course, editCourse} = useSelector(state => state.course)
  const {register, handleSubmit, setValue, getValues, formState:{errors}} = useForm()
  const [loading, setLoading] = useState(false)
  const [courseCategories, setCourseCategories] = useState([])
  const { GET_ALL_COURSE_CATEGORY  } = courseApi
  const {token} = useSelector(state =>state.auth)



  const getCategories = async() =>{
    setLoading(true)
    const response = await axios.get(GET_ALL_COURSE_CATEGORY,{
      headers:{
        "Authorization": `Bearer ${token}`
      }
      }
    )
  
    if(response.data.allCategory.length && response.data.allCategory.length > 0){
      setCourseCategories(response.data.allCategory)
    }
    setLoading(false)

    if(editCourse){
      setValue("courseTitle", course.courseDetails.courseName)
      setValue("courseShortDesc", course.courseDetails.courseDescription)
      setValue("coursePrice", course.courseDetails.price)
      setValue("courseTags", course.courseDetails.tag)
      setValue("courseBenefits", course.courseDetails.whatYouWillLearn)
      setValue("courseCategory", course.courseDetails.Category)
      setValue("courseRequirement", course.courseDetails.instructions)
      setValue("courseImage", course.courseDetails.thumbnail)
    }
  }

  useEffect(()=>{
    getCategories()
  },[])

  const isFormUpdated = () =>{

    const currentValues = getValues()

    console.log(currentValues,'This is the current Values')
    console.log(course,"This is the curse")

    if(currentValues.courseTitle !== course.courseDetails.courseName ||
       currentValues.courseShortDesc !== course.courseDetails.courseDescription ||
       currentValues.coursePrice !== course.courseDetails.price ||
       currentValues.courseTag.toString() !== course.courseDetails.tag.toString() ||
       currentValues.courseBenefits !== course.courseDetails.WhatYouWillLearn ||
       currentValues.courseCategory._id !== course.courseDetails.category._id ||
       currentValues.courseImage !== course.courseDetails.thumbnail ||
       currentValues.courseRequirement.toString() !== course.courseDetails.instructions.toString()
       )
       {
      return true
    }
      return false
  }

  const onSubmit = async(data) =>{

    if(editCourse){


      if(isFormUpdated()){
        
        const currentValue = getValues()
        const formData = new FormData()
  
        formData.append("courseId", course.courseDetails._id)

        console.log(currentValue, "This is the current value")

        if(currentValue.courseTitle !== course.courseDetails.courseName){
          formData.append('courseName', data.courseTitle)
        }
        if(currentValue.courseShortDesc !== course.courseDetails.courseDescription){
          formData.append('courseDescription', data.courseShortDesc)
        }
        if(currentValue.coursePrice !== course.courseDetails.price){
          formData.append('price', data.coursePrice)
        }
 
        if(currentValue.courseBenefits !== course.courseDetails.WhatYouWillLearn){
          formData.append('whatYouWillLearn', data.courseBenefits)
        }

        if(currentValue.courseCategory._id !== course.courseDetails.Category._id){
          formData.append('category', data.courseCategory)
        }
  
        if(currentValue.courseRequirement.toString() !== course.courseDetails.instructions.toString()){
          formData.append('instructions', JSON.stringify(data.instructions))
        }
        if(currentValue.courseImage !== course.courseDetails.thumbnail){
          formData.append('courseImage', data.image)
        }
       


        const result = await editCourseAPI(formData, token);
        setLoading(false);
        if(result){

         dispatch(setStep(2))
          dispatch(setCourse(result))
        }
      }else{
        toast.error("No change made so far")
      }
      return;
    }

    const formData = new FormData();
      console.log(data,'This is the data')

    formData.append('courseName', data.courseTitle)
    formData.append('courseDescription', data.courseShortDesc)
    formData.append('price',data.coursePrice)
    formData.append('courseTags', JSON.stringify(data.courseTag))
    formData.append('whatYouWillLearn', data.courseBenefits)
    formData.append('category', data.courseCategory)
    formData.append('instructions', JSON.stringify(data.instructions))
    formData.append('image', data.image)
    formData.append('status',COURSE_STATUS.DRAFT)

    setLoading(true)
    const result = await addCourseDetails(formData, token)

    if(result){
     dispatch(setStep(2))
      dispatch(setCourse(result))
    }
    setLoading(false)
   
  }

  return (
    <div className=' mt-4 p-6 w-11/12'>
      <form onSubmit={handleSubmit(onSubmit)} className='rounded-md p-4 space-y-8 bg-[#161D29] border-[#2C333F] border-2 '
        encType="multipart/form-data"
      >

        <div className='flex flex-col gap-2 px-2'>
          <label htmlFor='courseTitle' className='font-[#F1F2FF]'> Course Name <span className="text-[#EF476F]"> *</span>
          </label>
          <input id='courseTitle' placeholder='Enter course Title' 
            {...register('courseTitle',{required:true}) }
            className='w-full p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]'
          />{
            errors.courseTitle && (
              <span  className="text-[#EF476F]" >Course Title is Required</span>
            )
          }
        </div>
        <div className='flex flex-col gap-2 px-2' >
          <label htmlFor='courseShortDesc' className='font-[#F1F2FF]'>Course Short Description <span className="text-[#EF476F]"> *</span></label>
          <textarea id='courseShortDesc'
            placeholder='Enter Description of your course'
            {...register('courseShortDesc',{required:true})}
            className='min-h-[130px] w-full  p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]'
          />
          {
            errors.courseShortDesc && (<span  className="text-[#EF476F]" >Course Description is required</span>)
          }
        </div>

        <div  className='flex flex-col gap-2 px-2 relative'>
          <label htmlFor='coursePrice' className='font-[#F1F2FF]'>Course Price <span className="text-[#EF476F]"> *</span> </label>
          <input id='coursePrice' placeholder='Enter Price' 
            {...register('coursePrice',{required:true, valueAsNumber:true}) }
            className='w-full py-3 pl-9 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]'
          />
           <HiOutlineCurrencyRupee className='absolute top-[45px] left-4 text-[#585D69] text-xl'/>
          {
            errors.coursePrice && (
              <span className="text-[#EF476F]">Course Price is Required</span>
            )
          }
        </div>

        <div className='flex flex-col gap-2 px-2'>
            <label htmlFor='courseCategory' className='font-[#F1F2FF]'>Course Category <span className="text-[#EF476F]"> *</span> </label>
            <select id='courseCategory' defaultValue="" className='w-full py-3 pl-4 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]' {...register("courseCategory",{required:true})}>
              <option value="" className='text-[#F1F2FF]' disabled>Choose a Category</option>
              {
               !loading && courseCategories.map((category, index)=>{
                  return (<option key={index} className='text-black' value={category?._id}>{category?.name}</option>)
                })
              }
            </select>
            {
              errors.courseCategory && (
                <span className="text-[#EF476F]" >Course category is Required</span>
              )
            }
        </div>

        <CustomTag 
        label='Tags'
        name="courseTag"
        placeholder = "Enter tags and press enter"
        register = {register}
        errors = {errors}
        setValue = {setValue}
        getValues = {getValues}
        />

         <div className=' px-2'>
          <ThumbnailUpload
            name = 'image'
            label = 'Browse'
            register = {register}
            errors = {errors}
            setValue = {setValue}
            getValues = {getValues}
            editData = {course.thumbnail}
          /> 

          
       </div>
          {/* create a component for uploading and showing preview of media */}

          <div className='flex flex-col gap-2 px-2'>
            <label htmlFor='courseBenefits' className='font-[#F1F2FF]'>Benefits of the course<span className="text-[#EF476F]"> *</span></label>
            <textarea id='courseBenefits'  className='min-h-[130px] w-full  p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]' placeholder='Enter Benefits of the course'
             {...register('courseBenefits', {required:true})} />
             {
              errors.courseBenefits && <span  className="text-[#EF476F]" >Benefits are required</span>
             }
          </div>

              <RequirementField
                name= 'instructions'
                label = "Requirements / Instructions"
                register = {register}
                errors = {errors}
                setValue = {setValue}
                getValues = {getValues}
                />

                <div className='flex  gap-2 px-2'>
                  {
                     (
                    <button onClick={()=>dispatch(setStep(2))} className='bg-richblack-400 px-4 py-3 rounded-md'>
                      Continue without saving</button>
                      )
                  }
                  {
                    (
                      <button type='submit' className='bg-yellow-5 text-black py-3 px-4 rounded-md'>
                          {
                            !editCourse ? "Next" :'Save Change'
                          }
                      </button>
                    )
                  }
                </div>
      </form>

    </div>
  )
}

export default CourseInformationForm