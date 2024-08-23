const {Category} = require('../models/Category')
const { createCategoryValidation } = require("../utils/zodVerification")

const createCategory = async(req,res) =>{
    console.log(req.body)
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
        return res.status(200).json({success:true,message:"Category created Successfully"})
        
    } catch (error) {
        res.status(500).json({success:false,msg:"Failed to create Category"})
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

const categoryPageDetails = async(req, res)=>{
    try {
        const categoryId = req.params || req.body

        const selectedCourses = await Category.findById(categoryId).populate('courses').exec()

        if(!selectedCourses){
            return res.status(404).json({success:false, message:"Data not found"})
        }
        
        const differentCategories = await Category.find({
                     _id:{$ne: categoryId},
        }).populate('courses').exec()

            //find top selling courses

            return res.status(200).json({success:true,data:{
                selectedCourses, 
                differentCategories
            }})
    } catch (error) {
        res.status(500).json({success:false, msg:"Failed to get Page Details"})
    }
}



module.exports = {
    createCategory,
    showAllCategory,
    categoryPageDetails,
}