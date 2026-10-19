import '../components/studio/educator.css';
import { Link, useParams } from 'react-router-dom';
import { FiArrowLeft, FiBookOpen } from 'react-icons/fi';
import { useDiscovery } from '../services/discovery';
import { CourseCard, DiscoveryState } from '../components/discovery/DiscoveryCards';
export default function EducatorProfile() {
  const { educatorId } = useParams();
  const resource = useDiscovery(`educators/${encodeURIComponent(educatorId)}`);
  const educator = resource.data?.educator;
  return (
    <div className="container-x discovery-page">
      <Link to="/educators" className="discovery-back"><FiArrowLeft /> All educators</Link>
      <DiscoveryState {...resource}>{educator && <>
        <header className="discovery-profile"><img src={educator.image} alt={`${educator.firstName} ${educator.lastName}`} /><div><p className="eyebrow">MEET YOUR EDUCATOR</p><h1>{educator.firstName} {educator.lastName}</h1><p className="discovery-profession">{educator.profession}</p><p>{educator.about || 'Explore their courses and find your next learning path.'}</p><span><FiBookOpen /> {educator.courseCount} published {educator.courseCount === 1 ? 'course' : 'courses'}</span></div></header>
        {educator.professionalProfile && <section className="professional-public"><h2>Professional background</h2><p>{educator.professionalProfile.yearsExperience} years of experience</p><p className="whitespace-pre-line">{educator.professionalProfile.about}</p>{educator.professionalProfile.youtubeUrl && <a href={educator.professionalProfile.youtubeUrl} target="_blank" rel="noreferrer">YouTube channel ↗</a>}<h3>Career</h3><ul>{educator.professionalProfile.careerHistory.map((item, index) => <li key={index}>{item.role} · {item.organization} · {item.startYear}–{item.endYear || 'Present'}</li>)}</ul><h3>Certificates</h3><ul>{educator.professionalProfile.certificates.map((item, index) => <li key={index}><a href={item.credentialUrl} target="_blank" rel="noreferrer">{item.title} · {item.issuer} ↗</a></li>)}</ul></section>}
        <div className="discovery-results"><h2>Learn with {educator.firstName}</h2><p>All published courses by this educator</p></div>
        {educator.courses.length ? <div className="discovery-grid">{educator.courses.map(course => <CourseCard key={course._id} course={course} />)}</div> : <div className="discovery-empty"><h2>New courses are on their way</h2><p>Check back when this educator publishes a course.</p></div>}
      </>}</DiscoveryState>
    </div>
  );
}
