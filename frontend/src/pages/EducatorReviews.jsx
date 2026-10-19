import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { studioRequest } from '../services/studio';
import toast from 'react-hot-toast';
import '../components/studio/educator.css';
export default function EducatorReviews() {
  const { token } = useSelector(state => state.auth);
  const { user } = useSelector(state => state.profile);
  const [applications, setApplications] = useState([]);
  const [notes, setNotes] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState('');
  const [attempt, retry] = useState(0);
  useEffect(() => { const controller = new AbortController(); setLoading(true); studioRequest('studio/applications', token, 'GET', undefined, controller.signal).then(data => { setApplications(data.applications); setError(''); }).catch(error => { if (!controller.signal.aborted) setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); }); return () => controller.abort(); }, [token, attempt]);
  const review = async (id, decision) => { setBusy(id); try { await studioRequest(`studio/applications/${id}/review`, token, 'POST', { decision, reviewNote: notes[id] || '' }); setApplications(items => items.filter(item => item._id !== id)); toast.success(`Application ${decision.toLowerCase()}`); } catch (error) { toast.error(error.message); } finally { setBusy(''); } };
  if (user.accountType !== 'Admin') return <p className="professional-page">An admin account is required.</p>;
  return <div className="professional-page"><header><p className="eyebrow">ADMIN REVIEW</p><h1>The next generation<br />of <em>educators.</em></h1><p>Review each applicant’s professional experience and credential links before granting teaching access.</p></header>{loading ? <p role="status">Loading applications…</p> : error ? <div role="alert">{error}<button className="btn btn-glass" onClick={() => retry(value => value + 1)}>Try again</button></div> : !applications.length ? <div className="professional-status">No applications are waiting for review.</div> : applications.map(application => <article className="professional-review" key={application._id}><h2>{application.user.firstName} {application.user.lastName}</h2><p>{application.user.email}</p><h3>{application.headline}</h3><p>{application.yearsExperience} years of experience</p><p className="whitespace-pre-line">{application.about}</p>{application.youtubeUrl && <a href={application.youtubeUrl} target="_blank" rel="noreferrer">View YouTube page ↗</a>}<h3>Career history</h3><ul>{application.careerHistory.map((item, index) => <li key={index}><b>{item.role}</b> · {item.organization} · {item.startYear}–{item.endYear || 'Present'}</li>)}</ul><h3>Credentials</h3><ul>{application.certificates.map((item, index) => <li key={index}><a href={item.credentialUrl} target="_blank" rel="noreferrer">{item.title} · {item.issuer} ↗</a></li>)}</ul><label>Review note<textarea className="field" minLength={5} maxLength={2000} placeholder="Explain the decision (at least 5 characters)." value={notes[application._id] || ''} onChange={event => setNotes(previous => ({ ...previous, [application._id]: event.target.value }))} /></label><div className="professional-review-actions"><button className="btn btn-glass" disabled={!!busy || (notes[application._id]?.trim().length || 0) < 5} onClick={() => review(application._id, 'Rejected')}>Request changes</button><button className="btn btn-primary" disabled={!!busy || (notes[application._id]?.trim().length || 0) < 5} onClick={() => review(application._id, 'Approved')}>{busy === application._id ? 'Saving…' : 'Approve educator'}</button></div></article>)}</div>;
}
