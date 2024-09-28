import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getInstructorCourse, getInstructorData } from '../../../../services/courseDetail'
import { Link } from 'react-router-dom'
import InstructorChart from './InstructorChart'

const Instructor = () => {

    const [loading, setLoading] = useState(false)
    const [instructorData, setInstructorData] = useState([])
    const [courses, setCourses] = useState([])
    const {token} = useSelector(state=>state.auth)
    const {user} = useSelector(state => state.profile)

    const getCourseDataWithStats = async() =>{
        //set loading
        const instructorDataResult = await getInstructorData(token)
        const result = await getInstructorCourse(token)
        if(result){
            setCourses(result)
        }
        if(instructorDataResult){
            setInstructorData(instructorDataResult)
        }
    }

    useEffect(()=>{
        getCourseDataWithStats()
    },[token])


    const totalAmount = instructorData?.reduce((acc, curr)=> acc+ curr.totalAmountGenerated, 0)
    const totalStudents = instructorData?.reduce((acc, curr)=> acc + curr.totalStudentsEnrolled, 0)

  return (
    <div className='text-white'>
        <div>
            <h1>{user.firstName} {user.lastName}</h1>
            <p>Let's start something new</p>
        </div>


        {
            loading ? (<div className=''>Loading...</div>) : (
                courses.length >0 ? ( <div>
                    <div>
                    <InstructorChart courses={instructorData} />
                    <div>
                        <p>Statistic</p>
                        <div>
                            <p>Total courses</p>
                            <p>{courses?.length}</p>
                        </div>
                        <div>
                            <p>Total students</p>
                            <p>{totalStudents}</p>
                        </div>

                        <div>
                            <p>Total Income</p>
                            <p>{totalAmount}</p>
                        </div>
                    </div>
                </div>
                <div>
                {/* Render 3 courses */}
                  <div>
                  <div>
                        <p>Your Courses</p>
                        <Link to={'/dashboard/my-courses'}>
                        <p>View All</p>
                        </Link>
                    </div>
                    <div>
                        {
                            courses.slice(0,3).map((course)=>{
                              return  <div key={course._id}>
                                    <img src={course?.thumbnail}/>
                                    <div>
                                        <p>{course.courseName}</p>
                                        <div>
                                    <p>{course?.studentsEnrolled.length} Students</p>
                                    <p> | </p>
                                    <p>Rs: {course?.price}</p>
                                    </div>
                                      
                                    </div>
                                </div>
                            })
                        }
                    </div>
                  </div>

                </div>


                </div>
                ) : <div>
                    <p>You haven't created any course yet</p>
                    <Link to={'dashboard/add-course'}>
                        <p>Create a course</p>
                    </Link>
                </div>
            )
        }
    </div>
  )
}

export default Instructor