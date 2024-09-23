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
    <div>
        <Link to={`/courses/${course?._id}`}>
                <div>
                    <div>
                        <img src={course?.thumbnail} alt={course?.courseName} className={`${height} w-full rounded object-cover`}/>
                    </div>
                    <div>
                        <p>{course?.courseName}</p>
                        <p> {course?.instructor?.firstName} { course?.instructor?.lastName}</p>
                        <div className='flex gap-x-3'>
                            <span>{avgReviewCount || 4}</span>
                            <RatingStars Review_Count={avgReviewCount}/>
                            <span>{course?.ratingAndReviews?.length || 4} Rating</span>
                        </div>
                        <p>Rs: {course?.price}</p>
                    </div>
                </div>
        </Link>
    </div>
  )
}

export default ShowCourseCard