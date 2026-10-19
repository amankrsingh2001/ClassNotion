import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { buyCourse } from "../../../../services/studentFeaturesAPI";
import { useNavigate } from "react-router-dom";

const RenderTotalAmount = ({ cart }) => {
  const { total } = useSelector((state) => state.cart);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handlerBuyCourse = () => {
    const courseId = cart.map((course) => course._id);
    buyCourse([courseId], token, user, navigate, dispatch);
  };

  return (
    <aside className="w-full lg:sticky lg:top-24">
      <div className="relative glass overflow-hidden p-6">
        <div className="absolute -top-20 -right-16 w-56 h-56 rounded-full bg-magenta/25 blur-3xl pointer-events-none" />

        <div className="relative flex items-center justify-between">
          <p className="eyebrow text-[10px]">Order summary</p>
          <span className="pill pill-citrus h-6 text-[11px]">-Rs 500</span>
        </div>

        <ul className="relative mt-5 space-y-2.5 text-sm">
          {cart.map((course, index) => (
            <li key={course._id ?? index} className="flex justify-between gap-3">
              <span className="truncate text-white/55">{course?.courseName}</span>
              <span className="shrink-0 font-medium">Rs {course?.price}</span>
            </li>
          ))}
        </ul>

        <div className="relative divider my-5" />

        <p className="relative text-sm text-white/55">Total</p>
        <div className="relative mt-1 flex items-baseline gap-3 flex-wrap">
          <p className="text-4xl font-medium tracking-tight">Rs {total}</p>
          <s className="text-white/35">Rs {total + 500}</s>
        </div>

        <button onClick={() => handlerBuyCourse()} className="relative btn btn-gradient btn-lg w-full mt-6">
          Buy now
        </button>
        <p className="relative mt-3 text-center text-xs text-white/35">Lifetime access · Secure checkout</p>
      </div>
    </aside>
  );
};

export default RenderTotalAmount;
