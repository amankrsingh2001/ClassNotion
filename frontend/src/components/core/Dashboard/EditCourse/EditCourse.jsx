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
    <div className='w-full py-8 text-white sm:py-10'>
        <p className='eyebrow'>Instructor studio</p>
        <h1 className='h-display mt-3 mb-8 text-4xl sm:text-5xl'>
            Edit <span className='text-gradient'>course</span>
        </h1>
        <div>
            {
                course? (<RenderSteps/>) :(
                  <div className='flex flex-col gap-6'>
                    <div className='skeleton h-28 rounded-4xl' />
                    <div className='skeleton h-[420px] rounded-4xl' />
                  </div>
                )
            }
        </div>
    </div>
  )
}

export default EditCourse
