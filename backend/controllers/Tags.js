const { Tag } = require("../models/Tags")
const { createTagValidation } = require("../utils/zodVerification")

const createTag = async(req,res) =>{
    const createPayload = req.body
    const parserPayload = createTagValidation.safeParse(createPayload)

    if(!parserPayload.success){
        return res.status(401).json({success:false,message:"All fileds are required"})
    }
    try {
        const tagDetails = await Tag.create({
            name:createPayload.name,
            description:createPayload.description
        })

        //checking
        console.log(tagDetails)
        return res.status(200).json({success:true,message:"Tag created Successfully"})
        
    } catch (error) {
        res.status(500).json({success:false,msg:"Failed to create Tag"})
    }
}

const showAllTags = async(req,res) =>{
    try {
        const allTags = await Tag.find({},{name:true,description:true})
        return res.status(200).json({success:true,message:"All tags returned successfully",allTags:allTags})
    } catch (error) {
        res.status(500).json({success:false,msg:"Failed to get Tag"})
    }
} 

module.exports = {
    createTag,
    showAllTags
}