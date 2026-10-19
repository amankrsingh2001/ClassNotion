import { Link, useLocation, useNavigate } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FiLock, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPassword } from "../../../services/authApi";
import Ambient from "../../ui/Ambient";
import { AuthLayout, AuthHeading, EyeToggle } from "./LoginTemp";

const UpdatePassword = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [showConfirmPassword, setShowConirmPassword] = useState(true);
  const location = useLocation();

  const [input, setInput] = useState({
    password: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e) => {
    setInput((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const token = location.pathname.split("/").at(-1);

    const { password, confirmPassword } = input;
    dispatch(resetPassword(password, confirmPassword, token, navigate));
  };

  return (
    <>
      <Ambient />
      <AuthLayout
        image="/assets/Images/signup.webp"
        imageAlt="Learner studying"
        panelKey="update-password"
        quote={{
          eyebrow: "Make it strong",
          headline: "Fresh start, new password.",
          sub: "Pick something strong you'll actually remember.",
        }}
        card={{ title: "AI for Creators", progress: "1 of 5" }}
      >
        <AuthHeading
          title="Choose new password"
          subtitle="Almost done. Enter your new password and you’re all set."
          icon={
            <span className="icon-circle-glass">
              <FiLock className="text-lg" />
            </span>
          }
        />

        <form onSubmit={submitHandler} className="mt-8 space-y-5">
          <div>
            <label className="field-label" htmlFor="password">
              New password <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                value={input.password}
                onChange={handlePasswordChange}
                id="password"
                name="password"
                type={`${showPassword ? "password" : "text"}`}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="field pr-12"
              />
              <EyeToggle visible={!showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="confirmPassword">
              Confirm new password <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                value={input.confirmPassword}
                onChange={handlePasswordChange}
                id="confirmPassword"
                name="confirmPassword"
                type={`${showConfirmPassword ? "password" : "text"}`}
                placeholder="Enter your password"
                autoComplete="new-password"
                className="field pr-12"
              />
              <EyeToggle
                visible={!showConfirmPassword}
                onClick={() => setShowConirmPassword(!showConfirmPassword)}
              />
            </div>
          </div>

          <button type="submit" className="btn btn-primary btn-lg w-full !mt-8">
            Update password <FiArrowRight />
          </button>
        </form>

        <div className="mt-6 pt-5 divider">
          <Link className="btn btn-ghost btn-sm -ml-4" to="/login">
            <GoArrowLeft /> Back to login
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};
export default UpdatePassword;
