import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import RatingStars from '../Dashboard/AddCourse/courseBuilder/RatingStars'
import GetAvgRating from '../../../utils/avgRating';

const ShowCourseCard = ({course, height}) => {

    const [avgReviewCount, setAverageReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAverageReviewCount(count);
    },[course])


  return (
    <div className='py-4 w-full'>
        <Link to={`/courses/${course?._id}`}>
                <div className='flex flex-col gap-4'>
                    <div className=''>
                        <img src={course?.thumbnail} alt={course?.courseName} className={`${height} w-full  rounded object-cover aspect-video h-full`}/>
                    </div>
                    <div className='flex flex-col gap-1'>
                        <p className='text-[#F1F2FF]'>{course?.courseDescription}</p>
                        <p className='text-[#838894]'>{course?.courseName}</p>
                        <p className=''> {course?.instructor?.firstName} { course?.instructor?.lastName}</p>
                        <div className='flex gap-x-3'>
                            <RatingStars Review_Count={avgReviewCount}/>
                            <span>{course?.ratingAndReviews?.length || 4} Rating</span>
                        </div>
                        <p className='font-bold text-xl'>Rs: {course?.price}</p>
                    </div>
                </div>
        </Link>
    </div>
  )
}

export default ShowCourseCard