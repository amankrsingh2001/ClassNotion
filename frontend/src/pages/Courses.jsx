import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { FiSearch, FiArrowUpRight, FiBookOpen, FiX } from 'react-icons/fi';
import { useDiscovery } from '../services/discovery';
import { CourseCard, DiscoveryState } from '../components/discovery/DiscoveryCards';

export default function Courses() {
  const { user } = useSelector(state => state.profile);
  const { token } = useSelector(state => state.auth);
  const resource = useDiscovery('course/getAllCourses');
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('All courses');
  const [sort, setSort] = useState('newest');
  const courses = resource.data?.course || [];
  const categories = ['All courses', ...new Set(courses.map(c => c.Category?.name).filter(Boolean))];
  const filtered = useMemo(() => {
    const search = query.trim().toLowerCase();
    const list = (resource.data?.course || []).filter(c =>
      (category === 'All courses' || c.Category?.name === category) &&
      `${c.courseName} ${c.courseDescription} ${c.tag.join(' ')} ${c.instructor?.firstName} ${c.instructor?.lastName}`.toLowerCase().includes(search));
    return list.sort((a, b) => sort === 'title' ? a.courseName.localeCompare(b.courseName) : sort === 'price' ? a.price - b.price : new Date(b.createdAt) - new Date(a.createdAt));
  }, [resource.data, query, category, sort]);
  return (
    <div className="container-x discovery-page">
      <header className="discovery-heading">
        <div><p className="eyebrow">{token ? `YOUR LEARNING SPACE${user?.firstName ? ` / ${user.firstName}` : ''}` : 'THE COURSE COLLECTION'}</p><h1>What will you<br /><span>learn today?</span></h1><p>A new skill. A fresh perspective. Find the course that takes you there.</p></div>
        <Link to={!token ? '/login' : user?.accountType === 'Instructor' ? '/dashboard/my-Courses' : '/dashboard/enrolled-courses'} className="btn btn-glass">{token ? (user?.accountType === 'Instructor' ? 'Manage my courses' : 'My learning') : 'Start learning'} <FiArrowUpRight /></Link>
      </header>
      <div className="discovery-intro"><FiBookOpen /><p>Something new starts here.<span>Explore every published course, or find an educator whose approach clicks with yours.</span></p><Link to="/educators">Meet the educators <FiArrowUpRight /></Link></div>
      <section aria-label="Browse courses">
        <div className="discovery-toolbar">
          <div className="discovery-search"><FiSearch /><input aria-label="Search courses" placeholder="Search a topic, skill or educator…" value={query} onChange={e => setQuery(e.target.value)} />{query && <button aria-label="Clear search" onClick={() => setQuery('')}><FiX /></button>}</div>
          <label className="discovery-sort">Sort by<select value={sort} onChange={e => setSort(e.target.value)} aria-label="Sort courses"><option value="newest">Newest first</option><option value="title">Course name</option><option value="price">Price: low to high</option></select></label>
        </div>
        <div className="discovery-categories" aria-label="Filter courses by category">{categories.map(name => <button key={name} onClick={() => setCategory(name)} aria-pressed={category === name} className={category === name ? 'is-active' : ''}>{name}</button>)}</div>
        <div className="discovery-results"><h2>{category}</h2><p aria-live="polite">{resource.loading ? 'Loading courses…' : `${filtered.length} ${filtered.length === 1 ? 'course' : 'courses'} to explore`}</p></div>
        <DiscoveryState {...resource}>
          {filtered.length ? <div className="discovery-grid">{filtered.map(course => <CourseCard key={course._id} course={course} />)}</div> : <div className="discovery-empty"><FiSearch /><h2>{query || category !== 'All courses' ? 'No courses match just yet' : 'New courses are on their way'}</h2><p>{query || category !== 'All courses' ? 'Try another topic or reset your filters.' : 'Published courses will appear here as educators add them.'}</p>{(query || category !== 'All courses') && <button className="btn btn-glass" onClick={() => { setQuery(''); setCategory('All courses'); }}>Reset filters</button>}</div>}
        </DiscoveryState>
      </section>
    </div>
  );
}
