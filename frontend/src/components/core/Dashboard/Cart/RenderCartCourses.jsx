import axios from "axios";
import React, { useState } from "react";
import { courseApi } from "../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { FaRegStar } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { removeFromCart } from "../../../../slices/cartSlice";
import { MdDeleteForever } from "react-icons/md";

const RenderCartCourses = ({ cart }) => {
  const [averageRating, setAverageRating] = useState(0);
  const { GET_AVERAGE_RATING } = courseApi;
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);

  const getAverageRating = async () => {
    const response = await axios.get(GET_AVERAGE_RATING, cart.course.id, {
      header: {
        Authorization: `Bearer ${token}`,
      },
    });
  };

  return (
    <div className="w-[70%] ">
      {cart.map((course, index) => {
        return (
            <div key={index}>
            <div  className="">
            <div className="flex justify-between  ">
             <div className="flex gap-3 mt-10">
             <img src={course.thumbnail} className="w-[25%] rounded-md aspect-video object-cover"/>
              <div className="flex flex-col gap-3">
                <p className="text-xl font-semibold font-inter text-[#F1F2FF] capitalize">{course?.courseName}</p>
                <p className="text-sm font-inter text-[#838894]">{course?.Category?.name} </p>
                <div className="flex justify-center items-center gap-3">
                  <ReactStars
                    count={5}
                    size={20}
                    edit={false}
                    activeColor="ffd700"
                    emptyIcon={<FaRegStar />}
                    fullIcon={<IoIosStar />}
                  />
                  <span>{course?.ratingAndReviews?.length} Reviews</span>
                </div>
              </div>
                </div>
              <div className="flex flex-col justify-around">
                <button className="bg-richblack-700 p-2 flex justify-center items-center gap-1 text-pink-300 rounded-md" onClick={() => dispatch(removeFromCart(course._id))}>
                    <MdDeleteForever className="inline-block"/>
                  Remove{" "}
                </button>
                <p className="text-3xl text-yellow-25">Rs {course?.price}</p>
              </div>
            </div>
          </div>
            <hr className="mt-8 border-richblack-800 border-[1px]"/>
            </div>
          
         
        );
    })}
  
    
    </div>
  );
};

export default RenderCartCourses;
