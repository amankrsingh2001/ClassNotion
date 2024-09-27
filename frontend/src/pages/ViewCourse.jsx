
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet, useParams } from "react-router-dom"
import { getFullCourseDetail } from "../services/courseDetail"
import { setCompletedLectures, setCourseSection, setEntireCourseData, setTotalNoOfLectures } from "../slices/viewCourseSlice"
import VideoDetailsSidebar from "../components/core/viewCourse/VideoDetailsSidebar"
import CourseReviewModal from "../components/core/viewCourse/CourseReviewModal"




const ViewCourse = () =>{
    const [reviewModal , setReviewModal] = useState(false)
    const {courseId} = useParams()
    const {token} = useSelector(state =>state.auth)
    const dispatch = useDispatch()

    //only for students

    const setCourseSpecificDetails = async() =>{
        const courseData = await getFullCourseDetail(courseId, token)
        
            console.log(courseData,"This is the course Data")

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


    return <div className="relative w-full flex min-h-[calc(100vh-3.5rem)]">

         <VideoDetailsSidebar setReviewModal={setReviewModal}/>
         <div className="h-full w-full overflow-auto">

            <Outlet/>

         </div>
         {
            reviewModal && <CourseReviewModal setReviewModal={setReviewModal}/>
         }
    </div>
}

export default ViewCourse