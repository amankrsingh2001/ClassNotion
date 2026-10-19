import { useSelector } from "react-redux";
import RenderCartCourses from "./RenderCartCourses";
import RenderTotalAmount from "./RenderTotalAmount";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FiShoppingBag } from "react-icons/fi";

const Cart = () => {
  const { totalItem, total, cart } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.accountType !== "Student") {
      navigate("/dashboard");
    }
  }, [user.accountType, navigate]);

  return (
    <div className="w-full flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow">Saved for later</p>
          <h1 className="h-display text-4xl sm:text-5xl mt-3">Wishlist</h1>
        </div>
        <span className="pill">
          {totalItem} {totalItem === 1 ? "Course" : "Courses"} in cart
        </span>
      </div>

      {total > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] items-start gap-6">
          <RenderCartCourses cart={cart} />
          <RenderTotalAmount cart={cart} />
        </div>
      ) : (
        <div className="glass p-10 sm:p-14 flex flex-col items-center text-center">
          <div className="relative">
            <div className="absolute inset-0 -m-6 rounded-full bg-magenta/30 blur-2xl" />
            <span className="relative icon-circle-glass w-16 h-16 text-2xl">
              <FiShoppingBag />
            </span>
          </div>
          <p className="mt-6 text-2xl font-medium tracking-tight">Your Cart is Empty</p>
          <p className="mt-2 max-w-md text-white/55">Nothing here yet. Add a course or two and they'll show up right here.</p>
          <Link to="/" className="btn btn-primary mt-6">
            Find a course
          </Link>
        </div>
      )}
    </div>
  );
};
export default Cart;
