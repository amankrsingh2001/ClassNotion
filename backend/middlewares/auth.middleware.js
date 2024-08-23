const jwt = require('jsonwebtoken')
require("dotenv").config()
//auth  
const auth = async( req , res , next )=>{
    try {
        const token =  req.headers.authorization
      
        if(!token){
            res.status(401).json({msg:"Token not found"})
        }
       try {
         const word = token.split(' ');
         const jwtToken = word[1];
         const token_decode = jwt.verify(jwtToken,process.env.JWT_SECRET)
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
                res.status(401).json({message:false,message:"This is a protected route for Students only"})
            }
        } catch (error) {
            return res.status(500).json({success:false,message:"User cannot be verified"})
        }
}


//isInstructor
const isInstructor = async( req,res,next ) =>{
    try {
        if(req.user.accountType !== "Instructor"){
            res.status(401).json({message:false,message:"This is a protected route for Instructors only"})
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
           return res.status(401).json({message:false,message:"This is a protected route for Admin only"})
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