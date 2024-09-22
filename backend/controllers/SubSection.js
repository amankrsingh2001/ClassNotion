const { Section } = require("../models/Section");
const { SubSection } = require("../models/SubSection");
const { uploadOnCloudinary } = require("../utils/imageUploader");
const { subSectionValidation } = require("../utils/zodVerification");
require('dotenv').config()




const createSubSection = async(req,res)=>{

        try {
            const {title, description, sectionId} = req.body

            const video = req.files.video

            const uploadDetails = await uploadOnCloudinary(video,process.env.FOLDER_NAME);

            const subSectionDetails = await SubSection.create({
                title,
                timeDuration:'0',
                description,
                videoUrl:uploadDetails.secure_url
            })

            const section = await Section.findByIdAndUpdate(sectionId,{
                "$push":{
                    subSection:subSectionDetails._id
                }
            },{new:true}).populate({path:"subSection"})

            return res.status(200).json({success:true,message:"SubSection created Successfully", data:section} )

        } catch (error) {
            return res.status(500).json({success:false,message:error.message})
        }
}


const updateSubSection = async(req,res) =>{
    try {

        const {subSectionId, title, description, sectionId} = req.body;


        const subSection = await SubSection.findById(subSectionId)
        if(!subSection){
            return res.status(400).json({success:false,message:"Cannot find sub-section"})
        }


        let uploadDetails = null;
        if (req.files && req.files.video) {
            const video = req.files.video;
            uploadDetails = await uploadOnCloudinary(video, process.env.FOLDER_NAME);
          }

        const updatedSubSection = await SubSection.findByIdAndUpdate(subSectionId,{
            title : title || subSection.title,
            description : description|| subSection.description,
            videoUrl: uploadDetails ? uploadDetails.secure_url : subSection.videoUrl,
        },{new:true})

        const section = await Section.findById({_id:sectionId}).populate({path:"subSection"})

        return res.status(200).json({success:true,message:"SubSection created Successfully", data:section})

    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }
}



const deleteSubSection = async(req,res) =>{
  try {
    const {subSectionId, sectionId} = req.body 

    const section = await Section.findByIdAndUpdate(sectionId,{
        '$pull':{
            subSection:subSectionId
        }
    },{new:true})

    const subSection = await SubSection.findByIdAndDelete(subSectionId);
    
    if(!subSection){
        return res.status(400).json({success:false,message:'Subsection not found'})
    }
      return res.status(200).json({success:true,message:"Deleted Sub-section successfully", data:section})
  } catch (error) {
    return res.status(500).json({success:false,message:"Failed To delete sub-section" })
  }
}

module.exports = {
    createSubSection,
    updateSubSection,
    deleteSubSection
}