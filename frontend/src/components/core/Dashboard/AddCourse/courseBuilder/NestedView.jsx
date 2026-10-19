import toast from 'react-hot-toast'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { FiEdit2, FiTrash2, FiChevronDown, FiPlay, FiPlus, FiAlertTriangle } from "react-icons/fi";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/courseDetail';
import { setCourse } from '../../../../../slices/courseSlice';


const NestedView = ({ handleChangeEditSectionName, editingSectionId, sectionEditor, sectionError }) => {

  const {course} = useSelector(state => state.course)
  const {token} = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [addSubSection, setAddSubSection] = useState(null)
  const [viewSubSection, setViewSubSection] = useState(null)
  const[editSubSection, setEditSubSection] = useState(null)

  const [confirmationModal, setConfirmationModal] = useState(null)
  const [collapsed, setCollapsed] = useState(() => new Set())

  const toggle = id => setCollapsed(prev => {
    const next = new Set(prev)
    next.has(id) ? next.delete(id) : next.add(id)
    return next
  })

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
    <>
      <div className='flex flex-col gap-3'>
        {course?.courseContent?.map((section, sIndex)=>{
          const isEditing = editingSectionId === section._id
          const isCollapsed = collapsed.has(section._id)
          const lessons = section.subSection || []

          return (
          <section key={section._id} className={`cs-section ${isEditing ? 'is-editing' : ''} ${lessons.length === 0 ? 'is-incomplete' : ''}`}>
            <header className='cs-section-head'>
              <button type='button' className={`cs-collapse ${isCollapsed ? 'is-collapsed' : ''}`} onClick={() => toggle(section._id)} aria-label={isCollapsed ? 'Expand section' : 'Collapse section'} aria-expanded={!isCollapsed}>
                <FiChevronDown />
              </button>

              {isEditing ? (
                <div className='flex-1 min-w-0'>
                  {sectionEditor}
                  {sectionError}
                </div>
              ) : (
                <>
                  <div className='cs-section-title'>
                    <small>Section {sIndex + 1} · {lessons.length} {lessons.length === 1 ? 'lesson' : 'lessons'}</small>
                    <p title={section.sectionName}>{section.sectionName}</p>
                  </div>
                  <div className='cs-section-actions'>
                    <button
                      type='button'
                      aria-label='Rename section'
                      title='Rename section'
                      className='cs-icon-btn'
                      onClick={()=>handleChangeEditSectionName(section._id, section.sectionName)}
                    ><FiEdit2 /></button>
                    <button
                      type='button'
                      aria-label='Delete section'
                      title='Delete section'
                      className='cs-icon-btn is-danger'
                      onClick={()=>{
                        setConfirmationModal({
                          text1:"Delete this section?",
                          text2:"All lessons in this section will be deleted too.",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          btn1Handler:() => handleDeleteSection(section._id,course._id, token),
                          btn2Handler:() => setConfirmationModal(null)
                        })
                    }}><FiTrash2 /></button>
                  </div>
                </>
              )}
            </header>

            {!isCollapsed && (
              <div className='cs-section-body'>
                {lessons.length === 0 && (
                  <p className='cs-warn'><FiAlertTriangle /> Add at least one lesson to this section before publishing.</p>
                )}

                {lessons.map((data, lIndex)=>(
                  <div key={data._id} onClick={()=>setViewSubSection(data)} className='cs-lesson' role='button' tabIndex={0}
                    onKeyDown={event => { if (event.key === 'Enter') setViewSubSection(data) }}
                  >
                    <span className='cs-lesson-icon'><FiPlay /></span>
                    <div className='cs-lesson-text'>
                      <small>Lesson {sIndex + 1}.{lIndex + 1}</small>
                      <p>{data.title}</p>
                    </div>
                    <div onClick={(e)=>e.stopPropagation()} className='cs-lesson-actions'>
                      <button
                        type='button'
                        aria-label='Edit lesson'
                        title='Edit lesson'
                        className='cs-icon-btn'
                        onClick={()=>setEditSubSection({...data, sectionId:section._id})}>
                        <FiEdit2 />
                      </button>
                      <button
                        type='button'
                        aria-label='Delete lesson'
                        title='Delete lesson'
                        className='cs-icon-btn is-danger'
                        onClick={()=>
                         setConfirmationModal({
                          text1:"Delete this lesson?",
                          text2:"The lesson and its video will be removed.",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          btn1Handler:() => handleDeleteSubSection(data._id, section._id,token),
                          btn2Handler:() => setConfirmationModal(null)
                        })
                      }>
                        <FiTrash2 />
                      </button>
                    </div>
                  </div>
                ))}

                <button type='button' onClick={()=>setAddSubSection(section._id)} className='cs-add-row'>
                  <FiPlus /> Add lesson
                </button>
              </div>
            )}
          </section>
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
         />): null
      }
       {confirmationModal ? <ConfirmationModal modalData={confirmationModal}/> : null}
    </>
  )
}

export default NestedView
