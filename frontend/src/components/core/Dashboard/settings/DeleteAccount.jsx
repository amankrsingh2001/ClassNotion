import axios from "axios";
import { FiTrash2 } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { profileApi } from "../../../../services/api";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUser } from "../../../../slices/profileSlice";
import { setToken } from "../../../../slices/authSlice";

const DeleteAccount = () => {
  const dispatch = useDispatch();

  const navigate = useNavigate();
  const { DELETE_USER_ACCOUNT } = profileApi;

  const deleteAccountHandler = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(DELETE_USER_ACCOUNT, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      localStorage.removeItem("user");
      localStorage.removeItem("token");
      dispatch(setUser(null));
      dispatch(setToken(null));
      navigate("/signup");
      toast.success("Your account is successfully Deleted");
    } catch (error) {
      toast.error("Failed to delete your account");
    }
  };

  const cancelHandler = () => {
    navigate("/dashboard/my-profile");
  };

  return (
    <section className="relative overflow-hidden glass border-rose/25 bg-rose/[0.04] p-6 sm:p-8 grid grid-cols-1 xl:grid-cols-[240px_1fr] gap-6 xl:gap-10">


      <div className="relative">
        <p className="eyebrow text-[10px] !text-rose/80">04 · Danger zone</p>
        <h2 className="mt-2 text-xl sm:text-2xl font-medium tracking-tight">Delete account</h2>
        <p className="mt-2 text-sm text-foreground/55 leading-relaxed">This action is permanent and cannot be undone.</p>
      </div>

      <div className="relative min-w-0 flex flex-col sm:flex-row gap-5">
        <span className="shrink-0 self-start grid place-items-center w-12 h-12 rounded-full bg-rose/15 border border-rose/30 text-rose text-xl">
          <FiTrash2 />
        </span>
        <div className="flex-1">
          <p className="text-lg font-medium tracking-tight">Would you like to delete account?</p>
          <p className="mt-1.5 text-sm text-foreground/55 leading-relaxed">
            This account may contain Paid Courses. Deleting your account will permanently remove all the content
            associated with it.
          </p>
          <div className="mt-5 flex flex-wrap gap-2.5">
            <button onClick={deleteAccountHandler} className="btn btn-danger">
              <FiTrash2 /> Delete my account
            </button>
            <button onClick={cancelHandler} className="btn btn-ghost">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DeleteAccount;
