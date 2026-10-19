import React from 'react'
import { useSelector } from 'react-redux'
import { FiCheck } from "react-icons/fi";
import CourseInformationForm from './CourseInfo/CourseInformationForm';
import CourseBuilderForm from './courseBuilder/CourseBuilderForm';
import PublishCourse from './publishCourse/PublishCourse';

const  RenderSteps = () => {
    const {step} = useSelector(state =>state.course)

    const steps = [
        {
            id:1,
            title:"Course Information"
        },
        {
            id:2,
            title:"Course Builder"
        },
        {
            id:3,
            title:"Publish"
        }
    ]

  return (
    <div className='w-full'>
      {/* Stepper */}
      <div className='glass px-4 py-5 sm:px-8 sm:py-6'>
        <div className='flex items-start'>
          {steps.map((item, index) => {
            const done = step > item.id
            const current = step === item.id
            return (
              <React.Fragment key={item.id}>
                <div className='flex w-20 shrink-0 flex-col items-center gap-2.5 sm:w-28'>
                  <div className='relative grid h-12 w-12 place-items-center'>
                    {current && <span className='absolute inset-0 rounded-full bg-white/25 blur-md' />}
                    <div
                      className={`relative grid h-12 w-12 place-items-center rounded-full text-sm font-semibold transition-all duration-300
                        ${done
                          ? "bg-citrus text-night shadow-[0_0_24px_-4px_rgba(221,242,71,.6)]"
                          : current
                            ? "bg-white text-night"
                            : "border border-white/10 bg-white/[0.06] text-white/45 backdrop-blur-xl"}`}
                    >
                      {done ? <FiCheck className='text-lg' strokeWidth={3} /> : <span>{item.id}</span>}
                    </div>
                  </div>
                  <p className={`text-center text-[11px] font-medium leading-tight sm:text-xs
                    ${current ? "text-white" : done ? "text-white/70" : "text-white/35"}`}>
                    {item.title}
                  </p>
                </div>
                {index !== steps.length - 1 && (
                  <div className='mt-6 h-px flex-1 overflow-hidden rounded-full bg-white/10'>
                    <div className={`h-full bg-citrus transition-all duration-500 ${step > item.id ? "w-full" : "w-0"}`} />
                  </div>
                )}
              </React.Fragment>
            )
          })}
        </div>
      </div>

      <div className='mt-6'>
        {
          step === 1 && <CourseInformationForm />
        }
        {
          step === 2 && <CourseBuilderForm/>
        }
        {
          step === 3 && <PublishCourse/>
        }
      </div>
    </div>
  )
}

export default RenderSteps
