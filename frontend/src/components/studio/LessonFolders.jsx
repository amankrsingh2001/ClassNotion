import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { FiFolder, FiPlus, FiTrash2, FiPlay } from 'react-icons/fi';
import toast from 'react-hot-toast';
import { studioRequest } from '../../services/studio';
import './educator.css';
export default function LessonFolders({ courseId, editable = false, refreshKey = '' }) {
  const { token } = useSelector(state => state.auth);
  const [data, setData] = useState(null);
  const [error, setError] = useState('');
  const [attempt, retry] = useState(0);
  const [busy, setBusy] = useState(false);
  const [name, setName] = useState('');
  const [parentId, setParent] = useState('');
  const [pendingDelete, setPendingDelete] = useState(null);
  useEffect(() => { const controller = new AbortController(); setError(''); setData(null); studioRequest(`course/${courseId}/folders`, token, 'GET', undefined, controller.signal).then(setData).catch(error => { if (!controller.signal.aborted) setError(error.message); }); return () => controller.abort(); }, [courseId, token, attempt, refreshKey]);
  const mutate = async (method, suffix, body) => { setBusy(true); try { await studioRequest(`course/${courseId}/folders${suffix}`, token, method, body); retry(value => value + 1); return true; } catch (error) { toast.error(error.message); return false; } finally { setBusy(false); } };
  const addFolder = async event => { event.preventDefault(); if (await mutate('POST', '', { name, parentId: parentId || null })) setName(''); };
  if (error) return <section className="lesson-folders"><p role="alert">{error}</p><button className="btn btn-glass" onClick={() => retry(value => value + 1)}>Try again</button></section>;
  if (!data) return <p role="status" className="studio-input-hint">Loading lesson folders…</p>;
  const canEdit = editable && data.canEdit;
  const folderOptions = data.folders.map(folder => <option key={folder._id} value={folder._id}>{folder.path}</option>);
  const lessonRow = lesson => <div className="lesson-folder-lesson" key={lesson._id}><FiPlay />{canEdit ? <><span>{lesson.title}</span><select aria-label={`Folder for ${lesson.title}`} value={lesson.folderId || ''} disabled={busy} onChange={event => mutate('PUT', `/lessons/${lesson._id}`, { folderId: event.target.value || null })}><option value="">Course root</option>{folderOptions}</select></> : <Link to={`/view-course/${courseId}/section/${lesson.sectionId}/sub-section/${lesson._id}`}>{lesson.title}</Link>}</div>;
  const renderFolders = parent => data.folders.filter(folder => folder.parentId === parent).map(folder => <details className="lesson-folder" key={folder._id} open><summary><FiFolder /><span>{folder.name}</span>{canEdit && <button type="button" disabled={busy} aria-label={`Delete folder ${folder.path}`} onClick={event => { event.preventDefault(); setPendingDelete(folder); }}><FiTrash2 /></button>}</summary><div>{renderFolders(folder._id)}{data.lessons.filter(lesson => lesson.folderId === folder._id).map(lessonRow)}{!data.folders.some(item => item.parentId === folder._id) && !data.lessons.some(item => item.folderId === folder._id) && <p className="studio-input-hint">No lessons in this folder yet.</p>}</div></details>);
  return <section className="lesson-folders"><div className="lesson-folder-heading"><FiFolder /><div><h3>Lesson folders</h3><p>{data.projectType || 'Course'} · {canEdit ? 'Group lessons into folders and subfolders.' : 'Explore the curriculum by topic.'}</p></div></div>{canEdit && <form className="lesson-folder-create" onSubmit={addFolder}><label>Parent folder<select className="field" value={parentId} onChange={event => setParent(event.target.value)}><option value="">Course root</option>{folderOptions}</select></label><label>Folder name<input className="field" required maxLength={120} placeholder="e.g. Components" value={name} onChange={event => setName(event.target.value)} /></label><button className="btn btn-glass" disabled={busy || !name.trim()}><FiPlus /> Add folder</button></form>}{pendingDelete && <div className="folder-delete-confirm" role="alert"><p>Remove “{pendingDelete.path}” and its subfolders? Their lessons stay in the course root.</p><button type="button" className="btn btn-glass" disabled={busy} onClick={() => setPendingDelete(null)}>Cancel</button><button type="button" className="btn btn-primary" disabled={busy} onClick={async () => { if (await mutate('DELETE', `/${pendingDelete._id}`)) { setPendingDelete(null); setParent(''); } }}>Remove folders</button></div>}<div className="lesson-folder-tree">{renderFolders(null)}{data.lessons.filter(lesson => !lesson.folderId).map(lessonRow)}{!data.folders.length && !data.lessons.length && <p className="studio-input-hint">{canEdit ? 'Add folders now, then assign lessons after uploading them below.' : 'No folders or lessons have been added yet.'}</p>}</div></section>;
}
