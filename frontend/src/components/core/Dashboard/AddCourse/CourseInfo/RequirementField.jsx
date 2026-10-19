import { useEffect, useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
export default function RequirementField({ name, label, register, errors, setValue, getValues }) {
  const [value, setInput] = useState('');
  const [items, setItems] = useState(() => getValues(name) || []);
  useEffect(() => { register(name, { validate: values => values?.length > 0 }); }, [register, name]);
  const update = next => { setItems(next); setValue(name, next, { shouldDirty: true, shouldValidate: true }); };
  const add = () => { const item = value.trim(); if (item && !items.includes(item)) update([...items, item]); setInput(''); };
  return <div><label className="field-label" htmlFor={name}><span>{label}<span className="cs-req">*</span></span></label><div className="studio-list-input"><input className="field" id={name} value={value} onChange={event => setInput(event.target.value)} placeholder="e.g. No prior experience needed" onKeyDown={event => { if (event.key === 'Enter') { event.preventDefault(); add(); } }} /><button type="button" className="btn btn-glass" disabled={!value.trim()} onClick={add}><FiPlus /> Add</button></div><p className="cs-hint">What should learners know or have before starting? Press Enter to add.</p><ol className="studio-requirements">{items.map((item, index) => <li key={item}><span>{String(index + 1).padStart(2, '0')}</span><p>{item}</p><button type="button" aria-label={`Remove ${item}`} onClick={() => update(items.filter(value => value !== item))}><FiX /></button></li>)}</ol>{errors[name] && <p className="field-error">Add at least one requirement.</p>}</div>;
}
