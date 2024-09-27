
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getNewCourseDetail } from '../services/courseDetail';
import { useSelector } from 'react-redux';
import CoursePage from '../components/core/catalog/CoursePage';
import CourseContent from '../components/core/catalog/CourseContent';




const CourseDetail = () =>{
    const {courseId} = useParams()
    const [courseDetail, setCourseDetail] = useState(null)
    const {token} = useSelector(state =>state.auth)

    const getCourseDetail = async() =>{
        // const response = await getFullCourseDetail(courseId, token)
        const response = await getNewCourseDetail(courseId)
        setCourseDetail(response)
    }




    useEffect(()=>{
        if(courseId){
            getCourseDetail()
        }
    },[courseId])

    if(!courseDetail){
        return <div>Loading...</div>
    }



    return (
        <div className="w-full gap-8 items-center  min-h-[calc(100vh-12.5rem)] flex flex-col  item-center  text-white">

            <div className='w-full bg-richblack-800 '>
            <CoursePage courseDetail = {courseDetail}/>
            </div>  

            <div className='w-full flex justify-center p-6'>
                <div className='w-10/12'>
                    <p className='text-2xl py-4 '>What You'll Learn</p>
                    {
                        courseDetail?.tag?.map((it, index)=>{
                            return <p key={index} className='py-2 text-[#C5C7D4]' >{it}</p>
                        })
                    }
                </div>
            </div>

            <div className='w-full flex justify-center'>
                    <CourseContent courseDetail = {courseDetail}/>
            </div>

            <div className="text-white w-10/12 py-12 px-2 gap-6 flex flex-col">
                <p className='text-2xl'>Author</p>
                <div className='flex items-center gap-6'> 
                    <div className='w-[60px] h-[60px] rounded-full'>
                        <img className='w-full rounded-full h-full object-cover' src={courseDetail?.instructor?.image}/>
                    </div>
                    <p className='text-center text-xl'>{courseDetail?.instructor?.firstName} {courseDetail?.instructor?.lastName} </p>
                </div>
                <p className='text-[#C5C7D4] w-[80%] font-light'>{courseDetail?.instructor?.additionalDetails?.about || "I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!"}</p>
            </div>
                       
        </div>)
}
export default CourseDetail

