import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    courseSection:[],
    courseEntireData:[],
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
        setEntireCourseData:(state, action) =>{
            state.courseEntireData = action.payload
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
    setEntireCourseData,
    setTotalNoOfLectures,
    setCompletedLectures,
    updateCompletedLecture
} = viewCourseSlice.actions

export default viewCourseSlice .reducer