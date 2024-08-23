const { Course } = require('../models/Course');
const { Category } = require('../models/Category')
const {User} = require('../models/User');
const {uploadOnCloudinary} = require('../utils/imageUploader');
const { courseValidation } = require('../utils/zodVerification');


//get course details (everything populated) with section and subsection
//Rating and review -- create rating, getAverageRating, getAllRating



const createCourse = async(req,res)=>{
    const createPayload = req.body;
    const parsePayload = courseValidation.safeParse(createPayload)  
    if(!parsePayload.success){
        return res.status(401).json({status:false,message:"All fileds are required"})
    }
    try {
        const {courseName, courseDescription, whatYouWillLearn, category, price, tag} = req.body
        const thumbnail = req.files.thumbnail

        const userId = req.user.id || req.auhorization.id

        const instructorDetails = await User.findById(userId)

        if(!instructorDetails) {
            return res.status(404).json({success:false,message:"Instructor not found"})
        }
        //check given category is valid or not 
        const categoryDetail = await Category.findById(category);
        if(!categoryDetail){
            return res.status(404).json({success:false,message:"Category details not found"})
        }
        //upload image on cloudinary
        const thumbnailImage = await uploadOnCloudinary(thumbnail,process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn,
            price,
            category:categoryDetail._id,
            thumbnail:thumbnailImage.secure_url,tag
        })

            await User.findByIdAndUpdate({
                _id:instructorDetails._id
            },{
                "$push":{
                    courses:newCourse._id
                }
            },{new:true})

            await Category.findByIdAndUpdate({_id:categoryDetail._id},{
                "$push":{
                    course:newCourse._id
                }
            },{new:true})


        return res.status(200).json({success:true,message:"Course created",data:newCourse})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})

    }

}


const getcourseDetail = async(req, res) =>{
   
    try {
        const courseId =  req.body.courseId;
        console.log(courseId)
        if(!courseId){
            return res.status(402).json({success:false, message:"Failed to get the courseId"})
        }
        const courseDetails = await Course.find(
            {_id:courseId})
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails",
                    },
                }
            )
            .populate("Category")
            // .populate("ratingAndreviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            })
            .exec();



        if(!courseDetails){
            return res.status(402).json({success:false, message:"Failed to get the course"})
        }
   
        return res.status(200).json({success:true,message:'Course sent successfully',data:{
            courseDetails
        }});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

const showAllCourses = async(req,res) =>{
    try {
            const allCourses = await Course.find({},{courseName:true, price:true, thumbnail:true, ratingAndReviews:true, studentsEnrolled:true, instructor:true}).populate('instructor').exec()
            return res.status(200).json({success:true,message:"Successfully fetched all courses data",course:allCourses})
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot get Course data"})
    }
}


module.exports = {
    getcourseDetail,
    createCourse,
    showAllCourses
}