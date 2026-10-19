import { FiArrowUpRight, FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';
import LearningSculpture from '../../ui/LearningSculpture/LearningSculpture';
import './auth.css';

export default function AuthArtwork({ panelKey }) {
  const teaching = panelKey === 'signup-1';
  return <aside className="auth-artwork">
    <div className="auth-aside-top"><span><i /> THE CLASSNOTION WAY</span><Link to="/courses" aria-label="Explore courses"><FiArrowUpRight /></Link></div>
    <div className="auth-artwork-heading">
      <span className="auth-editorial-label">{teaching ? 'FOR THE KNOWLEDGE SHARERS' : 'FOR THE ENDLESSLY CURIOUS'}</span>
      <h2>{teaching ? <>Big ideas.<br />Lasting <em>impact.</em></> : <>Small steps.<br /><em>Limitless</em> you.</>}</h2>
      <p>{teaching ? 'Turn what you know into someone else’s next possibility.' : 'A space to follow your curiosity. And see how far it takes you.'}</p>
    </div>
    <LearningSculpture teaching={teaching} />
    <div className="auth-journey"><span><b>01</b> Discover</span><i /><span><b>02</b> {teaching ? 'Share' : 'Practice'}</span><i /><span><b>03</b> Grow</span></div>
    <Link className="auth-explore-link" to={teaching ? '/educators' : '/courses'}><span>{teaching ? 'Meet the people making a difference' : 'Find something that sparks your interest'}</span><FiArrowRight /></Link>
    <div className="auth-aside-bottom"><span>YOUR NEXT CHAPTER, BY YOU.</span><span>ClassNotion © {new Date().getFullYear()}</span></div>
  </aside>;
}
