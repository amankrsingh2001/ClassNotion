const { Course } = require('../models/Course');
const { Tag } = require('../models/Tags');
const User = require('../models/User');
const {uploadOnCloudinary} = require('../utils/imageUploader');
const { courseValidation } = require('../utils/zodVerification');






const createCourse = async(req,res)=>{
    const createPayload = req.body;
    const parsePayload = courseValidation.safeParse(createPayload)  
    if(!parsePayload.success){
        return res.status(401).json({status:false,message:"All fileds are required"})
    }

    try {
       
        const {courseName, courseDescription, whatYouWillLearn, tag, price} = req.body
        const thumbnail = req.files.thumbnail

        const userId = req.user.id || req.auhorization.id
        const instructorDetails = await User.findById(userId)

        if(!instructorDetails) {
            return res.status(404).json({success:false,message:"Instructor not found"})
        }

        //check given tag is valid or not 
        const tagDetails = await Tag.findById(tag);
        if(!tagDetails){
            return res.status(404).json({success:false,message:"Tag details not found"})
        }

        //upload image on cloudinary
        const thumbnailImage = await uploadOnCloudinary(thumbnail,process.env.FOLDER_NAME)

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructorDetails:instructorDetails._id,
            whatYouWillLearn,
            price,
            tag:tagDetails._id,
            thumbnail:thumbnailImage.secure_url
        })

            await User.findByIdAndUpdate({
                _id:instructorDetails._id
            },{
                "$push":{
                    courses:newCourse._id
                }
            },{new:true})

            await Tag.findByIdAndUpdate({_id:tagDetails._id},{
                "$push":{
                    course:newCourse._id
                }
            },{new:true})


        return res.status(200).json({success:true,message:"Course created",data:newCourse})

    } catch (error) {
        return res.status(500).json({success:false,message:"failed to create courses"})

    }

}


const showAllCourses = async(req,res) =>{
    try {
            const allCourses = await Course.find({},{courseName:true,price:true,thumbnail:true,ratingAndReviews:true,studentsEnrolled:true,instructor:true}).populate('instructor').exec()
            return res.status(200).json({success:true,message:"Successfully fetched all courses data",course:allCourses})
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot get Course data"})
    }
}

module.exports = {
    createCourse,
    showAllCourses
}