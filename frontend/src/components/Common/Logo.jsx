import { Link } from "react-router-dom";
import { FiBookOpen } from "react-icons/fi";
// eslint-disable-next-line no-unused-vars
const Logo = ({ className = "", inverted = false, compact = false }) => (
  <Link to="/" aria-label="ClassNotion home" className={`brand-logo ${className}`}>
    <span className="brand-mark"><FiBookOpen aria-hidden="true" /></span>
    {!compact && <span>Class<span className="brand-word-secondary">Notion</span></span>}
  </Link>
);
export default Logo;
