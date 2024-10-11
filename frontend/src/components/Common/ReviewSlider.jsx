import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";
import { useEffect } from "react";
import axios, { all } from "axios";
import { courseApi } from "../../services/api";
import ReactStars from "react-rating-stars-component";
import { FaStar } from "react-icons/fa6";

const ReviewSlider = () => {
  const [reviews, setReviews] = useState([]);
  const truncateWords = 15;
  const { GET_ALL_REVIEWS } = courseApi;

  const fetchAllReviews = async () => {
    const response = await axios.get(GET_ALL_REVIEWS);
    if (response?.data?.success) {
      setReviews(response?.data?.data);
    }
  };

  useEffect(() => {
    fetchAllReviews();
  }, []);

  return (
    <div className="text-white w-full bg-richblack-700 flex flex-col mb-20 lg:h-[400px] h-fit items-center p-12 gap-4 ">
      <p className="text-center text-richblack-500 text-4xl">
        Review From other learner
      </p>

      <div className=" w-11/12 gap-4">
      <Swiper
  slidesPerView={1} 
  spaceBetween={12} 
  loop={true}
  freeMode={true}
  autoplay={{
    delay: 1500,
    disableOnInteraction: true,
  }}
  modules={[FreeMode, Pagination, Autoplay]}
>
  {reviews.map((review, index) => {
    return (
      <SwiperSlide
        key={index}
        className="rounded-md flex flex-col  h-fit w-full hover:bg-[#332B2A]"
        style={{ transition: "all 100ms 250ms ease-in-out " }}
      >
        <div className="w-fit flex sm:flex-col lg:flex-row gap-5 p-4 text-md mt-4">
          <img
            className="w-[60px] h-[60px] rounded-full object-cover"
            src={
              review?.user?.image
                ? review?.user?.image
                : `https://api.dicebear.com/5.x/initials/svg?seed=${review?.user?.firstName} ${review?.user?.lastName}`
            }
            alt="profile pic"
          />
          <div className="flex flex-col gap-1">
            <p className="text-[#acadb1] font-bold text-sm sm:text-md">
              {review?.user?.firstName} {review?.user?.lastName}
            </p>
            <p className="text-xs text-[#b4cbf1] opacity-65">
              {review?.user?.email}
            </p>
            <p className="text-[#fafaff] font-medium text-xs sm:text-sm">
              {review?.course?.courseName}
            </p>
          </div>
        </div>
        <div className="flex flex-col px-4">
          <p className="text-xs sm:text-sm text-richblack-300">{review?.review}</p>
        </div>

        <div className="flex gap-4 p-6 sm:p-12 items-center">
          <p className="text-sm sm:text-md">Review: {review?.rating.toFixed(1)}</p>
          <ReactStars
            count={5}
            value={review.rating}
            edit={false}
            activeColor={"#ffd700"}
            emptyIcon={<FaStar />}
            fullIcon={<FaStar />}
          />
        </div>
      </SwiperSlide>
    );
  })}
</Swiper>

      </div>
    </div>
  );
};

export default ReviewSlider;
