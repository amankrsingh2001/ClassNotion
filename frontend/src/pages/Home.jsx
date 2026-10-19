import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { motion } from "motion/react";
import { FiArrowRight, FiPlay, FiArrowUpRight, FiCheck } from "react-icons/fi";
import { FaStar } from "react-icons/fa6";

import CodeBlock from "../components/core/HomePage/CodeBlock";
import LearningLanguage from "../components/core/HomePage/LearningLanguage";
import CardImage from "../components/core/HomePage/CardImage";
import { LogoCard } from "../components/core/HomePage/LogoCard";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import HeroShowcase from "../components/core/HomePage/HeroShowcase";
import ReviewSlider from "../components/Common/ReviewSlider";
import SectionHeader from "../components/ui/SectionHeader";
import AvatarStack from "../components/ui/AvatarStack";
import ProgressRing from "../components/ui/ProgressRing";
import Photo from "../components/ui/Photo";
import CardData from "../data/CardData";

const TECH = ["React", "Node.js", "Python", "TypeScript", "MongoDB", "Next.js", "Tailwind", "Docker", "Go", "SQL", "Figma", "AI/ML"];

const STATS = [
  { value: "10K+", label: "Active learners", ring: 82 },
  { value: "250+", label: "Courses", ring: 64 },
  { value: "4.9", label: "Average rating", ring: 98 },
  { value: "10 yrs", label: "Teaching experience", ring: 100 },
];

const fadeUp = {
  hidden: { opacity: 0, y: 18 },
  show: (i = 0) => ({ opacity: 1, y: 0, transition: { delay: i * 0.08, type: "spring", stiffness: 200, damping: 26 } }),
};

const HTML_SNIPPET = `<!DOCTYPE html>
<html>
  <head>
    <title>My first page</title>
    <link rel="stylesheet" href="styles.css">
  </head>
  <body>
    <h1><a href="/">Hello, world!</a></h1>
    <nav><a href="/learn">Learn</a></nav>
  </body>
</html>`;

const JS_SNIPPET = `const learner = { name: "You" };

function levelUp(skill) {
  return \`\${learner.name} just learned \${skill} ✨\`;
}

levelUp("JavaScript");
levelUp("React");
levelUp("Node.js");`;

const Home = () => {
  const { token } = useSelector((state) => state.auth);
  const navigate = useNavigate();

  const onClickHandler = () => {
    if (token) {
      toast.error("You are already logged in please logout and signup as a instructor");
    } else {
      navigate("/signup");
    }
  };

  return (
    <div className="overflow-x-clip">
      {/* ───────────── HERO ───────────── */}
      <section className="container-x pt-10 md:pt-16 pb-10 grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-6 items-center">
        <div>
          <motion.button
            variants={fadeUp}
            initial="hidden"
            animate="show"
            onClick={onClickHandler}
            className="group inline-flex items-center gap-2 pl-1 pr-4 py-1 rounded-full glass"
          >
            <span className="pill pill-white h-6">New</span>
            <span className="text-sm text-white/80">Join as an instructor</span>
            <FiArrowRight className="text-white/60 group-hover:translate-x-0.5 transition-transform" />
          </motion.button>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-7 h-display text-[44px] sm:text-6xl xl:text-7xl"
          >
            Empower your future with <span className="text-gradient">coding skills</span>
          </motion.h1>

          <motion.p variants={fadeUp} initial="hidden" animate="show" custom={2} className="mt-6 text-lg text-white/55 max-w-[520px]">
            Learn at your own pace, from anywhere — with hands-on projects, quizzes and personal feedback from
            instructors who build for a living.
          </motion.p>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={3} className="mt-9 flex flex-wrap gap-3">
            <Link to="/signup" className="btn btn-lg btn-gradient">
              Start learning free <FiArrowRight />
            </Link>
            <Link to="/about" className="btn btn-lg btn-glass">
              <span className="grid place-items-center w-7 h-7 -ml-2 rounded-full bg-white text-night">
                <FiPlay className="text-xs translate-x-[1px]" />
              </span>
              How it works
            </Link>
          </motion.div>

          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={4} className="mt-10 flex items-center gap-4">
            <AvatarStack size={36} count="+10K" />
            <div className="text-sm">
              <p className="flex items-center gap-1 text-white">
                {[0, 1, 2, 3, 4].map((i) => (
                  <FaStar key={i} className="text-citrus text-xs" />
                ))}
                <span className="ml-1 font-semibold">4.9</span>
              </p>
              <p className="text-white/45">from 2,400+ learner reviews</p>
            </div>
          </motion.div>
        </div>

        <HeroShowcase />
      </section>

      {/* ───────────── TECH MARQUEE ───────────── */}
      <div className="container-x">
        <div className="overflow-hidden mask-fade-x py-6">
          <div className="flex w-max animate-marquee">
            {[...TECH, ...TECH].map((t, i) => (
              <span key={i} className="mx-8 text-lg font-medium text-white/30 whitespace-nowrap">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ───────────── STATS ───────────── */}
      <section className="container-x pt-14">
        <div className="glass grid grid-cols-2 lg:grid-cols-4 divide-white/[0.07] lg:divide-x">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              custom={i}
              className="flex items-center gap-4 p-6 md:p-8"
            >
              <ProgressRing value={s.ring} size={52} stroke={3} color={i === 0 ? "#DDF247" : "rgba(255,255,255,.85)"}>
                {i === 0 ? <FiCheck className="text-citrus text-sm" /> : `${s.ring}%`}
              </ProgressRing>
              <div>
                <p className="text-3xl md:text-4xl font-medium tracking-tight">{s.value}</p>
                <p className="text-sm text-white/45">{s.label}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ───────────── CODE BLOCKS ───────────── */}
      <section className="container-x">
        <CodeBlock
          position="lg:flex-row flex-col"
          heading={
            <h2 className="h-display text-4xl md:text-5xl">
              Unlock your <span className="text-gradient">coding potential</span> with our online courses
            </h2>
          }
          subHeading="Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          cpa1={{ btnText: "Try it yourself", linkto: "/signup", active: true }}
          cpa2={{ btnText: "Learn more", linkto: "/about", active: false }}
          codeBlock={HTML_SNIPPET}
          codeColor="text-peach"
          backgroundGradient="bg-magenta/25"
          fileName="index.html"
        />
        <CodeBlock
          position="lg:flex-row-reverse flex-col"
          heading={
            <h2 className="h-display text-4xl md:text-5xl">
              Start <span className="text-gradient">coding in seconds</span>
            </h2>
          }
          subHeading="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          cpa1={{ btnText: "Continue lesson", linkto: "/signup", active: true }}
          cpa2={{ btnText: "Learn more", linkto: "/about", active: false }}
          codeBlock={JS_SNIPPET}
          codeColor="text-orchid"
          backgroundGradient="bg-violet/30"
          fileName="level-up.js"
        />
      </section>

      {/* ───────────── EXPLORE ───────────── */}
      <ExploreMore />

      {/* ───────────── VALUES ───────────── */}
      <section className="container-x py-20 grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
        <div>
          <SectionHeader
            eyebrow="Why ClassNotion"
            title={
              <>
                Skills for jobs that are <span className="text-gradient">in demand</span>
              </>
            }
            subtitle="Being a competitive specialist takes more than professional skills. Here's what we stand for."
          />
          <div className="mt-10 space-y-3">
            {CardData.map((card) => (
              <LogoCard key={card.id} index={card.id} name={card.name} description={card.description} logo={card.logo} />
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ type: "spring", stiffness: 140, damping: 24 }}
          className="relative"
        >
          <div className="absolute -inset-8 rounded-full bg-magenta/25 blur-[90px]" />
          <Photo src="/assets/Images/TimelineImage.png" alt="Learners" className="relative aspect-[4/5] sm:aspect-[5/5] rounded-5xl border border-white/10">
            <div className="absolute top-5 left-5 right-5 flex justify-between">
              <AvatarStack count="+2K" />
              <span className="pill pill-white">Live cohort</span>
            </div>
            <div className="absolute bottom-5 inset-x-5 grid grid-cols-2 gap-3">
              <div className="glass rounded-3xl p-4 bg-night/30">
                <p className="text-3xl font-medium tracking-tight">10+</p>
                <p className="text-xs text-white/60">Years of experience</p>
              </div>
              <div className="glass rounded-3xl p-4 bg-night/30">
                <p className="text-3xl font-medium tracking-tight">250</p>
                <p className="text-xs text-white/60">Types of courses</p>
              </div>
            </div>
          </Photo>
        </motion.div>
      </section>

      {/* ───────────── TOOLKIT ───────────── */}
      <section className="container-x py-16">
        <LearningLanguage />
        <div className="mt-16">
          <CardImage />
        </div>
      </section>

      {/* ───────────── BECOME AN INSTRUCTOR ───────────── */}
      <section className="container-x py-16">
        <div className="relative grid lg:grid-cols-2 gap-10 items-center surface rounded-5xl p-4 sm:p-6 overflow-hidden">
          <div className="absolute -top-40 right-0 w-[460px] h-[460px] rounded-full bg-violet/30 blur-[120px]" />
          <Photo src="/assets/Images/Instructor.png" alt="Instructor" className="relative aspect-[4/3] lg:aspect-auto lg:h-full min-h-[320px] rounded-4xl">
            <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3 glass rounded-full p-1.5 pr-4 bg-night/40">
              <span className="icon-circle w-9 h-9">
                <FiPlay className="text-xs translate-x-[1px]" />
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">Teaching 101 with Daniel</p>
                <div className="mt-1 h-1 rounded-full bg-white/20">
                  <div className="h-full w-2/3 rounded-full bg-white" />
                </div>
              </div>
              <span className="text-[11px] text-white/60">12:18 / 28:00</span>
            </div>
          </Photo>
          <div className="relative p-4 sm:p-8">
            <p className="eyebrow mb-4">For teachers</p>
            <h2 className="h-display text-4xl md:text-5xl">
              Become an <span className="text-gradient">instructor</span>
            </h2>
            <p className="mt-5 text-white/55 text-lg max-w-[460px]">
              Instructors from around the world teach millions of students on ClassNotion. We provide the tools and
              skills to teach what you love.
            </p>
            <ul className="mt-8 space-y-3">
              {["Publish courses with a guided builder", "Track students and income in one place", "Get paid securely"].map((t) => (
                <li key={t} className="flex items-center gap-3 text-sm text-white/80">
                  <span className="grid place-items-center w-6 h-6 rounded-full bg-citrus/15 text-citrus">
                    <FiCheck className="text-xs" />
                  </span>
                  {t}
                </li>
              ))}
            </ul>
            <button onClick={onClickHandler} className="mt-10 btn btn-lg btn-primary">
              Start teaching today <FiArrowUpRight />
            </button>
          </div>
        </div>
      </section>

      {/* ───────────── REVIEWS ───────────── */}
      <section className="py-10">
        <ReviewSlider />
      </section>
    </div>
  );
};

export default Home;
