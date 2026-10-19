import { Link } from "react-router-dom";

// `inverted` kept for API compatibility (logo is always light-on-dark now).
// eslint-disable-next-line no-unused-vars
const Logo = ({ className = "", inverted = false, compact = false }) => {
  return (
    <Link to="/" className={`group inline-flex items-center gap-2.5 ${className}`}>
      <span className="relative grid place-items-center w-9 h-9 rounded-full bg-brand shadow-glow">
        <span className="absolute inset-[3px] rounded-full bg-night/30 backdrop-blur" />
        <span className="relative text-[15px] font-bold text-white">C</span>
      </span>
      {!compact && (
        <span className="text-[17px] font-semibold tracking-[-0.02em] text-white">
          Class<span className="text-white/50">Notion</span>
        </span>
      )}
    </Link>
  );
};

export default Logo;
