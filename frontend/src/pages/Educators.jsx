import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiUsers } from 'react-icons/fi';
import { useDiscovery } from '../services/discovery';
import { EducatorCard, DiscoveryState } from '../components/discovery/DiscoveryCards';
export default function Educators() {
  const resource = useDiscovery('educators');
  return (
    <div className="container-x discovery-page">
      <header className="discovery-heading"><div><p className="eyebrow">THE PEOPLE BEHIND THE POSSIBILITIES</p><h1>Meet your <span>educators.</span></h1><p>Different perspectives. Shared curiosity. Explore the people behind your next course.</p></div><Link to="/courses" className="btn btn-glass">Explore all courses <FiArrowUpRight /></Link></header>
      <div className="discovery-results"><h2>Meet the educators</h2><p>{resource.data ? `${resource.data.educators.length} educators with published courses` : ''}</p></div>
      <DiscoveryState {...resource}>{resource.data?.educators.length ? <div className="discovery-grid discovery-educators-grid">{resource.data.educators.map(educator => <EducatorCard key={educator._id} educator={educator} />)}</div> : <div className="discovery-empty"><FiUsers /><h2>Your next mentor is on the way</h2><p>Educators appear here when they publish their first course.</p></div>}</DiscoveryState>
    </div>
  );
}
