import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'



const VideoDetailsSidebar = ({ setReviewModal }) => {

    const [activeStatus, setActiveStatus] = useState('')
    const [videoBarActive, setVideoBarActive] = useState('')
    const navigate = useNavigate()
    const {sectionId, subSectionId} = useParams()
    const location = useLocation()
    const {courseSection, courseEntireData, totalNoOfLectures, completedLecture} = useSelector((state)=>state.viewCourse) 



    useEffect(()=>{
      ;(()=>{
        if(!courseSection.length){
          return;
        }
        const currentSectionIndex = courseSection.findIndex(
          (data) =>data._id ===sectionId
        )
        const currentSubSectionIndex = courseSection?.[currentSectionIndex]?.subSection.findIndex((data)=>data._id === subSectionId)

        const activeSubSectionId = courseSection[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id
          //set current section here
        setActiveStatus(courseSection?.[currentSectionIndex]?._id)
        //set current subSection here
        setVideoBarActive(activeSubSectionId)

      })()
    },[courseSection, courseEntireData, location.pathname])


  return (
        <>
          <div className='text-white w-[22%] flex flex-col gap-3 '>
            {/* for buton and heading*/}
            <div className=' px-4'>
              <div className='flex   justify-between mb-6'>
              <button className='py-2 px-3 rounded-md hover:scale-110 text-md bg-yellow-25 text-black' onClick={()=>{navigate('/dashboard/enrolled-courses')}}>
                Back
              </button>
     
                {/* <button className='bg-richblack-800 py-2 px-3 hover:scale-110  rounded-md text-md' onClick={()=>setReviewModal(true)}>Add Review</button> */}

              </div>
             
              <div>
                {/* for heading and title */}
                <p className='text-[#F1F2FF] font-inter text-2xl'>{courseEntireData?.courseName}</p>
                {/* <p>{completedLectures?.length}/ {totalNoOfLectures}</p> */}
              </div>
            </div>

            {/* for sections and SubSection course is section below*/}
            <div>
              {
                courseSection.map((course, index)=>{

                   return (
                     <div
                      onClick={()=>setActiveStatus(course?._id)}
                      key={index}
                      className='text-[#bfc0c4] mb-4 cursor-pointer flex flex-col gap-3'
                    >
                      {/* section */}
                      <div>
                        <div className='text-xl px-4'>{course?.sectionName}</div>
                         {/* Add arrow icon here */}
                      </div>
                     
                      {/* subSections */}
                      <div className='text-white '>
                        {
                          activeStatus === course?._id && (
                            <div className='text-white '>
                              {
                                course.subSection.map((topic, index)=>{
                                  return (
                                      <div
                                      key={index}
                                      onClick={()=>{navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)}}
                                        className={`flex gap-3 cursor-pointer p-4 ${videoBarActive === topic._id?"bg-yellow-50 text-black":"bg-richblue-900 text-white "}`}
                                      >
                                        <input type='checkbox'
                                          checked = {completedLecture.includes(topic?._id)}
                                          onChange={()=>{}}
                                        />
                                        <span className=''>{topic.title}</span>
                                      </div>
                                  )
                                })
                              }
                            </div>
                          )
                        }
                      </div>
                    </div>
                    )
                })
              }
            </div>
          </div>
        </>
  )
}

export default VideoDetailsSidebar