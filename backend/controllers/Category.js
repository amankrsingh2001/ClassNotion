const {Category} = require('../models/Category')
const { createCategoryValidation } = require("../utils/zodVerification")

function getRandomInt(max){
    return Math.floor(Math.random()* max)
}

const createCategory = async(req,res) =>{
    const createPayload = req.body
    const parserPayload = createCategoryValidation.safeParse(createPayload)
    try {
        const categoryDetails = await Category.create({
            name:createPayload.name,
            description:createPayload.description
        })
        return res.status(200).json({success:true,message:"Category created Successfully"})
        
    } catch (error) {
        res.status(500).json({success:false,msg:"Failed to create Category",error:error})
    }
}

const showAllCategory = async(req,res) =>{
    try {
        const allCategory = await Category.find({})
        return res.status(200).json({success:true, message:"All category of course returned successfully", allCategory:allCategory})
    } catch (error) {
        res.status(500).json({success:false, msg:"Failed to get Tag"})
    }
} 

const categoryPageDetails = async(req, res)=>{
    try {
        const categoryId =  req.body.categoryId

        const selectedCategory = await Category.findById(categoryId).populate({path:'course',
             match:{status:"Published"}, populate:"ratingAndReviews"}).exec()

        if(!selectedCategory){
            return res.status(404).json({success:false,
                 message:"Category not found"})
        }

        if(selectedCategory.course.length === 0){

            return res.status(404).json({
                success:false,
                message:"No course found for the category",
            })
        }
            //Get courses for other categories
            const categoriesExpectedSelected = await Category.find({
                _id:{$ne: categoryId },
            })
            let differentCategory = await Category.findOne(
                categoriesExpectedSelected[getRandomInt(categoriesExpectedSelected.length)]._id
            ).populate({
                path:"course",
                match:{status :"Published"}
            }).exec()

            const allCategories = await Category.find().populate({
                path:"course",
                match:{status: "Published"},
                populate:{
                    path: "instructor"
                }
            }).exec()

            const allCourses = allCategories.flatMap((category)=>category.course)
            const mostSellingCourses = allCourses.sort((a, b)=>b.sold-a.sold).slice(0,10)

            return res.status(200).json({
                success:true,
                data:{
                    selectedCategory,
                    differentCategory,
                    mostSellingCourses
                }
            })

    } catch (error) {
        res.status(500).json({success:false, msg:"Failed to get Page Details", error:error})
    }
}



module.exports = {
    createCategory,
    showAllCategory,
    categoryPageDetails,
}