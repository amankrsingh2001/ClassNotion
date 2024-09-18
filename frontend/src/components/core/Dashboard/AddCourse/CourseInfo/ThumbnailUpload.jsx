import React, { useEffect, useRef, useState } from "react";
import { SlCloudUpload } from "react-icons/sl";
import { RxCross2 } from "react-icons/rx";

const ThumbnailUpload = ({
  name,
  label,
  register,
  errors,
  setValue,
  getValues,
}) => {
  const [file, setFile] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const handleDragOver = (e) => {
    e.preventDefault();
  };
  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      setFile(droppedFiles[0]);
      setValue(name, droppedFiles[0]);
      const thumbnail = URL.createObjectURL(droppedFiles[0]);
      setImage(thumbnail);
    }
  };

  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile); // Set the selected file
    setValue(name, selectedFile); // Set the file in react-hook-form
    const thumbnail = URL.createObjectURL(selectedFile);
    setImage(thumbnail);
  };


  useEffect(() => {
    register(name, {
      required: true,
    });
  }, [register, name]);

  const handlerButtonClick = (e) => {
    e.preventDefault();
    fileInputRef.current.click();
  };

  const removeHandler = (e) =>{
    e.preventDefault()
    setFile(null)
    setImage(null)
  }

  return (
    <>
  
    <div className="bg-[rgb(44,51,63)] min-h-[200px]  rounded-md text-white gap-2 flex flex-col items-center justify-center">
      {!file && (
        <>
      
        <div
          className="w-full h-full flex justify-center flex-col items-center gap-2"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className=" bg-[#171717] p-4 rounded-full">
            <SlCloudUpload className="text-[#FFD60A] text-2xl" />
          </div>

          <div className="flex justify-center flex-row items-center w-[44%]">
            <p className="w-[60%] text-sm text-richblack-300">
              Drag and Drop an Image or
              <input
                ref={fileInputRef}
                onChange={handleFileInputChange}
                type="file"
                name={name}
                hidden
              />
            </p>

            <button className="text-[#FFD60A]" onClick={handlerButtonClick}>
              Browse
            </button>
          </div>
          <p className="text-sm text-richblack-300">Max 6MB each (12MB for videos) </p>
         
        </div>
          <ul className="flex w-full list-disc justify-evenly">
          <li className="text-richblack-300 text-sm">Aspect ratio 16:9 </li>
          <li className="text-richblack-300 text-sm">Recommended size 1024x576 </li>
        </ul>
        </>
      )}
      {file && (
        <div className="flex items-start gap-1">
          <img className="w-full h-full object-contain" src={image} />
          <button onClick={removeHandler}><RxCross2 className="text-[#EF476F]" /></button>
        </div>
      )}
  
    </div>
    {errors[name] && <span className="text-[#EF476F]" >Thumnail is required</span>}
    </>
  );
};

export default ThumbnailUpload;
