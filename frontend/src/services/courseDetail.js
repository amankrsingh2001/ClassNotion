import axios from "axios"
import { categories, courseApi } from "./api"
import { toast } from 'react-hot-toast';


const {CREATE_COURSE_API} = courseApi
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