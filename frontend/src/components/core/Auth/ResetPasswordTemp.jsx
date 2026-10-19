import { Link } from "react-router-dom";
import { GoArrowLeft } from "react-icons/go";
import { FiMail, FiKey, FiArrowRight } from "react-icons/fi";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { resetPasswordToken } from "../../../services/authApi";
import Ambient from "../../ui/Ambient";
import { AuthLayout, AuthHeading } from "./LoginTemp";

const ResetPasswordTemp = () => {
  const [email, setEmail] = useState("");
  const [sentEmail, setSentEmail] = useState(false);
  const dispatch = useDispatch();

  const resetPasswordHandler = (e) => {
    e.preventDefault();
    dispatch(resetPasswordToken(email, setSentEmail));
  };

  return (
    <>
      <Ambient />
      <AuthLayout
        image="/assets/Images/login.webp"
        imageAlt="Learner at a laptop"
        panelKey={sentEmail ? "sent" : "reset"}
        quote={{
          eyebrow: sentEmail ? "Link on its way" : "Quick reset",
          headline: sentEmail ? "Check your inbox." : "Happens to the best of us.",
          sub: "We'll get you back to learning in no time.",
        }}
        card={{ title: "AI for Creators", progress: "1 of 5" }}
      >
        <AuthHeading
          title={!sentEmail ? "Reset your password" : "Check your email"}
          icon={
            <span className={sentEmail ? "icon-circle" : "icon-circle-glass"}>
              {sentEmail ? <FiMail className="text-lg" /> : <FiKey className="text-lg" />}
            </span>
          }
          subtitle={
            !sentEmail ? (
              "Have no fear. We’ll email you instructions to reset your password. If you don’t have access to your email we can try account recovery."
            ) : (
              <>
                We have sent the reset email to{" "}
                <span className="font-medium text-foreground break-all">{email}</span>
              </>
            )
          }
        />

        {!sentEmail && (
          <form className="mt-8 space-y-5" onSubmit={resetPasswordHandler}>
            <div>
              <label className="field-label" htmlFor="email">
                Email address <span className="text-rose">*</span>
              </label>
              <input
                value={email}
                id="email"
                name="email"
                placeholder="mygmail@example.com"
                type="text"
                className="field"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button type="submit" className="btn btn-primary btn-lg w-full !mt-8">
              Reset password <FiArrowRight />
            </button>
          </form>
        )}
        {sentEmail && (
          <button type="submit" className="btn btn-primary btn-lg w-full mt-8">
            Resend email
          </button>
        )}

        <div className="mt-6 pt-5 divider">
          <Link className="btn btn-ghost btn-sm -ml-4" to="/login">
            <GoArrowLeft /> Back to login
          </Link>
        </div>
      </AuthLayout>
    </>
  );
};

export default ResetPasswordTemp;
