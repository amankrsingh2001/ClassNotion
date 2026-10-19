import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import IconBtn from '../../Common/IconBtn';
import { createRating } from '../../../services/courseDetail';
import  ReactStars  from 'react-rating-stars-component';
import { FiX } from "react-icons/fi";
import { motion } from "motion/react";


const CourseReviewModal = ({setReviewModal}) => {

    const {user} = useSelector(state => state.profile)
    const {token} = useSelector(state => state.auth)
    const {courseEntireData} = useSelector(state => state.viewCourse)

    const {register, handleSubmit,setValue, formState:{errors} } = useForm()

    useEffect(()=>{
        setValue('courseExperience','')
        setValue('courseRating',0)
    },[])

    const onSubmit = async(data) =>{
        const createdRating = await createRating({courseId:courseEntireData._id, rating:data.courseRating, review:data.courseExperience},token)
        if(createRating){
            setReviewModal(false)
            return;
        }
    }

    const ratingChange = (newRating) =>{
        setValue('courseRating',newRating)
    }



  return (
    <div className='fixed w-full inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-night/60 backdrop-blur-md p-4'>
        <motion.div
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ type: 'spring', stiffness: 240, damping: 24 }}
            className='relative glass-strong w-full max-w-[520px] overflow-hidden shadow-card'
        >
            <div aria-hidden className='pointer-events-none absolute -top-24 -right-16 w-60 h-60 rounded-full bg-magenta/30 blur-3xl' />

            {/* Modal header */}
            <div className='relative flex items-center justify-between gap-3 px-6 pt-6'>
                <div>
                    <p className='eyebrow'>{courseEntireData?.courseName || 'Your course'}</p>
                    <p className='mt-1 text-2xl font-medium tracking-tight'>Add a review</p>
                </div>
                <button
                type='button'
                aria-label='Close'
                className='btn-icon'
                onClick={() => setReviewModal(false)}
                >
                   <FiX className='text-lg' />
                </button>
            </div>

            {/* Modal Body */}
            <div className='relative p-6'>

                <div className='flex items-center gap-3'>
                    <span className='shrink-0 p-[2px] bg-brand rounded-full'>
                        <img
                            src={user?.image}
                            alt='user Image'
                            className='aspect-square w-12 rounded-full border-2 border-night object-cover bg-surface-2'
                        />
                    </span>
                    <div>
                        <p className='font-medium'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-xs text-foreground/45'>Posting publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex flex-col items-center gap-5'>

                    <div className='w-full flex justify-center rounded-3xl bg-foreground/[0.04] border border-foreground/[0.07] py-3'>
                        <ReactStars
                            count={5}
                            // onChange={ratingChanged}
                            size={44}
                            color='var(--border)'
                            activeColor="var(--accent)"
                        />
                    </div>

                    <div className='w-full flex flex-col'>
                        <label htmlFor='courseExperience' className='field-label'>
                            Add your experience *
                        </label>
                        <textarea
                            id='courseExperience'
                            placeholder='What did you love? What could be better?'
                            {...register("courseExperience", {required:true})}
                            className='field min-h-[130px] resize-y'
                        />
                        {
                            errors.courseExperience && (
                                <span className='field-error'>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>
                    {/* Cancel and Save button */}
                    <div className='w-full flex justify-end gap-3'>
                        <button
                        className='btn btn-glass'
                        onClick={() => setReviewModal(false)}
                        >
                            Cancel
                        </button>
                        <IconBtn
                            text="Save"
                        />
                    </div>


                </form>

            </div>
        </motion.div>
    </div>
  )
}

export default CourseReviewModal
