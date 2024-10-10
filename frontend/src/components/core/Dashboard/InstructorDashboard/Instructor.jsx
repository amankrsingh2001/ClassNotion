import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getInstructorCourse,
  getInstructorData,
} from "../../../../services/courseDetail";
import { Link } from "react-router-dom";
import InstructorChart from "./InstructorChart";

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

  return (
    <div className=" w-11/12 p-12">
      <div className="flex justify-center flex-col items-center border-b-[1px] border-[#F1F2FF]">
        <h1 className="text-4xl text-[#F1F2FF]">
          {user.firstName} {user.lastName}
        </h1>
        <p className="text-[#838894] text-md mt-3 mb-3">
          Let's start something new
        </p>
      </div>

      {loading ? (
        <div className="">Loading...</div>
      ) : courses.length > 0 ? (
        <div className="text-white">
          <div className=" flex justify-between gap-3 mt-8 flex-wrap sm:flex-nowrap">
            <InstructorChart courses={instructorData} />
            <div className="w-[30%] flex flex-col gap-5 mt-6 relative top-12">
              <p className="text-4xl text-[#F1F2FF] text-center">Statistic</p>

              <div className="flex gap-3 flex-col font-inter border border-richblack-600 p-4 rounded-md items-center">
                <div className=" bg-richblack-800 px-8 w-[80%] py-8 rounded-md">
                  <p className="text-2xl text-[#F1F2FF] text-nowrap">Total courses</p>
                  <p className="text-[#838894] text-2xl">{courses?.length}</p>
                </div>
                <div className=" bg-richblack-800 w-[80%] px-8 py-8 rounded-md">
                  <p className="text-2xl text-[#F1F2FF] text-nowrap">Total students</p>
                  <p className="text-[#838894] text-2xl">{totalStudents}</p>
                </div>

                <div className=" bg-richblack-800 w-[80%] px-8 py-8 rounded-md">
                  <p className="text-2xl text-[#F1F2FF] text-nowrap">
                    Total Income
                  </p>
                  <p className="text-[#838894] text-2xl">{totalAmount}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            {/* Render 3 courses */}
            <div>
              <div className="flex justify-between items-center mt-12">
                <p className="text-[#F1F2FF] text-2xl">Your Courses</p>
                <Link to={"/dashboard/my-courses"}>
                  <p className="text-right cursor-pointer text-richblack-200  hover:underline hover:text-yellow-25">View All</p>
                </Link>
              </div>
              <div className="flex mt-12 gap-4 ">
                {courses.slice(0, 3).map((course) => {
                  return (
                    <div key={course._id}  className="w-[40%] rounded-md hover:bg-richblack-800 p-2 border border-richblack-800">
                      <img src={course?.thumbnail} className="w-[100%] aspect-video object-cover rounded-md"/>
                      <div className="flex flex-col gap-3 mt-2 px-2">
                        <p className="text-xl text-[#F1F2FF] capitalize font-inter">{course.courseName}</p>
                        <p className="capitalize text-sm text-[#c5c5cb]">{course.courseDescription.length>200?course.courseDescription.slice(0,200):course.courseDescription} </p>
                        <div className="flex  gap-3 text-[#838791] mb-4">
                          <p>{course?.studentsEnrolled.length} Students</p>
                          <p> | </p>
                          <p>Rs: {course?.price}</p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div>
          <p>You haven't created any course yet</p>
          <Link to={"dashboard/add-course"}>
            <p>Create a course</p>
          </Link>
        </div>
      )}
    </div>
  );
};

export default Instructor;
