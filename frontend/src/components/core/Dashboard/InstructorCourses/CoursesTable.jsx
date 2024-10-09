import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import {  deleteCourse, getInstructorCourse } from '../../../../services/courseDetail';
import { MdEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { formatDate } from '../../../../services/formatData';
import { FaClock } from "react-icons/fa6";
import { FaCheckCircle } from "react-icons/fa";



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
   

  return (
    <div className='mb-40 w-11/12'>
        <Table className='text-[#AFB2BF] '>
            <Thead className='uppercase'>
                <Tr className=' border-richblack-600  border gap-x-10 '>
                    <Th className='text-start px-4 py-4'>Courses</Th>
                    <Th className='text-start px-4 py-4'>Duration</Th>
                    <Th className='text-start px-4 py-4'>Price</Th>
                    <Th className='text-start px-4 py-4'>Action</Th>
                </Tr>
            </Thead>
         <Tbody>
         {
                courses.length === 0 ? (<Tr>
                    <Td>No Courses Found</Td>
                </Tr>):(
                   
                    courses.map((course)=>{
                      return ( <Tr key={course._id} className='gap-x-10 p-8 border-b border-richblack-700'>
                                     <Td className='flex gap-x-4 p-4'>
                                <img src={course?.thumbnail}
                                    className='w-[25%] aspect-video rounded-lg object-cover'
                                />
                                <div className='flex flex-col gap-2'>
                                    <h1 className='text-xl text-[#F1F2FF] capitalize font-inter'> {course.courseName}</h1>
                                    <p className='text-sm capitalize'>{course.courseDescription}</p>
                                    <p className='text-sm'>Created At : {`${formatDate(course.createdAt)}`} </p>
                                    {
                                        course.status === COURSE_STATUS.DRAFT ?( <p className='flex  items-center gap-1 justify-center text-pink-100 bg-richblack-600 rounded-full px-4 text-sm w-fit py-1'><FaClock className='inline-block font-bold'/> Drafted</p>) :(
                                             <p className='text-yellow-50 py-1  flex  items-center gap-1 justify-center bg-richblack-600 rounded-full px-4 text-sm w-fit'><FaCheckCircle className='inline'/> Published</p>)
                                    }
                                </div>
                            </Td>

                            <Td className='text-start px-4 py-4'>
                                2hr 30min
                            </Td>
                            <Td className='text-start px-4 py-4'>
                            ₹{course.price}
                            </Td>
                            <Td className='text-start px-4 py-4'>
                                <button
                                 onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}
                                className='mr-[20px]'
                                 >
                                    <MdEdit className='text-xl'/>
                                </button>
                                <button 
                                    onClick={()=>{
                                        setConfirmationModal({
                                            text1:"Do you want to delete this course",
                                            text2:"Add the data of this course will be deleted",
                                            btn1Text:"Delete",
                                            btn2Text:"Cancel",
                                            btn1Handler:()=> handleCourseDelete(course._id),
                                            btn2Handler :() => setConfirmationModal(null)
                                        })
                                    }}
                                >
                               <RiDeleteBin6Line className='text-xl'/>
                                </button>
                            </Td>
                        </Tr>)
                    })
                
                )
            }
         </Tbody>
        </Table>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }
        
    </div>
  )
}

export default CoursesTable