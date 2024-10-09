import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import ShowCourseCard from './ShowCourseCard';

const CourseSlider = ({ Courses = [] }) => {
  return (
    <div className=''>
      {Courses?.length ? (
        <Swiper
        loop={true}
        slidesPerView={1}
        spaceBetween={24}
          modules={[FreeMode, Pagination,Autoplay]}
          pagination={{
            dynamicBullets:true
          }}
          autoplay = {{
            delay:1500,
            disableOnInteraction:true
          }}
          navigation={true}
          breakpoints={{
            1024:{slidesPerView:3}
          }}
        >
          {Courses.map((course, index) => (
            <SwiperSlide key={index}>
              <ShowCourseCard course={course} height="h-[140px]" />
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <p className='py-4 px-12 text-yellow-50'>No courses available</p>
      )}
    </div>
  );
};

export default CourseSlider;