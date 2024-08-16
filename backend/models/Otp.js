const mongoose = require('mongoose')
const { mailSender } = require('../utils/mailSender')

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
            const mailResponse = await mailSender(email,"Verificaton email from Class Notion",otp)
            console.log("Email sent Successfully",mailResponse)
    } catch (error) {
            console.log("Error occured while sending mail",error.message)
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