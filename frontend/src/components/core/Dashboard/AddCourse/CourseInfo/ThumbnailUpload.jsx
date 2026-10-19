import { useEffect, useRef, useState } from 'react';
import { FiUploadCloud, FiImage, FiVideo, FiX } from 'react-icons/fi';
export default function ThumbnailUpload({ name, register, errors, setValue, viewData, editData, video = false }) {
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(viewData || editData || null);
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState('');
  const input = useRef(null);
  const [removed, setRemoved] = useState(false);
  useEffect(() => { register(name, { required: true }); }, [register, name]);
  useEffect(() => {
    if (!file) { const saved = removed ? null : viewData || editData || null; setPreview(saved); setValue(name, saved); return; }
    const url = URL.createObjectURL(file); setPreview(url);
    return () => URL.revokeObjectURL(url);
  }, [file, viewData, editData, removed, name, setValue]);
  const select = selected => {
    if (!selected) return;
    if (!selected.type.startsWith(video ? 'video/' : 'image/')) { setError(`Choose ${video ? 'a video' : 'an image'} file.`); return; }
    setError(''); setRemoved(false); setFile(selected); setValue(name, selected, { shouldValidate: true, shouldDirty: true });
  };
  return <div className="studio-upload-wrap"><input ref={input} type="file" accept={video ? 'video/*' : 'image/*'} onChange={event => select(event.target.files?.[0])} className="sr-only" tabIndex={-1} aria-label={video ? 'Upload lesson video' : 'Upload course cover'} />{preview ? <div className="studio-media-preview"><div>{video ? <video key={preview} src={preview} controls /> : <img src={preview} alt="Course cover preview" />}</div>{!viewData && <footer><span>{file?.name || (video ? 'Current lesson video' : 'Current course cover')}</span><button type="button" onClick={() => input.current.click()}>Replace</button><button type="button" aria-label="Remove file" onClick={() => { setFile(null); setRemoved(true); setValue(name, null, { shouldValidate: true, shouldDirty: true }); input.current.value = ''; }}><FiX /></button></footer>}</div> : <div className={`studio-upload ${dragging ? 'is-dragging' : ''}`} onDragOver={event => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={event => { event.preventDefault(); setDragging(false); select(event.dataTransfer.files?.[0]); }}><span className="studio-upload-icon"><FiUploadCloud /></span><h3>Drop your {video ? 'lesson video' : 'course cover'} here</h3><p>or choose a file from your device</p><button type="button" className="btn btn-glass" onClick={() => input.current.click()}>{video ? <FiVideo /> : <FiImage />} Browse files</button><small>{video ? 'Upload a video with clear audio and readable visuals.' : 'Image files · 16:9 recommended · 1024 × 576 px'}</small></div>}{(error || errors[name]) && <p className="field-error">{error || `Add ${video ? 'a lesson video' : 'a course cover'} to continue.`}</p>}</div>;
}
