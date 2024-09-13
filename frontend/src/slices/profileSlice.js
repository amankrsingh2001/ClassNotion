import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    user:JSON.parse(localStorage.getItem('user')),
    loading:false,
    // JSON.parse(localStorage.getItem('user')),

}

const profileSlice = createSlice({
    name:"profile",
    initialState,
    reducers:{
        setUser(state,action){
            state.user = action.payload
        },
        setLoading(state, action){
            state.loading = action.payload
        }
    }
})

export const {setUser, setLoading} = profileSlice.actions;
export default profileSlice.reducer