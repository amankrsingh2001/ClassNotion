import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { value } from "../../../data/signUpData";
import { useDispatch, useSelector } from "react-redux";
import { setSignUpData } from "../../../slices/authSlice";
import { toast } from "react-hot-toast";
import { otpApi } from "../../../services/authApi";
import { FiArrowRight, FiBookOpen, FiAward } from "react-icons/fi";

import { AuthLayout, AuthHeading, EyeToggle } from "./LoginTemp";

// Per-account-type panel copy (presentation only)
const PANELS = [
  {
    eyebrow: "Free to join",
    icon: FiBookOpen,
  },
  {
    eyebrow: "Teach on ClassNotion",
    icon: FiAward,
  },
];

const SignUpTemp = ({ code }) => {
  const [active, setActive] = useState(0);
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
  const loading = useSelector((state) => state.auth.loading);

  const changeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

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

  const panel = PANELS[active] ?? PANELS[0];

  return (
    <AuthLayout
      panelKey={`signup-${active}`}
      quote={{ eyebrow: panel.eyebrow }}
    >
      <AuthHeading title="Your next chapter." subtitle="Create your account. Start learning, or share what you know." />

      <div className="auth-account-choices" role="group" aria-label="Account type">
        {value.map((element, index) => {
          const Icon = PANELS[index].icon;
          return <button type="button" key={element.value} aria-pressed={active === index} onClick={() => setActive(index)} className={active === index ? 'is-selected' : ''}>
            <span className="auth-account-icon"><Icon /></span>
            <span>{index === 0 ? 'Student' : 'Apply to teach'}<small>{index === 0 ? 'I’m here to learn' : 'Profile & admin review'}</small></span>
            <span className="auth-account-radio" />
          </button>;
        })}
      </div>

      <form onSubmit={submitHandler} className="mt-6 space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="firstName" className="field-label">
              First name <span className="text-rose">*</span>
            </label>
            <input
              onChange={changeHandler}
              id="firstName"
              name="firstName"
              autoComplete="given-name"
              placeholder="First name"
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
              autoComplete="family-name"
              required
              placeholder="Last name"
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
            placeholder="you@example.com"
            type="email"
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
            <select aria-label="Country code" defaultValue="India" className="field w-[128px] shrink-0 px-3 !pr-3 text-[13px] cursor-pointer">
              {code.map((it, index) => {
                return (
                  <option key={index} value={it.country} className="bg-surface">{`${it.code} ${it.country}`}</option>
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

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label htmlFor="password" className="field-label">
              Password <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                onChange={changeHandler}
                id="password"
                name="password"
                placeholder="Create password"
                type={`${showPassword ? "text" : "password"}`}
                className="field pr-12"
                minLength={5}
                maxLength={20}
                autoComplete="new-password"
                required
              />
              <EyeToggle visible={showPassword} onClick={passwordHandler} />
            </div>
          </div>
          <div>
            <label htmlFor="confirmPassword" className="field-label">
              Confirm password <span className="text-rose">*</span>
            </label>
            <div className="relative">
              <input
                onChange={changeHandler}
                id="confirmPassword"
                name="confirmPassword"
                placeholder="Repeat password"
                type={`${showConfirmPassword ? "text" : "password"}`}
                className="field pr-12"
                minLength={5}
                maxLength={20}
                autoComplete="new-password"
                required
              />
              <EyeToggle visible={showConfirmPassword} onClick={confirmPasswordHandler} />
            </div>
          </div>
        </div>

        <button type="submit" disabled={loading} aria-busy={loading} className="btn btn-primary btn-lg w-full !mt-8 auth-submit">
          {loading ? "Sending verification…" : "Create my account"} <FiArrowRight />
        </button>
      </form>

      <p className="auth-signup-switch text-center text-sm text-foreground/55">
        Already have an account?{" "}
        <Link to="/login" className="font-medium text-foreground hover:text-orchid transition">
          Log in
        </Link>
      </p>
    </AuthLayout>
  );
};

export default SignUpTemp;
