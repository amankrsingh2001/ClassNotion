import axios from "axios"
import { categories, courseApi } from "./api"
import { toast } from 'react-hot-toast';


const {CREATE_COURSE_API, EDIT_COURSE_API, DELETE_COURSE_API ,GET_INSTRUCTOR_COURSES ,
    COURSE_GET_FULL_COURSE_DETAILS,
    CREATE_SECTION_API, UPDATE_COURSE_SECTION_API,
    DELETE_COURSE_SECTION_API,  
    GET_COURSE_DETAIL,
    DELETE_COURSE_SUB_SECTION_API,
    CREATE_SUB_SECTION_API, CREATE_RATING_OF_COURSE, UPDATE_SUB_SECTION_API, UPDATE_COURSE_PROGRESS} = courseApi

const {CATEGORIES_API} = categories

export const addCourseDetails = async(data, token) =>{
    let result = null

    try {
      
        const response = await axios.post(CREATE_COURSE_API,  data, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })
        if(!response.data.success){
            throw new Error('Could Not Add Course Details')
        }
        toast.success('Course Details Added Successfully')
            result = response?.data?.data
        
    } catch (error) {
            console.log(error)
            toast.error(error.response.data.message)
    }
    return result
}

export const editCourseAPI = async (data, token) => {
    let result = null;

    try {
        const response = await axios.post(EDIT_COURSE_API, data, {
            headers: {
                "Authorization": `Bearer ${token}`
            }
        });

        // Fix the success condition
        if (!response?.data?.success) {
            throw new Error('Could Not Update course Details');
        }

        toast.success("Updated Your Course Details");
        result = response?.data?.data;
        console.log(result, "This is the sub section");
    } catch (error) {
        toast.error(error.message);
        console.error(error);
    }
    return result;
};




export const category = async(data) =>{
    let result = null
        try {
            const response = await axios.get(CATEGORIES_API)

            if(response.data.success){
                result = response.data.allCategory
            }  
        } catch (error) {
            toast.error(error.message)
        }
        return result
}

export const createSection = async(data, token) =>{
    let result = null
    try {
        const response = await axios.post(CREATE_SECTION_API,data, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(response){
            toast.success(response?.data?.message)
        }
        result = response?.data?.updateCourseDetails
    } catch (error) {
        toast.error("Failed to create section")        
    }
    return result
}

export const updateSection = async(data, token) =>{
    let result = null 
    try {   
        const response = await axios.post(UPDATE_COURSE_SECTION_API,data, {
            headers : {
                "Authorization" :`Bearer ${token}`
            }
        })
        result = response?.data?.data
    } catch (error) {
        toast.error('Failed to update section')
        console.log(error)
    }
    return result
}


export const deleteSection = async(data, token) =>{
    let result ;
   
    try {
        const {sectionId, courseId} = data

        const response = await axios.post(DELETE_COURSE_SECTION_API, {sectionId, courseId}, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })

        if(response?.data?.success){
            toast.success("Deleted section successfully")
        }
        result = response?.data?.data
    } catch (error) {
            toast.error(error.message)
            console.log(error)
    }
    return result
}



export const createSubSection = async(data, token) =>{
        let result;
        try {
            const response = await axios.post(CREATE_SUB_SECTION_API, data, {
                headers:{
                    "Authorization" : `Bearer ${token}`
                }
            })
            if(response.data.success){
                toast.success("Lecture Added Successfully")
            }
            result = response?.data?.data

        } catch (error) {
                toast.error('Something went wrong')
                console.log(error)
        }
        return result;
}

export const updateSubSection = async(data, token) =>{
    let result;


    try {
        const response = await axios.post(UPDATE_SUB_SECTION_API, data, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })

        result  = response?.data?.data
    } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
    }
    return result;
}



export const deleteSubSection = async(data, token) =>{
    let result ;

    try {
        const response = await axios.post(DELETE_COURSE_SUB_SECTION_API,data, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })

        if(response?.data?.success){
            toast.success("Deleted section successfully")
        }
        result = response?.data?.data
        
    } catch (error) {
            toast.error(error.message)
            console.log(error)
    }
    return result
}


export const getInstructorCourse = async(token) =>{
    let result ;
    try {
        const response = await axios.get(GET_INSTRUCTOR_COURSES, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        result = response?.data?.data
    } catch (error) {
        console.log(error)
        toast.error('Failed to fetch courses details')        
    }
    return result
}

export const deleteCourse = async(data, token)=>{
    try {
            console.log(data,"This is the courseId")

        const response = await axios.post(DELETE_COURSE_API, { data },{
            headers:{
                "Authorization":`Bearer ${token}`
            }
        } )
        if(response?.data?.success){
            toast.success('Delete your course successfully')
        }
    } catch (error) {
        toast.error("Something went wrong")
        console.log(error)
    }
}

export const getFullCourseDetail = async(courseId, token) =>{
    let result ;
    try {
        const response = await axios.post(COURSE_GET_FULL_COURSE_DETAILS, {courseId}, {
            headers:{
                'Authorization':`Bearer ${token}`
            }
        })
        result = response?.data?.data
        console.log(result,"This is the result")
       
    } catch (error) {
        console.log(error) 
        toast.error('Something went wrong')       
    }
    return result
}

export const getNewCourseDetail = async(courseId) =>{
    let result;
    try {
        const response = await axios.post(GET_COURSE_DETAIL,{courseId})
        result = response?.data?.data?.courseDetails
    } catch (error) {
        toast.error('Failed to fetch courseDetail')
    }
    return result
}

export const updateCourseProgress = async(data, token) =>{
  try {
    console.log(data,"This is the data")
      const res = await axios.post(UPDATE_COURSE_PROGRESS, data, {
          headers:{
              "Authorization": `Bearer ${token}`
          }
      })
  } catch (error) {
        console.log(error, "Error in course Details")
  }

}


export const createRating = async(data, token) =>{
    let Success = false;
    try {
        const response = await axios.post(CREATE_RATING_OF_COURSE, data, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
        })
        if(response.data.success){
            toast.success('Rating Created')
            Success = true
        }
    } catch (error) {
        console.log(error)
    }
    return Success


}