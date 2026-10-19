// Gradient-highlighted words. `color` may override with any text/bg-clip classes.
export const HilightText = ({ text, font = "", color = "text-gradient" }) => {
  return <span className={`${color} ${font}`}>{text}</span>;
};
