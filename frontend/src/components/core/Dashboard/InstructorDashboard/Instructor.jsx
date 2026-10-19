import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getInstructorCourse,
  getInstructorData,
} from "../../../../services/courseDetail";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";
import { motion } from "motion/react";
import { FiBookOpen, FiUsers, FiTrendingUp, FiPlus, FiChevronRight } from "react-icons/fi";

const Instructor = () => {
  const [loading, setLoading] = useState(false);
  const [instructorData, setInstructorData] = useState([]);
  const [courses, setCourses] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);

  const getCourseDataWithStats = async () => {
    //set loading
    const instructorDataResult = await getInstructorData(token);
    const result = await getInstructorCourse(token);
    if (result) {
      setCourses(result);
    }
    if (instructorDataResult) {
      setInstructorData(instructorDataResult);
    }
  };

  useEffect(() => {
    getCourseDataWithStats();
  }, [token]);

  const totalAmount = instructorData?.reduce(
    (acc, curr) => acc + curr.totalAmountGenerated,
    0
  );
  const totalStudents = instructorData?.reduce(
    (acc, curr) => acc + curr.totalStudentsEnrolled,
    0
  );

  // Decorative mini-bars: per-course share, normalised to the tallest bar
  const sparkFrom = (values) => {
    const list = (values.length ? values : [0]).slice(0, 12);
    const max = Math.max(...list, 1);
    return list.map((v) => Math.max(12, Math.round((v / max) * 100)));
  };

  const stats = [
    {
      label: "Total courses",
      value: courses?.length,
      icon: FiBookOpen,
      color: "bg-citrus",
      spark: sparkFrom(courses.map((c) => c?.studentsEnrolled?.length || 0)),
    },
    {
      label: "Total students",
      value: totalStudents,
      icon: FiUsers,
      color: "bg-magenta",
      spark: sparkFrom(instructorData.map((c) => c.totalStudentsEnrolled || 0)),
    },
    {
      label: "Total income",
      value: `₹${totalAmount}`,
      icon: FiTrendingUp,
      color: "bg-violet",
      spark: sparkFrom(instructorData.map((c) => c.totalAmountGenerated || 0)),
    },
  ];

  return (
    <div className="w-full py-8 text-foreground sm:py-10">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="flex flex-wrap items-end justify-between gap-4"
      >
        <div>
          <p className="eyebrow">Instructor dashboard</p>
          <h1 className="h-display mt-3 text-4xl sm:text-5xl">
            Good to see you, <span className="text-gradient">{user.firstName}</span>
          </h1>
          <p className="mt-3 text-foreground/55">Let's start something new</p>
        </div>
        <Link to="/dashboard/add-course" className="btn btn-gradient">
          <FiPlus /> New course
        </Link>
      </motion.div>

      {loading ? (
        <div className="mt-8 flex flex-col gap-6">
          <div className="grid gap-4 sm:grid-cols-3">
            {[0, 1, 2].map((k) => <div key={k} className="skeleton h-36 rounded-4xl" />)}
          </div>
          <div className="skeleton h-[420px] rounded-4xl" />
        </div>
      ) : courses.length > 0 ? (
        <div>
          {/* Stats */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {stats.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 220, damping: 24, delay: 0.05 * i }}
                  className="glass relative overflow-hidden p-6"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="icon-circle-glass h-10 w-10">
                      <Icon className="text-[15px]" />
                    </span>
                    <div className="flex h-10 items-end gap-[3px]" aria-hidden="true">
                      {stat.spark.map((h, k) => (
                        <span
                          key={k}
                          className={`w-1.5 rounded-full ${stat.color} ${k === stat.spark.length - 1 ? "opacity-100" : "opacity-40"}`}
                          style={{ height: `${h}%` }}
                        />
                      ))}
                    </div>
                  </div>
                  <p className="mt-6 break-all text-4xl font-medium tracking-tight">{stat.value}</p>
                  <p className="mt-1 text-sm text-foreground/45">{stat.label}</p>
                </motion.div>
              );
            })}
          </div>

          {/* Chart */}
          <div className="mt-6">
            <InstructorChart courses={instructorData} />
          </div>

          {/* Your courses */}
          <div className="mt-12">
            <div className="flex items-center justify-between gap-4">
              <h2 className="text-2xl font-medium tracking-tight">
                Your courses <sup className="text-sm text-foreground/45">{courses.length}</sup>
              </h2>
              <Link to={"/dashboard/my-courses"} className="btn btn-ghost btn-sm">
                View all <FiChevronRight />
              </Link>
            </div>
            <div className="no-scrollbar -mx-4 mt-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
              {courses.slice(0, 3).map((course) => {
                return (
                  <div
                    key={course._id}
                    className="card-hover relative aspect-[4/5] w-[78%] shrink-0 snap-start overflow-hidden rounded-4xl border border-foreground/10 sm:w-auto"
                  >
                    <img src={course?.thumbnail} alt={course.courseName} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-pink-wash mix-blend-screen" />
                    <div className="absolute inset-0 bg-photo-fade" />

                    <div className="absolute inset-x-4 top-4 flex items-center justify-end">
                      <span className="pill pill-white">₹{course?.price}</span>
                    </div>

                    <div className="absolute inset-x-0 bottom-0 p-5">
                      <p className="line-clamp-2 text-2xl font-medium capitalize leading-tight tracking-tight">{course.courseName}</p>
                      <p className="mt-2 line-clamp-2 text-sm capitalize text-foreground/60">{course.courseDescription.length>200?course.courseDescription.slice(0,200):course.courseDescription}</p>
                      <div className="mt-4 flex items-center justify-between gap-3 border-t border-foreground/10 pt-4 text-sm">
                        <span className="inline-flex items-center gap-1.5 text-foreground/75">
                          <FiUsers /> {course?.studentsEnrolled.length} Students
                        </span>
                        <span className="inline-flex items-center gap-1 text-foreground/75">
                          Rs: {course?.price}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      ) : (
        <div className="glass relative mt-8 flex flex-col items-center gap-4 overflow-hidden px-6 py-16 text-center">
          <div className="relative">

            <span className="icon-circle-glass relative h-16 w-16">
              <FiPlus className="text-2xl" />
            </span>
          </div>
          <h2 className="mt-2 text-2xl font-medium tracking-tight">You haven't created any course yet</h2>
          <p className="max-w-md text-foreground/55">Build your first course and your stats will show up right here.</p>
          <Link to={"/dashboard/add-course"} className="btn btn-primary mt-2">
            Create a course
          </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
