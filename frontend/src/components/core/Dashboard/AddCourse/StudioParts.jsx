import { Link } from 'react-router-dom';
import { FiArrowLeft, FiCheck, FiImage, FiChevronDown, FiZap, FiLayers, FiPlayCircle } from 'react-icons/fi';
import { COURSE_STATUS } from '../../../../utils/constants';

export function StudioHeader({ title, subtitle, courseName, status }) {
  const live = status === COURSE_STATUS.PUBLISHED;
  return (
    <header className="cs-header">
      <div className="min-w-0">
        <Link to="/dashboard/my-courses" className="cs-back"><FiArrowLeft /> My courses</Link>
        <h1>
          {title}
          {courseName && <span> · {courseName}</span>}
        </h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
      <span className={`cs-status ${live ? 'is-live' : ''}`}><i />{live ? 'Published' : 'Draft'}</span>
    </header>
  );
}

const formatPrice = price => {
  if (price === '' || price === null || price === undefined || Number.isNaN(Number(price))) return '—';
  return Number(price) === 0 ? 'Free' : `₹${Number(price).toLocaleString('en-IN')}`;
};

/** Course card as learners will see it in the catalog. */
export function CoursePreviewCard({ cover, category, title, description, price, tags = [], sections, lessons }) {
  return (
    <div className="cs-card cs-preview">
      <div className="cs-preview-cover">
        {cover ? <img src={cover} alt="" /> : <span><FiImage />Cover image</span>}
        <span className="pill">Preview</span>
      </div>
      <div className="cs-preview-body">
        <p className="cs-preview-cat">{category || 'Category'}</p>
        <p className={`cs-preview-title ${title ? '' : 'is-empty'}`}>{title || 'Your course title'}</p>
        {description && <p className="cs-preview-desc">{description}</p>}
        {tags.length > 0 && (
          <div className="cs-preview-tags">
            {tags.slice(0, 4).map(tag => <span key={tag}>{tag}</span>)}
            {tags.length > 4 && <span>+{tags.length - 4}</span>}
          </div>
        )}
        <div className="cs-preview-meta">
          {sections !== undefined
            ? <span className="flex items-center gap-3"><span className="flex items-center gap-1"><FiLayers />{sections}</span><span className="flex items-center gap-1"><FiPlayCircle />{lessons}</span></span>
            : <span>By you</span>}
          <strong>{formatPrice(price)}</strong>
        </div>
      </div>
    </div>
  );
}

/** Completeness checklist with progress bar. items: [{ label, done }] */
export function Checklist({ title, items }) {
  const done = items.filter(item => item.done).length;
  return (
    <div className="cs-card cs-check">
      <div className="cs-check-head">
        <h3>{title}</h3>
        <span>{done}/{items.length}</span>
      </div>
      <div className="cs-progress"><div style={{ width: `${(done / items.length) * 100}%` }} /></div>
      <ul>
        {items.map(item => (
          <li key={item.label} className={item.done ? 'is-done' : ''}>
            <i>{item.done && <FiCheck />}</i>{item.label}
          </li>
        ))}
      </ul>
    </div>
  );
}

export function Tips({ title = 'Tips for this step', tips }) {
  return (
    <details className="cs-tips" open>
      <summary><FiZap />{title}<FiChevronDown /></summary>
      <ul>{tips.map(tip => <li key={tip}>{tip}</li>)}</ul>
    </details>
  );
}

/** Sticky bottom bar holding the step's primary actions. */
export function ActionBar({ hint, children }) {
  return (
    <div className="cs-actionbar">
      <p>{hint}</p>
      <div>{children}</div>
    </div>
  );
}
