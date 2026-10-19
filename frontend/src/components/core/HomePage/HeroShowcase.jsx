import { motion } from "motion/react";
import { FiArrowLeft, FiBookmark, FiBell, FiClock, FiVideo, FiChevronRight, FiMaximize2, FiLock, FiCheck } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";
import ProgressRing from "../../ui/ProgressRing";
import AvatarStack from "../../ui/AvatarStack";
import Photo from "../../ui/Photo";

const DAYS = [
  { d: "Sun", v: 100, n: 13 },
  { d: "Mon", v: 70, n: 2 },
  { d: "Tue", v: 85, n: 7 },
  { d: "Wed", v: 50, n: "3/6", today: true },
  { d: "Thu", v: 0 },
  { d: "Fri", v: 0 },
];

const Screen = ({ className = "", children, delay = 0, y = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: y + 40 }}
    animate={{ opacity: 1, y }}
    transition={{ type: "spring", stiffness: 120, damping: 20, delay }}
    className={`rounded-[36px] border border-white/10 bg-surface/90 backdrop-blur-xl shadow-card overflow-hidden ${className}`}
  >
    {children}
  </motion.div>
);

// Three-screen composition echoing the reference shot: player · course card · schedule.
const HeroShowcase = () => {
  return (
    <div className="relative h-[460px] sm:h-[580px] w-full max-w-[640px] mx-auto">
      <div className="absolute inset-x-10 top-16 bottom-10 rounded-full bg-magenta/30 blur-[90px]" />

      {/* Left: player */}
      <Screen className="hidden sm:block absolute left-0 top-16 w-[220px]" delay={0.15} y={0}>
        <Photo src="/assets/Images/image.jpg" className="h-[230px]" fade={false}>
          <div className="flex justify-between p-3">
            <span className="btn-icon w-8 h-8 text-xs"><FiArrowLeft /></span>
            <span className="btn-icon w-8 h-8 text-xs"><FiBookmark /></span>
          </div>
          <div className="absolute bottom-3 inset-x-3 flex items-center gap-2 px-2 py-1.5 rounded-full bg-white/15 backdrop-blur-xl border border-white/15">
            <span className="pill-white rounded-full px-1.5 text-[9px] font-bold">1x</span>
            <div className="flex-1 h-[3px] rounded-full bg-white/25">
              <div className="h-full w-2/5 rounded-full bg-white" />
            </div>
            <FiMaximize2 className="text-[10px]" />
          </div>
        </Photo>
        <div className="p-4">
          <p className="text-lg font-medium tracking-tight">Creative Sprint</p>
          <p className="mt-1 text-[11px] leading-snug text-white/45">A fast-paced course for shaping ideas into products.</p>
          <div className="mt-3 space-y-2">
            {["Idea Flow", "Concept Building"].map((t, i) => (
              <div key={t} className="flex items-center gap-2 p-1.5 pr-3 rounded-full bg-white/[0.05] border border-white/[0.07]">
                <span className={`grid place-items-center w-7 h-7 rounded-full ${i ? "bg-white/10" : "bg-white text-night"}`}>
                  <FiVideo className="text-[11px]" />
                </span>
                <span className="flex-1 text-[11px]">{t}</span>
                <FiChevronRight className="text-[11px] text-white/50" />
              </div>
            ))}
          </div>
        </div>
      </Screen>

      {/* Right: schedule */}
      <Screen className="hidden sm:block absolute right-0 top-24 w-[220px] p-4" delay={0.25}>
        <div className="flex justify-between items-center">
          <span className="btn-icon w-8 h-8 text-xs"><FiArrowLeft /></span>
          <span className="btn-icon w-8 h-8 text-xs"><FiBell /></span>
        </div>
        <p className="mt-4 text-center text-sm">
          January <span className="text-white/40">4–10</span>
        </p>
        <div className="mt-3 grid grid-cols-6 gap-1 text-center">
          {DAYS.map((d) => (
            <div key={d.d} className="flex flex-col items-center gap-1.5">
              <span className={`text-[9px] ${d.today ? "text-white" : "text-white/40"}`}>{d.d}</span>
              <ProgressRing value={d.v} size={26} stroke={2} color={d.today ? "#DDF247" : "#9CA36A"}>
                <span className="text-[7px]">{d.n}</span>
              </ProgressRing>
            </div>
          ))}
        </div>
        <p className="mt-4 text-[10px] text-center">
          Schedule <span className="text-white/40">Today, 15 Jan</span>
        </p>
        <div className="mt-2 space-y-2">
          <div className="rounded-2xl p-2.5 bg-brand-soft border border-white/10">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-7 h-7 rounded-full bg-white text-night text-[10px]">✦</span>
              <span className="flex-1 text-[10px]">AI for Creators</span>
              <span className="flex items-center gap-1 text-[9px]"><FiCheck /> 67%</span>
            </div>
            <div className="mt-2 flex justify-between text-[9px] text-white/60">
              <span className="pill h-5 px-2 text-[9px]">11:30 AM</span>
              <span>4 lesson ›</span>
            </div>
          </div>
          <div className="rounded-2xl p-2.5 bg-white/[0.04] border border-white/[0.07]">
            <div className="flex items-center gap-2">
              <span className="grid place-items-center w-7 h-7 rounded-full bg-white/10 text-[10px]"><FiLock /></span>
              <span className="flex-1 text-[10px]">Creative Directions</span>
              <span className="text-[9px] text-white/50">42%</span>
            </div>
          </div>
        </div>
      </Screen>

      {/* Center: course card (raised) */}
      <Screen className="absolute inset-x-0 mx-auto top-0 w-[260px] sm:w-[250px] z-10 p-3 bg-plum/40" delay={0} y={0}>
        <div className="flex items-center justify-between px-1 pb-3">
          <img src="/assets/Images/aboutus3.webp" alt="" className="w-9 h-9 rounded-full object-cover" />
          <div className="segmented p-0.5">
            <span className="segmented-item segmented-item-active h-7 px-3 text-[10px] grid place-items-center">My Courses</span>
            <span className="segmented-item h-7 px-3 text-[10px] grid place-items-center">Progress</span>
          </div>
        </div>
        <Photo src="/assets/Images/aboutus2.webp" className="h-[330px] rounded-[28px]">
          <div className="flex items-start justify-between p-3">
            <AvatarStack size={24} count="+1K" />
            <span className="pill pill-white h-6 text-[10px]">Active</span>
          </div>
          <div className="absolute bottom-0 inset-x-0 p-4">
            <p className="text-2xl font-medium tracking-tight">AI for Creators</p>
            <div className="mt-2 flex items-center gap-3 text-[11px] text-white/80">
              <span className="flex items-center gap-1"><FiClock /> 18h 9m</span>
              <span className="flex items-center gap-1"><FaStar className="text-citrus" /> 4.7</span>
              <span className="flex items-center gap-1"><FiVideo /> 16</span>
            </div>
            <div className="mt-3 pt-3 border-t border-white/15 flex justify-between text-[11px]">
              <span className="text-white/60">1 of 5</span>
              <span className="flex items-center gap-1">Continue <FiChevronRight /></span>
            </div>
          </div>
        </Photo>
        <div className="flex gap-3 px-1 pt-3 text-[10px] text-white/45">
          <span className="text-white">All<sup>12</sup></span>
          <span>Completed<sup>7</sup></span>
          <span>Saved<sup>9</sup></span>
        </div>
      </Screen>
    </div>
  );
};

export default HeroShowcase;
