const { Course } = require('../models/Course');
const {Profile} = require('../models/Profile');
const { User } = require('../models/User');
const { uploadOnCloudinary } = require('../utils/imageUploader');


const updateProfile = async(req,res) =>{
    try {
        const {dateOfBirth="" ,about="", contactNumber="", gender, profession} = req.body
        console.log("************************", about)

        const userId = req.user.id || req.authorization.id;

        
        //user Profile
        const userDetails = await User.findById(userId)
        
        const profileId = userDetails.additionalDetails;

        console.log(profileId)

        const profileDetails = await Profile.findById(profileId)
        console.log(profileDetails)
        

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;
        profileDetails.profession = profession

       await profileDetails.save();

       return res.status(200).json({success:true,message:"Profile Updated Successfully",profileDetails:profileDetails})

    } catch (error) {

        return res.status(500).json({success:false,message:error.message})

    }
}

//delete account 
const deleteAccount = async(req,res) =>{
    try {
        const id = req.user.id || req.authorization.id;
      
        const userDetails = await User.findById(id);
        // Needed to be fixed
        const courses = userDetails.courses;

        if(!userDetails){
            return res.status(404).json({success:false,message:"User not found"})
        }

        await Profile.findByIdAndDelete(userDetails.additionalDetails)

        await Course.findByIdAndUpdate(courses.id,{
            "$pull":{
                studentsEnrolled:id
            }
        },{new:true})

        await User.findByIdAndDelete(id)

        return res.status(200).json({succss:true,message:"User Deleted Successfully"})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const getUserDetails = async(req, res)=>{
    try {
        const id = req.user.id || req.authorization.id

        const userDetail = await User.findById(id).populate('additionalDetails').exec();

          return res.status(200).json({success:true, message:"User details fetched successfully ",userDetail:userDetail})
    } catch (error) {
        return res.status(500).json({success:false, message:"Failed to fetch userDetails"})
    }
}

const updateDisplayPicture = async(req, res)=>{
    try {
        const displayPicture = req.files.displayPicture

        const userId = req.user.id;
        console.log(userId)
        const image = await uploadOnCloudinary(displayPicture,process.env.FOLDER_NAME,1000,1000)
        const updateProfile = await User.findByIdAndUpdate(userId,{
            image:image.secure_url
        },{ new :true})

        res.status(200).json({success:true,message:"Image Updated Successfully",data:updateProfile})
    } catch (error) {
        return res.status(500).json({success: false,message:error.message})
    }
}

const getEnrolledCourse = async(req, res)=>{
    try {
        const userId = req.user.id || req.authorization.id;
        const userDetail = await User.findOne({_id:userId}).populate("courses").exec()
        if(!userDetail){
            return res.status(400).json({success:false, message: `Could not found user with id: ${userId}`})
        }
        return res.status(200).json({success:true, data:userDetail})
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message,
          })
    }
}


module.exports = {
    updateProfile,
    deleteAccount,
    getUserDetails,
    updateDisplayPicture,
    getEnrolledCourse
}