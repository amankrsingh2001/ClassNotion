import React, { useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { FiChevronLeft, FiChevronRight, FiInbox } from 'react-icons/fi';

import ShowCourseCard from './ShowCourseCard';

const CourseSlider = ({ Courses = [] }) => {
  const swiperRef = useRef(null);

  return (
    <div>
      {Courses?.length ? (
        <div className='relative group/slider'>
          <Swiper
            onSwiper={(swiper) => { swiperRef.current = swiper; }}
            loop={true}
            slidesPerView={1.12}
            spaceBetween={16}
            modules={[FreeMode, Pagination, Autoplay]}
            autoplay={{
              delay: 1500,
              disableOnInteraction: true
            }}
            breakpoints={{
              640: { slidesPerView: 2.1, spaceBetween: 20 },
              1024: { slidesPerView: 3, spaceBetween: 24 },
              1280: { slidesPerView: 3.4, spaceBetween: 24 }
            }}
            className='!py-2'
          >
            {Courses.map((course, index) => (
              <SwiperSlide key={index} className='!h-auto'>
                <ShowCourseCard course={course} height="h-[140px]" />
              </SwiperSlide>
            ))}
          </Swiper>

          <div className='mt-5 flex items-center justify-end gap-2 md:mt-0 md:absolute md:inset-y-0 md:-inset-x-5 md:z-10 md:justify-between md:pointer-events-none'>
            <button
              type='button'
              aria-label='Previous courses'
              className='btn-icon md:pointer-events-auto md:opacity-0 md:group-hover/slider:opacity-100 md:bg-night/40'
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <FiChevronLeft className='text-lg' />
            </button>
            <button
              type='button'
              aria-label='Next courses'
              className='btn-icon md:pointer-events-auto md:opacity-0 md:group-hover/slider:opacity-100 md:bg-night/40'
              onClick={() => swiperRef.current?.slideNext()}
            >
              <FiChevronRight className='text-lg' />
            </button>
          </div>
        </div>
      ) : (
        <div className='glass p-10 flex flex-col items-center text-center gap-3'>
          <div className='relative'>
            <div className='absolute inset-0 -z-10 rounded-full bg-magenta/40 blur-2xl' />
            <span className='icon-circle-glass w-14 h-14'><FiInbox className='text-xl' /></span>
          </div>
          <p className='text-lg font-medium tracking-tight'>No courses here yet</p>
          <p className='text-sm text-foreground/55'>Check back soon — new courses drop all the time.</p>
        </div>
      )}
    </div>
  );
};

export default CourseSlider;
