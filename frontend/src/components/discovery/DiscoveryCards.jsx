import { Link } from 'react-router-dom';
import { FiArrowUpRight, FiBookOpen, FiArrowRight } from 'react-icons/fi';
import './discovery.css';

export function CourseCard({ course }) {
  const educator = course.instructor;
  const name = `${educator?.firstName || ''} ${educator?.lastName || ''}`.trim();
  const lessons = course.courseContent?.reduce((n, section) => n + section.subSection.length, 0) || 0;
  return (
    <article className="discovery-course">
      <Link to={`/courses/${course._id}`} className="discovery-course-art" aria-label={`View ${course.courseName}`}>
        <img src={course.thumbnail} alt="" loading="lazy" />
        {course._id.startsWith('demo-course-') && <span className="discovery-demo">Demo course</span>}
        <span className="discovery-art-arrow"><FiArrowUpRight /></span>
      </Link>
      <div className="discovery-course-body">
        <div className="discovery-course-meta"><span>{course.Category?.name || 'Course'}</span><span>{course.price === 0 ? 'Free' : `₹${course.price.toLocaleString('en-IN')}`}</span></div>
        <h2><Link to={`/courses/${course._id}`}>{course.courseName}</Link></h2>
        <p>{course.courseDescription.replace(/^Demo course\. /, '')}</p>
        <div className="discovery-course-bottom">
          <Link to={`/educators/${educator?._id}`} className="discovery-author"><img src={educator?.image} alt="" /><span>{name || 'View educator'}</span></Link>
          <span className="discovery-lesson-count"><FiBookOpen /> {lessons} {lessons === 1 ? 'lesson' : 'lessons'}</span>
        </div>
      </div>
    </article>
  );
}
export function EducatorCard({ educator }) {
  return (
    <Link to={`/educators/${educator._id}`} className="discovery-educator">
      <div className="discovery-educator-top"><img src={educator.image} alt="" /><FiArrowUpRight /></div>
      <h2>{educator.firstName} {educator.lastName}</h2>
      <p>{educator.profession}</p>
      <div className="discovery-tags">{[...new Set(educator.courses.flatMap(c => c.tag || []))].slice(0, 3).map(tag => <span key={tag}>{tag}</span>)}</div>
      <div className="discovery-educator-bottom"><span>{educator.courseCount} {educator.courseCount === 1 ? 'course' : 'courses'}</span><span>Meet your educator <FiArrowRight /></span></div>
    </Link>
  );
}
export function DiscoveryState({ loading, error, retry, children }) {
  if (loading) return <div className="discovery-grid" role="status" aria-label="Loading content">{[1, 2, 3, 4, 5, 6].map(n => <div key={n} className="skeleton h-[360px] rounded-3xl" />)}</div>;
  if (error) return <div className="discovery-empty" role="alert"><FiBookOpen /><h2>Let’s try that again</h2><p>{error}</p><button className="btn btn-glass" onClick={retry}>Try again</button></div>;
  return children;
}
