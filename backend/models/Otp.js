const mongoose = require('mongoose')
const { mailSender } = require('../utils/mailSender')
const otpTemplate = require('../mail/templates/emailVerification')


const otpSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now(),
        expires:5*60
    }
})
    

async function sendVerificationEmail(email,otp) {
    try {
            const mailResponse = await mailSender(email,"Verificaton email from Class Notion",otpTemplate(otp))
    } catch (error) {
            throw error
    }
}

otpSchema.pre("save",async function (next){
    await sendVerificationEmail(this.email,this.otp)
    next()
})


const Otp = mongoose.model("Otp",otpSchema)

module.exports = {
    Otp
}