import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiChevronRight, FiClock, FiVideo } from 'react-icons/fi'
import { FaStar } from 'react-icons/fa6'
import GetAvgRating from '../../../utils/avgRating';
import AvatarStack from '../../ui/AvatarStack';

// Presentational helpers — tolerate both populated and id-only courseContent
const lectureCount = (course) =>
    (course?.courseContent || []).reduce(
        (acc, sec) => acc + (typeof sec === 'object' && Array.isArray(sec?.subSection) ? sec.subSection.length : 1),
        0
    )

const totalDuration = (course) => {
    const secs = (course?.courseContent || []).reduce(
        (acc, sec) => acc + (sec?.subSection || []).reduce((a, s) => a + (parseInt(s?.timeDuration) || 0), 0),
        0
    )
    if (!secs) return null
    const h = Math.floor(secs / 3600)
    const m = Math.floor((secs % 3600) / 60)
    return h ? `${h}h ${m}m` : `${m || 1}m`
}

const compact = (n) => (n >= 1000 ? `${(n / 1000).toFixed(n >= 10000 ? 0 : 1)}K` : `${n}`)

// `height` is kept for API compatibility; the card uses a fixed 4/5 frame
// eslint-disable-next-line no-unused-vars
const ShowCourseCard = ({course, height}) => {

    const [avgReviewCount, setAverageReviewCount] = useState(0);
    useEffect(()=>{
        const count = GetAvgRating(course.ratingAndReviews);
        setAverageReviewCount(count);
    },[course])

    const enrolled = course?.studentsEnrolled?.length || 0
    const lectures = lectureCount(course)
    const duration = totalDuration(course)
    const instructor = typeof course?.instructor === 'object' ? course?.instructor : null
    const instructorName = instructor
        ? `${instructor?.firstName ?? ''} ${instructor?.lastName ?? ''}`.trim()
        : 'ClassNotion'

  return (
    <div className='w-full h-full'>
        <Link
            to={`/courses/${course?._id}`}
            className='group relative block overflow-hidden rounded-4xl aspect-[4/5] bg-surface border border-white/10 shadow-card transition duration-500 hover:-translate-y-1.5 hover:border-white/20'
        >
            <img
                src={course?.thumbnail}
                alt={course?.courseName}
                loading='lazy'
                className='absolute inset-0 w-full h-full object-cover transition duration-700 group-hover:scale-[1.06]'
            />
            <div className='absolute inset-0 bg-pink-wash mix-blend-screen opacity-80' />
            <div className='absolute inset-0 bg-photo-fade' />

            {/* Top row */}
            <div className='absolute top-4 inset-x-4 flex items-start justify-between gap-2'>
                <AvatarStack count={`+${compact(enrolled)}`} size={28} />
                <span className='pill pill-white h-8 px-3.5 text-[13px] font-semibold'>
                    {course?.price ? `Rs. ${course?.price}` : 'Free'}
                </span>
            </div>

            {/* Bottom content */}
            <div className='absolute inset-x-0 bottom-0 p-5 sm:p-6 flex flex-col gap-3'>
                <p className='text-2xl font-medium tracking-tight leading-[1.1] text-white line-clamp-2 break-words'>
                    {course?.courseName}
                </p>
                <div className='flex flex-wrap items-center gap-x-4 gap-y-1 text-[13px] text-white/75'>
                    <span className='inline-flex items-center gap-1.5'>
                        <FiClock />
                        {duration || `${lectures} ${lectures === 1 ? 'lesson' : 'lessons'}`}
                    </span>
                    <span className='inline-flex items-center gap-1.5'>
                        <FaStar className='text-citrus' />
                        {avgReviewCount ? avgReviewCount.toFixed(1) : 'New'}
                    </span>
                    <span className='inline-flex items-center gap-1.5'>
                        <FiVideo />
                        {lectures}
                    </span>
                </div>
                <div className='divider' />
                <div className='flex items-center justify-between gap-3 text-[13px]'>
                    <span className='text-white/55 truncate'>By <span className='text-white/85'>{instructorName}</span></span>
                    <span className='inline-flex items-center gap-0.5 font-medium text-white shrink-0'>
                        View <FiChevronRight className='transition-transform group-hover:translate-x-0.5' />
                    </span>
                </div>
            </div>
        </Link>
    </div>
  )
}

export default ShowCourseCard
