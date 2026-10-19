import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { motion } from 'motion/react'
import RenderSteps from './RenderSteps'
import { FiZap } from "react-icons/fi";

const tips = [
  "Set the Course Price option or make it free.",
  "Standard size for the course thumbnail is 1024x576.",
  "Video section controls the course overview video.",
  "Course Builder is where you create & organize a course.",
  "Add Topics in the Course Builder section to create lessons, quizzes, and assignments.",
  "Information from the Additional Data section shows up on the course single page.",
  "Make Announcements to notify any important",
  "Notes to all enrolled students at once.",
]

const AddCourse = () => {

    const {user} = useSelector(state =>state.profile)
    const navigate = useNavigate()

    useEffect(()=>{
        if(user.accountType !== "Instructor"){
            navigate('/dashboard')
        }
    },[user.accountType, navigate])

  return (
    <div className='w-full py-8 text-white sm:py-10'>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: 'spring', stiffness: 220, damping: 24 }}
        className='mb-8'
      >
        <p className='eyebrow'>Instructor studio</p>
        <h1 className='h-display mt-3 text-4xl sm:text-5xl'>
          Create a <span className='text-gradient'>new course</span>
        </h1>
        <p className='mt-3 max-w-xl text-white/55'>Three quick steps — details, curriculum, then publish when you are ready.</p>
      </motion.div>

      <div className='flex flex-col gap-8 xl:flex-row xl:items-start'>
        <div className='flex min-w-0 flex-1 flex-col gap-6'>
          <RenderSteps/>
        </div>

        <aside className='w-full xl:sticky xl:top-28 xl:w-[340px] xl:shrink-0'>
          <div className='glass relative overflow-hidden p-6'>
            <div className='pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet/25 blur-3xl' />
            <div className='relative'>
              <div className='flex items-center gap-3'>
                <span className='icon-circle-glass'>
                  <FiZap className='text-citrus' />
                </span>
                <div>
                  <p className='eyebrow'>Pro tips</p>
                  <p className='text-lg font-medium tracking-tight'>Upload tips</p>
                </div>
              </div>
              <ul className='mt-6 flex flex-col gap-3.5 text-sm text-white/65'>
                {tips.map((tip, i) => (
                  <li key={i} className='flex gap-3'>
                    <span className='mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-brand' />
                    <span>{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </aside>
      </div>
    </div>
  )
}

export default AddCourse
