import { useEffect, useState } from 'react';
import { useFieldArray, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiArrowRight, FiPlus, FiTrash2, FiAward, FiCheckCircle } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { studioRequest } from '../services/studio';
import { setUser } from '../slices/profileSlice';
import '../components/studio/educator.css';
const emptyCareer = { role: '', organization: '', startYear: '', endYear: '' };
const emptyCertificate = { title: '', issuer: '', credentialUrl: '' };
export default function EducatorApplication() {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const [application, setApplication] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [saving, setSaving] = useState(false);
  const [attempt, retry] = useState(0);
  const { register, control, reset, handleSubmit, formState: { errors } } = useForm({ defaultValues: { headline: '', about: '', yearsExperience: 0, youtubeUrl: '', careerHistory: [emptyCareer], certificates: [emptyCertificate] } });
  const career = useFieldArray({ control, name: 'careerHistory' });
  const certificates = useFieldArray({ control, name: 'certificates' });
  useEffect(() => {
    const controller = new AbortController(); setLoading(true); setError('');
    studioRequest('studio/application', token, 'GET', undefined, controller.signal).then(({ application }) => {
      setApplication(application);
      if (application) reset({ ...application, careerHistory: application.careerHistory.length ? application.careerHistory.map(item => ({ ...item, endYear: item.endYear ?? '' })) : [emptyCareer], certificates: application.certificates.length ? application.certificates : [emptyCertificate] });
      return studioRequest('profile/getUserDetails', token, 'GET', undefined, controller.signal);
    }).then(data => { if (data.userDetail) { dispatch(setUser(data.userDetail)); localStorage.setItem('user', JSON.stringify(data.userDetail)); } }).catch(error => { if (!controller.signal.aborted) setError(error.message); }).finally(() => { if (!controller.signal.aborted) setLoading(false); });
    return () => controller.abort();
  }, [token, reset, dispatch, attempt]);
  const locked = ['Pending', 'Approved'].includes(application?.status);
  const submit = async values => {
    setSaving(true);
    try {
      const data = await studioRequest('studio/application', token, 'POST', { ...values, yearsExperience: Number(values.yearsExperience), careerHistory: values.careerHistory.map(item => ({ ...item, startYear: Number(item.startYear), endYear: item.endYear === '' ? null : Number(item.endYear) })) });
      setApplication(data.application); toast.success('Application sent for admin review');
    } catch (error) { toast.error(error.message); } finally { setSaving(false); }
  };
  if (loading) return <div className="professional-page"><p role="status">Loading your educator profile…</p></div>;
  if (error) return <div className="professional-page"><p role="alert">{error}</p><button className="btn btn-primary mt-4" onClick={() => retry(value => value + 1)}>Try again</button></div>;
  return <div className="professional-page"><header><p className="eyebrow">TEACH WITH CLASSNOTION</p><h1>Your experience.<br /><em>Someone’s next step.</em></h1><p>Tell us about your career and the knowledge you want to share. An admin reviews your profile before course creation is unlocked.</p></header>
    <div className={`professional-status status-${application?.status || 'Draft'}`}><FiAward /><div><b>{({ Draft: 'Build your educator profile', Pending: 'Your application is in review', Approved: 'You’re an approved educator', Rejected: 'Your application needs an update' })[application?.status || 'Draft']}</b><p>{application?.reviewNote || (application?.status === 'Pending' ? 'You’ll see the review decision here. Your teaching access stays locked until approval.' : 'Professional details and credentials help learners understand who they’re learning from.')}</p></div>{application?.status === 'Pending' && <button type='button' className='btn btn-glass' onClick={() => retry(value => value + 1)}>Check review status</button>}{application?.status === 'Approved' && <Link to="/dashboard/add-course" className="btn btn-primary">Create course <FiArrowRight /></Link>}</div>
    <form className="professional-form" onSubmit={handleSubmit(submit)}><fieldset disabled={locked || saving}>
      <section><h2><span>01</span> Your professional story</h2><label>Professional headline<input className="field" placeholder="e.g. Frontend engineer & React educator" {...register('headline', { required: true, minLength: 5, maxLength: 120 })} /></label><label>About your career<textarea className="field" rows={5} placeholder="Tell us about your work, expertise, and what you’d like to teach (at least 80 characters)." {...register('about', { required: true, minLength: 80, maxLength: 6000 })} /></label><div className="professional-grid"><label>Years of professional experience<input className="field" type="number" min="0" max="80" step="1" {...register('yearsExperience', { required: true, min: 0, max: 80 })} /></label><label>YouTube channel or page <small>Optional</small><input className="field" type="url" placeholder="https://www.youtube.com/@your-channel" {...register('youtubeUrl')} /></label></div></section>
      <section><h2><span>02</span> Career history</h2><p>Add your relevant roles, including freelance or independent work.</p>{career.fields.map((item, index) => <div className="professional-entry" key={item.id}><div className="professional-entry-top"><b>Experience {index + 1}</b>{career.fields.length > 1 && <button type="button" aria-label={`Remove experience ${index + 1}`} onClick={() => career.remove(index)}><FiTrash2 /></button>}</div><div className="professional-grid"><label>Role<input className="field" {...register(`careerHistory.${index}.role`, { required: true, minLength: 2 })} placeholder="Frontend engineer" /></label><label>Organization<input className="field" {...register(`careerHistory.${index}.organization`, { required: true, minLength: 2 })} placeholder="Company or independent practice" /></label><label>Start year<input className="field" type="number" min="1900" max={new Date().getFullYear()} {...register(`careerHistory.${index}.startYear`, { required: true })} /></label><label>End year <small>Blank if current</small><input className="field" type="number" min="1900" max={new Date().getFullYear()} {...register(`careerHistory.${index}.endYear`)} /></label></div></div>)}{!locked && <button type="button" className="btn btn-glass" disabled={career.fields.length >= 20} onClick={() => career.append(emptyCareer)}><FiPlus /> Add experience</button>}</section>
      <section><h2><span>03</span> Certificates & credentials</h2><p>Add at least one credential with a verification link. These links become part of your public educator profile after approval.</p>{certificates.fields.map((item, index) => <div className="professional-entry" key={item.id}><div className="professional-entry-top"><b>Credential {index + 1}</b>{certificates.fields.length > 1 && <button type="button" aria-label={`Remove credential ${index + 1}`} onClick={() => certificates.remove(index)}><FiTrash2 /></button>}</div><div className="professional-grid"><label>Certificate title<input className="field" {...register(`certificates.${index}.title`, { required: true, minLength: 2 })} placeholder="Certificate or qualification" /></label><label>Issued by<input className="field" {...register(`certificates.${index}.issuer`, { required: true, minLength: 2 })} placeholder="Organization or institution" /></label></div><label>Verification URL<input className="field" type="url" placeholder="https://…" {...register(`certificates.${index}.credentialUrl`, { required: true })} /></label></div>)}{!locked && <button type="button" className="btn btn-glass" disabled={certificates.fields.length >= 20} onClick={() => certificates.append(emptyCertificate)}><FiPlus /> Add credential</button>}</section>
    </fieldset>{Object.keys(errors).length > 0 && <p className="field-error" role="alert">Complete all required fields. Your career introduction needs at least 80 characters.</p>}{!locked && <footer><span><FiCheckCircle /> Your profile will be reviewed before you can teach.</span><button disabled={saving} className="btn btn-primary">{saving ? 'Submitting…' : 'Submit for review'}<FiArrowRight /></button></footer>}</form>
  </div>;
}
