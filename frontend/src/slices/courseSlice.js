import { createSlice } from "@reduxjs/toolkit"


const initialState = {
    step:1,
    course:null,
    editCourse :false,
    paymentLoading :false
}

const courseSlice = createSlice({
    name :'Course',
    initialState,
    reducers:{
        setStep :(state, action) =>{
            state.setp = action.payload
        },
        setCourse : (state, action) =>{
            state.course = action.payload
        },
        setEditCourse : (state,action) =>{
            state.editCourse = action.payload
        },
        setPaymentLoading: (state,action) =>{
            state.paymentLoading = action.payload
        },
        resetCourseState:(action, payload) =>{
            state.step = 1
            state.course = null
            state.editCourse = false
        },
    },
})

export const {
    setCourse, setStep, setEditCourse, setPaymentLoading, resetCourseState
} = courseSlice.actions

export default courseSlice.reducer