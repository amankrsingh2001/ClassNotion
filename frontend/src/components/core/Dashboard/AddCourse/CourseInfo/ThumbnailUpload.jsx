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
  viewData,
  editData 
}) => {
  const [file, setFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const fileInputRef = useRef(null);

  {/* Edit data is the previous video data in edit mode */}

  const handleDragOver = (e) => {
    e.preventDefault();
  };


  const handleDrop = (e) => {
    e.preventDefault();
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles && droppedFiles.length > 0) {
      handleFile(droppedFiles[0])  // Resuing the logic in one function to make the code more redable
    }
  };



  const handleFileInputChange = (e) => {
    const selectedFile = e.target.files[0];
    handleFile(selectedFile); // Resuing the logic in one function to make the code more redable
  };



  const handleFile = (file) =>{
    setFile(file);
    setValue(name, file) // set the file in react-hook-form
    const fileURL = URL.createObjectURL(file); 

    //check if the file is image or video

    const fileType = file.type.split('/')[0]
    if(fileType === "image"){
      setMediaPreview(<img className="w-full h-full object-contain" src={fileURL} alt="Preview" />);
    }
    else if(fileType === "video"){
      setMediaPreview(
        <video className="w-full h-full object-contain" controls>
        <source src={fileURL} type={file.type}/>
      </video>
      )
    }
    else{
      setMediaPreview(null) // Clear preview for unsupported types
    }
  }


  //Load the previous data in edit mode
useEffect(() => {
    if (editData && !file) {
      const isVideo = editData.endsWith('.mp4') || editData.endsWith('.mov') || editData.endsWith('.webm') || editData.endsWith('.ogg');
      if (isVideo) {
        setMediaPreview(
          <video className="w-full h-full object-contain" controls>
            <source src={editData} type="video/mp4" />
          </video>
        );
      } else {
        setMediaPreview(
          <img src={editData} alt="media" className="w-full h-full object-contain" />
        );
      }
      setValue(name, editData);  // Set the edit data in the form
    }
  }, [editData, file, name, setValue]);



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
    setMediaPreview(null)
  }

  return (
    <>
  
    <div className="bg-[rgb(44,51,63)] min-h-[200px]  rounded-md text-white gap-2 flex flex-col items-center justify-center">
      {!mediaPreview && (
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
      {mediaPreview && (
        <div className="flex items-start gap-1">
          {mediaPreview}
          <button onClick={removeHandler}><RxCross2 className="text-[#EF476F]" /></button>
        </div>
      )}
  
    </div>
    {errors[name] && <span className="text-[#EF476F]" >Thumnail is required</span>}
    </>
  );
};

export default ThumbnailUpload;
