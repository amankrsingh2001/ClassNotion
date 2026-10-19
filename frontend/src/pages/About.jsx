import { motion } from "motion/react";
import { FiTarget, FiEye, FiClock, FiStar, FiZap } from "react-icons/fi";
import ReviewSlider from "../components/Common/ReviewSlider";
import AboutCard from "../components/core/About.jsx/AboutCard";
import AboutDetail from "../components/core/About.jsx/AboutDetail";
import AboutGrid from "../components/core/About.jsx/AboutGrid";
import ContactForm from "../components/core/About.jsx/ContactForm";
import ProgressRing from "../components/ui/ProgressRing";
import AvatarStack from "../components/ui/AvatarStack";

const fadeUp = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { type: "spring", stiffness: 220, damping: 24 },
};

const About = () => {
  return (
    <div className="w-full flex flex-col gap-24 md:gap-32 py-12 md:py-16">
      {/* hero */}
      <section className="container-x flex flex-col items-center text-center">
        <motion.div {...fadeUp} className="flex flex-col items-center gap-6">
          <span className="pill">
            <span className="w-1.5 h-1.5 rounded-full bg-citrus" /> About ClassNotion
          </span>
          <h1 className="h-display text-[2.6rem] sm:text-6xl lg:text-7xl xl:text-[5.5rem] text-foreground max-w-5xl">
            Driving <span className="text-gradient">innovation</span> in online education for a{" "}
            <span className="text-gradient">brighter future</span>
          </h1>
          <p className="text-foreground/55 text-base md:text-lg max-w-2xl">
            ClassNotion is at the forefront of driving innovation in online
            education. We're passionate about creating a brighter future by
            offering cutting-edge courses, leveraging emerging technologies, and
            nurturing a vibrant learning community.
          </p>
        </motion.div>

        {/* three tall image cards, middle one raised */}
        <div className="relative w-full mt-14 md:mt-20">
          <span aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[60%] rounded-full bg-magenta/20 blur-[100px]" />
          <div className="relative grid grid-cols-3 gap-3 sm:gap-5 lg:gap-8 max-w-5xl mx-auto items-end">
            {/* left */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.05 }}
              className="duotone relative rounded-3xl sm:rounded-4xl aspect-[9/16] sm:aspect-[3/5] border border-foreground/10 shadow-card"
            >
              <img src="/assets/Images/aboutus1.webp" alt="Students learning" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-photo-fade" />
              <div className="absolute left-2 right-2 bottom-2 sm:left-4 sm:right-4 sm:bottom-4 glass rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex items-center gap-2 text-left z-10">
                <span className="hidden sm:grid icon-circle w-8 h-8"><FiZap className="text-sm" /></span>
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs font-medium text-foreground truncate">AI for Creators</p>
                  <p className="text-[10px] text-citrus">Active</p>
                </div>
              </div>
            </motion.div>

            {/* middle (raised) */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.12 }}
              className="duotone relative rounded-3xl sm:rounded-4xl aspect-[9/16] sm:aspect-[3/5] border border-foreground/15 shadow-glow md:mb-16"
            >
              <img src="/assets/Images/aboutus2.webp" alt="Learning together" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-photo-fade" />
              <span className="absolute top-2 right-2 sm:top-4 sm:right-4 pill pill-white z-10 hidden sm:inline-flex">Active</span>
              <div className="absolute left-2 right-2 bottom-2 sm:left-4 sm:right-4 sm:bottom-4 glass-strong rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex items-center justify-between gap-2 text-left z-10">
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-foreground/55">Progress</p>
                  <p className="text-xs sm:text-sm font-medium text-foreground truncate">Creative Sprint</p>
                </div>
                <ProgressRing value={67} size={40} stroke={3} className="shrink-0 hidden sm:inline-grid">67%</ProgressRing>
                <ProgressRing value={67} size={28} stroke={2.5} className="shrink-0 sm:hidden" />
              </div>
            </motion.div>

            {/* right */}
            <motion.div
              {...fadeUp}
              transition={{ ...fadeUp.transition, delay: 0.19 }}
              className="duotone relative rounded-3xl sm:rounded-4xl aspect-[9/16] sm:aspect-[3/5] border border-foreground/10 shadow-card"
            >
              <img src="/assets/Images/aboutus3.webp" alt="Online classroom" className="absolute inset-0 w-full h-full object-cover" />
              <div className="absolute inset-0 bg-photo-fade" />
              <div className="absolute left-2 right-2 bottom-2 sm:left-4 sm:right-4 sm:bottom-4 glass rounded-2xl sm:rounded-3xl p-2 sm:p-3 flex flex-col sm:flex-row sm:items-center gap-1.5 sm:gap-2 text-left z-10">
                <AvatarStack count="+2K" size={22} />
                <div className="hidden md:flex items-center gap-2 text-[11px] text-foreground/70">
                  <span className="inline-flex items-center gap-1"><FiStar className="text-citrus" /> 4.9</span>
                  <span className="inline-flex items-center gap-1"><FiClock /> 18h</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* statement */}
      <section className="container-x">
        <motion.blockquote {...fadeUp} className="max-w-5xl mx-auto text-center">
          <span aria-hidden="true" className="block h-display text-7xl md:text-8xl text-gradient leading-none mb-2">“</span>
          <p className="h-display text-2xl sm:text-3xl md:text-5xl text-foreground/40 !leading-[1.15]">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform{" "}
            <span className="text-foreground">combines technology, expertise,</span>{" "}
            and community to create an{" "}
            <span className="text-gradient">unparalleled educational experience.</span>
          </p>
        </motion.blockquote>
      </section>

      {/* founding story */}
      <section className="container-x grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...fadeUp} className="flex flex-col gap-6 order-2 lg:order-1">
          <p className="eyebrow">Since day one</p>
          <h2 className="h-display text-4xl md:text-6xl text-foreground">
            Our founding <span className="text-gradient">story</span>
          </h2>
          <div className="flex flex-col gap-4 text-foreground/60 text-base md:text-lg leading-relaxed">
            <p>
              Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.
            </p>
            <p>
              As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
            </p>
          </div>
        </motion.div>
        <motion.div {...fadeUp} className="relative order-1 lg:order-2">
          <span aria-hidden="true" className="pointer-events-none absolute -inset-6 rounded-full bg-violet/25 blur-3xl" />
          <div className="relative glass p-2 sm:p-3 rounded-5xl">
            <div className="duotone rounded-4xl">
              <img
                className="w-full h-full object-cover aspect-[4/3]"
                src="/assets/Images/FoundingStory.png"
                alt="Our founding story"
              />
            </div>
          </div>
          <div className="absolute -bottom-5 left-6 sm:left-10 glass-strong rounded-full pl-2 pr-4 py-2 flex items-center gap-3">
            <AvatarStack count="+1K" size={26} />
            <span className="text-xs font-medium text-foreground/80">learners joined this year</span>
          </div>
        </motion.div>
      </section>

      {/* vision & mission */}
      <section className="container-x grid grid-cols-1 md:grid-cols-2 gap-5">
        <motion.div {...fadeUp}>
          <AboutCard
            heading={"Our Vision"}
            eyebrow="Vision"
            icon={FiEye}
            glow="bg-magenta/30"
            description1={
              "With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience."
            }
            description2={""}
          />
        </motion.div>
        <motion.div {...fadeUp} transition={{ ...fadeUp.transition, delay: 0.08 }}>
          <AboutCard
            heading={"Our Mission"}
            eyebrow="Mission"
            icon={FiTarget}
            glow="bg-violet/35"
            description1={
              "Our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities."
            }
            description2={""}
          />
        </motion.div>
      </section>

      {/* stats */}
      <section className="container-x">
        <motion.div {...fadeUp}>
          <AboutDetail />
        </motion.div>
      </section>

      {/* learning grid */}
      <section className="container-x">
        <AboutGrid />
      </section>

      {/* contact */}
      <section className="container-x">
        <ContactForm />
      </section>

      <ReviewSlider />
    </div>
  );
};

export default About;
