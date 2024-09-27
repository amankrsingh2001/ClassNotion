const mongoose = require('mongoose')

const courseProgressSchema = new mongoose.Schema({
    courseId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course"
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
    },
    completedVideo:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:"SubSection"
        }
    ]

})

const CourseProgress  =  mongoose.model("CourseProgress",courseProgressSchema)
module.exports = {
    CourseProgress
}