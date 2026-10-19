import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiArrowUpRight, FiArrowRight, FiCode, FiLayers, FiDatabase, FiBookOpen, FiCheck, FiPlay, FiPlus, FiCommand } from 'react-icons/fi';
import './home.css';

const PATHS = [
  { name: 'Frontend', icon: FiCode, color: 'lilac', title: 'Make the web your canvas.', description: 'Go from your first element to interfaces people love to use.', skills: ['HTML & CSS', 'JavaScript', 'React'], file: 'your-next-idea.jsx', code: ['function YourNextChapter() {', '  const curiosity = true;', '', '  return (', '    <SomethingGreat', '      builtBy="you"', '      startsWith="one lesson"', '    />', '  );', '}'] },
  { name: 'Backend', icon: FiDatabase, color: 'sage', title: 'Build what makes it work.', description: 'Explore the APIs, databases, and systems behind great products.', skills: ['Node.js', 'APIs', 'PostgreSQL'], file: 'possibilities.js', code: ['const nextIdea = {', '  creator: "you",', '  possibilities: Infinity,', '};', '', 'app.get("/your-future", () => {', '  return build(nextIdea);', '});', '', '// Start small. Build something real.'] },
  { name: 'Foundations', icon: FiLayers, color: 'peach', title: 'Big ideas start here.', description: 'Build a solid foundation, one clear concept at a time.', skills: ['Python', 'Logic', 'Problem solving'], file: 'a_fresh_start.py', code: ['def your_next_chapter():', '    curiosity = "a little every day"', '    skills = []', '', '    for idea in possibilities:', '        skills.append(learn(idea))', '', '    return something_new(skills)', '', 'your_next_chapter()'] },
];

function HeroShowcase({ path }) {
  return <div className="home-playground">
    <div className="home-playground-top"><span><i /> THE POSSIBILITY STUDIO</span><FiCommand /></div>
    <div className="home-orbit-art" aria-hidden="true"><div className="home-orbit home-orbit-one" /><div className="home-orbit home-orbit-two" /><div className="home-orbit home-orbit-three" /><span className="home-orbit-star">✳</span><span className="home-orbit-note">a little curiosity<br /><b>changes everything.</b></span><span className="home-orbit-plus">+</span></div>
    <div className="home-editor"><div className="home-editor-bar"><span><i /><i /><i /></span><span>{path.file}</span><FiCode /></div><pre aria-label={`Sample ${path.name} code`}>{path.code.map((line, index) => <div key={index}><span className="home-line-number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span><code>{line || ' '}</code></div>)}</pre><div className="home-editor-footer"><span><i /> An idea in the making</span><span>Made of possibilities ↗</span></div></div>
    <Link to="/courses" className="home-floating-link"><span className="home-play-icon"><FiPlay /></span><span>Your next chapter<small>Find your first lesson</small></span><FiArrowUpRight /></Link>
    <span className="home-playground-caption">LEARN SOMETHING. MAKE SOMETHING.</span>
  </div>;
}

export default function Home() {
  const { token } = useSelector(state => state.auth);
  const [selectedPath, setSelectedPath] = useState(0);
  const path = PATHS[selectedPath];
  if (token) return <Navigate to="/courses" replace />;
  return <div className="home-redesign">
    <section className="home-hero container-x">
      <div className="home-hero-copy">
        <Link to="/educators" className="home-eyebrow-link"><span className="home-dot" /> A place for curious minds <FiArrowUpRight /></Link>
        <h1>Less scrolling.<br />More <em>becoming.</em><span className="home-heading-star" aria-hidden="true">✳</span></h1>
        <p>Make room for the things you’ve always wanted to learn. Practical courses. Thoughtful educators. A future you get to build.</p>
        <div className="home-actions"><Link to="/courses" className="home-button">Find your next skill <FiArrowUpRight /></Link><Link to="/signup" className="home-text-link">Create a free account <FiArrowRight /></Link></div>
        <div className="home-hero-footnote"><span><FiCheck /> At your own pace</span><span><FiCheck /> From curiosity to practice</span></div>
      </div>
      <HeroShowcase path={path} />
    </section>

    <div className="container-x"><div className="home-skill-strip"><span>GOOD THINGS<br /><b>START WITH A SKILL.</b></span><div>{['React', 'JavaScript', 'Python', 'Node.js', 'PostgreSQL', 'Problem solving'].map(skill => <span key={skill}>{skill}<i aria-hidden="true">✳</i></span>)}</div></div></div>

    <section className="container-x home-section" aria-labelledby="home-paths-title">
      <div className="home-section-heading"><div><p className="home-kicker">01 / FOLLOW YOUR CURIOSITY</p><h2 id="home-paths-title">Find your kind of <em>next.</em></h2></div><Link to="/courses" className="home-text-link">Explore all courses <FiArrowUpRight /></Link></div>
      <div className="home-path-layout">
        <div className="home-path-options" role="group" aria-label="Explore a learning direction">{PATHS.map((item, index) => <button key={item.name} onClick={() => setSelectedPath(index)} aria-pressed={selectedPath === index} className={`home-path-option ${selectedPath === index ? 'is-selected' : ''}`}><span className={`home-topic-icon ${item.color}`}><item.icon /></span><span>{item.name}<small>{item.skills.join(' · ')}</small></span><FiArrowUpRight /></button>)}</div>
        <div className={`home-path-detail ${path.color}`} aria-live="polite"><div className="home-path-index">0{selectedPath + 1}<path.icon /></div><h3>{path.title}</h3><p>{path.description}</p><div className="home-skill-pills">{path.skills.map(skill => <span key={skill}>{skill}</span>)}</div><Link to="/courses">Explore the course library <FiArrowRight /></Link></div>
      </div>
    </section>

    <section className="container-x home-section" aria-labelledby="home-method-title">
      <div className="home-section-heading"><div><p className="home-kicker">02 / THE CLASSNOTION WAY</p><h2 id="home-method-title">Built for your <em>momentum.</em></h2></div><p>A little structure.<br />A lot of room to grow.</p></div>
      <div className="home-bento">
        <article className="home-bento-main"><div className="home-bento-label"><FiLayers /><span>ONE STEP AT A TIME</span></div><div className="home-learning-map" aria-hidden="true"><span className="home-map-node">01 <FiBookOpen /><b>Understand</b></span><i /><span className="home-map-node">02 <FiCode /><b>Practice</b></span><i /><span className="home-map-node home-map-node-last">03 <FiArrowUpRight /><b>Build</b></span></div><h3>Big ambitions.<br />Manageable chapters.</h3><p>Clear sections and focused lessons help you turn “where do I start?” into “what’s next?”</p></article>
        <article className="home-bento-small"><div className="home-pace-art" aria-hidden="true">{[30, 46, 40, 68, 58, 86, 100].map((height, i) => <i key={i} style={{ '--bar-height': `${height}%` }} />)}<span>YOUR PACE. YOUR PATH.</span></div><h3>Make progress your way.</h3><p>Learn when it works for you. Pick up where you left off.</p></article>
        <article className="home-bento-small home-bento-educator"><div className="home-idea-art" aria-hidden="true"><span>{'{'}<i>✳</i>{'}'}</span><small>KNOWLEDGE, SHARED.</small></div><h3>People behind the lessons.</h3><p>Explore educators and discover every course they teach.</p><Link to="/educators" className="home-text-link">Meet your educators <FiArrowUpRight /></Link></article>
      </div>
    </section>

    <section className="container-x home-section home-teaching-section">
      <div className="home-teaching-card"><div className="home-curriculum" aria-label="Example course outline"><div className="home-curriculum-header"><FiBookOpen /><span>YOUR KNOWLEDGE, REIMAGINED</span><FiArrowUpRight /></div><h3>A course only<br /><em>you</em> could teach.</h3>{['Start with an idea', 'Shape your lessons', 'Share your perspective'].map((label, index) => <div className="home-curriculum-row" key={label}><span>0{index + 1}</span>{label}<FiPlus /></div>)}<span className="home-curriculum-note">From a blank page to someone’s breakthrough.</span></div><div className="home-teaching-copy"><p className="home-kicker">03 / MAKE ROOM FOR YOUR IDEAS</p><h2>Someone needs<br />what <em>you know.</em></h2><p>Turn your experience into a course. Organize your lessons, share your perspective, and give curious people somewhere to start.</p><Link to="/signup" className="home-button">Start your teaching chapter <FiArrowUpRight /></Link></div></div>
    </section>
  </div>;
}
