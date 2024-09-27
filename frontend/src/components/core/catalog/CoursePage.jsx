import { useEffect, useState } from "react";
import RatingStars from "../Dashboard/AddCourse/courseBuilder/RatingStars"
import GetAvgRating from "../../../utils/avgRating";
import { IoIosGlobe } from "react-icons/io";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { CiClock2 } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { buyCourse } from "../../../services/studentFeaturesAPI";
import toast from "react-hot-toast";
import ConfirmationModal from '../../Common/ConfirmationModal';
import { formatDate } from '../../../services/formatData';
import copy from 'copy-to-clipboard';
import { ACCOUNT_TYPE } from '../../../utils/constants';
import { addToCart } from "../../../slices/cartSlice";

const CoursePage = ({courseDetail}) =>{
  
    const [avgReviewCount, setAverageReviewCount] = useState(0);
    const {token} = useSelector(state => state.auth)
    const {user} = useSelector(state =>state.profile)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {courseId} = useParams()
    const [confirmationModal, setConfirmationModal] = useState(null)
    const [isStudentEnrolled, setIsStudentEnrolled] = useState(false)

    useEffect(() => {
        if (courseDetail?.ratingAndReviews) {
          const count = GetAvgRating(courseDetail.ratingAndReviews);
          setAverageReviewCount(count);
        } else {
          setAverageReviewCount(0); // Default value if there are no reviews
        }
      }, [courseDetail]);

      
      
    if(!courseDetail){
        return <p>Loading.....</p>
    }

    const checkIsStudentEnrolled=()=>{
        if(courseDetail?.studentsEnrolled.includes(user._id)){
            setIsStudentEnrolled(true)
        }
    }

    useEffect(()=>{
        if(courseDetail && user){
            checkIsStudentEnrolled()
        }
    },[courseDetail,user])
    
    const handleAddToCart = () =>{
        if(user && (user.accountType === ACCOUNT_TYPE.INSTRUCTOR || user.accountType ===ACCOUNT_TYPE.ADMIN) ){
            toast.error("You are an instructor, You can buy a course")
            return;
        }if(token){
            dispatch(addToCart(courseDetail))
            return
        }
        setConfirmationModal({
            text1:"You are not logged in",
            text2:'Please login to add to cart',
            btn1text:"Login",
            btn2text:"Cancel",
            btn1Handler:()=>navigate('/login'),
            btn2Handler:()=>setConfirmationModal(null),
        })

    }

    const handleShare = () =>{
        copy(window.location.href)
        toast.success("Copied to clipboad")
    }

    const handleBuyCourse = () =>{
        if(!token){
            setConfirmationModal({
                text1:'You are not logged In',
                text2:'Please login to purchase the course',
                btn1Text:'Login',
                btn2Text:'Cancel',
                btn1Handler:()=>navigate('/login'),
                btn2Handler:()=>setConfirmationModal(null),
            })
        }
        if(token){
            buyCourse([courseId],token, user, navigate, dispatch)
        }

    }

    return <div className="h-[400px] ">
             <div className="flex justify-evenly p-4">
                <div className="p-12 w-[60%] flex flex-col">
                 <p className=" text-[#838894] py-3">{'Home / Learning / '}<span className='text-yellow-50'>{courseDetail.courseName}</span></p>
                    <p className='font-medium text-3xl'> <span >{courseDetail?.courseDescription}</span></p>
                    <p className='py-2 text-[#838894] font-inter text-sm'><span>{courseDetail?.whatYouWillLearn}</span></p>
                            <div className='flex mt-4 gap-4'>
                                    <RatingStars Review_Count={avgReviewCount}/>
                                    <span className="text-white">{courseDetail?.ratingAndReviews.length || (`(12,350 reviews)`)}</span>
                                    <span>{courseDetail?.ratingAndReviews?.length || 4} Rating</span>
                            </div>
                    <p className="py-4">Create by {courseDetail?.instructor.firstName || "Teacher"} {courseDetail?.instructor.lastName || "Teacher"}</p>

                    <div className="flex gap-8 py-2">
                        <p className='text-center'><IoMdInformationCircleOutline  className="inline mr-2 mb-[2px]"/>{`Created At ${formatDate( courseDetail?.updatedAt )}`}</p>
                        <p className='' > <IoIosGlobe className="inline mb-[2px]"/> English</p>
                    </div>

                </div>


             <div className="w-[20%] flex flex-col relative top-20 ">
                <div className="w-full ">
                    <img className="w-full object-cover rounded-t-md" src={courseDetail?.thumbnail}/>
                </div>

                {/* section2 */}
                <div className="bg-[#2C333F] rounded-md p-4 flex flex-col gap-4">

                <p className="text-3xl py-4">Rs. {courseDetail?.price}</p>
            {
                isStudentEnrolled?(<button onClick={()=>navigate('/dashboard/enrolled-courses')} className="bg-yellow-25 rounded-md text-richblue-700 p-2 font-semibold">Go to course</button>):(
                <div className="flex flex-col gap-3">
                    <button onClick={()=>handleAddToCart()} className="bg-yellow-25 rounded-md text-richblue-700 p-2 font-semibold">Add to Cart</button>
                    <button onClick={()=>handleBuyCourse()} className="bg-richblack-800 rounded-md text-white p-2">Buy Now</button>
                 </div>
            )
                
                    
                            
            }
               
                 <p className="text-center text-[#DBDDEA] text-sm">30-days Money Back Gurantee</p>
                    <div className="flex flex-col gap-2 py-2">
                        <p className="font-semibold">This course include:</p>
                    {
                        courseDetail?.instructions.map((instruction, index)=>{
                            return <p className="text-caribbeangreen-300" key={index}>  <CiClock2  className="inline mr-3 mb-[2px]"/>{instruction} </p>
                        })
                    }
                    </div>
                    <button onClick={()=>handleShare()} className="text-yellow-50 text-center">Share</button>

                </div>
                
                    
                  
            </div>
                    
           
                  
        </div>
        {
            confirmationModal && <ConfirmationModal modalData={confirmationModal}/>
        }

    </div>
}

export default CoursePage

