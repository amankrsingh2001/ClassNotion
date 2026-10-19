import { useEffect, useState } from "react";
import OtpInput from "react-otp-input";
import { BiArrowBack } from "react-icons/bi";
import { FiMail, FiArrowRight } from "react-icons/fi";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "motion/react";
import ProgressRing from "../../ui/ProgressRing";
import { signup } from "../../../services/authApi";
import { useDispatch, useSelector } from "react-redux";

const VerifyEmail = () => {
  const [otp, setOtp] = useState("");
  const { signupData } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!signupData) {
      navigate("/signup");
    }
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    const data = { ...signupData, otp };
    dispatch(signup(data, navigate));
  };

  return (
    <div className="relative w-full flex-1 flex items-center justify-center px-4 py-10 sm:py-16">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 240, damping: 24 }}
        className="relative w-full max-w-lg"
      >
        {/* soft glow behind the card */}


        <div className="relative glass p-6 sm:p-10">
          <div className="flex items-start justify-between gap-4">
            <ProgressRing value={(otp.length / 6) * 100} size={72} stroke={3} color="var(--accent)">
              <span className="grid place-items-center w-12 h-12 rounded-full bg-foreground text-night">
                <FiMail className="text-xl" />
              </span>
            </ProgressRing>
            <span className="pill pill-citrus">Almost there</span>
          </div>

          <h1 className="mt-7 h-display text-4xl sm:text-5xl text-foreground">Verify your email</h1>
          <p className="mt-3 text-foreground/55 leading-relaxed">
            A verification code has been sent to
            {signupData?.email ? (
              <>
                {" "}
                <span className="text-foreground font-medium break-all">{signupData.email}</span>
              </>
            ) : (
              " you"
            )}
            . Enter the 6-digit code below.
          </p>

          <form onSubmit={submitHandler} className="mt-8">
            <OtpInput
              value={otp}
              onChange={setOtp}
              numInputs={6}
              skipDefaultStyles
              renderInput={(props) => (
                <input
                  {...props}
                  placeholder="·"
                  className="flex-1 min-w-0 max-w-[64px] h-14 sm:h-16 rounded-2xl bg-foreground/[0.05] border border-foreground/10 backdrop-blur-xl text-center text-2xl font-medium text-foreground placeholder:text-foreground/25 outline-none transition focus:border-orchid/70 focus:bg-foreground/[0.08] focus:ring-4 focus:ring-orchid/25"
                />
              )}
              containerStyle={{
                display: "flex",
                justifyContent: "space-between",
                gap: "8px",
              }}
            />
            <div className="mt-3 flex items-center justify-between text-xs text-foreground/35">
              <span>{otp.length} of 6</span>
              <span>Check your spam folder too</span>
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-full mt-8">
              Verify email <FiArrowRight />
            </button>
          </form>

          <div className="mt-6 pt-5 divider flex items-center justify-between gap-3 text-sm">
            <Link to="/signup" className="inline-flex items-center gap-2 text-foreground/70 hover:text-foreground transition">
              <BiArrowBack />
              Back to signup
            </Link>
            <p className="text-foreground/35">Resend it</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default VerifyEmail;
