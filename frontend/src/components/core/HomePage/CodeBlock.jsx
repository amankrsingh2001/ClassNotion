import { TypeAnimation } from "react-type-animation";
import { motion } from "motion/react";
import { FiTerminal } from "react-icons/fi";
import Cpabutton from "./Cpabutton";

// backgroundGradient: glow colour class behind the editor (e.g. "bg-magenta/40").
const CodeBlock = ({
  position,
  heading,
  subHeading,
  cpa1,
  cpa2,
  backgroundGradient = "bg-magenta/40",
  codeBlock,
  codeColor = "text-peach",
  buttonBackground = "btn-primary",
  inActiveBackground = "btn-glass",
  fileName = "index.html",
}) => {
  const lineCount = Math.max(codeBlock.split("\n").length, 10);

  return (
    <div className={`flex ${position} w-full items-center justify-between gap-12 lg:gap-20 py-16 lg:py-24`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 200, damping: 26 }}
        className="flex flex-col gap-6 lg:w-[46%]"
      >
        {heading}
        <p className="text-lg text-foreground/55 max-w-[520px]">{subHeading}</p>
        <div className="flex flex-wrap gap-3 pt-2">
          <Cpabutton background={buttonBackground} active={cpa1.active} linkto={cpa1.linkto}>
            {cpa1.btnText}
          </Cpabutton>
          <Cpabutton active={cpa2.active} linkto={cpa2.linkto} inActiveBackground={inActiveBackground}>
            {cpa2.btnText}
          </Cpabutton>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ type: "spring", stiffness: 160, damping: 24, delay: 0.1 }}
        className="relative w-full lg:w-[50%]"
      >
        <div className={`absolute -inset-6 rounded-full blur-[80px] ${backgroundGradient}`} />
        <div className="relative glass bg-surface/80 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-foreground/[0.07]">
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-foreground/15" />
              <span className="w-3 h-3 rounded-full bg-foreground/15" />
              <span className="w-3 h-3 rounded-full bg-foreground/15" />
            </div>
            <span className="pill h-6 text-[11px] font-mono">
              <FiTerminal /> {fileName}
            </span>
          </div>
          <div className="flex p-5 min-h-[280px] font-mono text-[13px] leading-6">
            <div className="pr-5 text-right text-foreground/20 select-none">
              {Array.from({ length: lineCount }, (_, i) => (
                <p key={i}>{i + 1}</p>
              ))}
            </div>
            <div className={`flex-1 ${codeColor}`}>
              <TypeAnimation
                sequence={[codeBlock, 2500, ""]}
                repeat={Infinity}
                cursor={true}
                style={{ whiteSpace: "pre-line", display: "block" }}
                omitDeletionAnimation={true}
              />
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default CodeBlock;
