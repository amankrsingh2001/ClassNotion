const {User} = require('../models/User')
const {Otp} = require('../models/Otp')
const otpGenerator = require('otp-generator')
const { optValidate, signUpValidation, loginValidation, changePasswordValidation } = require('../utils/zodVerification')
const bcrypt = require('bcrypt')
const { Profile } = require('../models/Profile')
const jwt = require("jsonwebtoken")
const { mailSender } = require('../utils/mailSender')


require("dotenv").config()



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
            contactNumber="",
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

         if( recentOtp[0].otp.length == 0 ){
            return res.status(400).json({success:false,message:'OTP not found'})
         }
         else if( otp !== recentOtp[0].otp ){
            return res.status(400).json({ success:false,message:"Invalid OTP" })
         }
         const salt = await bcrypt.genSalt(10)
         const hashedPassword = await bcrypt.hash(password,salt);
    
         const  profile = await Profile.create({
            gender:"null",
            dateOfBirth:"",
            about:"",
            contactNumber:"",
         })
         profile.save()
    
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

         const newUser = user.toObject()
         delete newUser.password;

         res.status(200).json({success:true,message:"User created",user:newUser})
    } catch (error) {
        return res.status(500).json({success:false,message:error.message})
    }

}


const login = async(req,res)=>{
    const createPayload = req.body
    const parsePayload = loginValidation.safeParse(createPayload)
    if(!parsePayload.success){
        return res.status(400).json({success:false,message:"Invalid Credentials"})
    }
    // No Need of confirm password
    try {
        const {email,password} = req.body;

        const user = await User.findOne({email}).populate('additionalDetails').populate('courses')
        if(!user){
            return res.status(401).json({success:false,message:'User is not registered,Please register'})
        }
        const validUser = await bcrypt.compare(password, user.password);
        if(!validUser){
            return res.status(401).json({success:false,message:'Password or Email is not valid'})
        }

        const payload = {
            email : user.email,
            id:user._id,
            accountType:user.accountType
        }

        const token = jwt.sign(payload,process.env.JWT_SECRET,{
            expiresIn:"2h"
        })

        user.token = token
        user.password = undefined;


        const options = {
            expires:new Date(Date.now()+3*24*60*60*1000),
            httpOnly:true,
            secure:true
        }
   
       return res.cookie("token", token, options).status(200).json({
            success:true,
            user:user,
            token,
            message:"Logged in successfully"
         })

    } catch (error) {
        return res.status(500).json({success:false,message:"Login failed, please try again"})
    }
}

const sendOtp = async (req,res) =>{
    const createPayload = req.body
    const parserPayload = optValidate.safeParse(createPayload)
    if(!parserPayload.success){
        return res.status(400).json({message:"Please enter valid credentials"})
    }
      try {
      const {email} = req.body
  
      const checkUser = await User.findOne({email})
      if(checkUser) {
          return res.status(401).json({success:false,message:"User already registered"})
      }
      var otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})

      // check unique otp or not
      var result = await Otp.findOne({otp:otp})
      // scope for improvement
    //   while(result){
    //         otp = otpGenerator.generate(6,{upperCaseAlphabets:false,lowerCaseAlphabets:false,specialChars:false})
    //         result = await Otp.findOne({otp:otp})
    //   }

      //create an entry for otp
      const otpPayload =  {email,otp};
      const otpBody = await Otp.create(otpPayload)
      res.status(200).json({success:true,message:"Otp sent successfully"})
      
  } catch (error) {
        res.status(500).json({success:false,message:error.message})
  }
     
}


const changePassword = async (req,res) =>{
    //get data from req.body
    const createPayload = req.body
    const userDetails = req.authorization || req.user
    const parsePayload = changePasswordValidation.safeParse(createPayload)

    if(!parsePayload.success){
        return res.status(400).json({success:false, message:"Invalid credentials" })
    }

    const user = await User.findOne({_id:userDetails.id})

    if(!user){
        return res.status(401).json({success:false,message:"User does not exist"})
    }



    const validUser = await bcrypt.compare(createPayload.password, user.password);

    if(!validUser){
        return res.status(401).json({success:false,message:'Invalid credentials'})
    }

    // scope for improvement 

    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(createPayload.newPassword,salt);

    const updatedUserDetils = await User.findOneAndUpdate({ _id:userDetails.id },{ password:hashedPassword },{ new:true })
     const mailResponse = await mailSender(updatedUserDetils.email,'Reset Password',
        `Password updated Successfully for ${updatedUserDetils.firstName} ${updatedUserDetils.lastName}`)
  

    return res.status(200).json({success:true,message:"Password updated successfully",mailResponse:mailResponse})



}

module.exports = {
    sendOtp,
    signUp,
    login,
    changePassword
}