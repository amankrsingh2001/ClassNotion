import { Link } from "react-router-dom";

const ConfirmChange = ({email}) => {
  return (
    <div className="flex justify-center items-center w-screen min-h-screen bg-richblack-900">
      <div className="w-[35%] flex flex-col  flex-wrap p-8 gap-6">
        <h1 className="text-white text-4xl">Reset Completed</h1>
        <p className="text-[#AFB2BF] text-md font-thin">
          All done! We have sent an email to <br/> {email} to confirm
        </p>
        <Link to={'/login'}>
        <button
            type="submit"
            className="md:w-[75%] text-center text-[12px] px-6 py-3 rounded-md font-bold text-richblack-600 bg-yellow-50 cursor-pointer`"
          >
            Back To Login
          </button>
        </Link>
       
      </div>
    </div>
  );
};

export default ConfirmChange;
