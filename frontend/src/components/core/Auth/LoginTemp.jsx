import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FiArrowRight, FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { motion, useReducedMotion } from "motion/react";

import ThemeToggle from "../../Common/ThemeToggle";
import WorkspaceRail from "../../workspace/WorkspaceRail";
import "../../workspace/workspace.css";
import AuthArtwork from "./AuthArtwork";
import { setLogin } from "../../../services/authApi";

const spring = { type: "spring", stiffness: 240, damping: 24 };

export const AuthLayout = ({ panelKey, quote, children }) => {
  const reduceMotion = useReducedMotion();
  const isSignup = panelKey?.startsWith("signup");
  return (
    <div className={`auth-shell ${isSignup ? "auth-shell-signup" : ""}`}>
      <WorkspaceRail auth />
      <section className="auth-form-column">
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="auth-form-content"
        >
          {children}
          {!isSignup && <p className="auth-form-footer"><FiLock aria-hidden="true" /> Your next chapter starts with a secure account.</p>}
        </motion.div>
      </section>
      <div className="auth-artwork-column"><AuthArtwork panelKey={panelKey} quote={quote} /></div>
    </div>
  );
};

/* Page heading block used at the top of the form column. */
export const AuthHeading = ({ title, subtitle, icon }) => (
  <div>
    <div className="auth-brand-row">
      <Link to="/" className="auth-product-name">ClassNotion <span>Academy</span></Link>
      <div className="flex items-center gap-2">{icon}<ThemeToggle /></div>
    </div>
    <span className="auth-heading-label">A NEW CHAPTER STARTS HERE</span>
    <h1 className="auth-form-heading h-display text-foreground">{title}</h1>
    {subtitle && <p className="auth-form-subtitle">{subtitle}</p>}
  </div>
);

/* "or" divider */
export const OrDivider = () => (
  <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-foreground/35">
    <span className="h-px flex-1 bg-foreground/10" />
    or
    <span className="h-px flex-1 bg-foreground/10" />
  </div>
);

/* Small presentational helper: eye toggle that sits inside an input. */
export const EyeToggle = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={visible ? "Hide password" : "Show password"}
    className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-xl text-foreground/45 hover:text-foreground hover:bg-foreground/[0.08] transition"
  >
    {visible ? <FiEye /> : <FiEyeOff />}
  </button>
);

const LoginTemp = ({ title }) => {
  const dispatch = useDispatch();
  const loading = useSelector((state) => state.auth.loading);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setLogin(input, navigate));
  };

  return (
    <AuthLayout
      panelKey="login"
      quote={{ eyebrow: "Good things start with curiosity" }}
    >
      <AuthHeading
        title={title ?? "Welcome back"}
        subtitle="Your courses, your progress, your next big idea. Pick up where you left off."
      />

      <form onSubmit={submitHandler} className="mt-8 space-y-5">
        <div>
          <label className="field-label" htmlFor="email">
            Email address <span className="text-rose">*</span>
          </label>
          <input
            value={input.email}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder="you@example.com"
            className="field"
          />
        </div>

        <div>
          <div className="flex items-end justify-between">
            <label className="field-label" htmlFor="password">
              Password <span className="text-rose">*</span>
            </label>
            <Link to="/reset-password" className="mb-2 text-[13px] font-medium text-orchid hover:text-foreground transition">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "password" : "text"}
              value={input.password}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              id="password"
              name="password"
              required
              autoComplete="current-password"
              placeholder="Your password"
              className="field pr-12"
            />
            <EyeToggle visible={!showPassword} onClick={() => setShowPassword(!showPassword)} />
          </div>
        </div>

        <button type="submit" disabled={loading} aria-busy={loading} className="btn btn-primary btn-lg w-full !mt-8 auth-submit">
          {loading ? "Logging in…" : "Log in"} <FiArrowRight />
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-foreground/55">
        New to ClassNotion?{" "}
        <Link to="/signup" className="font-medium text-foreground hover:text-orchid transition">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginTemp;
