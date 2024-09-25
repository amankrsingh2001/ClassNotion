const { Course } = require('../models/Course');
const { Category } = require('../models/Category')
const {User} = require('../models/User');
const {uploadOnCloudinary} = require('../utils/imageUploader');
const { courseValidation } = require('../utils/zodVerification');
const { Section } = require('../models/Section');
const { SubSection } = require('../models/SubSection');
const { CourseProgress } = require('../models/CourseProgress');
const { convertSecondsToDuration } = require('../utils/secToDuration');


//get course details (everything populated) with section and subsection
//Rating and review -- create rating, getAverageRating, getAllRating



const createCourse = async (req, res) => {
    const createPayload = req.body;
    const parsePayload = courseValidation.safeParse(createPayload);
    if (!parsePayload.success) {
        return res.status(401).json({ status: false, message: "All fields are required", error: parsePayload.error });
    }
    try {
        let { courseName, courseDescription, whatYouWillLearn, category, price, courseTags, instructions, status } = req.body;

        const thumbnail = req.files.image;
        const coursePrice = parseInt(price);
        const tags = typeof courseTags === 'string' ? JSON.parse(courseTags) : courseTags;
        const instructionsArray = typeof instructions === 'string' ? JSON.parse(instructions) : instructions;

        const userId = req.user.id || req.authorization.id;

        const instructorDetails = await User.findById(userId);
        if (!instructorDetails) {
            return res.status(404).json({ success: false, message: "Instructor not found" });
        }
        // Check given category is valid or not 
        const categoryDetail = await Category.findById({_id:category});
        if (!categoryDetail) {
            return res.status(404).json({ success: false, message: "Category details not found" });
        }

        // Upload image on cloudinary
        const thumbnailImage = await uploadOnCloudinary(thumbnail, process.env.FOLDER_NAME);

        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor: instructorDetails._id,
            whatYouWillLearn,
            price: coursePrice,
            Category: categoryDetail._id,
            thumbnail: thumbnailImage.secure_url,
            tag: tags,
            instructions: instructionsArray,
            status
        })

        await User.findByIdAndUpdate(
            { _id: instructorDetails._id },
            {
                $push: {
                    courses: newCourse._id
                }
            },
            { new: true }
        );

        await Category.findByIdAndUpdate(
            { _id: categoryDetail._id },
            {
                $push: {
                    course: newCourse._id
                }
            },
            { new: true }
        );

        return res.status(200).json({ success: true, message: "Course created", data: newCourse });

    } catch (error) {
        console.error("Error in createCourse:", error);
        return res.status(500).json({ success: false, message: error.message });
    }
};

const editCourse = async (req, res) => {
    try {
        const { courseId } = req.body;
        const updates = req.body;

        // Ensure courseId is valid
        if (!courseId) {
            return res.status(400).json({ error: "courseId is required" });
        }

        // Find the course by ID
        const course = await Course.findById(courseId);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }

        // Handle thumbnail image update
        if (req.file) {
            const thumbnail = req.file.thumbnailImage; // Use req.file if only one file is uploaded
            const thumbnailImage = await uploadOnCloudinary(thumbnail, process.env.FOLDER_NAME);
            course.thumbnail = thumbnailImage.secure_url;
        }

        // Update only the fields that are present in the req.body
        for (const key in updates) {
            if (updates.hasOwnProperty(key)) {
                if (key === "tag" || key === "instructions") {
                    course[key] = JSON.parse(updates[key]);
                } else {
                    course[key] = updates[key];
                }
            }
        }

        // Save the updated course
        await course.save();

        // Retrieve the updated course with populated fields
        const updatedCourse = await Course.findById(courseId)
            .populate({
                path: "instructor",
                populate: { path: "additionalDetails" },
            })
            .populate("Category")
            .populate("ratingAndReviews")
            .populate({
                path: "courseContent",
                populate: { path: "subSection" },
            })
            .exec();

        return res.json({
            success: true,
            message: "Course updated successfully",
            data: updatedCourse,
        });
    } catch (error) {
        console.error("Error updating course: ", error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message,
        });
    }
};



const getcourseDetail = async(req, res) =>{
    console.log("this")
   
    try {
        const courseId =  req.body.courseId;
   
        if(!courseId){
            return res.status(402).json({success:false, message:"Failed to get the courseId"})
        }
        const courseDetails = await Course.find(
            {_id:courseId})
            .populate(
                {
                    path:"instructor",
                    populate:{
                        path:"additionalDetails",
                    },
                }
            )
            .populate("Category")
            // .populate("ratingAndreviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                },
            })
            .exec();



        if(!courseDetails){
            return res.status(402).json({success:false, message:"Failed to get the course"})
        }
   
        return res.status(200).json({success:true,message:'Course sent successfully',data:{
            courseDetails
        }});
        
    } catch (error) {
        return res.status(500).json({success:false, message:error.message})
    }
}

const getFullCourseDetails = async (req, res) => {
    try {
      const courseId  = req.body.courseId
      console.log(courseId, "This is course Id")

      const userId = req.user.id
      const courseDetails = await Course.findOne({
        _id: courseId,
      })
        .populate({
          path: "instructor",
          populate: {
            path: "additionalDetails",
          },
        })
        .populate("Category")
        .populate("ratingAndReviews")
        .populate({
          path: "courseContent",
          populate: {
            path: "subSection",
          },
        })
        .exec()
  
      let courseProgressCount = await CourseProgress.findOne({
        courseID: courseId,
        userId: userId,
      })
  
      console.log("courseProgressCount : ", courseProgressCount)
  
      if (!courseDetails) {
        return res.status(400).json({
          success: false,
          message: `Could not find course with id: ${courseId}`,
        })
      }
  
      // if (courseDetails.status === "Draft") {
      //   return res.status(403).json({
      //     success: false,
      //     message: `Accessing a draft course is forbidden`,
      //   });
      // }
  
      let totalDurationInSeconds = 0
      courseDetails.courseContent.forEach((content) => {
        content.subSection.forEach((subSection) => {
          const timeDurationInSeconds = parseInt(subSection.timeDuration)
          totalDurationInSeconds += timeDurationInSeconds
        })
      })
  
      const totalDuration = convertSecondsToDuration(totalDurationInSeconds)
      


      return res.status(200).json({
        success: true,
        data: {
          courseDetails,
          totalDuration,
          completedVideos: courseProgressCount?.completedVideos
            ? courseProgressCount?.completedVideos
            : [],
        },
      })
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: error.message,
      })
    }
  }


const showAllCourses = async(req,res) =>{
    try {
            const allCourses = await Course.find({status:"Published"},{courseName:true, price:true, thumbnail:true, ratingAndReviews:true, studentsEnrolled:true, instructor:true}).populate('instructor').exec()
            return res.status(200).json({success:true,message:"Successfully fetched all courses data",course:allCourses})
    } catch (error) {
        return res.status(500).json({success:false,message:"Cannot get Course data"})
    }
}

const getInstructorCourses = async(req, res) =>{
    try{
        const instructorId = req.user.id
        const instructorCourses = await Course.find({
            instructor:instructorId,
        }).sort({createdAt:-1}).populate('Category')

        res.status(200).json({
            success:true,
            data:instructorCourses
        })

    }catch(error){
        res.status(500).json({success:false, message:"Failed to retrieve instructor courses", error:error.message})
    }
}

const deleteCourses = async(req, res) =>{
   try {
     const courseId = req.body.data
     
     const course = await Course.findById({_id:courseId})
     if(!course){
         return res.status(404).json({ message:"Course not found" })
     }
 
     //unenroll student from the course
 
     const studentEnrolled = course.studentsEnrolled
     for(const studentId of studentEnrolled){
         await User.findByIdAndUpdate(studentId,{
             $pull:{courses:courseId}
         })
     }
 
     const courseSections = course.courseContent
     for(const sectionId of courseSections){
         const section = await Section.findById(sectionId)
         if(section){
             const subSections = section.subSection
             for (const subSectionId of subSections){
                 await SubSection.findByIdAndDelete(subSectionId)
             }
         }
     }
 
     await Course.findByIdAndDelete(courseId)
     return res.status(200).json({success:true, message:"Course deleted Successfully"})
   } catch (error) {
        return res.status(500).json({success: false, message:"Server Error", error:error.message})
   }
}


module.exports = {
    getcourseDetail,
    createCourse,
    editCourse,
    showAllCourses,
    getInstructorCourses,
    deleteCourses,
    getFullCourseDetails
}