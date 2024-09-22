import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/courseDetail'
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross2 } from "react-icons/rx";
import ThumbnailUpload from '../CourseInfo/ThumbnailUpload'

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
      if((currentValues.lectureTitle !== modalData.title) || ( currentValues.lectureDesc !== modalData.description ) || (currentValues.lectureVide !== modalData.videoUrl)){
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
      console.log(result, "this is the updated result")
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
        if(!isFormUpdated){
          toast.errors("No changes made to the form")
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
    <div>

      <div>

        <div>
            <p>{view && "Check out"} {edit && "Editing"} {add && "Adding"} Lecture</p>
            <button onClick={() => {!loading ? setModalData(null):{}}}><RxCross2 /></button>
        </div>

      <form onSubmit={handleSubmit(onSubmit)}  encType="multipart/form-data">

          <ThumbnailUpload name="lectureVideo"
            label="lectureVideo"
            register={register}
            setValue={setValue}
            errors={errors}
            video ={true}
            viewData = {view? modalData.videoUrl : null}
            editData = {edit? modalData.videoUrl: null}
          />
          <div>
            <label htmlFor='lectureTitle'>Lecture Title</label>
            <input id='lectureTitle' 
              placeholder='Enter Lecture Titile'
              {...register("lectureTitle", {required:true})}
              className='w-full text-black'
            />
            {
              errors.lectureTitle && (<span>Lecture Title is required</span>)
            }
          </div>
          <div>
            <label htmlFor="">Lecture Descritpion</label> 
            <textarea
              id='lectureDescription'
              placeholder='Enter Lecture Description'
              {...register('lectureDesc', {required:true})}
              className='w-full min-h-[130px] text-black'
            />
            {
              errors.lectureDesc && (<span>
                Lecture Description is required
              </span>)
            }
          </div>

          {
            !view && (
              <div>
                <button>{edit ? "Save Changes" : "Save"} </button>
              </div>
            )
          }

      </form>
      </div>

    </div>
  )
}

export default SubSectionModal