
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { getFullCourseDetail } from "../services/courseDetail"
import { setCompletedLectures, setCourseSection, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice"
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar"
import CourseReviewModal from '../components/core/viewCourse/CourseReviewModal';


const ViewCourse = () =>{
    const [reviewModal , setReviewModal] = useState(false)
    const {courseId} = useParams()
    const {token} = useSelector(state =>state.auth)
    const dispatch = useDispatch()

    //only for students

    const setCourseSpecificDetails = async() =>{
        const courseData = await getFullCourseDetail(courseId, token)


        if(courseData){
            dispatch(setCourseSection(courseData.courseDetails.courseContent));
              dispatch(setEntireCourseData(courseData.courseDetails));
              dispatch(setCompletedLectures(courseData.completedVideos));
            let lectures = 0;
            courseData?.courseContent?.forEach((sec)=>{
                lectures += sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures))
        }

    }

    useEffect(()=>{
        if(courseId && token){
            setCourseSpecificDetails()
        }
    },[token])


    return (
        <div className="relative container-x pt-4 md:pt-8 pb-16 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-6 lg:gap-8 items-start min-h-[calc(100vh-3.5rem)]">

            <div className="w-full min-w-0">

                <Outlet/>

            </div>
            <VideoDetailsSidebar setReviewModal={setReviewModal}/>
            {
                reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
            }
        </div>
    )
}

export default ViewCourse
