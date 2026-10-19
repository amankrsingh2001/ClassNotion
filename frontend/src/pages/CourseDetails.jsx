
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { FiCheck } from 'react-icons/fi';
import { getNewCourseDetail } from '../services/courseDetail';
import { useSelector } from 'react-redux';
import CoursePage from '../components/core/catalog/CoursePage';
import CourseContent from '../components/core/catalog/CourseContent';

const CourseDetail = () =>{
    const {courseId} = useParams()
    const [courseDetail, setCourseDetail] = useState(null)
    // eslint-disable-next-line no-unused-vars
    const {token} = useSelector(state =>state.auth)

    const getCourseDetail = async() =>{
        // const response = await getFullCourseDetail(courseId, token)
        const response = await getNewCourseDetail(courseId)
        setCourseDetail(response)
    }

    useEffect(()=>{
        if(courseId){
            getCourseDetail()
        }
    },[courseId])

    if(!courseDetail){
        return (
            <div className="container-x pt-4 md:pt-8 pb-16">
                <div className="skeleton rounded-4xl md:rounded-5xl aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/6]" />
                <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-12">
                    <div className="flex flex-col gap-5">
                        <div className="skeleton h-14 w-3/4" />
                        <div className="skeleton h-5 w-full" />
                        <div className="skeleton h-5 w-2/3" />
                        <div className="skeleton h-[72px] rounded-[26px]" />
                        <div className="skeleton h-48 rounded-4xl" />
                    </div>
                    <div className="skeleton h-[460px] rounded-4xl" />
                </div>
            </div>
        )
    }

    const instructor = courseDetail?.instructor

    return (
        <div className="w-full min-h-[calc(100vh-12.5rem)]">
            <CoursePage courseDetail = {courseDetail}>

                {/* What you'll learn */}
                <section className="relative overflow-hidden glass p-6 sm:p-8">

                    <p className="relative eyebrow">Outcomes</p>
                    <h2 className="relative mt-2 text-2xl md:text-3xl font-medium tracking-tight">What you'll learn</h2>
                    {courseDetail?.whatYouWillLearn && (
                        <p className="relative mt-4 text-foreground/70 whitespace-pre-line">{courseDetail?.whatYouWillLearn}</p>
                    )}
                    {courseDetail?.tag?.length > 0 && (
                        <ul className="relative mt-6 grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                            {
                                courseDetail?.tag?.map((it, index)=>{
                                    return (
                                        <li key={index} className="flex items-center gap-3 rounded-2xl bg-foreground/[0.04] border border-foreground/[0.07] px-3 py-2.5 text-sm">
                                            <span className="shrink-0 grid place-items-center w-6 h-6 rounded-full bg-citrus text-night">
                                                <FiCheck className="text-xs" strokeWidth={3} />
                                            </span>
                                            <span className="break-words min-w-0 text-foreground/85">{it}</span>
                                        </li>
                                    )
                                })
                            }
                        </ul>
                    )}
                </section>

                <CourseContent courseDetail = {courseDetail}/>

                {/* Instructor */}
                <section>
                    <h2 className="text-2xl md:text-3xl font-medium tracking-tight mb-5">Meet your instructor</h2>
                    <div className="glass p-6 flex flex-col sm:flex-row gap-5">
                        <span className="shrink-0 self-start p-[2px] bg-brand rounded-full">
                            <img
                                className="w-20 h-20 rounded-full border-2 border-night object-cover bg-surface-2"
                                src={instructor?.image}
                                alt={`${instructor?.firstName ?? ''} ${instructor?.lastName ?? ''}`}
                            />
                        </span>
                        <div className="min-w-0">
                            <p className="text-xl font-medium tracking-tight">{instructor?.firstName} {instructor?.lastName}</p>
                            <span className="pill pill-magenta mt-2">Instructor</span>
                            <Link to={`/educators/${instructor?._id}`} className="btn btn-glass btn-sm ml-3">View educator & all courses</Link>
                            <p className="mt-4 text-foreground/55 leading-relaxed">{instructor?.additionalDetails?.about || "I will be your lead trainer in this course. Within no time, I will help you to understand the subject in an easy manner. I have a huge experience in online training and recording videos. Let's get started!"}</p>
                        </div>
                    </div>
                </section>
            </CoursePage>
        </div>
    )
}
export default CourseDetail
