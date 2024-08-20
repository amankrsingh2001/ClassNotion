const User = require('../models/User')
const Otp = require('../models/Otp')
const otpGenerator = require('otp-generator')
const { optValidate, signUpValidation, loginValidation, changePasswordValidation } = require('../utils/zodVerification')
const bcrypt = require('bcrypt')
const { Profile } = require('../models/Profile')
const jwt = require("jsonwebtoken")
const { mailSender } = require('../utils/mailSender')


require("dotenv").config()

const sendOtp = async (req,res) =>{
    const createPayload = req.body
    const parserPayload = optValidate.safeParse(createPayload)
    if(!parserPayload){
        return res.status(400).json({message:"Please enter valid credentials"})
    }
      try {
      const {email} = req.body
  
      const checkUser = await User.findOne({email})
      if(checkUser) {
          return res.status(401).json({success:false,message:"User already registered"})
      }
      var otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
      console.log(otp,"Otp generator")
      // check unique otp or not
      var result = await Otp.findOne({otp:otp})
      // scope for improvement
      while(result){
            otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
            result = await Otp.findOne({otp:otp})
      }

      //create an entry for otp
      const otpPayload =  {email,otp};
      const otpBody = await Otp.create(otpPayload)
      res.status(200).json({success:true,message:"Otp sent successfully"})
      
  } catch (error) {
        console.log(error);
        res.status(500).json({success:false,message:error.message})
  }
     
}




const signUp = async (req,res) =>{
    const createPayload = req.body;
    const parserPayload = signUpValidation.safeParse(createPayload)
    if( !parserPayload.success ){
        return res.status(400).json({success:false,message:"Please enter valid Credentials"})
    }
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            contactNumber,
            otp
         } = req.body
    
         // password and confpass check 
         if(password != confirmPassword){
            return res.status(400).json({success:false,message:"Password and Confirm Password doesnt match, Please try again"})
         }
         const existingUser = await User.findOne({email});
         if( existingUser ){
            return res.status(400).json({success:false,message:"User already exist"})
         }  
    
         const recentOtp = await Otp.find({email}).sort({createdAt:-1}).limit(1);
         console.log( recentOtp );
         
         // validate recentOtp
    
         if( recentOtp.otp.length == 0 ){
            return res.status(400).json({success:false,message:'OTP not found'})
         }
         else if( otp !== recentOtp.otp ){
            return res.status(400).json({ success:false,message:"Invalid OTP" })
         }
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(password,salt);
    
         const  profile = await Profile.create({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
         })
    
         const user = await User.create({
            firstName,
            lastName,
            email,
            password:hashedPassword,
            accountType,
            contactNumber,
            additionalDetails:profile._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
         })

         const payload = {
            email:user.email,
            accountType:user.accountType,
            id:user._id
         }
         
         const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
         })

         const newUser = user.toObject()
         delete newUser.password;
         newUser.token = token;

         const option = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
            secure:true
         }

         res.cookie("token",token,option).status(200).json({success:true,message:"User created",user:newUser})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"User cannot be registered. Please try again"})
    }

}

const login = async(req,res)=>{
    const createPayload = req.body
    const parsePayload = loginValidation.safeParse(createPayload)
    if(!parsePayload.success){
        return res.status(400).json({success:false,message:"Invalid Credentials"})
    }

    try {
        const {email,password} = req.body;

            //removed populate 
        const user = await User.findOne({email})
        if(!user){
            return res.status(401).json({success:false,message:'User is not registered,Please register'})
        }
        const validUser = await bcrypt.compare(password,user.password);
        if(!validUser){
            return res.status(401).json({success:false,message:'Password is not valid,Please enter valid password'})
        }

        const payload = {
            email : user.email,
            id:user._id,
            accountType:user.accountType
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })

        const sendUser = user.toObject()
        delete sendUser.password;
        sendUser.token = token

        const options = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
            secure:true
        }

        res.cookie("token",token,options).status(200).json({
            success:true,
            user:sendUser,
            message:"Logged in successfully"
         })

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"Login failed, please try again"})
    }
}


const changePassword = async (req,res) =>{
    //get data from req.body
    const createPayload = req.authorization || req.user;
    const parsePayload = changePasswordValidation.safeParse(createPayload)
    if(!parsePayload.success){
        return res.status(400).json({success:false, message:"Invalid credentials" })
    }

    const user = await User.findOne({email:createPayload.email})

    if(!user){
        return res.status(401).json({success:false,message:"User does not exist"})
    }

    const validUser = await  bcrypt.compare(createPayload.password,user.password);
    if(!validUser){
        return res.status(401).json({success:false,message:'Invalid credentials'})
    }

    // scope for improvement 
    if(createPayload.newPassword !== createPayload.confirmNewPassword){
        return res.status(401).json({success:false,message:"password and Confirm Password didn't match"})
    }

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(createPayload.newPassword,salt);

    const updatedUserDetils = await User.findOneAndUpdate({ email:createPayload.email },{ password:hashedPassword },{ new:true })
     const mailResponse = await mailSender(updatedUserDetils.email,'Reset Password',passwordUpdated(updatedUserDetils.email,
        `Password updated Successfully for ${updatedUserDetils.firstName} ${updatedUserDetils.lastName}`))
  

    return res.status(200).json({success:true,message:"Password updated successfully",mailResponse:mailResponse})


    //get old password 
    // get newPassword,confirmNewPassword
    // validation
    // updatePassword in db
    //send mail password Updated
    //return password
}

module.exports = {
    sendOtp,
    signUp,
    login,
    changePassword
}