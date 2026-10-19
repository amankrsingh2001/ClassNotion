import React from 'react'
import { FiChevronRight, FiPlay } from "react-icons/fi";

const formatDuration = (secs) => {
  const total = parseInt(secs) || 0
  if (!total) return null
  const m = Math.floor(total / 60)
  const s = Math.floor(total % 60)
  return m ? `${m} min` : `${s} sec`
}

const ToggleSection = ({section}) => {

  return (
    <ul className='flex flex-col gap-2 px-3 pb-3'>
        {
            section?.subSection.map((it)=>{
                const duration = formatDuration(it?.timeDuration)
                return (
                <li className='row-item' key={it._id}>
                    <span className='icon-circle'>
                      <FiPlay className='translate-x-[1px] fill-current text-sm' />
                    </span>
                    <span className='flex-1 min-w-0'>
                      <span className='block text-sm font-medium break-words'>{it.title}</span>
                      {duration && <span className='block text-xs text-foreground/45 mt-0.5'>{duration}</span>}
                    </span>
                    <FiChevronRight className='shrink-0 text-foreground/40' />
                </li>
                )
            })
        }
    </ul>
  )
}

export default ToggleSection
