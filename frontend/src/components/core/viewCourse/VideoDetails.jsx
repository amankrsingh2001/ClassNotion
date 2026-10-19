import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { updateCompletedLecture } from '../../../slices/viewCourseSlice'
import {Player} from 'video-react'
import "video-react/dist/video-react.css";
import { FiArrowLeft, FiArrowRight, FiCheck, FiFilm, FiRotateCcw } from "react-icons/fi";
import { motion } from "motion/react";
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

    const instructor = courseEntireData?.instructor
    const isDone = completedLecture.includes(subSectionId)

  return (
    <div className='relative z-0 flex flex-col gap-6'>
        {
            !videoData ? (
                <div className='glass aspect-video flex flex-col items-center justify-center text-center gap-3 p-10'>
                    <div className='relative'>
                        <div className='absolute inset-0 -z-10 rounded-full bg-magenta/40 blur-2xl' />
                        <span className='icon-circle-glass w-14 h-14'><FiFilm className='text-xl' /></span>
                    </div>
                    <p className='text-lg font-medium tracking-tight'>No data found</p>
                    <p className='text-sm text-white/55'>Pick a lesson from the list to start watching.</p>
                </div>
            ) : (
                <div className='overflow-hidden rounded-3xl md:rounded-4xl border border-white/10 bg-night shadow-card [&_.video-react]:!bg-night [&_.video-react]:!font-sans [&_.video-react-control-bar]:!bg-night/60 [&_.video-react-control-bar]:backdrop-blur-xl [&_.video-react-big-play-button]:!rounded-full [&_.video-react-big-play-button]:!w-20 [&_.video-react-big-play-button]:!h-20 [&_.video-react-big-play-button]:!leading-[5rem] [&_.video-react-big-play-button]:!border-white/25 [&_.video-react-big-play-button]:!bg-white/15 [&_.video-react-big-play-button]:backdrop-blur-xl [&_.video-react-big-play-button]:!left-1/2 [&_.video-react-big-play-button]:!top-1/2 [&_.video-react-big-play-button]:!-ml-10 [&_.video-react-big-play-button]:!-mt-10 [&_.video-react-play-progress]:!bg-citrus [&_.video-react-volume-level]:!bg-citrus'>
                <Player
                ref = {playerRef}
                aspectRatio = "16:9"
                playsInline
                onEnded={(()=>setVideoEnded(true))}
                src={videoData?.videoUrl}
                >

                {
                    videEnded && (
                        <div className='absolute inset-0 z-10 grid place-items-center bg-night/60 backdrop-blur-sm p-3 sm:p-4'>
                            <motion.div
                                initial={{ opacity: 0, y: 16 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ type: 'spring', stiffness: 240, damping: 24 }}
                                className='glass-strong p-4 sm:p-7 flex flex-col items-center gap-3 sm:gap-5 max-w-full'
                            >
                                <div className='text-center'>
                                    <p className='eyebrow'>Lesson finished</p>
                                    <p className='mt-1 text-lg sm:text-2xl font-medium tracking-tight'>Nice work — what's next?</p>
                                </div>
                                <div className='flex flex-wrap justify-center gap-2 sm:gap-3'>
                                {
                                    !completedLecture.includes(subSectionId) && (
                                        <button className='btn btn-primary' onClick={()=>handleLectureCompletion()}>
                                            <FiCheck strokeWidth={3} /> {loading ? 'Saving...' : 'Mark as completed'}
                                        </button>
                                    )
                                }
                                    <button className='btn btn-glass' onClick={()=>{
                                        if(playerRef?.current){
                                            playerRef.current?.seek(0)
                                    setVideoEnded(false)}}}>
                                        <FiRotateCcw /> Rewatch
                                    </button>
                                </div>

                                <div className='flex flex-wrap justify-center gap-2 sm:gap-3'>
                                   {
                                    !isFirstVideo() &&  (
                                        <button className='btn btn-glass btn-sm' onClick={()=>goToPreviousVideo()}>
                                            <FiArrowLeft /> Prev
                                        </button>
                                    )
                                   }
                                   {
                                    !isLastVideo() && (
                                        <button className='btn btn-glass btn-sm' onClick={()=>goToNextVideo()}>
                                            Next <FiArrowRight />
                                        </button>
                                    )
                                   }
                                </div>
                            </motion.div>
                        </div>
                    )
                }
                </Player>
                </div>
            )
        }

        <div className='flex flex-col gap-5 px-1'>
            <div className='flex flex-wrap items-center gap-2'>
                <span className='pill'><span className='w-1.5 h-1.5 rounded-full bg-magenta' /> Now playing</span>
                {isDone && <span className='pill pill-citrus'><FiCheck strokeWidth={3} /> Completed</span>}
            </div>
            <h1 className='h-display text-3xl sm:text-4xl md:text-5xl text-white break-words'>{videoData?.title}</h1>
            {videoData?.description && <p className='text-white/55 text-base md:text-lg whitespace-pre-line max-w-3xl'>{videoData?.description}</p>}

            {instructor && (
                <div className='flex items-center justify-between gap-4 p-3 pr-5 rounded-[26px] bg-white/[0.04] border border-white/[0.07]'>
                    <div className='flex items-center gap-3 min-w-0'>
                        <span className='shrink-0 p-[2px] bg-brand rounded-full'>
                            <img
                                src={instructor?.image}
                                alt={`${instructor?.firstName ?? ''} ${instructor?.lastName ?? ''}`}
                                className='w-11 h-11 rounded-full object-cover border-2 border-night bg-surface-2'
                            />
                        </span>
                        <div className='min-w-0'>
                            <p className='text-xs text-white/45'>By</p>
                            <p className='font-medium truncate'>{instructor?.firstName} {instructor?.lastName}</p>
                        </div>
                    </div>
                    <p className='text-sm text-white/55 truncate max-w-[45%] text-right'>{courseEntireData?.courseName}</p>
                </div>
            )}
        </div>

    </div>
  )
}

export default VideoDetails
