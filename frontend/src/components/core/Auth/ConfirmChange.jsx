import { Link } from "react-router-dom";
import { FiCheck, FiArrowRight } from "react-icons/fi";
import { motion } from "motion/react";
import Ambient from "../../ui/Ambient";
import Logo from "../../Common/Logo";
import ProgressRing from "../../ui/ProgressRing";

const ConfirmChange = ({ email }) => {
  return (
    <div className="relative min-h-screen w-full flex flex-col">
      <Ambient />
      <header className="container-x pt-6">
        <Logo />
      </header>

      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 240, damping: 24 }}
          className="relative w-full max-w-md"
        >
          <div aria-hidden className="absolute -top-16 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full bg-citrus/15 blur-[110px] pointer-events-none" />

          <div className="relative glass p-8 sm:p-10 text-center">
            <div className="flex justify-center">
              <ProgressRing value={100} size={120} stroke={4} color="#DDF247">
                <motion.span
                  initial={{ scale: 0.6, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 220, damping: 20, delay: 0.25 }}
                  className="grid place-items-center w-20 h-20 rounded-full bg-citrus text-night shadow-[0_0_40px_rgba(221,242,71,0.35)]"
                >
                  <FiCheck className="text-4xl" strokeWidth={3} />
                </motion.span>
              </ProgressRing>
            </div>

            <span className="mt-6 pill pill-citrus">Account secured</span>
            <h1 className="mt-4 h-display text-4xl sm:text-5xl text-white">Reset completed</h1>
            <p className="mt-3 text-white/55 leading-relaxed">
              All done! We have sent an email
              {email ? (
                <>
                  {" "}
                  to <span className="font-medium text-white break-all">{email}</span>
                </>
              ) : null}{" "}
              to confirm.
            </p>

            <Link to={"/login"} className="btn btn-primary btn-lg w-full mt-8">
              Back to login <FiArrowRight />
            </Link>
          </div>
        </motion.div>
      </main>
    </div>
  );
};

export default ConfirmChange;
