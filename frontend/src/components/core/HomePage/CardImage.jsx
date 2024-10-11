import React, { useEffect } from 'react'
import AOS from "aos";
import "aos/dist/aos.css";



const CardImage = () => {

  useEffect(() => {
    AOS.init({
      duration: 1000,
      delay: 0,
      offset: 400,
      mirror: false,
    });
  }, []);

  return (
    <div className='sm:w-10/12 w-11/12 p-6 flex justify-center'>
       <div className='flex sm:w-[90%] sm:flex-row  justify-center items-center relative '>
       <div data-aos = "fade-left" className='absolute z-[0] drop-shadow-2xl left-[80px]'>
          <img className='' src='/assets/Images/Know_your_progress.png'/>
        </div>
        <div data-aos = "fade-down" className='relative z-[1] drop-shadow-2xl'>
          <img src='/assets/Images/Compare_with_others.png'/>
        </div>
        <div data-aos = "fade-right" className='right-[30px] drop-shadow-2xl z-[2] absolute'>
          <img src='/assets/Images/Plan_your_lessons.svg'/>
        </div>
       </div>

    </div>
  )
}

export default CardImage