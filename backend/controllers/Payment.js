const { instance } = require("../config/Razorpay");

const { mailSender } = require('../utils/mailSender')
const {
  courseEnrollmentEmail,
} = require("../mail/templates/courseEnrollmentEmail");
const { Course } = require("../models/Course");
const { User } = require("../models/User");
const { default: mongoose } = require("mongoose");
const { paymentSuccessEmail } = require("../mail/paymentSuccessEmail");
const crypto = require('crypto'); 
//capture the payment and initiate the razor pay order

const capturePayment = async(req, res) => {
  const { courses } = req.body;
  const userId = req.userId;

  if (courses.length === 0) {
      return res.json({ success: false, message: "Please provide Course Id" });
  }

  let totalAmount = 0;

  for (const course_id of courses) {
      try {
          let course = await Course.findById(course_id);
          if (!course) {
              return res.status(200).json({ success: false, message: "Failed to find the course" });
          }

          const uid = new mongoose.Types.ObjectId(userId);
          if (course.studentsEnrolled.includes(uid)) {
              return res.status(200).json({ success: false, message: "Student is already enrolled" });
          }
          totalAmount += course.price;
      } catch (error) {
          console.log(error);
          return res.status(500).json({ success: false, message: error.message });
      }
  }

  const options = {
      amount: totalAmount * 100, // Amount in paise (for INR)
      currency: "INR",
      receipt: Math.random(Date.now()).toString()
  };

  try {
      // Assuming `instance` is the initialized payment gateway instance (e.g., Razorpay instance)
      const paymentResponse = await instance.orders.create(options);
      res.json({
          success: true,
          message: paymentResponse
      });
  } catch (error) {
      // Log the error for debugging purposes
      console.error("Payment Creation Error:", error);

      // Send a 500 status and the error message in the response
      return res.status(500).json({
          success: false, 
          message: "Payment order creation failed. " + error
      });
  }
};




const verifyPayment = async (req, res) => {
  

  const { razorpay_order_id, razorpay_payment_id, razorpay_signature, courses } = req.body;
  const userId = req.user.id || req.authorization;

  console.log(razorpay_order_id,"This is the orderId ", razorpay_payment_id,"this is the payment id", razorpay_signature, courses,"Signature id",'This is the code')


  // Validate that required fields are present
  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature || !courses || !userId) {
      return res.status(400).json({ success: false, message: "Payment Failed" });
  }

  try {
      // Create the body for signature verification
      const body = razorpay_order_id + "|" + razorpay_payment_id;

      // Generate the expected signature using Razorpay's secret key
      const expectedSignature = crypto
          .createHmac("sha256", process.env.RAZORPAY_SECRET)
          .update(body.toString())
          .digest("hex");

      // Compare the generated signature with the one received from Razorpay
      if (expectedSignature === razorpay_signature) {
          // Enroll the student if payment is verified successfully
          await enrollStudents(courses, userId, res);

          return res.status(200).json({ success: true, message: "Payment successful" });
      } else {
          return res.status(400).json({ success: false, message: "Payment verification failed" });
      }
  } catch (error) {
      console.error("Error in payment verification:", error);
      return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};


const enrollStudents = async(courses, userId, res) =>{
    if(!courses || !userId){
      return res.status({success:false, message:"Please provide data"})
    }
    for(const courseId of courses){
     try {
      const enrolledCourse = await Course.findOneAndUpdate({_id:courseId}, {$push:{studentsEnrolled:userId}}, {new:true})
      if(!enrolledCourse){
          return res.status(500).json({success:false, message:"Course not found"})
      }

      const enrolledStudent = await User.findByIdAndUpdate(userId,{
        $push:{
          courses:courseId
        }
      },{new:true})

      //send mail to student

      const emailResponse = await mailSender(enrolledStudent.email, `Successfully enrolled into ${enrolledCourse.courseName}`,courseEnrollmentEmail(enrolledCourse.courseName, `${enrollStudents.firstName}`))
      console.log("Email sent successfully", emailResponse.response)
     } catch (error) {
      console.log(error)
      return res.status(500).json({success:false, message:error.message})
     }
    }
}

const sendPaymentSuccessEmail = async (req, res) => {
  const { orderId, paymentId, amount } = req.body;
  const userId = req.user.id || req.authorization;

  if (!orderId || !paymentId || !amount || !userId) {
      return res.status(400).json({ success: false, message: "Please Provide all the fields" });
  }

  try {
      const enrolledStudents = await User.findById(userId);
      if (!enrolledStudents) {
          return res.status(404).json({ success: false, message: "User not found" });
      }
      
      // Send email asynchronously without awaiting it
      mailSender(enrolledStudents.email, `Payment Received`, paymentSuccessEmail(enrolledStudents.firstName, amount / 100, orderId, paymentId))
          .catch(error => console.log("Error in sending mail:", error));

      // Respond immediately to the client
      return res.status(200).json({ success: true, message: "Email is being sent" });
  } catch (error) {
      console.log(error, "Error in sending mail");
      return res.status(500).json({ success: false, message: error.message || "Internal Server Error" });
  }
}






module.exports = {
  capturePayment,
  verifyPayment,
  sendPaymentSuccessEmail
};


















































// const capturePayment = async (req, res) => {
//   // get courseId and userId
//   //validaton
//   //validcourseId && validCourseDetail
//   //check if user already payed for the order
//   const { userId } = req.user.id || req.authorization.id;
//   const { courseId } = req.body;
//   if (!courseId) {
//     return res.json({
//       success: false,
//       message: "Please provide valid course Id",
//     });
//   }

//   let course;
//   try {
//     course = await Course.findById(courseId);
//     if (!course) {
//       return res.json({ success: false, message: "Cannot find the Course" });
//     }

//     const uid = new mongoose.Type.ObjectId(userId);
//     if (course.studentsEnrolled.includes(uid)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Student is already enrolled" });
//     }

//     //order created
//     const amount = course.price;
//     const currency = "INR";

//     const options = {
//       amount: amount * 100,
//       currency: currency,
//       receipt: Math.floor(Math.random(Date.now())).toString(),
//       notes: {
//         courseId: courseId,
//         userId,
//       },
//     };
//     try {
//       const paymentResponse = await instance.orders.create(options);
//       console.log(paymentResponse);
//       return res
//         .status(200)
//         .json({
//           success: true,
//           message: "",
//           courseName: course.courseName,
//           courseDescription: course.courseDescription,
//           courseThumbnail: course.courseThumbnail,
//           orderId: paymentResponse.id,
//           currency: paymentResponse.currency,
//           amount: paymentResponse.amount,
//         });
//     } catch (error) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Could not initiate order" });
//     }
//   } catch (error) {
//     console.log(error);
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

// const verifySignature = async (req, res) => {
//         const webhookSecret = "12345678";

//         const signature = req.headers("x-razorpay-signature");

//         //hmac -> hashed based message authentication code
//         const shaSum = crypto.createHmac("sha265", webhookSecret);
//         shaSum.update(JSON.stringify(req.body));

//         const digest = shaSum.digest("hex");
//         if(signature == digest ){
//             console.log("Payment is Authorized")

//             const {courseId, userId} = req.body.payload.payment.entity.notes;
            
//             try {
//                 // fullfill our action-> find the course and enroll the student
//                 const enrolledCourse = await Course.findByIdAndUpdate({_id:courseId},{
//                     '$push':{
//                         studentsEnrolled:userId
//                     }
//                 },{new:true})

//                 if(!enrolledCourse){
//                     return res.status(402).json({success:false,message:"Course not found"})
//                 }

//                 console.log(enrolledCourse)

//                 //find the student and add course in enrolled course;

//                 const enrolledStudent = await User.findOneAndUpdate({_id:userId},{
//                   "$push":{
//                     courses:courseId
//                   }
//                 },{new:true})

//                if(!enrolledCourse){
//                 return res.status(402).json({success:false,message:"Failed to create course"})
//                } 
//                //need  update
//                const emailResponse = await mailSender(
//                         enrolledStudent.email,
//                         "Coursed purchased Successfully",
//                         "Your Couse id is something"
                
//                )
//                return res.status(200).json({success:true,message:"Signature verified and course Added"})
//             } catch (error) {
//                 return res.status(500).json({success:false,message:error.message})
//             }

//         }else{
//           return res.status(400).json({success:false,message:"Invalid signature"})
//         }

// };

