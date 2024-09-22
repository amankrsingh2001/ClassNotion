import React from 'react'
import { useSelector } from 'react-redux'
import { FaCheck } from "react-icons/fa";
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
    <div className='w-full '>
        <div className='items-center justify-center'>
            <div className='flex py-4' > {/* flex */}
                {steps.map((item, index)=>(
                    <div key={index}  className='w-[60%] flex items-center justify-center'>
                      <div className='rounded-full text-[#838894] w-full flex items-center justify-center relative'>
                          <div className={ `h-[40px] w-[40px] flex rounded-full font-bold z-[2] ${step === item.id ? "bg-[#251400]  text-yellow-300  border-[#FFD60A] border-2" :(`${step>item.id?"bg-yellow-25":"bg-[#161D29] #text-[#838894] border-[#2C333F]"}`) } `}>
                              {
                                  step>item.id ? (< FaCheck className=' mx-auto my-auto text-[#5d5e61]'/>) : (<p className=' mx-auto my-auto text-center'>{item.id}</p>)
                              }
                          </div>
                          {
                            item.id!== 3 && (  <hr className={`${item.id === step-1 ? "border-[1px] border-yellow-50 w-[94%] border-dotted absolute left-36 z-[1]":"border-[1px] border-[#AFB2BF] w-[94%] border-dotted absolute left-36 z-[1]"}`} />)
                          }
                        
                      </div>
                    </div>
                ))}
            </div>
        </div>
      <div className='flex justify-around w-full '>
      {
            steps.map((item, index)=>{
            
                  return  <div key={index} className='w-[90%]  items-center'>
                    
                        <p className={`text-lg text-center  ml-2 ${index === (step-1) ? "text-[#F1F2FF] ":(`${index<step?"text-yellow-50":"text-[#585D69]"}`)}`}>{item.title}</p>
                    </div>
      
          })}
      </div>
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
  )
}

export default RenderSteps