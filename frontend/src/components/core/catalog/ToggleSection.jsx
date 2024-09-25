import React, { useState } from 'react'
import { IoIosTv } from "react-icons/io";
import { FaChevronUp } from "react-icons/fa";

const ToggleSection = ({section}) => {
    const [active, setActive] = useState(0)

    const subSectionHandler = (id) =>{
        setActive(id)
    }


  return (
    <div className='bg-richblack-900 w-full border-[1px] border-richblack-500'>
        <div>
            {
                section?.subSection.map((it,index)=>{
                    return (
                    <div className='py-2 px-4' key={it._id}>
                        <p onClick={()=>subSectionHandler(it._id)} className='text-sm cursor-pointer'><IoIosTv className='inline mr-2' />{it.title} <FaChevronUp className='inline ml-2' /> </p>
                    </div>
                    )
                })
            }
        </div>
    </div>
  )
}

export default ToggleSection