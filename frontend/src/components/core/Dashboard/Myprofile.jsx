import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import IconBtn from "../../Common/IconBtn";
import axios from "axios";
import { useEffect, useState } from "react";
import { profileApi } from "../../../services/api";
import { setUser } from "../../../slices/profileSlice";
import { FiEdit2, FiUser, FiMail, FiPhone, FiCalendar, FiSmile, FiType, FiFeather } from "react-icons/fi";

const Myprofile = () => {
  const { user } = useSelector((state) => state.profile);
  const [userData, setUserData] = useState({});
  const navigate = useNavigate();
  const { GET_USER_INFO } = profileApi;
  const dispatch = useDispatch();

  const getUserDetails = async () => {
    const token = localStorage.getItem("token");
    const response = await axios.get(GET_USER_INFO, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    localStorage.setItem("user", JSON.stringify(response.data.userDetail));
    dispatch(setUser(response.data.userDetail));
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const details = [
    { label: "First Name", value: user?.firstName || "First Name Value", icon: FiUser },
    { label: "Last Name", value: user?.lastName || "Last Name Value", icon: FiType },
    { label: "Gender", value: user?.additionalDetails?.gender || "Enter Your Gender", icon: FiSmile },
    { label: "Email", value: user?.email || "Add your Email", icon: FiMail },
    { label: "Phone Number", value: user?.additionalDetails?.contactNumber || "Add your contact", icon: FiPhone },
    { label: "Date of Birth", value: user?.additionalDetails?.dateOfBirth || "Add your Date Of Birth", icon: FiCalendar },
  ];

  const goToSettings = () => navigate("/dashboard/setting");

  return (
    <div className="w-full flex flex-col gap-6 lg:gap-8">
      <div>
        <p className="eyebrow">Account</p>
        <h1 className="h-display text-4xl sm:text-5xl mt-3">My profile</h1>
      </div>

      {/* Hero profile card */}
      <section className="relative glass overflow-hidden p-6 sm:p-8 lg:p-10">
        <div className="absolute -top-24 -right-16 w-80 h-80 rounded-full bg-magenta/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 left-10 w-72 h-72 rounded-full bg-violet/25 blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-1/2 w-40 h-40 rounded-full bg-peach/15 blur-3xl pointer-events-none" />

        <div className="relative flex flex-col sm:flex-row sm:items-center gap-6 sm:gap-8">
          <div className="shrink-0 self-start sm:self-center p-[3px] bg-brand rounded-full shadow-glow">
            <img
              src={user?.image}
              alt={`profile-${user?.firstName}`}
              className="aspect-square w-24 sm:w-32 rounded-full object-cover bg-surface-2 border-4 border-night"
            />
          </div>

          <div className="flex-1 min-w-0">
            <span className="pill pill-white">{user?.accountType}</span>
            <p className="h-display mt-4 text-3xl sm:text-4xl lg:text-5xl break-words">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="mt-2 text-white/55 break-all">{user?.email}</p>
          </div>

          <IconBtn text="Edit" outline onclick={goToSettings} customClasses="self-start sm:self-center">
            <FiEdit2 />
            Edit profile
          </IconBtn>
        </div>
      </section>

      <div className="grid grid-cols-1 xl:grid-cols-[1fr_1.4fr] gap-6 lg:gap-8 items-start">
        {/* About */}
        <section className="glass p-6 sm:p-7 flex flex-col gap-5">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <span className="icon-circle">
                <FiFeather />
              </span>
              <p className="text-xl font-medium tracking-tight">About</p>
            </div>
            <IconBtn text="Edit" outline onclick={goToSettings} customClasses="btn-sm">
              <FiEdit2 />
              Edit
            </IconBtn>
          </div>
          <p className="text-white/70 leading-relaxed">
            {user?.additionalDetails?.about || "Write something about Yourself"}
          </p>
        </section>

        {/* Personal details */}
        <section className="flex flex-col gap-4">
          <div className="flex items-center justify-between gap-3 px-1">
            <p className="text-xl font-medium tracking-tight">Personal details</p>
            <IconBtn text="Edit" outline onclick={goToSettings} customClasses="btn-sm">
              <FiEdit2 />
              Edit
            </IconBtn>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {details.map(({ label, value, icon: Icon }) => (
              <div key={label} className="glass rounded-3xl p-4 flex items-center gap-3 card-hover">
                <span className="icon-circle-glass w-10 h-10 text-white/80">
                  <Icon />
                </span>
                <div className="min-w-0">
                  <p className="eyebrow text-[10px]">{label}</p>
                  <p className="mt-1 text-[15px] font-medium break-words">{value}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};
export default Myprofile;
