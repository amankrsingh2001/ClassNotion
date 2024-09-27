import React, { useEffect, useState } from 'react'
import { LuDot } from "react-icons/lu";
import { FaChevronUp } from "react-icons/fa";
import ToggleSection from './ToggleSection';


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


  return (
    <div className='w-10/12'>
      <div className='p-4 flex flex-col gap-4'>
         <h1 className='text-2xl '>Course Content</h1>
         <div className='flex justify-between w-[82%]'>
         <div className='flex gap-2'>
            <p className='text-white'>{courseDetail?.courseContent?.length} Sections</p>
            <p className='text-white'><LuDot className='mt-1' /></p>
            <p className='text-white'>{subSectionCount} Lecture</p>
            <p className='text-white'><LuDot className='mt-1' /></p>
            <p className='text-white'>{`7h 57m total length`} </p>
          </div>
          <p className='text-yellow-5 text-sm cursor-pointer' onClick={()=>setSubSectionActive(0)}>Collapse All</p>
         </div>
          
         
      </div>

      <div className='p-4 w-10/12 flex flex-col gap-4'>
          {
            courseDetail ? (<div>
              {
                courseDetail?.courseContent?.map((section)=>{
                    return<div  key={section._id}>
                       <div className='bg-richblack-800 p-4 border-[1px] border-richblack-500' >
                      <div onClick={()=>subSectionHandler(section._id)} className='flex justify-between cursor-pointer '>
                         <p  className='text-[#F1F2FF] text-sm'><FaChevronUp className='inline mr-2' /> {section?.sectionName}</p>
                          <div className='flex gap-4'>
                                <p className='text-yellow-25 text-sm'>5 Lecture</p>
                                <p className='text-sm'>51min</p>
                            </div>
                          
                            
                        </div>
                      
                      </div>

                      <div className={`
                            transition-all duration-1000 ease-in-out
                            ${section._id === subSectionActive ? "opacity-100 max-h-[1000px]" : "opacity-0 max-h-0"}
                            overflow-hidden w-full
                          `}
                        >
                          <ToggleSection section = {section}/>
                        </div>
                        
                    </div>
                   
              })
              }
            </div>) :<p>Loading...</p>
          }
      </div>
    
      </div>
  )
}

export default CourseContent