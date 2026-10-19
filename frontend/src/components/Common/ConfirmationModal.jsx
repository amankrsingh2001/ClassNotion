import { motion } from "motion/react";
import { FiAlertCircle } from "react-icons/fi";
import IconBtn from "./IconBtn";

const ConfirmationModal = ({ modalData }) => {
  return (
    <div className="fixed inset-0 z-[1100] !mt-0 grid place-items-center overflow-auto bg-night/70 backdrop-blur-md p-4">
      <motion.div
        initial={{ opacity: 0, y: 16, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 24 }}
        className="relative w-full max-w-[420px] glass-strong bg-surface-2/80 p-7 overflow-hidden"
      >

        <div className="relative">
          <span className="icon-circle-glass">
            <FiAlertCircle className="text-lg text-peach" />
          </span>
          <p className="mt-5 text-2xl font-semibold tracking-tight text-foreground">{modalData?.text1}</p>
          <p className="mt-2 mb-7 text-foreground/55">{modalData?.text2}</p>
          <div className="flex flex-wrap items-center gap-3">
            <IconBtn onclick={modalData?.btn1Handler} text={modalData?.btn1Text} disabled={modalData?.disabled} />
            <button className="btn btn-glass" onClick={modalData?.btn2Handler}>
              {modalData?.btn2Text}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ConfirmationModal;
