import React, { useEffect, useState } from 'react'
import { FiChevronDown } from "react-icons/fi";
import ToggleSection from './ToggleSection';

// Presentational helpers: sum subsection `timeDuration` (seconds) when available
const sectionSeconds = (section) =>
  (section?.subSection || []).reduce((acc, sub) => acc + (parseInt(sub?.timeDuration) || 0), 0)

const formatSeconds = (total) => {
  if (!total) return null
  const h = Math.floor(total / 3600)
  const m = Math.floor((total % 3600) / 60)
  const s = Math.floor(total % 60)
  if (h) return `${h}h ${m}m`
  if (m) return `${m}m${s ? ` ${s}s` : ''}`
  return `${s}s`
}

const CourseContent = ({ courseDetail }) => {

  const [subSectionCount, setSubSectionCount] = useState(0);
  const [subSectionActive, setSubSectionActive] = useState(null)


  // Function to calculate subsection count

  let count = 0
  const getCount = (count) => {
    if (!courseDetail || !courseDetail.courseContent) {
      return 0;
    }
    const { courseContent } = courseDetail;
    for (let course of courseContent) {
      count += course?.subSection?.length || 0;
    }

    setSubSectionCount(count);
  };


  useEffect(() => {
    if (courseDetail) {
      getCount(count);
    }
  }, [courseDetail]);



  const subSectionHandler = (id) =>{
     if(subSectionActive===id){
      setSubSectionActive(null)
     }else{
      setSubSectionActive(id)
     }
  }

  const totalLength = formatSeconds(
    (courseDetail?.courseContent || []).reduce((acc, sec) => acc + sectionSeconds(sec), 0)
  )

  return (
    <section id='lessons' className='w-full scroll-mt-28'>
      <div className='flex flex-wrap items-end justify-between gap-4 mb-5'>
         <div>
           <h2 className='text-3xl md:text-4xl font-medium tracking-tight'>
             Lessons <span className='text-white/35'>{subSectionCount}</span>
           </h2>
           <p className='mt-2 text-sm text-white/55'>
             {courseDetail?.courseContent?.length || 0} sections
             {totalLength && <> · {totalLength} total</>}
           </p>
         </div>
         <button type='button' className='btn btn-ghost btn-sm' onClick={()=>setSubSectionActive(0)}>Collapse all</button>
      </div>

      <div className='flex flex-col gap-3'>
          {
            courseDetail ? (
              courseDetail?.courseContent?.map((section, i)=>{
                  const isOpen = section._id === subSectionActive
                  const duration = formatSeconds(sectionSeconds(section))
                  const n = section?.subSection?.length || 0
                  return (
                    <div
                      key={section._id}
                      className={`rounded-[28px] border transition-colors ${isOpen ? 'bg-white/[0.06] border-white/15' : 'bg-white/[0.03] border-white/[0.07] hover:bg-white/[0.05]'}`}
                    >
                      <button
                        type='button'
                        onClick={()=>subSectionHandler(section._id)}
                        aria-expanded={isOpen}
                        className='w-full flex items-center gap-4 p-3 pr-5 text-left'
                      >
                        <span className={`grid place-items-center shrink-0 w-11 h-11 rounded-full text-sm font-semibold ${isOpen ? 'bg-white text-night' : 'bg-white/[0.08] border border-white/10 text-white'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className='flex-1 min-w-0'>
                          <span className='block font-medium break-words'>{section?.sectionName}</span>
                          <span className='block text-xs text-white/45 mt-0.5'>
                            {n} {n === 1 ? 'lesson' : 'lessons'}{duration && ` · ${duration}`}
                          </span>
                        </span>
                        <FiChevronDown className={`shrink-0 text-white/55 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`} />
                      </button>

                      <div className={`
                            grid transition-all duration-500 ease-in-out
                            ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}
                            w-full
                          `}
                        >
                          <div className='overflow-hidden'>
                            <ToggleSection section = {section}/>
                          </div>
                        </div>
                    </div>
                  )
              })
            ) : (
              <div className='space-y-3'>
                {[0,1,2].map((k) => <div key={k} className='skeleton h-16 rounded-[28px]' />)}
              </div>
            )
          }
      </div>
    </section>
  )
}

export default CourseContent
