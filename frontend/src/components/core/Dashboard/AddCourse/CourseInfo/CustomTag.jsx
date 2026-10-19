import React, { useEffect, useState } from "react";
import { RxCross2 } from "react-icons/rx";

const CustomTag = ({ label, name, placeholder, register, errors, setValue, getValues }) => {
  const [tagValue, setTagValue] = useState('');
  const [tags, setTags] = useState([]);



  const addTags = (e) => {
    if (e.key === 'Enter' || e.key === ',') {
      e.preventDefault();
      if (tagValue.trim()) {
        setTags([...tags, tagValue.trim()]);
        setTagValue('');
        setValue(name, [...tags, tagValue.trim()]);
      }
    }
  };

  const removeHandler = (index) =>{
        const newValue = [...tags]
        newValue.splice(index,1)
        setTags(newValue)
  }
  

  useEffect(() => {
    register(name, {
      required: true,
      validate: (value) => value.length > 0
    });

    const existingTags = getValues(name);
    if (existingTags && existingTags.length > 0) {
      setTags(existingTags); // Set existing tags when editing
    }
  }, [register, name, getValues]);


  
  return (
    <div>
      <label htmlFor={name} className="field-label">
        {label} <span className="text-rose">*</span>
      </label>
      <div className="field flex h-auto min-h-12 flex-wrap items-center gap-2 py-2 focus-within:border-orchid/60 focus-within:bg-white/[0.06] focus-within:ring-4 focus-within:ring-orchid/15">
        {tags.map((tag, index) => (
          <span key={index} className="pill pr-1.5">
            {tag}
            <button
              onClick={(index)=>removeHandler(index)}
              className="grid h-4 w-4 place-items-center rounded-full text-white/60 transition hover:bg-white/20 hover:text-white"
              aria-label={`Remove ${tag}`}
            >
              <RxCross2 className="text-[10px]" />
            </button>
          </span>
        ))}
        <input
          id={name}
          className="h-8 min-w-[160px] flex-1 bg-transparent text-[15px] text-white outline-none placeholder:text-white/30"
          onChange={(e) => setTagValue(e.target.value)}
          value={tagValue}
          placeholder={placeholder}
          onKeyDown={addTags}
        />
      </div>
      {errors[name] && <p className="field-error">This field is required</p>}
    </div>
  );
};

export default CustomTag;
