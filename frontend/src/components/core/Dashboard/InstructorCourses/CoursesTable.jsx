import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { COURSE_STATUS } from '../../../../utils/constants';
import { Link, useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import {  deleteCourse, getInstructorCourse } from '../../../../services/courseDetail';
import { FiEdit2, FiTrash2, FiClock, FiCheckCircle, FiBookOpen } from "react-icons/fi";
import { formatDate } from '../../../../services/formatData';



const CoursesTable = ({courses, setCourses}) => {
    const dispatch = useDispatch()
    const {token} = useSelector(state=>state.auth)
    const [loading ,setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const navigate = useNavigate()

    const handleCourseDelete = async(courseId) =>{
        await deleteCourse(courseId,token)
        const result = await getInstructorCourse(token)
        if(result){
            setCourses(result)
        }
        setConfirmationModal(null)

    }
   

  if (courses.length === 0) {
    return (
      <div className='w-full'>
        <div className='glass relative flex flex-col items-center gap-4 overflow-hidden px-6 py-16 text-center'>
          <div className='relative'>
            <div className='absolute inset-0 scale-[2.2] rounded-full bg-magenta/30 blur-2xl' />
            <span className='icon-circle-glass relative h-16 w-16'>
              <FiBookOpen className='text-2xl' />
            </span>
          </div>
          <h2 className='mt-2 text-2xl font-medium tracking-tight'>No courses found</h2>
          <p className='max-w-md text-white/55'>You haven't created a course yet. Your first one is just a few steps away!</p>
          <Link to='/dashboard/add-course' className='btn btn-primary mt-2'>Create a course</Link>
        </div>
      </div>
    )
  }

  return (
    <div className='mb-20 w-full'>
        <ul className='flex flex-col gap-3'>
         {
                    courses.map((course)=>{
                      return ( <li key={course._id} className='glass card-hover flex flex-col gap-4 rounded-4xl p-3 sm:flex-row sm:items-center sm:gap-5 sm:pr-5'>
                                <div className='duotone aspect-video w-full shrink-0 rounded-3xl sm:w-[220px]'>
                                  <img src={course?.thumbnail}
                                      alt={course.courseName}
                                      className='h-full w-full object-cover'
                                  />
                                </div>
                                <div className='flex min-w-0 flex-1 flex-col gap-2 px-1 sm:px-0'>
                                    <div className='flex flex-wrap items-center gap-2'>
                                      {
                                          course.status === COURSE_STATUS.DRAFT ?( <span className='pill pill-magenta'><FiClock /> Drafted</span>) :(
                                               <span className='pill pill-citrus'><FiCheckCircle /> Published</span>)
                                      }
                                      <span className='text-xs text-white/40'>Created {`${formatDate(course.createdAt)}`}</span>
                                    </div>
                                    <h2 className='text-lg font-medium capitalize leading-snug tracking-tight sm:text-xl'>{course.courseName}</h2>
                                    <p className='line-clamp-2 text-sm capitalize text-white/55'>{course.courseDescription}</p>
                                    <div className='flex items-center gap-4 text-xs text-white/55'>
                                      <span className='inline-flex items-center gap-1.5'><FiClock /> 2hr 30min</span>
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-4 border-t border-white/[0.07] px-1 pt-3 sm:flex-col sm:items-end sm:justify-center sm:border-0 sm:p-0'>
                                  <p className='text-2xl font-medium tracking-tight'>₹{course.price}</p>
                                  <div className='flex gap-2'>
                                    <button
                                     onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}
                                     aria-label='Edit course'
                                     title='Edit'
                                     className='btn-icon'
                                     >
                                        <FiEdit2 />
                                    </button>
                                    <button
                                        aria-label='Delete course'
                                        title='Delete'
                                        className='btn-icon hover:border-rose/30 hover:bg-rose/15 hover:text-rose'
                                        onClick={()=>{
                                            setConfirmationModal({
                                                text1:"Do you want to delete this course?",
                                                text2:"All the data of this course will be deleted",
                                                btn1Text:"Delete",
                                                btn2Text:"Cancel",
                                                btn1Handler:()=> handleCourseDelete(course._id),
                                                btn2Handler :() => setConfirmationModal(null)
                                            })
                                        }}
                                    >
                                   <FiTrash2 />
                                    </button>
                                  </div>
                                </div>
                        </li>)
                    })
            }
        </ul>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }

    </div>
  )
}

export default CoursesTable
