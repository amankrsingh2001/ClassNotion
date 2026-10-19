import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowUpRight, FiBookOpen, FiUsers, FiShoppingBag, FiArrowRight } from 'react-icons/fi';
import { useDiscovery } from '../../services/discovery';
import WorkspaceRail from './WorkspaceRail';
import ProfileDropDown from '../core/Auth/ProfileDropDown';
import ThemeToggle from '../Common/ThemeToggle';
import LearningSculpture from '../ui/LearningSculpture/LearningSculpture';
import './workspace.css';

function LearningSidebar() {
  const { data } = useDiscovery('educators');
  const { user } = useSelector(state => state.profile);
  return <aside className="workspace-sidebar">
    <div className="workspace-sidebar-label"><span className="workspace-status-dot" /> Your learning space</div>
    <h2>A little progress.<br />Every day.</h2>
    <p>Find your next skill. Make space to explore it.</p>
    <div className="workspace-shortcuts">
      <Link to="/courses"><span><FiBookOpen /></span><div>Course library<small>Explore every published course</small></div><FiArrowUpRight /></Link>
      <Link to="/educators"><span><FiUsers /></span><div>Meet the educators<small>Learn from a new perspective</small></div><FiArrowUpRight /></Link>
    </div>
    <Link className="workspace-primary-link" to={user?.accountType === 'Instructor' ? '/dashboard/my-Courses' : '/dashboard/enrolled-courses'}>{user?.accountType === 'Instructor' ? 'Manage my courses' : 'Go to my learning'}<FiArrowRight /></Link>
    <section className="workspace-educators"><h3>People to learn from <Link to="/educators">View all</Link></h3>{data?.educators.slice(0,3).map(educator => <Link key={educator._id} to={`/educators/${educator._id}`}><img src={educator.image} alt="" /><span>{educator.firstName} {educator.lastName}<small>{educator.courseCount} published courses</small></span><FiArrowUpRight /></Link>)}</section>
    <Link to="/courses" className="workspace-inspiration"><LearningSculpture compact /><span>A little curiosity.<br /><strong>Infinite possibilities.</strong><FiArrowUpRight /></span></Link>
    <Link to="/contact-us" className="workspace-help">Need a hand? <span>Get in touch <FiArrowUpRight /></span></Link>
  </aside>;
}
export default function WorkspaceShell({ children }) {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const location = useLocation();
  return <div className="workspace-frame">
    <WorkspaceRail />
    <div className="workspace-center">
      <header className="workspace-topbar"><Link to="/courses">ClassNotion <span>Academy</span></Link><span className="workspace-page-label">{location.pathname.startsWith('/educators') ? 'People & perspectives' : 'Discover your next chapter'}</span><div><span className="workspace-mobile-theme"><ThemeToggle /></span>{token ? <>{user?.accountType !== "Instructor" && <Link to="/dashboard/cart" className="workspace-cart" aria-label="Cart"><FiShoppingBag /></Link>}<ProfileDropDown /></> : <Link to="/login" className="workspace-login">Log in <FiArrowUpRight /></Link>}</div></header>
      {children}
    </div>
    <LearningSidebar />
  </div>;
}
