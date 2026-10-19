import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { createSubSection, updateSubSection } from '../../../../../services/courseDetail'
import { setCourse } from '../../../../../slices/courseSlice'
import { RxCross2 } from "react-icons/rx";
import ThumbnailUpload from '../CourseInfo/ThumbnailUpload'
import toast from 'react-hot-toast'

const SubSectionModal = ({modalData, setModalData,
  add = false,
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
  },[view, edit, modalData.title, modalData.description, modalData.videoUrl, setValue])

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
               return result
            }else{
                return {...section}
            }
        })


       const courseNew =  {...course,courseContent:updateCourse}
        dispatch(setCourse(courseNew))
      setModalData(null)
    }

  }

  const onSubmit = async(data) =>{
      if(view){
        return;
      }
      if(edit){
        if(!isFormUpdated()){
          toast.error("No changes made to the form")
        }else{
          await handleEditSubSection();
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
                 return result
              }else{
                  return {...section}
              }
          })

         const courseNew =  {...course,courseContent:updateCourse}
          dispatch(setCourse(courseNew))
        setModalData(null)
      }
  }

  useEffect(() => {
    const onKey = event => { if (event.key === 'Escape' && !loading) setModalData(null) }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [loading, setModalData])

  const heading = view ? modalData.title : edit ? 'Edit lesson' : 'New lesson'
  const sectionName = course?.courseContent?.find(section => section._id === (add ? modalData : modalData.sectionId))?.sectionName
  const eyebrow = view ? 'Lesson preview' : sectionName ? `In “${sectionName}”` : 'Lesson'
  const formId = 'cs-lesson-form'

  return (
    <>
      <div className="cs-drawer-backdrop" onClick={() => !loading && setModalData(null)} />
      <aside role="dialog" aria-modal="true" aria-label={heading} className="cs-drawer">
        <div className='cs-drawer-head'>
          <div className='min-w-0'>
            <small className='truncate'>{eyebrow}</small>
            <h2 className='truncate'>{heading}</h2>
          </div>
          <button type='button' aria-label='Close' className="btn-icon" disabled={loading} onClick={() => setModalData(null)}><RxCross2 /></button>
        </div>

        <form id={formId} onSubmit={handleSubmit(async data => { setLoading(true); try { await onSubmit(data); } finally { setLoading(false); } })} className='cs-drawer-body' encType="multipart/form-data">
          <div>
            <p className='field-label'><span>Video{!view && <span className='cs-req'>*</span>}</span></p>
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
            <label className='field-label' htmlFor='lectureTitle'><span>Title{!view && <span className='cs-req'>*</span>}</span></label>
            <input id='lectureTitle'
              placeholder='e.g. Setting up your environment'
              {...register("lectureTitle", {required:true})}
              readOnly={view} className='field'
            />
            {errors.lectureTitle && <p className='field-error'>Add a lesson title.</p>}
          </div>
          <div>
            <label className='field-label' htmlFor="lectureDescription"><span>Description{!view && <span className='cs-req'>*</span>}</span></label>
            <textarea
              id='lectureDescription'
              placeholder='What will learners do or understand after this lesson?'
              {...register('lectureDesc', {required:true})}
              readOnly={view} className='field'
            />
            {errors.lectureDesc && <p className='field-error'>Add a short description.</p>}
          </div>
        </form>

        <div className='cs-drawer-foot'>
          {view ? (
            <button type='button' className='btn btn-glass' onClick={() => setModalData(null)}>Close</button>
          ) : (
            <>
              <button disabled={loading} className='btn btn-glass' onClick={()=>setModalData(null)} type='button'>Cancel</button>
              <button disabled={loading} form={formId} type='submit' className='btn btn-primary'>{loading ? 'Uploading…' : edit ? 'Save changes' : 'Add lesson'}</button>
            </>
          )}
        </div>
      </aside>
    </>
  )
}

export default SubSectionModal
