import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { RxDropdownMenu } from "react-icons/rx";
import { MdEdit } from "react-icons/md";
import { RiDeleteBin5Line } from "react-icons/ri";
import { BiSolidDownArrow } from "react-icons/bi";
import { AiOutlinePlus } from "react-icons/ai";
import SubSectionModal from './SubSectionModal';
import ConfirmationModal from '../../../../Common/ConfirmationModal';
import { deleteSection, deleteSubSection } from '../../../../../services/courseDetail';
import { setCourse } from '../../../../../slices/courseSlice';


const NestedView = ({handleChangeEditSectionName}) => {

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
        dispatch(setCourse(result))
      }
      setConfirmationModal(null)
  }

  const handleDeleteSubSection = async (subSectionId, sectionId, token) =>{
    const result = await deleteSubSection({subSectionId, sectionId, token})

    if(result){
        dispatch(setCourse(result))
    }
    setConfirmationModal(null)
  }
 

  return (
    <div>

      <div className='rounded bg-richblack-700 py-6 px-8'>
     
        {course?.courseContent?.map((section)=>{

          return (
          <details key={section._id}  className='text-white'>
            <summary className='flex items-center text-xl justify-between gap-x-3 border-b-2'>
                <div className='flex items-center gap-2'>
                <RxDropdownMenu className='text-white' />
                <p className='text-pink-100'>{section.sectionName}</p>
                </div>

                <div className='flex items-center gap-x-3'>
                  <button 
                   onClick={()=>handleChangeEditSectionName(section._id, section.sectionName)}
                  ><MdEdit/></button>

                  <button onClick={()=>{
                      setConfirmationModal({
                        text1:"Delete this section",
                        text2:"All your lectures in this section will be deleted",
                        btn1Text:"Delete",
                        btn2Text:"Cancel",
                        btn1Handler:() => handleDeleteSection(section._id,course._id, token),
                        btn2Hander:() => setConfirmationModal(null)
                      })
                  }}>
                  <RiDeleteBin5Line />
                  </button>
                  <span>|</span>
                  <BiSolidDownArrow className={`text-richblack-300`}/>

                </div>
            </summary>

            <div>
              {
                section.subSection.map((data)=>{
                  return( <div key={data._id} onClick={setViewSubSection(data)}
                      className='flex items-center justify-between gap-x-3 border-b-2'
                  > 
                <div className='flex items-center gap-x-3'>
                <RxDropdownMenu className='text-white' />
                   <p>{data.title}</p>

                   </div>
                    <div className='flex items-center gap-x-3'>

                      <button onClick={()=>setEditSubSection({...data, sectionId:section._id})}>
                      <MdEdit/>
                      </button>
                      <button onClick={()=>
                         setConfirmationModal({
                          text1:"Delete this sub section",
                          text2:"Selected lecture will be deleted",
                          btn1Text:"Delete",
                          btn2Text:"Cancel",
                          btn1Handler:() => handleDeleteSubSection(data._id, section._id),
                          btn2Hander:() => setConfirmationModal(null)
                        })
                      }>
                            <RiDeleteBin5Line />
                      </button>

                    </div>


                  </div>)
                })
              }
              <button onClick={()=>setAddSubSection(section._id)}
                className='mt-4 flex items-center gap-x-2 text-yellow-50'
              >
              <AiOutlinePlus />
              <p>Add Lecture</p>
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