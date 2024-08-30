import React, { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import { HilightText } from "./HilightText";
import CourseCard from "./CourseCard";

const tabName = [
  "Free",
  "New to coding",
  "Most popular",
  "Skills paths",
  "Career paths",
];

const ExploreMore = () => {
    
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [active,setActive] = useState(0)

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
  };

  return (
    <>
      <div className="relative w-11/12 ">
        <div className="text-4xl font-semibold text-center ">
          Unlock the <HilightText text={"Power of Code"} />
        </div>

        <p className="text-center text-lg m-4 text-[#838894]">
          Learn to build anything you can imagine
        </p>

        <div className="flex rounded-full mx-auto w-fit bg-richblack-800 m-4  border-richblack-100 border-[1px] px-2 py-1">
          {tabName.map((el, index) => {
            return (
              <div
                className={`text-[12px] flex flex-row items-center gap-2 ${
                  currentTab === el
                    ? "bg-richblack-900 text-richblack-5 font-medium"
                    : "text-[#838894] "
                } rounded-full duration-200 cursor-pointer hover:bg-richblack-900 hover:text-richblack-5 px-5 py-4`}
                key={index}
                onClick={() => setMyCards(el)}
              >
                {el}
              </div>
            );
          })}
        </div>
      </div>
      <div className="justify-center  gap-10  text-white flex flex-row drop-shadow-xl relative  bottom-[-80px]">
        {courses.map((el, index) => {
          return <CourseCard key={index} setActive={setActive} active={active} index={index} data={el} />;
        })}
      </div>
    </>
  );
};
export default ExploreMore;
