import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import { profileApi } from '../../../services/api';
import axios from 'axios';
import {COURSES_DATA}  from '../../../utils/constants'
import ProgressBar from "@ramonak/react-progress-bar";
import { useNavigate } from 'react-router-dom';



const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null)
  const {token} = useSelector( state => state.auth )
  const {user} = useSelector( state => state.profile)
  const {GET_ENROLLED_COURSES} = profileApi
  const [active, setActive] = useState(0)
  const navigate = useNavigate()



  const getEnrolledCourses = async() =>{
    const response = await axios.get(GET_ENROLLED_COURSES,{headers:{
      "Authorization": `Bearer ${token}`
    }})
      setEnrolledCourses(response.data.data.course)

  } 

  useEffect(()=>{
    getEnrolledCourses()
  },[token])



  useEffect(() => {
    if (user.accountType !== "Student") {
        navigate('/dashboard/my-profile')
    }
}, [user.accountType, navigate])



  return (
    <div className='w-full flex flex-col items-center gap-4'>
        <div className='w-11/12 flex flex-col p-4 justify-around gap-8'>
          <h1 className='text-white font-bold text-3xl'>Enrolled Courses</h1>
          <div className='flex border-[1px]  border-white w-[22%] rounded-full bg-richblack-600 justify-evenly'>
            {
              COURSES_DATA.map((data, index)=>{
              return   <p onClick={() => setActive(index)} className={`py-2 px-4  cursor-pointer ${active === index ? "bg-richblack-900 text-white": "text-[#999DAA]  bg-[#2C333F]"
              } hover:bg-black rounded-full`}
              key={index}
            >
              {data.status}
            </p>
              })
            }
          </div>
        </div>

        {
             !enrolledCourses ? (<div>Loading...</div>) : (!enrolledCourses.length?(<p className='text-white text-start p-4 w-[80%]'>You have not enrolled in any Course yet</p>):<div className='w-11/12'>
      <div className='text-white flex justify-between px-5 py-3 border-richblack-600 border-2 items-center'>
        <p className='ml-12'>Course Name</p>
        <p className='mr-16'>Duration</p>
        <p className='mr-16'>Progress</p>
      </div>
      {/* card Data */}
          {
            enrolledCourses.map((course , index, arr)=>{
              return <div key={index}  className={`text-white flex justify-between items-center border border-richblack-700 ${
                index === arr.length - 1 ? "rounded-b-lg" : "rounded-none"
              }`}>
                  <div onClick={()=>navigate(`/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`)}
                   className="flex justify-between cursor-pointer  gap-4 px-5 py-3" >
                    <img src={course?.thumbnail} alt="course_img"
                  className="h-14 w-14 rounded-lg object-cover" />
                    <div  className="flex max-w-xs flex-col gap-2">
                      <p className="font-semibold">Course Name</p>
                      <p className="text-xs text-richblack-300">Course Description</p>
                    </div>
                  </div>
                  <div className="w-1/4 py-3 text-center">{course?.totalDuration} 2hours 30min</div>
                  <div  className="flex w-1/5 flex-col gap-2 items-center py-3">
                    <p>Progress: {course.progressPercentage || 0}</p>
                    <ProgressBar completed={course.progressPercentage || 0}
                    height='8px'
                    width='88px'
                    isLabelVisible={false}/>
                  </div>
              </div>
            })
          }

             </div>)
        }
    </div>
  )
}

export default EnrolledCourses