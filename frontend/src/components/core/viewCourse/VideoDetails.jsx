import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLecture } from '../../../slices/viewCourseSlice'
import {Player} from 'video-react'
import "video-react/dist/video-react.css";
import { IoPlayCircleOutline } from "react-icons/io5";
import { updateCourseProgress } from '../../../services/courseDetail'



const VideoDetails = () => {
    const {courseId, sectionId, subSectionId} = useParams()
    const {token} = useSelector(state=>state.auth)
    const {courseSection, courseEntireData, completedLecture} = useSelector(state=>state.viewCourse)


    const [videoData, setVideoData] = useState([])
    const [videEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    const location = useLocation()

    const navigate = useNavigate()
    const dispatch = useDispatch()
    const playerRef = useRef() 


 


    
    useEffect(()=>{

        const setVideoSpecificDetails = async() =>{
            if(!courseSection.length){
                return 
            }
            if(!courseId && !sectionId && !subSectionId){
                navigate('/dashboard/enrolled-courses')
            }
            else{
                const filteredData = courseSection.filter((course)=>course._id === sectionId)
                const filteredVideoData = filteredData?.[0].subSection.filter((data)=>data._id === subSectionId)
                setVideoData(filteredVideoData[0])
                setVideoEnded(false)
            }
        }
        setVideoSpecificDetails()

    },[courseSection, courseEntireData, location.pathname])



    const isFirstVideo = () =>{
        const currentSectionIndex = courseSection.findIndex((data)=>data._id===sectionId)
        const currentSubSectionIndex = courseSection[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSectionIndex === 0 && currentSubSectionIndex === 0){
            return true
        }else{
            return false
        }
    }

    const isLastVideo = () =>{
        const currentSectionIndex = courseSection.findIndex((data)=>data._id===sectionId)

        const noOfSubSections = courseSection[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSection[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )

        if(currentSectionIndex === courseSection.length-1 && currentSubSectionIndex === noOfSubSections-1 ){
            return true
        }else{
            return false
        }
    }

    const goToNextVideo = () => {

        const currentSectionIndex = courseSection.findIndex(
            (data) => data._id === sectionId
        )
    
        const noOfSubSections = courseSection[currentSectionIndex].subSection.length;
    
        const currentSubSectionIndex = courseSection[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
    
        if(currentSubSectionIndex !== noOfSubSections - 1) {
            //same section ki next video me jao
            const nextSubSectionId = courseSection[currentSectionIndex].subSection[currentSectionIndex + 1]._id;
            //next video pr jao
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${nextSubSectionId}`)
        }
        else {
            //different section ki first video
            const nextSectionId = courseSection[currentSectionIndex + 1]._id;
            const nextSubSectionId = courseSection[currentSectionIndex + 1].subSection[0]._id;
            ///iss voide par jao 
            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/${nextSubSectionId}`)
        }
      }

    


    const goToPreviousVideo = () =>{
        const currentSectionIndex = courseSection.findIndex((data)=>data._id === sectionId)
          
        const noOfSubSections = courseSection[currentSectionIndex].subSection.length

        const currentSubSectionIndex = courseSection[currentSectionIndex].subSection.findIndex(
            (data) => data._id === subSectionId
        )
        if(currentSubSectionIndex !== 0){
            //same section previous video
            const previousSubSectionId = courseSection[currentSectionIndex].subSection[currentSubSectionIndex - 1]
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/${previousSubSectionId}`)
        }else{
            const previousSectionId = courseSection[currentSectionIndex - 1]._id
            const prevSubSectionLength = courseSection[currentSectionIndex-1].subSection.length
            const prevSubSectionId = courseSection[currentSectionIndex - 1].subSection[prevSubSectionLength]._id
            navigate(`/view-course/${courseId}/section/${previousSectionId}/sub-section/${prevSubSectionId}`)
        }
    }


    const handleLectureCompletion = async() =>{
        //needed to be dont and api
        setLoading(true)
        const res = await updateCourseProgress({courseId, subSectionId}, token)
        if(res){
            dispatch(updateCompletedLecture(subSectionId))
        }
        
        setLoading(false)
    }
    
  return (
    <div className='text-white relative z-0'>
        {
            !videoData ? (<div>No data found</div>) : (
                <Player 
                ref = {playerRef}
                aspectRatio = "16:9"
                playsInline
                onEnded={(()=>setVideoEnded(true))}
                src={videoData?.videoUrl}
                >
                 
                 <IoPlayCircleOutline />

                {
                    videEnded && (
                        <div className='border-2 border-white  flex gap-5'>
                            <div className='absolute flex top-1/2 left-1/3 z-10  gap-4'>
                           {
                              !completedLecture.includes(subSectionId) && (
                                <button className='px-2 py-3 rounded-md text-2xl  bg-caribbeangreen-400 text-black w-fit' onClick={()=>handleLectureCompletion()}>Mark As Completed</button>
                            ) 
                            }


                                <button className=' px-2 py-3 rounded-md text-2xl  bg-richblack-800 w-fit   text-white z-10' onClick={()=>{
                                    if(playerRef?.current){
                                        playerRef.current?.seek(0)
                                setVideoEnded(false)}}}>Rewatch</button>

                            </div>
                           
                                <div className='bg-white'>
                                   {
                                    !isFirstVideo() &&  (
                                        <button className='bg-caribbeangreen-200 text-white h-[40px] w-[40px]' onClick={()=>goToPreviousVideo()}>Prev</button>
                                    )
                                   }
                                   {
                                    !isLastVideo() && ( <button className='bg-caribbeangreen-400 text-white h-[40px] w-[40px]' onClick={()=>goToNextVideo()}>Next</button>
                                    )
                                   }
                                </div>
                        </div>
                    )
                }
                </Player>
            )
        }
        <div className='mt-8 flex flex-col gap-2'>
        <h1 className='text-xl'>{videoData?.title}</h1>
        <p className='text-[#818186]'>{videoData?.description}</p>
        </div>
      
    </div>
  )
}

export default VideoDetails 