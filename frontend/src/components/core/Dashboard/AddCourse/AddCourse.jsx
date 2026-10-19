import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { studioRequest } from '../../../../services/studio';
import RenderSteps from './RenderSteps';
import { StudioHeader } from './StudioParts';
import { resetCourseState } from '../../../../slices/courseSlice';

export default function AddCourse() {
  const { token } = useSelector(state => state.auth);
  const [approved, setApproved] = useState(false);
  const [error, setError] = useState('');
  const [attempt, retry] = useState(0);
  const { course } = useSelector(state => state.course);

  const dispatch = useDispatch();
  const [ready, setReady] = useState(false);
  useEffect(() => { dispatch(resetCourseState()); }, [dispatch]);
  useEffect(() => { const controller = new AbortController(); setReady(false); setError(''); studioRequest('studio/application', token, 'GET', undefined, controller.signal).then(data => setApproved(data.application?.status === 'Approved')).catch(error => { if (!controller.signal.aborted) setError(error.message); }).finally(() => { if (!controller.signal.aborted) setReady(true); }); return () => controller.abort(); }, [token, attempt]);

  if (!ready) return <p className="professional-page" role="status">Checking your educator profile…</p>;
  if (error) return <div className="professional-page"><p role="alert">{error}</p><button className="btn btn-glass" onClick={() => retry(value => value + 1)}>Try again</button></div>;
  if (!approved) return <div className="professional-page"><header><p className="eyebrow">BEFORE YOUR FIRST COURSE</p><h1>Start with your<br /><em>educator profile.</em></h1><p>Share your career, experience, and credentials. Course creation unlocks after an admin approves your application.</p></header><Link to="/dashboard/educator-profile" className="btn btn-primary">Complete educator profile →</Link></div>;
  return (
    <div className="course-studio">
      <StudioHeader
        title="Create a course"
        subtitle="Three steps: describe it, build the curriculum, then publish when you're ready."
        courseName={course?.courseName}
        status={course?.status}
      />
      <RenderSteps />
    </div>
  );
}
