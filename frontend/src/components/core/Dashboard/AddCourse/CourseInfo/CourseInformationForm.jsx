import toast from 'react-hot-toast'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { courseApi } from '../../../../../services/api'
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { FiArrowRight, FiChevronDown } from "react-icons/fi";
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
    <div className='w-full'>
      <form onSubmit={handleSubmit(onSubmit)} className='glass space-y-7 p-5 sm:p-8'
        encType="multipart/form-data"
      >
        <div className='flex flex-wrap items-end justify-between gap-3'>
          <div>
            <p className='eyebrow'>Step 1 of 3</p>
            <h2 className='mt-2 text-2xl font-medium tracking-tight sm:text-3xl'>Course information</h2>
          </div>
          <span className='pill'>Details &amp; media</span>
        </div>
        <div className='divider' />

        <div>
          <label htmlFor='courseTitle' className='field-label'>Course name <span className="text-rose">*</span>
          </label>
          <input id='courseTitle' placeholder='Enter course Title'
            {...register('courseTitle',{required:true}) }
            className='field'
          />{
            errors.courseTitle && (
              <p className="field-error">Course Title is Required</p>
            )
          }
        </div>

        <div>
          <label htmlFor='courseShortDesc' className='field-label'>Short description <span className="text-rose">*</span></label>
          <textarea id='courseShortDesc'
            placeholder='Enter Description of your course'
            {...register('courseShortDesc',{required:true})}
            className='field min-h-[130px] resize-y'
          />
          {
            errors.courseShortDesc && (<p className="field-error">Course Description is required</p>)
          }
        </div>

        <div className='grid gap-7 md:grid-cols-2'>
          <div>
            <label htmlFor='coursePrice' className='field-label'>Price <span className="text-rose">*</span> </label>
            <div className='relative'>
              <input id='coursePrice' placeholder='Enter Price'
                {...register('coursePrice',{required:true, valueAsNumber:true}) }
                className='field pl-11'
              />
              <HiOutlineCurrencyRupee className='pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-xl text-white/40'/>
            </div>
            {
              errors.coursePrice && (
                <p className="field-error">Course Price is Required</p>
              )
            }
          </div>

          <div>
            <label htmlFor='courseCategory' className='field-label'>Category <span className="text-rose">*</span> </label>
            <div className='relative'>
              <select id='courseCategory' defaultValue="" className='field cursor-pointer [&>option]:bg-surface-2' {...register("courseCategory",{required:true})}>
                <option value="" disabled>Choose a Category</option>
                {
                 !loading && courseCategories.map((category, index)=>{
                    return (<option key={index} value={category?._id}>{category?.name}</option>)
                  })
                }
              </select>
              <FiChevronDown className='pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-white/45' />
            </div>
            {
              errors.courseCategory && (
                <p className="field-error">Course category is Required</p>
              )
            }
          </div>
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

        <div>
          <p className='field-label'>Course thumbnail <span className="text-rose">*</span></p>
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

        <div>
          <label htmlFor='courseBenefits' className='field-label'>Benefits of the course <span className="text-rose">*</span></label>
          <textarea id='courseBenefits' className='field min-h-[130px] resize-y' placeholder='Enter Benefits of the course'
           {...register('courseBenefits', {required:true})} />
           {
            errors.courseBenefits && <p className="field-error">Benefits are required</p>
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

        <div className='divider' />
        <div className='flex flex-col-reverse gap-3 sm:flex-row sm:justify-end'>
          <button onClick={()=>dispatch(setStep(2))} className='btn btn-ghost'>
            Continue without saving
          </button>
          <button type='submit' className='btn btn-gradient'>
            {
              !editCourse ? "Next" :'Save Change'
            }
            <FiArrowRight />
          </button>
        </div>
      </form>

    </div>
  )
}

export default CourseInformationForm
