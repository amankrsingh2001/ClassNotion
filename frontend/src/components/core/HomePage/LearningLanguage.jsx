import React from 'react'
import { HilightText } from './HilightText'

function LearningLanguage() {
  return (
    <div className='w-11/12 flex  lg:items-center flex-col p-12' >
            <div className='mt-10 lg:w-[70%] flex flex-col  lg:items-center lg:justify-center'>
                <p className='text-4xl lg:p-4'>Your Swiss Knife For <HilightText text={'Learning any Language'}/></p>
                <p className='text-[#2C333F] sm:text-center text-left lg:w-[86%] opacity-80 mt-2  lg:p-4 text-[16px] '>Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.</p>
            </div>

    </div>
  )
}

export default LearningLanguage