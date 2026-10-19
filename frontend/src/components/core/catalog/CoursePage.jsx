import { useEffect, useState } from "react";
import RatingStars from "../Dashboard/AddCourse/courseBuilder/RatingStars"
import GetAvgRating from "../../../utils/avgRating";
import { FiArrowLeft, FiCalendar, FiCheck, FiGlobe, FiPlay, FiShare2, FiShoppingCart, FiUsers, FiArrowUpRight, FiShield } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "motion/react";
import { buyCourse } from "../../../services/studentFeaturesAPI";
import toast from "react-hot-toast";
import ConfirmationModal from '../../Common/ConfirmationModal';
import { formatDate } from '../../../services/formatData';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from "../../../slices/cartSlice";

// `children` (optional) renders below the intro in the left column so the purchase card can stay sticky beside it.
const CoursePage = ({courseDetail, children}) =>{

    const [avgReviewCount, setAverageReviewCount] = useState(0);
    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state =>state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [isStudentEnrolled, setIsStudentEnrolled] = useState(false)

    useEffect(() => {
        if (courseDetail?.ratingAndReviews) {
          const count = GetAvgRating(courseDetail.ratingAndReviews);
          setAverageReviewCount(count);
        } else {
          setAverageReviewCount(0); // Default value if there are no reviews
        }
      }, [courseDetail]);



    if(!courseDetail){
        return (
            <div className="container-x py-10 space-y-4">
                <div className="skeleton h-12 w-2/3" />
                <div className="skeleton h-6 w-1/2" />
            </div>
        )
    }

    const checkIsStudentEnrolled=()=>{
        if(courseDetail?.studentsEnrolled.includes(user._id)){
            setIsStudentEnrolled(true)
        }
    }

    useEffect(()=>{
        if(courseDetail && user){
            checkIsStudentEnrolled()
        }
    },[courseDetail,user])

    const handleAddToCart = () =>{
        if(user && (user.accountType === ACCOUNT_TYPE.INSTRUCTOR || user.accountType ===ACCOUNT_TYPE.ADMIN) ){
            toast.error("You are an instructor, You can buy a course")
            return;
        }if(token){
            dispatch(addToCart(courseDetail))
            return
        }
        setConfirmationModal({
            text1:"You are not logged in",
            text2:'Please login to add to cart',
            btn1Text:"Login",
            btn2Text:"Cancel",
            btn1Handler:()=>navigate('/login'),
            btn2Handler:()=>setConfirmationModal(null),
        })

    }

    const handleShare = () =>{
        copy(window.location.href)
        toast.success("Copied to clipboad")
    }

    const handleBuyCourse = () =>{
        if(!token){
            setConfirmationModal({
                text1:'You are not logged In',
                text2:'Please login to purchase the course',
                btn1Text:'Login',
                btn2Text:'Cancel',
                btn1Handler:()=>navigate('/login'),
                btn2Handler:()=>setConfirmationModal(null),
            })
        }
        if(token){
            buyCourse([courseId],token, user, navigate, dispatch)
        }

    }

    const reviewCount = courseDetail?.ratingAndReviews?.length || 0
    const enrolledCount = courseDetail?.studentsEnrolled?.length || 0
    const instructor = courseDetail?.instructor

    const handlePlay = () => {
        if (isStudentEnrolled) {
            navigate('/dashboard/enrolled-courses')
            return
        }
        document.getElementById('lessons')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    return <div className="w-full">
        <div className="container-x pt-4 md:pt-8 pb-16">

            {/* Media hero */}
            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className="relative overflow-hidden rounded-4xl md:rounded-5xl aspect-[4/3] sm:aspect-[16/8] lg:aspect-[16/6] bg-surface border border-white/10 shadow-card"
            >
                <img
                    className="absolute inset-0 w-full h-full object-cover"
                    src={courseDetail?.thumbnail}
                    alt={courseDetail?.courseName}
                />
                <div className="absolute inset-0 bg-pink-wash mix-blend-screen opacity-70" />
                <div className="absolute inset-0 bg-photo-fade" />

                <div className="absolute top-4 inset-x-4 sm:top-6 sm:inset-x-6 flex items-center justify-between">
                    <button type="button" aria-label="Go back" className="btn-icon bg-night/30" onClick={() => navigate(-1)}>
                        <FiArrowLeft className="text-lg" />
                    </button>
                    <button type="button" aria-label="Share course" className="btn-icon bg-night/30" onClick={() => handleShare()}>
                        <FiShare2 className="text-lg" />
                    </button>
                </div>

                <button
                    type="button"
                    onClick={handlePlay}
                    aria-label={isStudentEnrolled ? 'Go to course' : 'View lessons'}
                    className="group absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 grid place-items-center w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-white/15 border border-white/25 backdrop-blur-xl transition hover:scale-105"
                >
                    <span className="grid place-items-center w-11 h-11 sm:w-14 sm:h-14 rounded-full bg-white text-night shadow-glow">
                        <FiPlay className="text-lg sm:text-xl translate-x-[1px] fill-current" />
                    </span>
                </button>

                <div className="absolute bottom-4 inset-x-4 sm:bottom-6 sm:inset-x-6 flex flex-wrap items-center gap-2">
                    <span className="pill"><FiPlay className="text-[10px]" /> Preview</span>
                    <span className="pill">{reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}</span>
                </div>
            </motion.section>

            <div className="mt-8 md:mt-12 grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_380px] gap-10 lg:gap-12 items-start">

                {/* Left column: intro (+ page sections passed as children) */}
                <div className="min-w-0 flex flex-col gap-10">
                    <section className="flex flex-col gap-6">
                        <div>
                            <p className="eyebrow">Course</p>
                            <h1 className="mt-3 h-display text-4xl sm:text-5xl md:text-6xl text-white break-words">
                                {courseDetail?.courseName}
                            </h1>
                            {courseDetail?.courseDescription && (
                                <p className="mt-5 text-base md:text-lg text-white/55 max-w-2xl">{courseDetail?.courseDescription}</p>
                            )}
                        </div>

                        {/* Instructor row */}
                        <div className="flex items-center justify-between gap-4 p-3 pr-5 rounded-[26px] bg-white/[0.04] border border-white/[0.07]">
                            <div className="flex items-center gap-3 min-w-0">
                                <span className="shrink-0 p-[2px] bg-brand rounded-full">
                                    <img
                                        className="w-12 h-12 rounded-full object-cover border-2 border-night bg-surface-2"
                                        src={instructor?.image}
                                        alt={`${instructor?.firstName ?? ''} ${instructor?.lastName ?? ''}`}
                                    />
                                </span>
                                <div className="min-w-0">
                                    <p className="text-xs text-white/45">By</p>
                                    <p className="font-medium truncate">
                                        {courseDetail?.instructor.firstName || "Teacher"} {courseDetail?.instructor.lastName || "Teacher"}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2 shrink-0">
                                <span className="hidden sm:block [&>div]:!text-citrus">
                                    <RatingStars Review_Count={avgReviewCount} Star_Size={16}/>
                                </span>
                                <span className="inline-flex items-center gap-1.5 text-lg font-medium">
                                    {avgReviewCount || 0} <FaStar className="text-citrus text-sm" />
                                </span>
                            </div>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            <span className="pill h-8 px-3.5"><FiGlobe /> English</span>
                            <span className="pill h-8 px-3.5"><FiCalendar />{`Created ${formatDate( courseDetail?.updatedAt )}`}</span>
                            <span className="pill h-8 px-3.5"><FiUsers /> {enrolledCount} enrolled</span>
                        </div>
                    </section>

                    {children}
                </div>

                {/* Right column: sticky purchase card */}
                <aside className="lg:sticky lg:top-28 w-full max-w-md mx-auto lg:max-w-none">
                    <div className="relative glass-strong p-6 flex flex-col gap-6 overflow-hidden">
                        <div aria-hidden className="pointer-events-none absolute -top-20 -right-16 w-56 h-56 rounded-full bg-magenta/25 blur-3xl" />

                        <div className="relative flex items-end justify-between gap-2">
                            <div>
                                <p className="eyebrow">Price</p>
                                <p className="mt-2 text-5xl font-medium tracking-tight leading-none">Rs. {courseDetail?.price}</p>
                            </div>
                            <span className="pill pill-citrus">Lifetime access</span>
                        </div>

                        {
                            isStudentEnrolled ? (
                                <button onClick={()=>navigate('/dashboard/enrolled-courses')} className="btn btn-gradient btn-lg w-full">
                                    <FiPlay className="fill-current" /> Go to course
                                </button>
                            ) : (
                                <div className="flex flex-col gap-3">
                                    <button onClick={()=>handleBuyCourse()} className="btn btn-gradient btn-lg w-full">
                                        Buy now <FiArrowUpRight />
                                    </button>
                                    <button onClick={()=>handleAddToCart()} className="btn btn-glass btn-lg w-full">
                                        <FiShoppingCart /> Add to cart
                                    </button>
                                </div>
                            )
                        }

                        <p className="flex items-center justify-center gap-2 text-xs text-white/45">
                            <FiShield /> 30-day money-back guarantee
                        </p>

                        <div className="divider" />

                        <div className="flex flex-col gap-3">
                            <p className="font-medium">This course includes</p>
                            <ul className="flex flex-col gap-2.5">
                            {
                                courseDetail?.instructions.map((instruction, index)=>{
                                    return (
                                        <li className="flex items-start gap-3 text-sm text-white/70" key={index}>
                                            <span className="mt-0.5 shrink-0 grid place-items-center w-5 h-5 rounded-full bg-citrus/15 text-citrus">
                                                <FiCheck className="text-[11px]" strokeWidth={3} />
                                            </span>
                                            <span>{instruction}</span>
                                        </li>
                                    )
                                })
                            }
                            </ul>
                        </div>

                        <button onClick={()=>handleShare()} className="btn btn-ghost btn-sm self-center">
                            <FiShare2 /> Share this course
                        </button>
                    </div>
                </aside>
            </div>
        </div>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }

    </div>
}

export default CoursePage
