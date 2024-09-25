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
    // console.log()
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
    <div className='w-full flex flex-col items-center'>
        <div className='w-[80%] flex flex-col p-4 justify-around gap-7'>
          <h1 className='text-white font-bold text-3xl'>Enrolled Courses</h1>
          <div className='flex border-[1px] p-[4px] border-white w-[40%] rounded-full bg-richblack-600 justify-evenly'>
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
             !enrolledCourses ? (<div>Loading...</div>) : (!enrolledCourses.length?(<p className='text-white text-start p-4 w-[80%]'>You have not enrolled in any Course yet</p>):<div>
      <div className='text-white'>
        <p>Course Name</p>
        <p>Duration</p>
        <p>Progress</p>
      </div>
      {/* card Data */}
          {
            enrolledCourses.map((course , index)=>{
              console.log(course,"***********")
              return <div key={index}>
                  <div>
                    <img src={course?.thumbnail}/>
                    <div>
                      <p>Course Name</p>
                      <p>Course Description</p>
                    </div>
                  </div>
                  <div>{course?.totalDuration}</div>
                  <div>
                    <p>Progress: {course.progressPercentage || 0}</p>
                    <ProgressBar completed={course.progressPercentage || 0}
                    height='8px'
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