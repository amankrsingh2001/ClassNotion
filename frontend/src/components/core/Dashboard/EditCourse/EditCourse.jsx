import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import RenderSteps from '../AddCourse/RenderSteps';
import { StudioHeader } from '../AddCourse/StudioParts';
import '../AddCourse/studio.css';
import { setCourse, setEditCourse, setStep } from '../../../../slices/courseSlice';
import { getFullCourseDetail } from '../../../../services/courseDetail';

const EditCourse = () => {
    const dispatch = useDispatch()
    const {courseId} = useParams()
    const {course} = useSelector(state =>state.course)
    const [loading, setLoading] = useState(true)
    const [failed, setFailed] = useState(false)
    const {token} = useSelector(state=>state.auth)
    useEffect(() => {
        let active = true
        setLoading(true)
        setFailed(false)
        getFullCourseDetail(courseId, token).then(result => {
            if (!active) return
            if (result) {
                dispatch(setEditCourse(true))
                dispatch(setCourse(result.courseDetails || result))
                dispatch(setStep(1))
            } else setFailed(true)
        }).finally(() => { if (active) setLoading(false) })
        return () => { active = false }
    }, [courseId, token, dispatch])

  return (
    <div className='course-studio'>
        <StudioHeader
            title='Edit course'
            subtitle='Update the details, reorganise lessons, or change who can see it.'
            courseName={course?.courseName}
            status={course?.status}
        />
        {
            failed ? <p className='field-error'>This course couldn’t load. Return to My courses and try again.</p> : !loading && course ? (<RenderSteps/>) : (
              <div className='flex flex-col gap-4'>
                <div className='skeleton h-16 rounded-2xl' />
                <div className='skeleton h-[420px] rounded-2xl' />
              </div>
            )
        }
    </div>
  )
}

export default EditCourse
