const { populate } = require("dotenv");
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
       
        const { sectionName, sectionId, courseId } = req.body;
        if(!sectionName || !sectionId){
            return res.status(400).json({success:false,message:"Missing Data"})
        }
        
        const section = await Section.findByIdAndUpdate(sectionId,{sectionName:sectionName},{new:true})
        const updateSection = await section.populate({path:"subSection"})
        return res.status(200).json({success:true, message:"Section updated Successfully", data:updateSection})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

const deleteSection = async(req,res)=>{
    try {

       
       const {sectionId, courseId} = req.body

        const existingSection = await Section.findById({_id:sectionId})
        if(!existingSection){
            return res.status(404).json({success:false, message:'Section not found'})
        }
        const course = await Course.findByIdAndUpdate(courseId, {
            $pull: {
                courseContent: sectionId
            }
        }, { new: true })
         const deletedSection =  await Section.findByIdAndDelete( sectionId )
      
        return res.status(200).json({ success:true,message:"Section deleted Successfully", data:deletedSection})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}

module.exports = {
    createSection,
    updateSection,
    deleteSection
 }