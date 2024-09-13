import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { UpdateDispayPicture } from "../../../services/authApi";
import toast from "react-hot-toast";

const Setting = () => {
  const { user } = useSelector((state) => state.profile);
  const [image, setImage] = useState(user?.image);
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();

  console.log(user)


  const submitHandler = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("displayPicture", file);

    if (!file) {
      toast.error("Please select an image");
      return;
    }
    try {
      dispatch(UpdateDispayPicture(formData));
      setFile(null);
    } catch (error) {
      console.log("Failed again", error);
    }
  };

  const onChangeHandler = (e) => {
    const selectedFile = e.target.files[0]; // Ensure the file is correctly accessed
    if (selectedFile) {
      setFile(selectedFile); // Ensure the selected file is stored in state
      const imageUrl = URL.createObjectURL(selectedFile); // Preview the image
      setImage(imageUrl);
    }
  };

  const removeButtonHandler = () => {
    if (!file) {
        console.log('You clicked me again')
      toast.error("Please add an Image first");
      return;
    }
    
    setImage(user?.image);
    setFile(null);
  };

  return (
    <div className="text-white h-full flex flex-col  items-start  justify-center gap-8  w-[80%] p-4 ">
      <h1 className="text-4xl font-medium">Profile</h1>


            <form onSubmit={submitHandler} className="lg:w-[80%] rounded-md flex lg:flex-row flex-col items-center py-6 px-4 gap-6  bg-richblack-800">
                <div className="image relative">
                <img
                src={image}
                alt={`profile-${user.firstName}`}
                className="aspect-square w-[78px] object-cover rounded-full"
              />
               <input
                id="image"
                type="file"
                className="w-[40px] h-full top-8 left-4 absolute opacity-0"
                onChange={onChangeHandler}
              />
                </div>
                <div className="flex flex-col gap-3">
                    <div className="">
                        <p className="text-[#F1F2FF] font-semibold text-xl">Change Your Profile</p>
                    </div>
                    <div className="flex flex-col lg:flex-row gap-3">
                        <button type="submit" className="bg-yellow-50 px-4 py-2  text-black rounded-md cursor-pointer w-full">Change</button>
                        <input onClick={removeButtonHandler} type="button" value='Remove'  className="bg-richblack-400 px-4 py-2 text-white rounded-md cursor-pointer w-full"/>
                    </div>
                </div>
            </form>






      <div className="lg:w-[80%] rounded-md flex flex-col items-center py-6 px-4 gap-6  bg-richblack-800">
        <p className="text-xl font-medium text-start w-full">Personal Information</p>

        <form onSubmit={''} className="flex flex-col w-full gap-8">

            {/* section 1 */}

            <div className="flex justify-between w-full border-caribbeangreen-50 gap-4  p-4 border-2">
                <div className="flex flex-col w-[40%] gap-1">
                    <label  className="text-[#F1F2FF]" htmlFor="displayName">Display Name</label>
                    <input type="text" id="displayName" name="displayName" placeholder="Enter Your Display Name"  className="p-3 bg-richblack-600 outline-none rounded-lg text-[#999DAA]"/>
                    {/* <p className="text-xs">Name entered above will be used for all issued certifies.</p> */}
                </div>

                <div className="flex flex-col w-[40%] gap-1">
                    <label  className="text-[#F1F2FF]">Profession</label>
                   <select>
                    <option></option>
                   </select>
                </div>
            </div>

            {/* section2 */}

            <div className="flex justify-between w-full border-caribbeangreen-50 gap-4 p-4 border-2">
            <div className="flex flex-col w-[40%] gap-1">
                    <label className="text-[#F1F2FF]">Date of Birth</label>
                    <input type="text"  className="p-3 bg-richblack-600 w-[45] outline-none rounded-lg text-[#999DAA]"/>
                </div>

                <div className="flex flex-col w-[40%] gap-1">
                    <label className="text-[#F1F2FF]">Gender</label>
                    <input type="text"  className="p-3 bg-richblack-600 outline-none rounded-lg text-[#999DAA]"/>
                </div>
            </div>

            {/* section 3   */}
            <div className="flex justify-between w-full border-caribbeangreen-50 gap-4 p-4 border-2">
            <div className="flex flex-col w-[40%] gap-1">
                    <label className="text-[#F1F2FF]" >Current Password</label>
                    <input type="text"  className="p-3 bg-richblack-600 outline-none rounded-lg text-[#999DAA]"/>
                </div>

                <div className="flex flex-col w-[40%] gap-1">
                    <label className="text-[#F1F2FF]" >Change Password</label>
                    <input type="text"  className="p-3 bg-richblack-600 outline-none rounded-lg text-[#999DAA]"/>
                </div>
            </div>


        </form>
      </div>
    </div>
  );
};
export default Setting;
