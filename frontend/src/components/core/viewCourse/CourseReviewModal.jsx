import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'
import IconBtn from '../../Common/IconBtn';
import { createRating } from '../../../services/courseDetail';
import  ReactStars  from 'react-rating-stars-component';
import { IoCloseCircle } from "react-icons/io5";


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
    <div className='fixed w-full inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm'>
        <div className='rounded-lg border border-richblack-400 bg-richblack-800 p-6 w-[30%]'>
            {/* Modal header */}
            <div className='text-white flex justify-between '>
                <p className='text-[#F1F2FF] font-bold'>Add Review</p>
                <button 
                onClick={() => setReviewModal(false)}
                >
                   <IoCloseCircle className='text-pink-500 text-xl'/>
                </button>
            </div>

            {/* Modal Body */}
            <div className='mt-4 '>

                <div className='flex gap-3 text-[#F1F2FF]'>
                    <img 
                        src={user?.image}
                        alt='user Image'
                        className='aspect-square  w-[50px] rounded-full object-cover'
                    />
                    <div>
                        <p className='text-semibold'>{user?.firstName} {user?.lastName}</p>
                        <p className='text-caribbeangreen-100 text-sm'>Posting Publicly</p>
                    </div>
                </div>


                <form
                onSubmit={handleSubmit(onSubmit)}
                className='mt-6 flex flex-col items-center'>

                    <ReactStars
                        count={5}
                        // onChange={ratingChanged}
                        size={24}
                        activeColor="#ffd700"
                    />

                    <div className='w-full flex flex-col'>
                        <label htmlFor='courseExperience ' className='text-[#d6d6da] mb-2 '>
                            *Add Your Experience
                        </label>
                        <textarea 
                            id='courseExperience'
                            placeholder='Add Your Experience here'
                            {...register("courseExperience", {required:true})}
                            className='form-style min-h-[130px] w-full p-4 outline-none'
                        />
                        {
                            errors.courseExperience && (
                                <span className='text-[#d12828] mt-1 text-sm font-inter'>
                                    Please add your experience
                                </span>
                            )
                        }
                    </div>
                    {/* Cancel and Save button */}
                    <div className='mt-8 flex gap-3'>
                        <button
                        className='bg-richblack-700 rounded-md px-3 py-[10px] text-white'
                        onClick={() => setReviewModal(false)}
                        >
                            Cancel
                        </button>
                        <IconBtn
                            text="save"
                        />
                    </div>


                </form>

            </div>
        </div>
    </div>
  )
}

export default CourseReviewModal