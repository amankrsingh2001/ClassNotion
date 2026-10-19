import { motion } from "motion/react";
import { FiBarChart2, FiVideo, FiChevronRight } from "react-icons/fi";
import AvatarStack from "../../ui/AvatarStack";

// Abstract "artwork" per card (the reference's floral/gradient thumbnails), no image assets needed.
const ART = [
  "linear-gradient(135deg, #627f9c, #294c6f)",
  "linear-gradient(135deg, #738d83, #36594d)",
  "linear-gradient(135deg, #9b8d76, #62543d)",
];

const CourseCard = ({ data, index, setActive, active }) => {
  const isActive = index === active;

  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, type: "spring", stiffness: 220, damping: 26 }}
      onClick={() => setActive(index)}
      className={`media-contrast group relative text-left w-full overflow-hidden rounded-4xl border transition duration-300 ${
        isActive ? "border-foreground/25 shadow-glow" : "border-foreground/10 hover:border-foreground/20 hover:-translate-y-1"
      }`}
    >
      <div className="relative aspect-[4/5]">
        <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110" style={{ background: ART[index % ART.length] }} />
        <div className="absolute inset-0 backdrop-blur-[2px]" />
        <div className="absolute inset-0 bg-photo-fade" />

        <div className="absolute top-0 inset-x-0 flex items-start justify-between p-4">
          <AvatarStack size={26} count={`+${(index + 1) * 2}K`} />
          {isActive && <span className="pill pill-white">Active</span>}
        </div>

        <div className="absolute bottom-0 inset-x-0 p-5">
          <p className="text-3xl font-medium tracking-tight text-foreground">{data.heading}</p>
          <p className="mt-2 text-sm text-foreground/55 line-clamp-2">{data.description}</p>
          <div className="mt-4 flex items-center gap-4 text-xs text-foreground/80">
            <span className="flex items-center gap-1.5"><FiBarChart2 /> {data.level}</span>
            <span className="flex items-center gap-1.5"><FiVideo /> {data.lessonNumber} lessons</span>
          </div>
          <div className="mt-4 pt-4 border-t border-foreground/10 flex justify-between text-xs">
            <span className="text-foreground/50">{index + 1} of 3</span>
            <span className="flex items-center gap-1 text-foreground">Start <FiChevronRight /></span>
          </div>
        </div>
      </div>
    </motion.button>
  );
};

export default CourseCard;
