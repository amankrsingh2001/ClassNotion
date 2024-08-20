const { Section } = require("../models/Section");
const { SubSection } = require("../models/SubSection");
const { uploadOnCloudinary } = require("../utils/imageUploader");
const { createCategoryValidation } = require("../utils/zodVerification");
require('dotenv').config()




const createSubSection = async(req,res)=>{

    const createPayload = req.body;
    const parserPayload= createCategoryValidation.safeParse(createPayload)
    if(!parserPayload.success){
        return res.status(401).json({success:false,message:"Please enter valid data"})
    }
        try {
            const {title, description, timeDuration, sectionId} = createPayload;

            const video = req.files.videoFile  

            //upload on cloudinary

            const uploadDetails = await uploadOnCloudinary(video,process.env.FOLDER_NAME);

            const subSectionDetails = await SubSection.create({
                title,
                timeDuration,
                description,
                videoUrl:uploadDetails.secure_url
            })

            const section = await Section.findByIdAndUpdate(sectionId,{
                "$push":{
                    subSection:subSectionDetails._id
                }
            },{new:true}).populate({path:"subSection"})

            return res.status(200).json({success:true,message:"SubSection created Successfully"})

        } catch (error) {
            return res.status(500).json({success:false,message:"Failed to create sub-section"})
        }
}


const updateSubSection = async(req,res) =>{
    try {

        const {subSectionId,title,description,sectionId} = req.body;
        const video = req.files.videoFile;

        const subSection = await SubSection.findById(subSectionId)
        if(!subSection){
            return res.status(400).json({success:false,message:"Cannot find sub-section"})
        }

        let uploadDetails = null;

        if(video){
            uploadDetails = await uploadOnCloudinary(video,process.env.FOLDER_NAME);
        }

        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId,{
            title : title || subSection.title,
            description : description|| subSection.description,
            videoUrl : uploadDetails.secure_url || subSection.videoUrl,
        },{new:true})

        return res.status(200).json({success:true,message:"SubSection created Successfully"})

    } catch (error) {
        return res.status(500).json({success:false,message:"Failed to update sub-section"})
    }
}



const deleteSubSection = async(req,res) =>{
  try {
    const {subSectionId} = req.params 
    const sectionId = req.body

    await Section.findByIdAndUpdate(sectionId,{
        '$pull':{
            subSection:subSectionId
        }
    })
    const subSection = await SubSection.findByIdAndDelete(subSectionId);
    
    if(!subSection){
        return res.status(400).json({success:false,message:'Subsection not found'})
    }
    const updateSection = await Section.findById(sectionId).populate({path:'subSection'})
      return res.status(200).json({success:true,message:"Deleted Sub-section successfully"})
  } catch (error) {
    return res.status(500).json({success:false,message:"Failed To delete sub-section"})
  }
}

module.exports = {
    createSubSection,
    updateSubSection,
    deleteSubSection
}