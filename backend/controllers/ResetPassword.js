const {User} = require('../models/User');
const { mailSender } = require('../utils/mailSender')
const bcrypt = require('bcrypt')



    const resetPasswordToken = async(req,res)=>{
        try {
            const email = req.body.email;
            const user = await User.findOne({email})
            if(!user){
                return res.json({success:false,message:"Your email is not registered"})
            }
    
            const token = crypto.randomUUID();
    
            const updatedDetails = await User.findOneAndUpdate({email},{token:token,
                resetPasswordExpires:Date.now() + 5*60*1000
            },{
                new:true
            })
            
            const url = `http://localhost:5173/update-password/${token}`
    
            await mailSender(email,"Password Reset Link",`Password Reset Link ${url}`)
            return res.status(200).json({success:true,message:"Email sent successFully, Please check email and change your password"})
        } catch (error) {
            return res.status(400).json({success:false,message:"Failed to Reset Password"})
        }
    }

    const resetPassword = async(req,res) =>{
        try {
             const {password,confirmPassword,token} = req.body
             if(password !== confirmPassword){
                return res.status(401).json({success:false,message:"Password and confirm Password can't be different"})
             }
             const userDetails = await User.findOne({token})
             if(!userDetails){
                return res.json({
                    success:false,
                    message:"Cannot find token"
                })
             }
             if( userDetails.resetPasswordExpires < Date.now()){
                return res.status(402).json({success:false,message:'Token is expired '})
             }

             const salt = 10;
             const hashedPassword = await bcrypt.hash(password,salt);
             await User.findOneAndUpdate({ token },{ password : hashedPassword },{ new:true })

             return res.status(200).json({success:true,message:"Password Reset Successfully"})
        } catch (error) {
            return res.status(500).json({success:false,message:'Something went wrong'})
        }
    }

    module.exports = {
        resetPasswordToken,
        resetPassword
    }
