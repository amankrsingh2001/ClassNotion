import { useEffect, useState } from "react";
import { useSelector } from "react-redux"
import { useNavigate } from 'react-router-dom';
import { getInstructorCourse } from "../../../services/courseDetail";
import { IoAdd } from "react-icons/io5";
import CoursesTable from "./InstructorCourses/CoursesTable";


const MyCourses = () =>{
    const {token} = useSelector(state => state.auth)
    const navigate = useNavigate()
    const [courses, setCourses] = useState([])


    const fetchCourses = async()=>{
        const result = await getInstructorCourse(token)
        if(result){
            setCourses(result)
        }
    }

    useEffect(()=>{
        fetchCourses()
    },[])

    return <div>
        <div className="flex justify-between">
            <h1 className="text-white">My Courses</h1>
                <button className=" bg-yellow-50 rounded-md text-black" onClick={()=>(navigate('/dashboard/add-course'))}>Add Courses <IoAdd className="inline"/></button>
        </div>

        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }
    </div>
}
export default MyCourses
