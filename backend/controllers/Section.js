const { Course } = require("../models/Course")
const { Section } = require("../models/Section");
const { sectionValidation } = require("../utils/zodVerification");



const createSection = async(req,res)=>{
    const createPayload = req.body;
    const parsePayload = sectionValidation.safeParse(createPayload)
    if(!parsePayload.success){
        return res.status(401).json({success:false,message:"Please enter valid data"})
    }
    try {   
        const {sectionName,courseId} = req.body
        if(!courseId) {
            return res.status(400).json({success:false, message:"Course Id is missing"})
        }
        const newSection = await Section.create({sectionName})
        const updateCourseDetails = await Course.findByIdAndUpdate(courseId,{
                                '$push':{
                                    courseContent:newSection._id
                                }
                            },{ new:true }).populate({
                                path: "courseContent",
                                populate: {
                                    path: "subSection",
                                },
                            })
                            .exec();
                            
                            // populate logic                             

             return res.status(200).json({success:true,message:"Section added Successfully",updateCourseDetails:updateCourseDetails})

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Failed to create Section"})
    }
}


const updateSection = async(req,res)=>{
    try {
        const { sectionName,sectionId } = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({success:false,message:"Missing Data"})
        }

        const section = await findByIdAndUpdate(sectionId,{name:sectionName},{new:true})
        return res.status(200).json({success:true,message:"Section updated Successfully"})

    } catch (error) {
        return res.status(500).json({success:false,message:"Failed to update Section"})
    }
}

const deleteSection = async(req,res)=>{
    try {
        const {sectionId} = req.params;
        await findByIdAndDelete(sectionId)
        return res.status(200).json({success:true,message:"Section Deleted Successfully"})
        

    } catch (error) {
        return res.status(500).json({success:false,message:"Failed to delete seciton"})
    }
}

module.exports = {
    createSection,
    updateSection,
    deleteSection
 }