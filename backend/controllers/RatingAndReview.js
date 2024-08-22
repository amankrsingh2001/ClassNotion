const { default: mongoose, mongo } = require("mongoose");
const { Course } = require("../models/Course");
const { RatingAndReview } = require("../models/RatingAndReview");


//create Rating And Review
const createRating = async(req, res) =>{

        //check is user is enrolled or not
        //Check is user already reviewed or not 
        // create rating
        //update the course with rating and review
        try {
            const {rating, review, courseId} = req.body;
            const {userId} = req.user.id || req.authorization.id;

            const courseDetail = await Course.findOne({_id:courseId},{studentsEnrolled:{$elemMatch:{$er:userId}}})

            if(!courseDetail){
                return res.status(404).json({success:false,message:"Student isnt enrolled in the course"})
            }

            const alreadyReivewd = await RatingAndReview.findOne({
                user:userId,
                course:courseId
            })

            if(alreadyReivewd){
                return res.status(403).json({success:false, message:"Course is already reviewd by the user"})
            }

            const ratingReview = await RatingAndReview.create({
                rating,
                review,
                courseId,
                userId
            })

            const updateCourse = await Course.findByIdAndUpdate(courseId,{
                "$push":{
                    ratingAndReviews:ratingReview._id
                }
            },{ new:true })

            console.log(updateCourse)

            return res(200).json({success:true, message:"Rating and Review Created successfully"})
        } catch (error) {
            return res.status(500).json({success:false,message:"Failed to create Rating and Review"})
        }
}



    //get Avg Rating
const getAverageRating = async(req, res) =>{

    try {
        const { courseId } = req.body;

        const result = await RatingAndReview.aggregate([
            { 
                $match:{
                    course:courseId //Mongoose will automatically convert it into an ObjectId when querying
                },
                
            },{
                $group:{
                    _id:null, // null wrap all the entries in a single group
                    averageRating:{
                        $avg:"$rating"
                    }
                }
            }
        ])
        if(result.length>0){
            return res.status(200).json({success:true,averageRating:result[0].averageRating})
        }
        return res.status(200).json({success:true, message:"Average Rating is 0, not Rating given till now",averageRating : 0})

    } catch (error) {
        return res.status(500).json({success:false, message:"Failed to Find average rating"})
    }

}

//getAll Rating

const getAllRatingAndReview = async(req,res)=>{
        try {
            const allReview = await RatingAndReview.find({}).sort({rating:"desc"}).populate({
                path:"user",
                select:"fistName lastName email image"
            }).populate({
                path:"course",
                select:"courseName"
            }).exec()
            return res.status(200).json({success:true, message:"All Review fetched Successfuly", data:allReview})
        } catch (error) {
            return res.status(500).json({success: false, message: error.message})
        }
}

const getCourseRatingandReview = async (req, res)=>{
    try {
        const courseId = req.body || req.params;
        if(!courseId){
            return res.status(402).json({success:false, message: "Courseid isn't valid"})
        }
        const course = await Course.findOne({_id:courseId}).populate('ratingAndReviews')
        const courseRating = {
            ratingAndReview:course.ratingAndReviews
        }
        return res.status(200).json({success:false, data:courseRating})
    } catch (error) {
        return res.status(500).json({success:false,message:"Failed to find the course Review and Rating"})
    }
}


module.exports={
    createRating,
    getAverageRating,
    getAllRatingAndReview,
    getCourseRatingandReview
}