import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/courseDetail'
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross2 } from "react-icons/rx";
import ThumbnailUpload from '../CourseInfo/ThumbnailUpload'
import toast from 'react-hot-toast'

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

  return (
    <div className="fixed w-11/12 inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">

      <div className="w-[700px]  rounded-lg border border-richblack-400 bg-richblack-800 p-6">

        <div className='flex mt-8'>
            <p className='font-bold text-3xl py-4'>{view && "Check out"} {edit && "Editing"} {add && "Adding"} Lecture</p>
            <button className="text-[#EF476F] p-4" onClick={() => {!loading ? setModalData(null):{}}}><RxCross2 /></button>
        </div>

      <form onSubmit={handleSubmit(onSubmit)} className='rounded-md p-4 space-y-8 bg-[#161D29] border-[#2C333F] border-2 '  encType="multipart/form-data">

          <ThumbnailUpload name="lectureVideo"
            label="lectureVideo"
            register={register}
            setValue={setValue}
            errors={errors}
            video ={true}
            viewData = {view? modalData.videoUrl : null}
            editData = {edit? modalData.videoUrl: null}
          />
          <div  className='flex flex-col gap-2 px-2' >
            <label className='font-[#F1F2FF]' htmlFor='lectureTitle'>Lecture Title</label>
            <input id='lectureTitle' 
              placeholder='Enter Lecture Titile'
              {...register("lectureTitle", {required:true})}
              className='w-full p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]'
            />
            {
              errors.lectureTitle && (<span>Lecture Title is required</span>)
            }
          </div>
          <div className='flex flex-col gap-2 px-2'>
            <label  className='font-[#F1F2FF]' htmlFor="lectureDescription">Lecture Descritpion</label> 
            <textarea
              id='lectureDescription'
              placeholder='Enter Lecture Description'
              {...register('lectureDesc', {required:true})}
              className='min-h-[130px] w-full  p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]'
            />
            {
              errors.lectureDesc && (<span>
                Lecture Description is required
              </span>)
            }
          </div>

          {
            !view && (
              <div className='flex gap-4'>
                <button className='bg-yellow-50 p-2 text-richblack-800 rounded-md font-medium'>{edit ? "Save Changes" : "Save"} </button>
                <button className='bg-white rounded-md text-richblack-800 p-2' onClick={()=>setModalData(null)} type='button'>Cancel</button>
              </div>
            )
          }

      </form>
      </div>

    </div>
  )
}

export default SubSectionModal