import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { profileApi } from "../../../services/api";
import axios from "axios";
import { COURSES_DATA } from "../../../utils/constants";
import { Link, useNavigate } from "react-router-dom";
import { FiPlay, FiClock, FiCheck, FiChevronRight, FiBookOpen } from "react-icons/fi";
import ProgressRing from "../../ui/ProgressRing";

const DAY_LABELS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

// Current Monday→Sunday week (decorative strip)
const getWeek = () => {
  const today = new Date();
  const monday = new Date(today);
  monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
  return DAY_LABELS.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return { label, date: d.getDate(), isToday: d.toDateString() === today.toDateString(), isPast: d < today };
  });
};

const lessonCount = (course) =>
  course?.courseContent?.reduce((acc, section) => acc + (section?.subSection?.length || 0), 0) || 0;

const EnrolledCourses = () => {
  const [enrolledCourses, setEnrolledCourses] = useState(null);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { GET_ENROLLED_COURSES } = profileApi;
  const [active, setActive] = useState(0);
  const navigate = useNavigate();

  const getEnrolledCourses = async () => {
    const response = await axios.get(GET_ENROLLED_COURSES, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    setEnrolledCourses(response.data.data.course);
  };

  useEffect(() => {
    getEnrolledCourses();
  }, [token]);

  useEffect(() => {
    if (user.accountType !== "Student") {
      navigate("/dashboard/my-profile");
    }
  }, [user.accountType, navigate]);

  const openCourse = (course) =>
    navigate(
      `/view-course/${course?._id}/section/${course?.courseContent?.[0]?._id}/sub-section/${course.courseContent?.[0]?.subSection?.[0]?._id}`
    );

  const list = enrolledCourses || [];
  const completedCount = list.filter((c) => (c.progressPercentage || 0) >= 100).length;
  const counts = [list.length, list.length - completedCount, completedCount];
  const avgProgress = list.length
    ? Math.round(list.reduce((acc, c) => acc + (c.progressPercentage || 0), 0) / list.length)
    : 0;
  const week = getWeek();
  const rangeLabel = (() => {
    const today = new Date();
    const monday = new Date(today);
    monday.setDate(today.getDate() - ((today.getDay() + 6) % 7));
    const sunday = new Date(monday);
    sunday.setDate(monday.getDate() + 6);
    const fmt = (d) => d.toLocaleDateString(undefined, { month: "short", day: "numeric" });
    return `${fmt(monday)} – ${fmt(sunday)}`;
  })();
  const todayLabel = new Date().toLocaleDateString(undefined, { weekday: "long", day: "numeric", month: "short" });

  return (
    <div className="w-full flex flex-col gap-6 lg:gap-8">
      {/* Header */}
      <div className="flex flex-col gap-5">
        <div>
          <p className="eyebrow">{rangeLabel}</p>
          <h1 className="h-display text-4xl sm:text-5xl mt-3">My learning</h1>
        </div>

        {/* Text tabs with superscript counts */}
        <div className="flex items-center gap-6 overflow-x-auto no-scrollbar">
          {COURSES_DATA.map((data, index) => {
            return (
              <button
                type="button"
                onClick={() => setActive(index)}
                className={`relative shrink-0 pb-2 text-lg sm:text-xl font-medium tracking-tight transition ${
                  active === index ? "text-foreground" : "text-foreground/40 hover:text-foreground/70"
                }`}
                key={index}
              >
                {data.status}
                <sup className={`ml-0.5 text-[11px] font-semibold ${active === index ? "text-citrus" : ""}`}>
                  {enrolledCourses ? counts[index] : "–"}
                </sup>
                {active === index && <span className="absolute left-0 right-3 -bottom-px h-0.5 rounded-full bg-foreground" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Week strip */}
      <section className="glass p-4 sm:p-6">
        <div className="grid grid-cols-7 gap-1 sm:gap-3">
          {week.map((day) => (
            <div
              key={day.label}
              className={`flex flex-col items-center gap-2.5 py-3 rounded-3xl transition ${
                day.isToday ? "bg-foreground/[0.06] border border-foreground/10" : ""
              }`}
            >
              <span className={`text-[11px] sm:text-xs font-medium ${day.isToday ? "text-foreground" : "text-foreground/40"}`}>
                {day.label}
              </span>
              {day.isToday ? (
                <ProgressRing value={avgProgress} size={46} stroke={3.5} color="var(--success)">
                  <span className="text-[10px]">
                    {completedCount}/{list.length}
                  </span>
                </ProgressRing>
              ) : (
                <ProgressRing
                  value={day.isPast ? avgProgress : 0}
                  size={40}
                  stroke={2.5}
                  color="var(--muted)"
                >
                  <span className="text-[11px] text-foreground/60">{day.date}</span>
                </ProgressRing>
              )}
            </div>
          ))}
        </div>
      </section>

      {!enrolledCourses ? (
        /* Loading skeleton */
        <div className="grid gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="skeleton h-24 rounded-[28px]" />
          ))}
        </div>
      ) : !enrolledCourses.length ? (
        /* Empty state */
        <div className="glass p-10 sm:p-14 flex flex-col items-center text-center">
          <div className="relative">

            <span className="relative icon-circle-glass w-16 h-16 text-2xl">
              <FiBookOpen />
            </span>
          </div>
          <p className="mt-6 text-2xl font-medium tracking-tight">Nothing to learn yet</p>
          <p className="mt-2 max-w-md text-foreground/55">You have not enrolled in any Course yet. Find something you love and start today.</p>
          <Link to="/" className="btn btn-primary mt-6">
            Browse courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-6 items-start">
          <section className="flex flex-col gap-3">
            <div className="flex items-baseline justify-between px-1 mb-1">
              <p className="text-lg font-medium tracking-tight">
                Schedule <span className="text-foreground/40">Today, {todayLabel}</span>
              </p>
            </div>

            {enrolledCourses.map((course, index) => {
              const progress = course.progressPercentage || 0;
              const done = progress >= 100;
              const lessons = lessonCount(course);
              return (
                <div
                  key={index}
                  onClick={() => openCourse(course)}
                  className="group row-item !rounded-[28px] !p-3 !pr-5 cursor-pointer"
                >
                  {course?.thumbnail ? (
                    <div className="relative shrink-0">
                      <img
                        src={course?.thumbnail}
                        alt="course_img"
                        className="h-16 w-16 sm:h-20 sm:w-28 rounded-3xl object-cover bg-surface-2"
                      />
                      <span className="absolute inset-0 grid place-items-center rounded-3xl bg-night/40 opacity-0 group-hover:opacity-100 transition">
                        <span className="icon-circle w-9 h-9">
                          <FiPlay className="text-sm" />
                        </span>
                      </span>
                    </div>
                  ) : (
                    <span className="icon-circle">
                      <FiPlay />
                    </span>
                  )}

                  <div className="flex-1 min-w-0">
                    <p className="text-[15px] sm:text-base font-medium leading-tight truncate">
                      {course?.courseName || "Course Name"}
                    </p>
                    <div className="mt-1 flex items-center gap-2 text-sm text-foreground/50 min-w-0">
                      {course?.totalDuration && (
                        <span className="shrink-0 inline-flex items-center gap-1">
                          <FiClock className="text-xs" /> {course?.totalDuration}
                        </span>
                      )}
                      {course?.totalDuration && <span className="shrink-0 text-foreground/20">•</span>}
                      <span className="truncate">{course?.courseDescription || "Course Description"}</span>
                    </div>
                    {/* thin bar on mobile */}
                    <div className="sm:hidden mt-2 h-1 rounded-full bg-foreground/10 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${done ? "bg-citrus" : "bg-brand"}`}
                        style={{ width: `${Math.min(progress, 100)}%` }}
                      />
                    </div>
                  </div>

                  <div className="hidden sm:flex items-center gap-5 shrink-0">
                    {done ? (
                      <span className="inline-flex items-center gap-1.5 text-sm font-medium">
                        100%
                        <span className="grid place-items-center w-5 h-5 rounded-full bg-citrus text-night">
                          <FiCheck className="text-[11px]" strokeWidth={3} />
                        </span>
                      </span>
                    ) : (
                      <ProgressRing value={progress} size={42} stroke={3} color="var(--accent)">
                        <span className="text-[10px]">{progress}%</span>
                      </ProgressRing>
                    )}
                    <span className="inline-flex items-center gap-0.5 text-sm text-foreground/55 group-hover:text-foreground transition min-w-[84px] justify-end">
                      {lessons} {lessons === 1 ? "lesson" : "lessons"}
                      <FiChevronRight />
                    </span>
                  </div>
                  <Link onClick={event => event.stopPropagation()} to={`/dashboard/messages?course=${encodeURIComponent(course._id)}`} className="btn btn-glass btn-sm">Message educator</Link>
                  <FiChevronRight className="sm:hidden shrink-0 text-foreground/40" />
                </div>
              );
            })}
          </section>

          {/* Overview */}
          <aside className="glass relative overflow-hidden p-6 xl:sticky xl:top-24">

            <p className="relative eyebrow text-[10px]">Overview</p>
            <div className="relative mt-5 flex items-center gap-5">
              <ProgressRing value={avgProgress} size={96} stroke={6} color="var(--success)">
                <span className="text-xl font-medium">{avgProgress}%</span>
              </ProgressRing>
              <div>
                <p className="text-sm text-foreground/55">Average progress</p>
                <p className="mt-1 text-lg font-medium tracking-tight">
                  {completedCount} of {list.length} done
                </p>
              </div>
            </div>
            <div className="relative mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-3xl bg-foreground/[0.04] border border-foreground/[0.07] p-4">
                <p className="text-3xl font-medium tracking-tight">{counts[1]}</p>
                <p className="mt-1 text-xs text-foreground/45">In progress</p>
              </div>
              <div className="rounded-3xl bg-foreground/[0.04] border border-foreground/[0.07] p-4">
                <p className="text-3xl font-medium tracking-tight">{completedCount}</p>
                <p className="mt-1 text-xs text-foreground/45">Completed</p>
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
};

export default EnrolledCourses;
