import { motion } from "motion/react";
import { FiTrendingUp, FiUsers, FiCalendar } from "react-icons/fi";

const CARDS = [
  { src: "/assets/Images/Know_your_progress.png", title: "Know your progress", text: "Rings and streaks that show exactly where you are.", icon: FiTrendingUp, glow: "bg-citrus/25" },
  { src: "/assets/Images/Compare_with_others.png", title: "Compare with others", text: "See how you stack up against learners like you.", icon: FiUsers, glow: "bg-magenta/30" },
  { src: "/assets/Images/Plan_your_lessons.svg", title: "Plan your lessons", text: "A weekly schedule that adapts to your pace.", icon: FiCalendar, glow: "bg-violet/30" },
];

const CardImage = () => {
  return (
    <div className="grid gap-5 md:grid-cols-3">
      {CARDS.map((card, i) => (
        <motion.div
          key={card.title}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: i === 1 ? -24 : 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 160, damping: 24, delay: i * 0.08 }}
          className="relative glass p-3 overflow-hidden card-hover"
        >
          <div className={`absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl ${card.glow}`} />
          <div className="relative rounded-3xl bg-foreground/[0.92] p-4 h-[220px] grid place-items-center overflow-hidden">
            <img src={card.src} alt={card.title} className="max-h-full w-auto object-contain" />
          </div>
          <div className="relative flex items-start gap-3 p-4">
            <span className="icon-circle-glass">
              <card.icon />
            </span>
            <div>
              <p className="font-medium">{card.title}</p>
              <p className="mt-1 text-sm text-foreground/50">{card.text}</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default CardImage;
