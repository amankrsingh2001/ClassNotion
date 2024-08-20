const {Category} = require('../models/Category')
const { createCategoryValidation } = require("../utils/zodVerification")

const createCategory = async(req,res) =>{
    const createPayload = req.body
    const parserPayload = createCategoryValidation.safeParse(createPayload)

    if(!parserPayload.success){
        return res.status(401).json({success:false,message:"All fileds are required"})
    }
    try {
        const categoryDetails = await Category.create({
            name:createPayload.name,
            description:createPayload.description
        })

        //checking
        console.log(categoryDetails)
        return res.status(200).json({success:true,message:"Tag created Successfully"})
        
    } catch (error) {
        res.status(500).json({success:false,msg:"Failed to create Tag"})
    }
}

const showAllCategory = async(req,res) =>{
    try {
        const allCategory = await Category.find({},{name:true, description:true})
        return res.status(200).json({success:true, message:"All category of course returned successfully", allCategory:allCategory})
    } catch (error) {
        res.status(500).json({success:false, msg:"Failed to get Tag"})
    }
} 

module.exports = {
    createCategory,
    showAllCategory
}