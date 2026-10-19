import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FiArrowLeft, FiArrowRight, FiClock, FiEye, FiEyeOff, FiStar, FiVideo, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "motion/react";

import Logo from "../../Common/Logo";
import AvatarStack from "../../ui/AvatarStack";
import { setLogin } from "../../../services/authApi";

const spring = { type: "spring", stiffness: 240, damping: 24 };

/* ------------------------------------------------------------------ */
/* Floating glass "course card" overlaid on the auth image panel.       */
/* ------------------------------------------------------------------ */
const GlassCourseCard = ({ card, compact = false }) => (
  <div className={`glass-strong ${compact ? "rounded-3xl p-3" : "p-5"}`}>
    <div className="flex items-center justify-between gap-3">
      <AvatarStack count="+1K" size={compact ? 22 : 28} />
      <span className={`pill pill-white ${compact ? "!h-6 !px-2.5 text-[11px]" : ""}`}>{card.status ?? "Active"}</span>
    </div>
    <h3
      className={`mt-3 font-medium tracking-tight text-white ${compact ? "text-lg leading-tight" : "text-2xl"}`}
    >
      {card.title}
    </h3>
    <div className={`mt-2 flex items-center gap-4 text-white/70 ${compact ? "text-[11px]" : "text-[13px]"}`}>
      <span className="inline-flex items-center gap-1.5">
        <FiClock /> {card.duration ?? "18h 9m"}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <FiStar /> {card.rating ?? "4.7"}
      </span>
      <span className="inline-flex items-center gap-1.5">
        <FiVideo /> {card.videos ?? "16"}
      </span>
    </div>
    {!compact && (
      <div className="mt-4 pt-3 divider flex items-center justify-between text-[13px]">
        <span className="text-white/55">{card.progress ?? "1 of 5"}</span>
        <span className="inline-flex items-center gap-1 font-medium text-white">
          Continue <FiChevronRight />
        </span>
      </div>
    )}
  </div>
);

/* Image panel (tall on desktop, 200px banner on mobile). */
const ImagePanel = ({ image, imageAlt, panelKey, quote, card }) => (
  <aside className="relative overflow-hidden rounded-4xl lg:rounded-5xl h-[200px] lg:h-full shrink-0 bg-surface">
    <AnimatePresence mode="popLayout" initial={false}>
      <motion.img
        key={image}
        src={image}
        alt={imageAlt}
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute inset-0 w-full h-full object-cover"
      />
    </AnimatePresence>
    <div aria-hidden className="absolute inset-0 bg-pink-wash mix-blend-screen pointer-events-none" />
    <div aria-hidden className="absolute inset-0 bg-photo-fade pointer-events-none" />

    <Link to="/" aria-label="Back to home" className="btn-icon absolute top-3 left-3 lg:top-5 lg:left-5 z-10">
      <FiArrowLeft className="text-lg" />
    </Link>
    {quote?.eyebrow && (
      <span className="pill absolute top-3 right-3 lg:top-5 lg:right-5 z-10 hidden sm:inline-flex">
        {quote.eyebrow}
      </span>
    )}

    <motion.div
      key={panelKey}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={spring}
      className="absolute inset-x-0 bottom-0 z-10 p-3 lg:p-8 xl:p-10"
    >
      {/* Desktop: headline + full card */}
      <div className="hidden lg:block">
        {quote?.headline && (
          <h2 className="h-display text-4xl xl:text-5xl text-white max-w-md">{quote.headline}</h2>
        )}
        {quote?.sub && <p className="mt-3 text-white/70 max-w-sm">{quote.sub}</p>}
        {card && (
          <div className="mt-6 max-w-sm animate-floaty">
            <GlassCourseCard card={card} />
          </div>
        )}
      </div>
      {/* Mobile banner: compact card */}
      {card && (
        <div className="lg:hidden ml-auto max-w-[260px]">
          <GlassCourseCard card={card} compact />
        </div>
      )}
    </motion.div>
  </aside>
);

/* ------------------------------------------------------------------ */
/* Shared split-screen shell for the auth pages (presentation only).   */
/* ------------------------------------------------------------------ */
export const AuthLayout = ({
  image = "/assets/Images/login.webp",
  imageAlt = "",
  panelKey,
  quote,
  card = { title: "AI for Creators" },
  children,
}) => {
  return (
    <div className="min-h-screen w-full flex flex-col lg:grid lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] gap-4 lg:gap-8 p-3 sm:p-4">
      <div className="lg:sticky lg:top-4 lg:h-[calc(100vh-2rem)]">
        <ImagePanel image={image} imageAlt={imageAlt} panelKey={panelKey} quote={quote} card={card} />
      </div>

      <section className="relative flex-1 flex items-center justify-center px-1 sm:px-6 py-6 lg:py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={spring}
          className="w-full max-w-[420px]"
        >
          {children}
        </motion.div>
      </section>
    </div>
  );
};

/* Page heading block used at the top of the form column. */
export const AuthHeading = ({ title, subtitle, icon }) => (
  <div>
    <div className="flex items-center justify-between">
      <Logo />
      {icon}
    </div>
    <h1 className="mt-10 lg:mt-12 h-display text-4xl sm:text-5xl text-white">{title}</h1>
    {subtitle && <p className="mt-3 text-white/55 text-[15px] leading-relaxed">{subtitle}</p>}
  </div>
);

/* "or" divider */
export const OrDivider = () => (
  <div className="my-6 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-white/35">
    <span className="h-px flex-1 bg-white/10" />
    or
    <span className="h-px flex-1 bg-white/10" />
  </div>
);

/* Small presentational helper: eye toggle that sits inside an input. */
export const EyeToggle = ({ visible, onClick }) => (
  <button
    type="button"
    onClick={onClick}
    aria-label={visible ? "Hide password" : "Show password"}
    className="absolute right-1.5 top-1/2 -translate-y-1/2 grid place-items-center w-9 h-9 rounded-xl text-white/45 hover:text-white hover:bg-white/[0.08] transition"
  >
    {visible ? <FiEye /> : <FiEyeOff />}
  </button>
);

const LoginTemp = ({ image, frame, title, description }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(true);
  const [active, setActive] = useState(0);

  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const chagneActive = (index) => {
    setActive(index);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(setLogin(input, navigate));
  };

  return (
    <AuthLayout
      image={image}
      imageAlt="Students learning together"
      panelKey="login"
      quote={{
        eyebrow: "Pick up where you left off",
        headline: "Education to future-proof your career.",
        sub: description,
      }}
      card={{ title: "AI for Creators", progress: "1 of 5" }}
    >
      <AuthHeading
        title={title ?? "Welcome back"}
        subtitle="Log in to continue your courses, track progress and keep your streak alive."
      />

      <form onSubmit={submitHandler} className="mt-8 space-y-5">
        <div>
          <label className="field-label" htmlFor="email">
            Email address <span className="text-rose">*</span>
          </label>
          <input
            value={input.name}
            onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
            id="email"
            name="email"
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
            <Link to="/reset-password" className="mb-2 text-[13px] font-medium text-orchid hover:text-white transition">
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <input
              type={showPassword ? "password" : "text"}
              value={input.name}
              onChange={(e) => setInput({ ...input, [e.target.name]: e.target.value })}
              id="password"
              name="password"
              autoComplete="current-password"
              placeholder="Your password"
              className="field pr-12"
            />
            <EyeToggle visible={!showPassword} onClick={() => setShowPassword(!showPassword)} />
          </div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg w-full !mt-8">
          Log in <FiArrowRight />
        </button>
      </form>

      <OrDivider />

      <Link to="/signup" className="btn btn-glass btn-lg w-full">
        Create a free account
      </Link>

      <p className="mt-6 text-center text-sm text-white/55">
        New to ClassNotion?{" "}
        <Link to="/signup" className="font-medium text-white hover:text-orchid transition">
          Sign up
        </Link>
      </p>
    </AuthLayout>
  );
};

export default LoginTemp;
