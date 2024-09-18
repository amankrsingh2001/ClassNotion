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
  }, [register, name]);


  
  return (
    <div className="flex flex-col gap-2 px-2">
      <label htmlFor={name}>
        {label}<span className="text-[#EF476F]">*</span>
      </label>
      <input
        className="w-full p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]"
        onChange={(e) => setTagValue(e.target.value)}
        value={tagValue}
        placeholder={placeholder}
        onKeyDown={addTags}
      />
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-2">
          {tags.map((tag, index) => (
            <div key={index} className="flex items-start">
                <span  className="bg-[#3A4556] text-[#F1F2FF] px-2 py-1 rounded-md">
              {tag}
            </span>
            <button onClick={(index)=>removeHandler(index)}>
            <RxCross2 className="text-sm text-[#EF476F]"/>
            </button>
                </div>
            
          ))}
        </div>
      )}
      {errors[name] && <span className="text-[#EF476F]">This field is required</span>}
    </div>
  );
};

export default CustomTag;