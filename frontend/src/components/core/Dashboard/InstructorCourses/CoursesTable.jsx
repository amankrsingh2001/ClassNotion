import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';
import { COURSE_STATUS } from '../../../../utils/constants';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../../Common/ConfirmationModal';
import {  deleteCourse, getInstructorCourse } from '../../../../services/courseDetail';



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
    <div>
        <Table className='text-white border-white border-2'>
            <Thead>
                <Tr className=' border-richblack-400 border-2 gap-x-10 p-8'>
                    <Th>Courses</Th>
                    <Th>Duration</Th>
                    <Th>Price</Th>
                    <Th>Action</Th>
                </Tr>
            </Thead>
         <Tbody>
         {
                courses.length === 0 ? (<Tr>
                    <Td>No Courses Found</Td>
                </Tr>):(
                    courses.map((course)=>{
                      return ( <Tr key={course._id} className=' border-richblack-400 border-2 gap-x-10 p-8'>
                            <Td className='flex gap-x-4'>
                                <img src={course?.thumbnail}
                                    className='h-[150px] w-[200px] rounded-lg object-cover'
                                />
                                <div className='flex flex-col'>
                                    <p>{course.courseName}</p>
                                    <p>{course.courseDescription}</p>
                                    <p>Created At:</p>
                                    {
                                        course.status === COURSE_STATUS.DRAFT ?( <p className='text-pink-100'>DREFTED</p>) :( <p className='text-yellow-50'>PUBLISHED</p>)
                                    }
                                </div>
                            </Td>

                            <Td>
                                2hr 30min
                            </Td>
                            <Td>
                                {course.price}
                            </Td>
                            <Td >
                                <button
                                 onClick={()=>{navigate(`/dashboard/edit-course/${course._id}`)}}
                                className='mr-[20px]'
                                 >
                                    EDIT
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
                                    Delete
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