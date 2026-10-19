import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiGlobe, FiLock, FiCheck, FiArrowUpRight, FiEdit2 } from 'react-icons/fi';
import { resetCourseState, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import { COURSE_STATUS } from '../../../../../utils/constants';
import { editCourseAPI } from '../../../../../services/courseDetail';
import { ActionBar, CoursePreviewCard, Tips } from '../StudioParts';

const OPTIONS = [
  { value: false, icon: FiLock, title: 'Keep as draft', description: 'Only you can see it. Come back and keep refining any time.' },
  { value: true, icon: FiGlobe, title: 'Publish', description: 'Listed in the catalog so learners can find and enrol.' },
];

export default function PublishCourse() {
  const { course } = useSelector(state => state.course);
  const { token } = useSelector(state => state.auth);
  const [isPublic, setPublic] = useState(course?.status === COURSE_STATUS.PUBLISHED);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const sections = course?.courseContent || [];
  const lessons = sections.reduce((sum, section) => sum + (section.subSection?.length || 0), 0);

  const save = async event => {
    event.preventDefault(); setLoading(true);
    try {
      const status = isPublic ? COURSE_STATUS.PUBLISHED : COURSE_STATUS.DRAFT;
      if (course.status !== status) { const data = new FormData(); data.append('courseId', course._id); data.append('status', status); if (!await editCourseAPI(data, token)) return; }
      dispatch(resetCourseState()); navigate('/dashboard/my-courses');
    } finally { setLoading(false); }
  };

  const editDetails = () => { dispatch(setEditCourse(true)); dispatch(setStep(1)); };
  const price = Number(course?.price) === 0 ? 'Free' : `₹${Number(course?.price || 0).toLocaleString('en-IN')}`;
  const tags = Array.isArray(course?.tag) ? course.tag : [];

  const review = [
    { label: 'Title', value: course?.courseName, step: 1 },
    { label: 'Price', value: price, step: 1 },
    { label: 'Cover image', value: course?.thumbnail ? 'Added' : null, step: 1 },
    { label: 'Curriculum', value: sections.length ? `${sections.length} sections · ${lessons} lessons` : null, step: 2 },
  ];

  return (
    <form className="cs-workspace" onSubmit={save}>
      <div className="cs-main">
        <section className="cs-card">
          <div className="cs-card-head">
            <div>
              <h2>Final review</h2>
              <p>Here is what learners will get. Jump back to any step to make changes.</p>
            </div>
          </div>
          <div className="cs-card-body !pt-3">
            <div className="cs-review-list">
              {review.map(row => (
                <div key={row.label} className="cs-review-row">
                  <i className={row.value ? '' : 'is-warn'}>{row.value ? <FiCheck /> : '!'}</i>
                  <span>{row.label}</span>
                  <b title={row.value || ''}>{row.value || 'Missing'}</b>
                  <button
                    type="button"
                    className="cs-icon-btn"
                    aria-label={`Edit ${row.label.toLowerCase()}`}
                    title="Edit"
                    onClick={() => (row.step === 1 ? editDetails() : dispatch(setStep(2)))}
                  ><FiEdit2 /></button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="cs-card">
          <div className="cs-card-head">
            <div>
              <h2>Visibility</h2>
              <p>You can change this later from My courses.</p>
            </div>
          </div>
          <div className="cs-card-body">
            <fieldset className="cs-visibility">
              <legend className="sr-only">Course visibility</legend>
              {OPTIONS.map(option => (
                <label key={option.title} className={isPublic === option.value ? 'is-selected' : ''}>
                  <input type="radio" name="visibility" checked={isPublic === option.value} onChange={() => setPublic(option.value)} />
                  <span className="cs-visibility-top">
                    <option.icon />
                    <span className="cs-radio">{isPublic === option.value && <FiCheck />}</span>
                  </span>
                  <b>{option.title}</b>
                  <small>{option.description}</small>
                </label>
              ))}
            </fieldset>
          </div>
        </section>

        <ActionBar hint={isPublic ? <><b>Ready to go live.</b> Learners will see it right away.</> : <>Saved privately as a <b>draft</b>.</>}>
          <button type="button" className="btn btn-glass" disabled={loading} onClick={() => dispatch(setStep(2))}><FiArrowLeft /> Back</button>
          <button type="submit" className="btn btn-primary" disabled={loading}>
            {loading ? 'Saving…' : isPublic ? 'Publish course' : 'Save draft'} <FiArrowUpRight />
          </button>
        </ActionBar>
      </div>

      <aside className="cs-aside">
        <CoursePreviewCard
          cover={course?.thumbnail}
          category={course?.Category?.name}
          title={course?.courseName}
          description={course?.courseDescription}
          price={course?.price}
          tags={tags}
          sections={sections.length}
          lessons={lessons}
        />
        <Tips title="Before you publish" tips={[
          'Watch your first lesson once more — first impressions matter.',
          'Check that every lesson title says what learners will do.',
          'Share the course link with a friend for quick feedback.',
        ]} />
      </aside>
    </form>
  );
}
