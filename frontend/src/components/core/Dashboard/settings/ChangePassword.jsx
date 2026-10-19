import { useState } from "react";
import toast from "react-hot-toast";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useDispatch } from "react-redux";
import { changeNewPassword } from "../../../../services/authApi";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const [currentPassword, setCurrentPassword] = useState(false);
  const [changePassword, setChagnePassword] = useState(false);
  const [formData, setFormData] = useState({
    password: "",
    newPassword: "",
  });

  const onChangeHandler = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const currentPasswordHandler = () => {
    setCurrentPassword(!currentPassword);
  };

  const changePasswordHandler = () => {
    setChagnePassword(!changePassword);
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password === formData.newPassword) {
      toast.error("New password cannot be same as Current password");
      return;
    }
    dispatch(changeNewPassword(formData));
  };

  return (
    <section className="glass p-6 sm:p-8 grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-6 xl:gap-10">
      <div>
        <p className="eyebrow text-[10px]">03 · Security</p>
        <h2 className="mt-2 text-xl sm:text-2xl font-medium tracking-tight">Password</h2>
        <p className="mt-2 text-sm text-foreground/55 leading-relaxed">
          Your new password must be different from the current one.
        </p>
      </div>

      <form onSubmit={submitHandler} className="min-w-0 grid grid-cols-1 md:grid-cols-2 gap-5">
        <div>
          <label className="field-label" htmlFor="password">
            Current Password
          </label>
          <div className="relative">
            <input
              onChange={onChangeHandler}
              type={`${!currentPassword ? "password" : "text"}`}
              name="password"
              id="password"
              placeholder="Current Password"
              className="field pr-12"
            />
            <button
              type="button"
              onClick={currentPasswordHandler}
              aria-label="Toggle current password visibility"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 rounded-full text-foreground/45 hover:text-foreground hover:bg-foreground/[0.06] transition"
            >
              {currentPassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div>
          <label className="field-label" htmlFor="newPassword">
            New Password
          </label>
          <div className="relative">
            <input
              onChange={onChangeHandler}
              type={`${!changePassword ? "password" : "text"}`}
              name="newPassword"
              id="newPassword"
              placeholder="New password"
              className="field pr-12"
            />
            <button
              type="button"
              onClick={changePasswordHandler}
              aria-label="Toggle new password visibility"
              className="absolute right-3 top-1/2 -translate-y-1/2 grid place-items-center w-8 h-8 rounded-full text-foreground/45 hover:text-foreground hover:bg-foreground/[0.06] transition"
            >
              {changePassword ? <FiEyeOff /> : <FiEye />}
            </button>
          </div>
        </div>

        <div className="md:col-span-2 flex justify-end pt-1">
          <button className="btn btn-primary w-full sm:w-auto" type="submit">
            Change password
          </button>
        </div>
      </form>
    </section>
  );
};
export default ChangePassword;
