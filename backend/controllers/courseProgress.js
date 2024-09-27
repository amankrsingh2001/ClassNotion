const { SubSection } = require("../models/SubSection");
const {CourseProgress} = require('../models/CourseProgress')


const updateCourseProgress = async(req, res) =>{
    const {courseId, subSectionId} = req.body;

    const userId = req.user.id || req.authorization.id

    try {
        const subSection = await SubSection.findById(subSectionId)
        if(!subSection){
            return res.status(404).json({success:false, message:"Cannot find subSection"})
        }
        let courseProgress = await CourseProgress.findOne({
            courseId:courseId,
            userId:userId
        })


        if(!courseProgress){
            return res.status(404).json({success:false, message:"course prgoress doesnt exist"})
        }else{
            if(courseProgress.completedVideo.includes(subSectionId)){
                return res.status(400).json({success:false, message:"Sub Section already marked"})
            }
            courseProgress.completedVideo.push(subSectionId)
        }
        await courseProgress.save()
        return res.status(200).json({success:true, message:"Course progress added"})


    } catch (error) {
        return res.status(500).json({success:false, message:error})
    }   
}


module.exports = {
    updateCourseProgress
}