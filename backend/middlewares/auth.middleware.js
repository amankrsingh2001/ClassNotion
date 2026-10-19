const jwt = require('jsonwebtoken')
const { prisma } = require('../config/database')
require("dotenv").config()
//auth  
const auth = async( req , res , next )=>{
    try {
        const token =  req.headers.authorization
        if(!token){
            return res.status(401).json({msg:"Token not found"})
        }
       try {
         const word = token.split(' ');
         const jwtToken = word[1];
         const token_decode = jwt.verify(jwtToken, process.env.JWT_SECRET)
 
         const user = await prisma.user.findUnique({ where: { id: token_decode.id }, select: { id: true, accountType: true } })
         if (!user) return res.status(401).json({ success: false, message: 'Account no longer exists' })
         token_decode.accountType = user.accountType
         req.authorization = token_decode
         req.user = token_decode // temprory added to check the user 
         next()
       } catch (error) {
            return res.status(401).json({success:false,message:'Token is invalid'})
       }
    } catch (error) {
        return res.status(400).json({
            success:false,
            message:'Something when wrong while validating the token'
        })
    }
}


//isStudent
const isStudent = async( req,res,next ) =>{
        try {
            if(req.user.accountType !== "Student"){
                return res.status(401).json({success:false,message:"This is a protected route for Students only"})
            }
            next()
        } catch (error) {
            return res.status(500).json({success:false,message:"User cannot be verified"})
        }
}


//isInstructor
const isInstructor = async( req,res,next ) =>{
    try {
        if(req.user.accountType !== "Instructor"){
            return res.status(401).json({success:false,message:"This is a protected route for Instructors only"})
        }
        next()
    } catch (error) {
        return res.status(500).json({success:false,message:"User cannot be verified"})
    }
}

//idAdmin
const isAdmin = async( req,res,next ) =>{
  
    try {
        if(req.user.accountType !== "Admin"){
           return res.status(401).json({success:false,message:"This is a protected route for Admin only"})
        }
        next()
    } catch (error) {
        return res.status(500).json({success:false,message:"User cannot be verified"})
    }
}

module.exports = {
    auth,
    isStudent,
    isInstructor,
    isAdmin
}
const isApprovedEducator = async (req, res, next) => {
    try {
        const application = await prisma.educatorApplication.findUnique({ where: { userId: req.user.id }, select: { status: true } })
        if (application?.status !== 'Approved') return res.status(403).json({ success: false, message: 'Complete your educator profile and wait for admin approval before creating or publishing courses', code: 'EDUCATOR_APPROVAL_REQUIRED' })
        next()
    } catch (error) { next(error) }
}
module.exports.isApprovedEducator = isApprovedEducator
