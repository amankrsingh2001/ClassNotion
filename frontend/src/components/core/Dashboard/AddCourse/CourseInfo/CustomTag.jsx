import { useEffect, useState } from 'react';
import { FiX, FiPlus } from 'react-icons/fi';
export default function CustomTag({ label, name, placeholder, register, errors, setValue, getValues }) {
  const [value, setInput] = useState('');
  const [tags, setTags] = useState(() => getValues(name) || []);
  useEffect(() => { register(name, { validate: values => values?.length > 0 }); }, [name, register]);
  const update = next => { setTags(next); setValue(name, next, { shouldDirty: true, shouldValidate: true }); };
  const add = () => { const tag = value.trim(); if (tag && !tags.includes(tag)) update([...tags, tag]); setInput(''); };
  return <div><label htmlFor={name} className="field-label"><span>{label}<span className="cs-req">*</span></span></label><div className="studio-token-input">{tags.map(tag => <span className="studio-token" key={tag}>{tag}<button type="button" aria-label={`Remove ${tag}`} onClick={() => update(tags.filter(item => item !== tag))}><FiX /></button></span>)}<input id={name} value={value} placeholder={placeholder} onChange={event => setInput(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' || event.key === ',') { event.preventDefault(); add(); } }} /><button type="button" aria-label="Add tag" disabled={!value.trim()} onClick={add}><FiPlus /></button></div><p className="cs-hint">Press Enter or comma to add. Add 3–6 tags.</p>{errors[name] && <p className="field-error">Add at least one tag.</p>}</div>;
}
