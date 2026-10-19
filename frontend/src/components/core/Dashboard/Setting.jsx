import { useDispatch, useSelector } from "react-redux";
import { useRef, useState } from "react";
import { updateAbout, UpdateDispayPicture } from "../../../services/authApi";
import toast from "react-hot-toast";
import countrycode from "../../../data/countrycode.json";
import DeleteAccount from "./settings/DeleteAccount";
import ChangePassword from "./settings/ChangePassword";
import { FiCamera, FiUpload, FiX, FiCheck, FiChevronDown } from "react-icons/fi";

const Setting = () => {
  const { user } = useSelector((state) => state.profile);
  const [image, setImage] = useState(user?.image);
  const [file, setFile] = useState(null);
  const inputRef = useRef(null);

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
      throw error;
    }
  };

  const onChangeHandler = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
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
    <div className="w-full flex flex-col gap-6 lg:gap-8">
      <div>
        <p className="eyebrow">Account</p>
        <h1 className="h-display text-4xl sm:text-5xl mt-3">Settings</h1>
        <p className="mt-3 text-foreground/55">Update your photo, personal details and password.</p>
      </div>

      {/* Avatar upload */}
      <SettingsSection
        eyebrow="01 · Photo"
        title="Profile picture"
        helper="Click the avatar to pick a new image. PNG, JPG or GIF."
      >
        <form onSubmit={submitHandler} className="flex flex-col sm:flex-row sm:items-center gap-6">
          <div className="relative shrink-0 self-start">

            <button
              type="button"
              onClick={() => inputRef.current.click()}
              className="group relative block p-[3px] bg-brand rounded-full"
              aria-label="Choose a new picture"
            >
              <img
                src={image}
                alt={`profile-${user?.firstName}`}
                className="aspect-square w-28 sm:w-32 rounded-full object-cover bg-surface-2 border-4 border-night"
              />
              <span className="absolute inset-[3px] grid place-items-center rounded-full bg-night/50 opacity-0 group-hover:opacity-100 transition">
                <FiCamera className="text-2xl" />
              </span>
              <span className="absolute bottom-1 right-1 icon-circle w-9 h-9 border-2 border-night">
                <FiCamera />
              </span>
            </button>
            {file && <span className="absolute -top-2 -left-2 pill pill-citrus">Preview</span>}
            <input id="image" type="file" ref={inputRef} className="hidden" onChange={onChangeHandler} />
          </div>

          <div className="flex-1 min-w-0">
            <p className="text-lg font-medium tracking-tight">Change your profile picture</p>
            <p className="mt-1 text-sm text-foreground/55 truncate">
              {file ? `Selected: ${file.name}` : "No new file selected yet."}
            </p>
            <div className="mt-5 flex flex-wrap gap-2.5">
              <button type="button" onClick={() => inputRef.current.click()} className="btn btn-glass btn-sm">
                <FiUpload /> Select
              </button>
              <button type="submit" className="btn btn-primary btn-sm">
                <FiCheck /> Upload
              </button>
              <button type="button" onClick={removeButtonHandler} className="btn btn-ghost btn-sm">
                <FiX /> Remove
              </button>
            </div>
          </div>
        </form>
      </SettingsSection>

      {/* Personal information */}
      <SettingsSection
        eyebrow="02 · Profile"
        title="Personal information"
        helper="This is shown on your profile and used for your certificates."
      >
        <form onSubmit={aboutHandler} className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="md:col-span-2">
            <label className="field-label" htmlFor="about">
              About
            </label>
            <input
              onChange={aboutChangeHandler}
              type="text"
              id="about"
              name="about"
              placeholder="Tell us about Yourself"
              className="field"
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="profession">
              Profession
            </label>
            <div className="relative">
              <select
                onChange={aboutChangeHandler}
                defaultValue="Web developer"
                id="profession"
                name="profession"
                className="field"
                required
              >
                <option value="Web Developer">Web Developer</option>
                <option value="System Engineer">System Engineer</option>
                <option value="Test Engineer">Test Engineer</option>
                <option value="Ios Developer">Ios Developer</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
            </div>
          </div>

          <div>
            <label htmlFor="dateOfBirth" className="field-label">
              Date of Birth
            </label>
            <input
              onChange={aboutChangeHandler}
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              className="field [color-scheme:dark]"
              required
            />
          </div>

          <div>
            <label className="field-label" htmlFor="gender">
              Gender
            </label>
            <div className="relative">
              <select
                onChange={aboutChangeHandler}
                defaultValue="male"
                id="gender"
                name="gender"
                className="field"
                required
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              <FiChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-foreground/40 pointer-events-none" />
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="contactNumber">
              Contact Number
            </label>
            <div className="flex gap-2">
              <select id="code" name="code" className="field !w-[96px] !px-3 shrink-0 text-center">
                {countrycode.map((code, index) => {
                  return <option key={index}>{code.code}</option>;
                })}
              </select>
              <input
                onChange={aboutChangeHandler}
                type="text"
                placeholder="0123 456 789"
                className="field min-w-0"
                name="contactNumber"
                id="contactNumber"
              />
            </div>
          </div>

          <div className="md:col-span-2 flex justify-end pt-1">
            <button className="btn btn-primary w-full sm:w-auto" type="submit">
              Save details
            </button>
          </div>
        </form>
      </SettingsSection>

      <ChangePassword />

      <DeleteAccount />
    </div>
  );
};

// Two-column glass section: title column on the left, form on the right
const SettingsSection = ({ eyebrow, title, helper, children }) => (
  <section className="glass p-6 sm:p-8 grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-6 xl:gap-10">
    <div>
      <p className="eyebrow text-[10px]">{eyebrow}</p>
      <h2 className="mt-2 text-xl sm:text-2xl font-medium tracking-tight">{title}</h2>
      {helper && <p className="mt-2 text-sm text-foreground/55 leading-relaxed">{helper}</p>}
    </div>
    <div className="min-w-0">{children}</div>
  </section>
);

export default Setting;
