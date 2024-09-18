import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSection : [],
    courseEntireDate:[],
    completedLecture:[],
    totalNoOfLectures:0
}

const viewCourseSlice = createSlice({
    name:"viewCourse",
    initialState,
    reducers:{
        setCourseSection:(state, action) =>{
            state.courseSection = action.payload
        },
        setEntireCourseDate:(state, action) =>{
            state.courseEntireDate = action.payload
        },
        setTotalNoOfLectures:(state, action) =>{
            state.totalNoOfLectures = action.payload
        },
        setCompletedLectures :(state,action) =>{
            state.completedLecture = action.payload
        },
        updateCompletedLecture : (state, action)=>{
            state.completedLecture = [...state.completedLecture, action.payload]
        }
    }
})

export const {
    setCourseSection,
    setEntireCourseDate,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLecture
} = viewCourseSlice

export default viewCourseSlice .reducer