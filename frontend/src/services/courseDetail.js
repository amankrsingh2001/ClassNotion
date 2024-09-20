import axios from "axios"
import { categories, courseApi } from "./api"
import { toast } from 'react-hot-toast';


const {CREATE_COURSE_API,  CREATE_SECTION_API, UPDATE_COURSE_SECTION_API, DELETE_COURSE_SECTION_API,  DELETE_COURSE_SUB_SECTION_API, CREATE_SUB_SECTION_API, UPDATE_SUB_SECTION_API} = courseApi
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

export const editCourse = async(data, token) =>{
    let result = null
    try {
           const response =  await axios.post('', data, {
            headers:{
                "Authorization":`Bearer ${token}`
            }
           })
           if(response?.data?.success){
            throw new Error('Could Not Update course Details')
           }
           toast.success("Update Your Course Details")
           result = response?.data?.data
    } catch (error) {
        toast.error(error.message)
    }
    return result
}

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
    console.log("this is running")
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

export const deleteSubSection = async(subSectionId,sectionId, token) =>{
    let result ;
    console.log("Now check this is running")
    try {
        const response = await axios.post(DELETE_COURSE_SUB_SECTION_API,{subSectionId, sectionId}, {
            headers:{
                "Authorization" : `Bearer ${token}`
            }
        })

        if(response?.data?.success){
            toast.success("Deleted section successfully")
        }
        //check while testing
        result = response?.data?.data
    } catch (error) {
            toast.error(error.message)
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

        result  
    } catch (error) {
            toast.error("Something went wrong")
            console.log(error)
    }
}