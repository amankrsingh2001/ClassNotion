import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signUpValue } from "../../../data/signUpData";
import { value } from "../../../data/signUpData";
import { useDispatch } from "react-redux";
import { setSignUpData } from "../../../slices/authSlice";
import { toast } from "react-hot-toast";
import { otpApi } from "../../../services/authApi";
import { motion } from "motion/react";
import { FiArrowRight, FiBookOpen, FiAward } from "react-icons/fi";

import { AuthLayout, AuthHeading, EyeToggle, OrDivider } from "./LoginTemp";

// Per-account-type panel copy (presentation only)
const PANELS = [
  {
    eyebrow: "Free to join",
    headline: "Learn it. Build it. Own it.",
    card: { title: "AI for Creators", duration: "18h 9m", rating: "4.7", videos: "16", progress: "1 of 5" },
    icon: FiBookOpen,
  },
  {
    eyebrow: "Teach on ClassNotion",
    headline: "Teach what you love. Reach learners everywhere.",
    card: { title: "Creative Sprint", duration: "6h 40m", rating: "4.9", videos: "14", progress: "Draft 2 of 5", status: "Live" },
    icon: FiAward,
  },
];

const SignUpTemp = ({ frame, code }) => {
  const [active, setActive] = useState(0);
  const [data, setData] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    contactNumber: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const chagneActive = (e, index) => {
    setActive(index);
  };

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  useEffect(() => {
    const newValue = signUpValue.filter((it, index) => {
      return index === active;
    });
    setData(newValue[0]);
  }, [active]);

  const submitHandler = (e) => {
    e.preventDefault();
    const signUpData = { ...formData, accountType: value[active].value };

    const { password, confirmPassword } = signUpData;
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    dispatch(setSignUpData(signUpData));
    dispatch(otpApi(signUpData.email, navigate));
  };

  const confirmPasswordHandler = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const passwordHandler = () => {
    setShowPassword(!showPassword);
  };

  if (!data) return;

  const panel = PANELS[active] ?? PANELS[0];

  return (
    <AuthLayout
      image={data.image}
      imageAlt={`${data.type} signing up`}
      panelKey={`signup-${active}`}
      quote={{ eyebrow: panel.eyebrow, headline: panel.headline, sub: data.description }}
      card={panel.card}
    >
      <AuthHeading title="Create your account" subtitle="It takes less than a minute. Choose how you'll use ClassNotion." />

      {/* Account type segmented control */}
      <div role="tablist" aria-label="Account type" className="segmented w-full mt-7 grid grid-cols-2">
        {value.map((element, index) => {
          const Icon = PANELS[index]?.icon;
          const isActive = active === index;
          return (
            <button
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={(e) => chagneActive(e, index)}
              key={index}
              className="segmented-item flex items-center justify-center"
            >
              {isActive && (
                <motion.span
                  layoutId="signup-seg"
                  transition={{ type: "spring", stiffness: 260, damping: 26 }}
                  className="absolute inset-0 rounded-full segmented-item-active"
                />
              )}
              <span className={`relative inline-flex items-center gap-2 ${isActive ? "text-white" : ""}`}>
                {Icon && <Icon />}
                {element.value}
              </span>
            </button>
          );
        })}
      </div>

      <form onSubmit={submitHandler} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="firstName" className="field-label">
              First name <span className="text-rose">*</span>
            </label>
            <input
              onChange={changeHandler}
              id="firstName"
              name="firstName"
              placeholder="John"
              type="text"
              className="field"
              required
            />
          </div>
          <div>
            <label htmlFor="lastName" className="field-label">
              Last name <span className="text-rose">*</span>
            </label>
            <input
              onChange={changeHandler}
              id="lastName"
              name="lastName"
              placeholder="Doe"
              type="text"
              className="field"
            />
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="email">
            Email address <span className="text-rose">*</span>
          </label>
          <input
            onChange={changeHandler}
            id="email"
            name="email"
            placeholder="user@email.com"
            type="text"
            className="field"
            autoComplete="email"
            required
          />
        </div>

        <div>
          <label className="field-label" htmlFor="contactNumber">
            Phone number <span className="text-rose">*</span>
          </label>
          <div className="flex gap-2">
            <select aria-label="Country code" className="field w-[112px] shrink-0 px-3 cursor-pointer">
              {code.map((it, index) => {
                return (
                  <option key={index} className="bg-surface">{`${it.code}-${it.country}`}</option>
                );
              })}
            </select>
            <input
              onChange={changeHandler}
              id="contactNumber"
              name="contactNumber"
              type="tel"
              placeholder="999 999 9999"
              className="field min-w-0"
              required
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label htmlFor="password" className="field-label">
              Password <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                onChange={changeHandler}
                id="password"
                name="password"
                placeholder="Password"
                type={`${showPassword ? "text" : "password"}`}
                className="field pr-12"
                autoComplete="new-password"
                required
              />
              <EyeToggle visible={showPassword} onClick={passwordHandler} />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="field-label">
              Confirm <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                onChange={changeHandler}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="One more time"
                type={`${showConfirmPassword ? "text" : "password"}`}
                className="field pr-12"
                autoComplete="new-password"
                required
              />
              <EyeToggle visible={showConfirmPassword} onClick={confirmPasswordHandler} />
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-full !mt-8">
          Create account <FiArrowRight />
        </button>
      </form>

      <OrDivider />

      <p className="text-center text-sm text-white/55">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-white hover:text-orchid transition">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpTemp;
