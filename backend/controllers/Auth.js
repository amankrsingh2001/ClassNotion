const User = require('../models/User')
const Otp = require('../models/Otp')
const otpGenerator = require('otp-generator')
const { optValidate, signUpValidation } = require('../utils/zodVerification')
const bcrypt = require('bcrypt')
const { Profile } = require('../models/Profile')



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
    if( !parserPayload ){
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
         const hashedPasswrod = await bcrypt.hash(password,salt);
    
         const  profile = await Profile({
            gender:null,
            dateOfBirth:null,
            about:null,
            contactNumber:null,
         })
    
         const user = await User.create({
            firstName,
            lastName,
            email,
            password,
            accountType,
            contactNumber,
            additionalDetails:profile._id,
            image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
         })
         res.status(200).json({success:true,message:"User created",user:user})
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false,message:"User cannot be registered. Please try again"})
    }

}

module.exports = {
    sendOtp,
    signUp
}