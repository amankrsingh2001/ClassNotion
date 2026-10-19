import { FiChevronRight } from "react-icons/fi";

// A "lesson row" style value item.
export const LogoCard = ({ index, description, name, logo }) => {
  return (
    <div className="row-item">
      <span className={index === 1 ? "icon-circle" : "icon-circle-glass"}>
        <img className={`h-4 w-4 ${index === 1 ? "" : "invert opacity-80"}`} src={logo} alt="" />
      </span>
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-white">{name}</p>
        <p className="text-xs text-white/45 truncate">{description}</p>
      </div>
      <span className="hidden sm:flex items-center gap-1 text-xs text-white/45">
        0{index} <FiChevronRight />
      </span>
    </div>
  );
};
