import React, { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useEffect } from 'react';
import  axios  from 'axios';
import { courseApi } from '../../services/api';
import ReactStars from 'react-rating-stars-component';
import { FaStar } from 'react-icons/fa6';

const ReviewSlider = () => {

    const [reviews, setReviews] = useState([])
    const truncateWords = 15;
    const {GET_ALL_REVIEWS} = courseApi


    const fetchAllReviews = async() =>{
        const response = await axios.get(GET_ALL_REVIEWS)
        if(response?.data?.success){
            setReviews(response?.data?.data)
        }
    }



    useEffect(()=>{
        fetchAllReviews()
    },[])

  return (
    <div className='text-white'>
        <p className='text-center'>Review From other learner</p>

    <div className='h-[190px] max-w-maxContent'>
        <Swiper
            slidesPerView={4}
            spaceBetween={24}
            loop={true}
            freeMode={true}
            autoplay = {{
                delay:1500,
                disableOnInteraction:true
              }}
              modules={[FreeMode, Pagination, Autoplay]}
        >
            {
                reviews.map((review, index)=>{
                    console.log(review)
                    return(
                        <SwiperSlide key={index}>
                            <img src={review?.user?.image ? review?.user?.image : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`} alt='profile pic'/>
                            <p>{review?.user?.firstName} {review?.user?.lastName}</p>
                            <p>{review?.course?.courseName}</p>
                            <p>
                                {review?.review}
                            </p>
                            <p>{review?.rating.toFixed(1)}</p>
                            <ReactStars
                                count={5}
                                value={review.rating}
                                edit={false}
                                activeColor={'#ffd700'}
                                emptyIcon={<FaStar/>}
                                fullIcon={<FaStar/>}
                            />
                        </SwiperSlide>
                        
                        )
                })
            }

        </Swiper>
    </div>

    </div>
  )
}

export default ReviewSlider