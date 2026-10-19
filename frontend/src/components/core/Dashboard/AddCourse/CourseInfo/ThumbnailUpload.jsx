import React, { useEffect, useRef, useState } from "react";
import { FiUploadCloud } from "react-icons/fi";
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
    <div className="w-full">
      {!mediaPreview && (
        <div
          className="group relative flex min-h-[240px] w-full flex-col items-center justify-center gap-4 overflow-hidden rounded-4xl border border-dashed border-white/20 bg-white/[0.03] p-6 text-center transition hover:border-orchid/50 hover:bg-white/[0.05]"
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <div className="pointer-events-none absolute left-1/2 top-1/3 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full bg-magenta/20 blur-3xl transition group-hover:bg-magenta/30" />
          <div className="icon-circle-glass relative h-14 w-14">
            <FiUploadCloud className="text-xl" />
          </div>

          <div className="relative text-sm text-white/70">
            Drag and drop a file, or{" "}
            <input
              ref={fileInputRef}
              onChange={handleFileInputChange}
              type="file"
              name={name}
              hidden
            />
            <button type="button" className="font-semibold text-white underline decoration-orchid decoration-2 underline-offset-4 hover:text-peach" onClick={handlerButtonClick}>
              Browse
            </button>
          </div>
          <p className="relative text-xs text-white/40">Max 6MB each (12MB for videos)</p>
          <div className="relative flex flex-wrap justify-center gap-2">
            <span className="pill">Aspect ratio 16:9</span>
            <span className="pill">Recommended 1024x576</span>
          </div>
        </div>
      )}
      {mediaPreview && (
        <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-night">
          <div className="aspect-video w-full">
            {mediaPreview}
          </div>
          <button
            onClick={removeHandler}
            className="btn-icon absolute right-3 top-3 h-9 w-9 bg-night/60"
            aria-label="Remove file"
          >
            <RxCross2 />
          </button>
        </div>
      )}
    </div>
    {errors[name] && <p className="field-error">Thumbnail is required</p>}
    </>
  );
};

export default ThumbnailUpload;
