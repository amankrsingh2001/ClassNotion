import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/courseDetail'
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross2 } from "react-icons/rx";
import ThumbnailUpload from '../CourseInfo/ThumbnailUpload'
import toast from 'react-hot-toast'
import { motion } from 'motion/react'

const SubSectionModal = ({modalData, setModalData, add=false ,
  view = false,
  edit = false

}) => {

  const {register, handleSubmit, setValue, formState:{errors}, getValues} = useForm()
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)
  const {token} = useSelector( state => state.auth )
  const {course} = useSelector( state => state.course )


  useEffect(()=>{
    if(view || edit){
        setValue("lectureTitle", modalData.title)
        setValue("lectureDesc", modalData.description)
        setValue("lectureVideo", modalData.videoUrl)
    }
  },[])

  const isFormUpdated = () =>{
    const currentValues = getValues();
      if((currentValues.lectureTitle !== modalData.title) || ( currentValues.lectureDesc !== modalData.description ) || (currentValues.lectureVideo !== modalData.videoUrl)){
        return true 
      } else{
        return false
      }
  }

  const handleEditSubSection = async() =>{

      const currentValues = getValues();
      const formData = new FormData()

      formData.append('sectionId', modalData.sectionId)

      formData.append('subSectionId', modalData._id)

      if(currentValues.lectureTitle !== modalData.title){
        formData.append('title', currentValues.lectureTitle);
      }
      if(currentValues.lectureDesc !== modalData.description){
        formData.append('description', currentValues.lectureDesc)
      }
      if(currentValues.lectureVideo !== modalData.videoUrl){
        formData.append("video", currentValues.lectureVideo)
      }

      const result = await updateSubSection(formData, token)
      if(result){
        const updateCourse = course?.courseContent.map((section)=>{
            if(section._id === result._id){
               return {...section = result}
            }else{
                return {...section}
            }
        })
        

       const courseNew =  {...course,courseContent:updateCourse}
        dispatch(setCourse(courseNew))
    }
      setModalData(null)

  }

  const onSubmit = async(data) =>{
      if(view){
        return;
      }
      if(edit){
        if(!isFormUpdated()){
          toast.error("No changes made to the form")
        }else{
          handleEditSubSection();
        }
        return
      }


      const formData = new FormData()

      formData.append('sectionId', modalData);
      formData.append('title', data.lectureTitle)
      formData.append('description', data.lectureDesc)
      formData.append('video', data.lectureVideo)


      const result = await createSubSection(formData, token)

      if(result){
          const updateCourse = course?.courseContent.map((section)=>{
              if(section._id === result._id){
                 return {...section = result}
              }else{
                  return {...section}
              }
          })

         const courseNew =  {...course,courseContent:updateCourse}
          dispatch(setCourse(courseNew))
      }
      setModalData(null)
  }

  const modeLabel = view ? "Viewing" : edit ? "Editing" : "Adding"
  const modeClass = view ? "pill" : edit ? "pill pill-magenta" : "pill pill-citrus"

  return (
    <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-night/70 p-4 backdrop-blur-md">

      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="glass-strong relative my-8 w-full max-w-[700px] overflow-hidden bg-surface-2/80"
      >
        <div className='pointer-events-none absolute -right-24 -top-24 h-56 w-56 rounded-full bg-violet/25 blur-3xl' />

        <div className='relative flex items-center justify-between gap-4 border-b border-white/[0.07] px-5 py-4 sm:px-7 sm:py-5'>
            <div className='flex items-center gap-3'>
              <span className={modeClass}>{modeLabel}</span>
              <p className='text-xl font-medium tracking-tight sm:text-2xl'>Lecture</p>
            </div>
            <button
              type='button'
              aria-label='Close'
              className="btn-icon"
              onClick={() => {!loading ? setModalData(null):{}}}
            ><RxCross2 /></button>
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className='relative space-y-6 p-5 sm:p-7' encType="multipart/form-data">

          <div>
            <p className='field-label'>Lecture video</p>
            <ThumbnailUpload name="lectureVideo"
              label="lectureVideo"
              register={register}
              setValue={setValue}
              errors={errors}
              video ={true}
              viewData = {view? modalData.videoUrl : null}
              editData = {edit? modalData.videoUrl: null}
            />
          </div>
          <div>
            <label className='field-label' htmlFor='lectureTitle'>Lecture title</label>
            <input id='lectureTitle'
              placeholder='Enter Lecture Title'
              {...register("lectureTitle", {required:true})}
              className='field'
            />
            {
              errors.lectureTitle && (<p className='field-error'>Lecture Title is required</p>)
            }
          </div>
          <div>
            <label className='field-label' htmlFor="lectureDescription">Lecture description</label>
            <textarea
              id='lectureDescription'
              placeholder='Enter Lecture Description'
              {...register('lectureDesc', {required:true})}
              className='field min-h-[130px] resize-y'
            />
            {
              errors.lectureDesc && (<p className='field-error'>
                Lecture Description is required
              </p>)
            }
          </div>

          {
            !view && (
              <div className='flex flex-wrap justify-end gap-3'>
                <button className='btn btn-glass' onClick={()=>setModalData(null)} type='button'>Cancel</button>
                <button className='btn btn-gradient'>{edit ? "Save Changes" : "Save"}</button>
              </div>
            )
          }

      </form>
      </motion.div>

    </div>
  )
}

export default SubSectionModal
