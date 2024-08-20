const { Course } = require('../models/Course');
const {Profile} = require('../models/Profile');
const { User } = require('../models/User');


const updateProfile = async(req,res) =>{
    try {
        const {dateOfBirth="" ,about="", contactNumber="", gender} = req.body

        const userId = req.user.id || req.authorization;
        
        //user Profile
        const userDetails = await User.findById(userId)
        
        const profileId = userDetails.additionalDetails;

        const profileDetails = await Profile.findById(profileId)

        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

       await profileDetails.save();

       return res.status(200).json({success:true,message:"Profile Updated Successfully",profileDetails:profileDetails})

    } catch (error) {

        return res.status(500).json({success:false,message:"Failed to update Profile"})

    }
}

//delete account 
const deleteAccount = async(req,res) =>{
    try {
        const {id} = req.user || req.authorization;
      
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
        return res.status(500).json({success:false,message:"Cannot delete User"})
    }
}

const getUserDetails = async(req, res)=>{
    try {
        const id = req.user || req.authorization

        const userDetail = await User.findById(id).populate('additionalDetails').exec();

          return res.status(200).json({success:true, message:"User details fetched successfully ",userDetail:userDetail})
    } catch (error) {
        return res.status(500).json({success:false, message:"Failed to fetch userDetails"})
    }
}

module.exports = {
    updateProfile,
    deleteAccount,
    getUserDetails
}