const mongoose = require("mongoose");

const ratingandReviewSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    rating:{
        type:Number,
        required:true
    },
    review:{
        type:String,
        required:true
    },
    course:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"Course",
        index:true,
    }
})

const RatingAndReview = mongoose.model("RatingAndReview",ratingandReviewSchema)

module.exports = {
    RatingAndReview
}