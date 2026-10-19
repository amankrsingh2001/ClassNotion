import toast from 'react-hot-toast'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2, FiChevronDown, FiPlay, FiPlus } from "react-icons/fi";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/courseDetail';
import { setCourse } from '../../../../../slices/courseSlice';


const NestedView = ({ handleChangeEditSectionName }) => {

  const {course} = useSelector(state => state.course)
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const[editSubSection, setEditSubSection] = useState(null)

  const [confirmationModal, setConfirmationModal] = useState(null)
  

  const handleDeleteSection = async(sectionId,courseId, token) =>{

        const data = {sectionId, courseId}
        const result = await deleteSection(data, token)
          if(result){
            const deletedSection = course.courseContent.filter((section)=>{
            return (section._id !== result._id)  
            })
            const updatedCourseContent = {...course, courseContent:deletedSection}
            dispatch(setCourse(updatedCourseContent))
            setConfirmationModal(null)
          }else {
            toast.error("Failed to update the Section")
          }
  }

  const handleDeleteSubSection = async (subSectionId, sectionId, token) =>{
    const data = {subSectionId, sectionId}
    const result = await deleteSubSection(data, token)
    if(result){
      const deletedSubSection = course.courseContent.map((section)=>{
          return section._id === result._id? result :section
      })
      const deletedSubSectionData = {...course,courseContent:deletedSubSection}
      dispatch(setCourse(deletedSubSectionData))
    }
    setConfirmationModal(null)
  }
 

  return (
    <div>

      <div className='flex flex-col gap-3'>

        {course?.courseContent?.map((section, sIndex)=>{

          return (
          <details key={section._id} className='glass group overflow-hidden rounded-3xl open:bg-white/[0.06]'>
            <summary className='flex cursor-pointer list-none items-center justify-between gap-3 p-3 pl-4 sm:p-4 sm:pl-5 [&::-webkit-details-marker]:hidden'>
                <div className='flex min-w-0 items-center gap-3'>
                <span className='grid h-9 w-9 shrink-0 place-items-center rounded-full bg-white/[0.06] text-xs font-semibold text-white/60'>
                  {String(sIndex + 1).padStart(2, '0')}
                </span>
                <div className='min-w-0'>
                  <p className='truncate font-medium tracking-tight'>{section.sectionName}</p>
                  <p className='text-xs text-white/45'>{section.subSection?.length || 0} lessons</p>
                </div>
                </div>

                <div className='flex shrink-0 items-center gap-1.5'>
                  <button
                   type='button'
                   aria-label='Edit section'
                   className='btn-icon h-9 w-9'
                   onClick={()=>handleChangeEditSectionName(section._id, section.sectionName)}
                  ><FiEdit2 className='text-sm'/></button>

                  <button
                    type='button'
                    aria-label='Delete section'
                    className='btn-icon h-9 w-9 hover:border-rose/30 hover:bg-rose/15 hover:text-rose'
                    onClick={()=>{
                      setConfirmationModal({
                        text1:"Delete this section",
                        text2:"All your lectures in this section will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:() => handleDeleteSection(section._id,course._id, token),
                        btn2Hander:() => setConfirmationModal(null)
                      })
                  }}>
                  <FiTrash2 className='text-sm' />
                  </button>
                  <span className='mx-1 h-5 w-px bg-white/10' />
                  <FiChevronDown className='text-white/55 transition-transform duration-300 group-open:rotate-180'/>

                </div>
            </summary>

            <div className='flex flex-col gap-2 border-t border-white/[0.07] p-3 sm:p-4'>
              {
                section.subSection.map((data)=>{
                  return( <div key={data._id} onClick={()=>setViewSubSection(data)}
                      className='row-item cursor-pointer'
                  >
                <div className='flex min-w-0 flex-1 items-center gap-3'>
                <span className='icon-circle h-10 w-10'>
                  <FiPlay className='ml-0.5 fill-night text-sm' />
                </span>
                   <p className='truncate text-[15px] font-medium'>{data.title}</p>

                   </div>
                    <div
                      onClick={(e)=>e.stopPropagation()}
                    className='flex shrink-0 items-center gap-1.5'>

                      <button
                        aria-label='Edit lecture'
                        className='btn-icon h-9 w-9'
                        onClick={()=>setEditSubSection({...data, sectionId:section._id})}>
                      <FiEdit2 className='text-sm'/>
                      </button>
                      <button
                        aria-label='Delete lecture'
                        className='btn-icon h-9 w-9 hover:border-rose/30 hover:bg-rose/15 hover:text-rose'
                        onClick={()=>
                         setConfirmationModal({
                          text1:"Delete this sub section",
                          text2:"Selected lecture will be deleted",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          btn1Handler:() => handleDeleteSubSection(data._id, section._id,token),
                          btn2Hander:() => setConfirmationModal(null)
                        })
                      }>
                            <FiTrash2 className='text-sm' />
                      </button>

                    </div>

                  </div>)
                })
              }
              <button onClick={()=>setAddSubSection(section._id)}
                className='btn btn-glass btn-sm mt-1 self-start'
              >
              <FiPlus />
              <span>Add Lecture</span>
              </button>

            </div>
          </details>
          )
        })}
      </div>

      {
        addSubSection ? (<SubSectionModal
          modalData = {addSubSection}
          setModalData = {setAddSubSection}
          add = {true}
        />) :
         viewSubSection?(<SubSectionModal
          modalData = {viewSubSection}
          setModalData = {setViewSubSection}
          view = {true}
         />) :
         editSubSection ? (<SubSectionModal
          modalData = {editSubSection}
          setModalData = {setEditSubSection}
          edit = {true}
         />):
       ( <div></div>)

      }
       {confirmationModal? (<ConfirmationModal modalData={confirmationModal}/>):(<div></div>)}

    </div>
  )
}

export default NestedView
