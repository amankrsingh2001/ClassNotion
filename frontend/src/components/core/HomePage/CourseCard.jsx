import React from 'react'
import { FaWpbeginner } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";

const CourseCard = ({data, index, setActive, active}) => {
    
    const changeActive = () =>{
        setActive(index)
    }

  return (
        <div onClick={()=>changeActive()} className={`w-[20%] ${index === active?"bg-white drop-shadow-[10px_12px_rgba(235,219,52)]":"bg-[#161D29] drop-shadow-[1px_2px_rgba(112,110,110)]"}  cursor-pointer flex flex-col justify-around p-3 `}>
            <div className='py-6 '>
            <h3 className={`p-4 px-2 text-start ${index === active?'text-black':'text-white'} text-lg`}>{ data.heading }</h3>
            <p className={`text-sm py-4 px-2 mb-8 text-start text-[#838894]`}>{data.description}</p>
            </div>
          
            <div className='flex p-2 justify-between '>
                <div className='flex justify-center items-center gap-2'>
                <FaWpbeginner className='inline mx-auto text-[#838894]'/>
                <p className={`text-sm text-[#838894] align-middle`}> {data.level}</p>
                </div>

                <div className='flex justify-center items-center gap-1'>
                <PiTreeStructureFill className='text-sm rotate-90 text-[#838894]'/>
                <p className={`text-sm text-[#838894]`}>{data.lessonNumber} Lesson</p>
                </div>
              
                
            </div>
        </div>

        
  )
}

export default CourseCard