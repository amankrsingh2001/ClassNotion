import axios from "axios";
import React, { useState } from "react";
import { courseApi } from "../../../../services/api";
import { useDispatch, useSelector } from "react-redux";
import ReactStars from "react-stars";
import { FaRegStar } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { removeFromCart } from "../../../../slices/cartSlice";
import { FiTrash2 } from "react-icons/fi";

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
    <div className="w-full min-w-0 flex flex-col gap-3">
      {cart.map((course, index) => {
        return (
          <div key={index} className="row-item !rounded-[30px] !p-3 !gap-4 sm:!gap-5 flex-col sm:flex-row !items-stretch sm:!items-center">
            <div className="duotone shrink-0 rounded-3xl w-full sm:w-44 aspect-[16/10] bg-surface-2">
              <img src={course.thumbnail} alt={course?.courseName} className="w-full h-full object-cover" />
            </div>

            <div className="flex-1 min-w-0 flex flex-col gap-2 px-1 sm:px-0">
              {course?.Category?.name && <span className="self-start pill h-6 text-[11px]">{course?.Category?.name}</span>}
              <p className="text-lg font-medium tracking-tight leading-snug capitalize break-words">{course?.courseName}</p>
              <div className="flex flex-wrap items-center gap-2 text-sm">
                <ReactStars
                  count={5}
                  size={16}
                  edit={false}
                  color1="rgba(255,255,255,.18)"
                  color2="#DDF247"
                  activeColor="ffd700"
                  emptyIcon={<FaRegStar />}
                  fullIcon={<IoIosStar />}
                />
                <span className="text-xs text-white/45">{course?.ratingAndReviews?.length} Reviews</span>
              </div>
            </div>

            <div className="flex sm:flex-col items-center sm:items-end justify-between gap-3 px-1 sm:px-0 sm:pr-2 sm:min-w-[120px]">
              <p className="text-2xl font-medium tracking-tight">Rs {course?.price}</p>
              <button
                className="btn btn-ghost btn-sm hover:!text-rose hover:!bg-rose/10"
                onClick={() => dispatch(removeFromCart(course._id))}
              >
                <FiTrash2 />
                Remove
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RenderCartCourses;
