import { Link, NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiPlus, FiCompass, FiUsers, FiBookOpen, FiHome, FiHelpCircle } from 'react-icons/fi';
import Logo from '../Common/Logo';
import ThemeToggle from '../Common/ThemeToggle';

export default function WorkspaceRail({ auth = false }) {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const links = [
    { to: '/courses', icon: FiCompass, label: 'Discover courses' },
    { to: '/educators', icon: FiUsers, label: 'Meet educators' },
    { to: token ? (user?.accountType === 'Instructor' ? '/dashboard/my-Courses' : '/dashboard/enrolled-courses') : '/login', icon: FiBookOpen, label: user?.accountType === 'Instructor' ? 'Manage my courses' : 'My learning' },
  ];
  return <nav className={`workspace-rail ${auth ? 'workspace-rail-auth' : ''}`} aria-label="Workspace navigation">
    <Logo compact />
    <Link className="rail-create" to={auth ? '/' : user?.accountType === 'Instructor' ? '/dashboard/add-course' : '/courses'} title={auth ? 'Back to home' : user?.accountType === 'Instructor' ? 'Create a course' : 'Explore courses'} aria-label={auth ? 'Back to home' : user?.accountType === 'Instructor' ? 'Create a course' : 'Explore courses'}>{auth ? <FiHome /> : <FiPlus />}</Link>
    <div className="workspace-rail-links">{links.map(({to,icon:Icon,label}) => <NavLink key={label} to={to} title={label} aria-label={label} className={({isActive}) => isActive ? 'is-active' : ''}><Icon /></NavLink>)}</div>
    <div className="workspace-rail-bottom"><Link to="/contact-us" title="Help & contact" aria-label="Help & contact"><FiHelpCircle /></Link><ThemeToggle /></div>
  </nav>;
}
