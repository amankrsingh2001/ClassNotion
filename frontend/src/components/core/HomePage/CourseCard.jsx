import { AnimatePresence, motion } from 'motion/react';
import React from 'react'
import { FaWpbeginner } from "react-icons/fa6";
import { PiTreeStructureFill } from "react-icons/pi";

const CourseCard = ({data, index, setActive, active}) => {
    
    const changeActive = () =>{
        setActive(index)
    }

  return (
   <AnimatePresence exitBeforeEnter>
        <motion.div key={data.id}  onClick={()=>changeActive()} className={`md:w-[20%] rounded-md ${index === active?"bg-white drop-shadow-[10px_14px_6px_rgba(161,147,191,2)]":"bg-[#0f0f0f] drop-shadow-[1px_2px_rgba(112,110,110)]"} border-t-2  cursor-pointer flex flex-col justify-around p-3 hover:bg-white hover:drop-shadow-[10px_12px_6px_rgba(161,147,191,0.5)] group transition-colors duration-150`}>
            <div className='py-6 '>
            <motion.h3  key={data.heading} // <- important
            initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200 }}
            transition={{ duration: 0.3 }}  className={`p-4 px-2 text-start group-hover:text-black ${index === active?'text-black':'text-white'} text-lg`}>{ data.heading }</motion.h3>

            <p  initial={{ x: 200, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -200, opacity: 0 }}
            transition={{ duration: 0.3 }}  className={`text-sm py-4 px-2 mb-8 text-start text-[#838894]`}>{data.description}</p>

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
        </motion.div>
        </AnimatePresence>
        
  )
}

export default CourseCard