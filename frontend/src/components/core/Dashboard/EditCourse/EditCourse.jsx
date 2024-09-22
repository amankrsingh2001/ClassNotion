import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';
import { getFullCourseDetail } from '../../../../services/courseDetail';

const EditCourse = () => {
    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector(state =>state.course)
    const [loading, setLoading] = useState(false)
    const {token} = useSelector(state=>state.auth)

    const populateCourseDetails = async() =>{

        const result = await getFullCourseDetail(courseId, token)
        if(result){
            dispatch(setEditCourse(result))
            dispatch(setCourse(result))
        }
    }

    useEffect(()=>{
        populateCourseDetails()
    },[token])

  return (
    <div className='text-white'>
        <h1>Edit Course</h1>
        <div>
            {
                course? (<RenderSteps/>) :(<div></div>)
            }
        </div>
    </div>
  )
}

export default EditCourse