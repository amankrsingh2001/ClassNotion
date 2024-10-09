import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { updateAbout, UpdateDispayPicture } from "../../../services/authApi";
import toast from "react-hot-toast";
import countrycode from "../../../data/countrycode.json";
import DeleteAccount from "./settings/DeleteAccount";
import ChangePassword from "./settings/ChangePassword";

const Setting = () => {
  const { user } = useSelector((state) => state.profile);
  const [image, setImage] = useState(user?.image);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null)

  const [aboutData, setAboutData] = useState({
    dateOfBirth: "",
    about: "",
    contactNumber: "",
    gender: "",
    profession: "",
  });

  const dispatch = useDispatch();

  const aboutChangeHandler = (e) => {
    setAboutData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const aboutHandler = (e) => {
    e.preventDefault();
    dispatch(updateAbout(aboutData));
  };

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
      toast.error("Please add an Image first");
      return;
    }
    setImage(user?.image);
    setFile(null);
  };

  return (
    <div className="text-white h-full flex flex-col items-start justify-center gap-8 w-[80%] px-8 py-4 ">
      <h1 className="text-4xl font-medium">Profile</h1>

      <form
        onSubmit={submitHandler}
        className="lg:w-[80%] rounded-md flex lg:flex-row flex-col items-center py-6 px-4 gap-6  bg-richblack-800"
      >
        <div className="image relative">
          <img
          onClick={() => inputRef.current.click()}
            src={image}
            alt={`profile-${user.firstName}`}
            className="aspect-square w-[78px] border-2 border-richblack-700 cursor-pointer object-cover rounded-full "
          />
         
          <input
            id="image"
            type="file"
            ref = {inputRef}
            className="w-[40px] h-full opacity-0"
            onChange={onChangeHandler}
          />
        </div>
        <div className="flex flex-col gap-3">
          <div className="">
            <p className="text-[#F1F2FF] font-semibold text-xl">
              Change Your Profile
            </p>
          </div>
          <div className="flex flex-col lg:flex-row gap-3">
            <button
              type="submit"
              className="bg-yellow-50 px-4 py-2  text-black rounded-md cursor-pointer w-full"
            >
              Change
            </button>
            <input
              onClick={removeButtonHandler}
              type="button"
              value="Remove"
              className="bg-richblack-400 px-4 py-2 text-white rounded-md cursor-pointer w-full"
            />
          </div>
        </div>
      </form>

      <div className="lg:w-[80%] rounded-md flex flex-col items-center py-6 px-4 gap-6  bg-richblack-800">
        <p className="text-xl font-medium text-start w-full">
          Personal Information
        </p>

        <form onSubmit={aboutHandler} className="flex flex-col w-full gap-8">
          {/* section 1 */}

          <div className="flex justify-between w-full  gap-4  p-4 ">
            <div className="flex flex-col w-[40%] gap-1">
              <label className="text-[#F1F2FF]" htmlFor="about">
                About
              </label>
              <input
                onChange={aboutChangeHandler}
                type="text"
                id="about"
                name="about"
                placeholder="Tell us about Yourself"
                className="p-3 bg-richblack-600 outline-none rounded-lg text-[#c4c8d5]"
                required
              />
              {/* <p className="text-xs">Name entered above will be used for all issued certifies.</p> */}
            </div>

            <div className="flex flex-col w-[40%] gap-1">
              <p className="text-[#F1F2FF]">Profession</p>
              <select
                onChange={aboutChangeHandler}
                defaultValue="Web developer"
                id="profession"
                name="profession"
                className="p-3 bg-richblack-600 outline-none rounded-lg text-[#c4c8d5]"
                required
              >
                <option value="Web Developer">Web Developer</option>
                <option value="System Engineer">System Engineer</option>
                <option value="Test Engineer">Test Engineer</option>
                <option value="Ios Developer">Ios Developer</option>
              </select>
            </div>
          </div>

          <div className="flex justify-between w-full gap-3 p-4">
            <div className="flex flex-col w-[40%] gap-1">
              <label htmlFor="dateOfBirth" className="text-[#F1F2FF]">
                Date of Birth
              </label>
              <input
                onChange={aboutChangeHandler}
                type="date"
                name="dateOfBirth"
                id="dateOfBirth"
                className="p-3 bg-richblack-600 w-[45] outline-none rounded-lg text-[#c4c8d5]"
                required
              />
            </div>

            <div className="flex flex-col w-[40%] gap-1">
              <p className="text-[#F1F2FF]">Gender</p>

              <select
                onChange={aboutChangeHandler}
                defaultValue="male"
                id="gender"
                name="gender"
                className="p-3 bg-richblack-600 outline-none rounded-lg text-[#c4c8d5]"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          {/* section 3   */}

          <div className="flex flex-col gap-1">
            <p className="p-4">Contact Number</p>

            <div className="flex justify-between gap-3 p-4">
              <select
                id="code"
                name="code"
                className="bg-richblack-600 text-[#999DAA] rounded-lg text-md text-center py-3 md:h-full outline-none"
              >
                {countrycode.map((code, index) => {
                  return (
                    <option className="bg-richblack-600" key={index}>
                      {code.code}
                    </option>
                  );
                })}
              </select>
              <input
                onChange={aboutChangeHandler}
                type="text"
                placeholder="0123 456 789"
                className="p-3 bg-richblack-600 w-[70%] outline-none rounded-lg text-[#999DAA]"
                name="contactNumber"
                id="contactNumber"
              />
            </div>
          </div>

          <button
            className="bg-yellow-200 font-semibold rounded-md text-black py-4"
            type="submit"
          >
            Change About us
          </button>
        </form>
      </div>

                <ChangePassword/>

    <DeleteAccount/>
    </div>
  );
};
export default Setting;
