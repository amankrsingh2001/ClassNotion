import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { FiArrowLeft, FiCheck, FiChevronDown, FiPlay, FiStar } from 'react-icons/fi'
import ProgressRing from '../../ui/ProgressRing'

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

    // Display-only progress: fall back to counting lectures locally if the store total is 0
    const totalLectures =
      totalNoOfLectures ||
      courseSection.reduce((acc, sec) => acc + (sec?.subSection?.length || 0), 0)
    const doneLectures = completedLecture?.length || 0
    const progress = totalLectures ? Math.min(100, Math.round((doneLectures / totalLectures) * 100)) : 0

  return (
        <aside className='w-full lg:sticky lg:top-28'>
          <div className='glass flex flex-col overflow-hidden lg:max-h-[calc(100vh-8.5rem)]'>
            {/* buttons, heading and progress */}
            <div className='p-5 flex flex-col gap-5 border-b border-foreground/[0.07]'>
              <div className='flex items-center justify-between gap-2'>
                <button aria-label='Back to enrolled courses' className='btn-icon' onClick={()=>{navigate('/dashboard/enrolled-courses')}}>
                  <FiArrowLeft />
                </button>
                <button className='btn btn-gradient btn-sm' onClick={()=>setReviewModal(true)}>
                  <FiStar /> Add review
                </button>
              </div>

              <div className='flex items-center gap-4'>
                <ProgressRing value={progress} size={60} stroke={4} color='var(--success)'>
                  <span className='text-xs'>{progress}%</span>
                </ProgressRing>
                <div className='min-w-0'>
                  <p className='text-2xl font-medium tracking-tight leading-none'>Lessons</p>
                  <p className='mt-1.5 text-sm text-foreground/55'>
                    <span className='text-citrus font-medium'>{doneLectures}</span>/{totalLectures} completed
                  </p>
                </div>
              </div>
              <p className='text-sm text-foreground/45 line-clamp-2 break-words'>{courseEntireData?.courseName}</p>
            </div>

            {/* sections and subsections */}
            <div className='p-3 flex flex-col gap-2 overflow-y-auto no-scrollbar'>
              {
                courseSection.map((course, index)=>{
                   const isOpen = activeStatus === course?._id
                   const doneInSection = course?.subSection?.filter((s) => completedLecture.includes(s?._id)).length || 0
                   return (
                     <div
                      onClick={()=>setActiveStatus(course?._id)}
                      key={index}
                      className={`cursor-pointer rounded-[24px] border transition-colors ${isOpen ? 'bg-foreground/[0.05] border-foreground/[0.12]' : 'border-transparent hover:bg-foreground/[0.04]'}`}
                    >
                      {/* section */}
                      <div className='flex items-center gap-3 px-3 py-3'>
                        <span className='grid place-items-center shrink-0 w-9 h-9 rounded-full bg-foreground/[0.08] border border-foreground/10 text-xs font-semibold'>
                          {String(index + 1).padStart(2, '0')}
                        </span>
                        <span className='flex-1 min-w-0'>
                          <span className='block text-sm font-medium break-words'>{course?.sectionName}</span>
                          <span className='block text-xs text-foreground/45 mt-0.5'>{doneInSection}/{course?.subSection?.length || 0} done</span>
                        </span>
                        <FiChevronDown className={`shrink-0 text-foreground/55 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                      </div>

                      {/* subSections */}
                      {
                        isOpen && (
                          <div className='px-2 pb-2 flex flex-col gap-1.5'>
                            {
                              course.subSection.map((topic, index)=>{
                                const isActive = videoBarActive === topic._id
                                const isDone = completedLecture.includes(topic?._id)
                                return (
                                    <div
                                    key={index}
                                    onClick={()=>{navigate(`/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`)}}
                                      className={`flex items-center gap-3 cursor-pointer p-2 pr-3 rounded-[18px] text-sm transition-colors ${isActive ? 'bg-foreground/[0.1] border border-foreground/15' : 'border border-transparent hover:bg-foreground/[0.05]'}`}
                                    >
                                      <span className='relative shrink-0 grid place-items-center w-8 h-8'>
                                        <input type='checkbox'
                                          className='peer sr-only'
                                          checked = {isDone}
                                          onChange={()=>{}}
                                        />
                                        <span className={`absolute inset-0 rounded-full ${isDone ? 'bg-citrus' : isActive ? 'bg-foreground' : 'bg-foreground/[0.06] border border-foreground/15'}`} />
                                        {isDone
                                          ? <FiCheck className='relative text-sm text-night' strokeWidth={3} />
                                          : isActive && <FiPlay className='relative text-[11px] text-night fill-current translate-x-[1px]' />}
                                      </span>
                                      <span className={`break-words min-w-0 ${isActive ? 'text-foreground font-medium' : isDone ? 'text-foreground/55' : 'text-foreground/75'}`}>{topic.title}</span>
                                    </div>
                                )
                              })
                            }
                          </div>
                        )
                      }
                    </div>
                    )
                })
              }
            </div>
          </div>
        </aside>
  )
}

export default VideoDetailsSidebar
