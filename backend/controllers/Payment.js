const { instance } = require("../config/Razorpay");

const mailSender = require("../utils/mailSender");
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { Course } = require("../models/Course");
const { User } = require("../models/User")

//capture the payment and initiate the razor pay order

const capturePayment = async (req, res) => {
  // get courseId and userId
  //validaton
  //validcourseId && validCourseDetail
  //check if user already payed for the order
  const { userId } = req.user.id || req.authorization.id;
  const { courseId } = req.body;
  if (!courseId) {
    return res.json({
      success: false,
      message: "Please provide valid course Id",
    });
  }

  let course;
  try {
    course = await Course.findById(courseId);
    if (!course) {
      return res.json({ success: false, message: "Cannot find the Course" });
    }

    const uid = new mongoose.Type.ObjectId(userId);
    if (course.studentsEnrolled.includes(uid)) {
      return res
        .status(400)
        .json({ success: false, message: "Student is already enrolled" });
    }

    //order created
    const amount = course.price;
    const currency = "INR";

    const options = {
      amount: amount * 100,
      currency: currency,
      receipt: Math.floor(Math.random(Date.now())).toString(),
      notes: {
        courseId: courseId,
        userId,
      },
    };
    try {
      const paymentResponse = await instance.orders.create(options);
      console.log(paymentResponse);
      return res
        .status(200)
        .json({
          success: true,
          message: "",
          courseName: course.courseName,
          courseDescription: course.courseDescription,
          courseThumbnail: course.courseThumbnail,
          orderId: paymentResponse.id,
          currency: paymentResponse.currency,
          amount: paymentResponse.amount,
        });
    } catch (error) {
      return res
        .status(500)
        .json({ success: false, message: "Could not initiate order" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

const verifySignature = async (req, res) => {
        const webhookSecret = "12345678";

        const signature = req.headers("x-razorpay-signature");

        //hmac -> hashed based message authentication code
        const shaSum = crypto.createHmac("sha265", webhookSecret);
        shaSum.update(JSON.stringify(req.body));

        const digest = shaSum.digest("hex");
        if(signature == digest ){
            console.log("Payment is Authorized")

            const {courseId, userId} = req.body.payload.payment.entity.notes;
            
            try {
                // fullfill our action-> find the course and enroll the student
                const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},{
                    '$push':{
                        studentsEnrolled:userId
                    }
                },{new:true})

                if(!enrolledCourse){
                    return res.status(402).json({success:false,message:"Course not found"})
                }

                console.log(enrolledCourse)

                //find the student and add course in enrolled course;

                const enrolledStudent = await User.findOneAndUpdate({_id:userId},{
                  "$push":{
                    courses:courseId
                  }
                },{new:true})

               if(!enrolledCourse){
                return res.status(402).json({success:false,message:"Failed to create course"})
               } 
               //need  update
               const emailResponse = await mailSender(
                        enrolledStudent.email,
                        "Coursed purchased Successfully",
                        "Your Couse id is something"
                
               )
               return res.status(200).json({success:true,message:"Signature verified and course Added"})
            } catch (error) {
                return res.status(500).json({success:false,message:error.message})
            }

        }else{
          return res.status(400).json({success:false,message:"Invalid signature"})
        }

};

module.exports = {
  capturePayment,
  verifySignature,
};
