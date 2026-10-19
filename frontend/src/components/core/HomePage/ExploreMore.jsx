import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import CourseCard from "./CourseCard";
import SectionHeader from "../../ui/SectionHeader";

const tabName = ["Free", "New to coding", "Most popular", "Skills paths", "Career paths"];

const ExploreMore = () => {
  const [currentTab, setCurrentTab] = useState(tabName[0]);
  const [courses, setCourses] = useState(HomePageExplore[0].courses);
  const [active, setActive] = useState(0);

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setActive(0);
  };

  return (
    <section className="container-x py-20">
      <SectionHeader
        eyebrow="Explore"
        title={
          <>
            Unlock the <span className="text-gradient">power of code</span>
          </>
        }
        subtitle="Learn to build anything you can imagine — pick a path and start today."
      />

      {/* Text tabs with superscript counts, like the reference */}
      <div className="mt-10 flex gap-6 overflow-x-auto no-scrollbar border-b border-white/[0.07]">
        {tabName.map((el) => {
          const count = HomePageExplore.find((c) => c.tag === el)?.courses.length ?? 0;
          const isActive = currentTab === el;
          return (
            <button
              key={el}
              onClick={() => setMyCards(el)}
              className={`relative pb-4 text-sm whitespace-nowrap transition ${isActive ? "text-white" : "text-white/45 hover:text-white/80"}`}
            >
              {el}
              <sup className="ml-0.5 text-[10px]">{count}</sup>
              {isActive && <span className="absolute left-0 right-0 -bottom-px h-[2px] rounded-full bg-brand" />}
            </button>
          );
        })}
      </div>

      <div key={currentTab} className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((el, index) => (
          <CourseCard key={el.heading} setActive={setActive} active={active} index={index} data={el} />
        ))}
      </div>
    </section>
  );
};

export default ExploreMore;
