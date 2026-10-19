import { FiCode, FiFeather, FiZap } from 'react-icons/fi';
import './sculpture.css';

// Pure CSS artwork: no downloaded imagery or fabricated learning activity.
export default function LearningSculpture({ compact = false, teaching = false }) {
  return <div className={`learning-sculpture${compact ? ' learning-sculpture-compact' : ''}`} aria-hidden="true">
    <div className="sculpture-grid" />
    <span className="sculpture-coordinate">CN / POSSIBILITIES</span>
    <div className="sculpture-orbit sculpture-orbit-back" />
    <div className="sculpture-orbit sculpture-orbit-front" />
    <div className="sculpture-core"><span>✳</span></div>
    <div className="sculpture-orbit sculpture-orbit-cross" />
    <span className="sculpture-spark sculpture-spark-one">+</span><span className="sculpture-spark sculpture-spark-two">+</span>
    <span className="sculpture-chip sculpture-chip-code"><FiCode /> Build something.</span>
    <span className="sculpture-chip sculpture-chip-idea"><FiZap /> {teaching ? 'Inspire someone.' : 'Stay curious.'}</span>
    <span className="sculpture-chip sculpture-chip-create"><FiFeather /> Make it yours.</span>
    <span className="sculpture-caption">IDEAS INTO POSSIBILITIES <span>↗</span></span>
  </div>;
}
