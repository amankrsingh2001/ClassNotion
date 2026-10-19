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

    return <div className="w-full py-8 text-white sm:py-10">
        <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
                <p className="eyebrow">Instructor</p>
                <h1 className="h-display mt-3 text-4xl sm:text-5xl">
                    My courses
                    {courses?.length > 0 && <sup className="ml-1 align-super text-base font-medium text-white/45 sm:text-lg">{courses.length}</sup>}
                </h1>
            </div>
            <button className="btn btn-gradient" onClick={()=>(navigate('/dashboard/add-course'))}>Add Course <IoAdd className="text-lg"/></button>
        </div>

        {
            courses && <CoursesTable courses={courses} setCourses={setCourses}/>
        }
    </div>
}
export default MyCourses
