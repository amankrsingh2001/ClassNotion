import { createSlice } from "@reduxjs/toolkit";
import {jwtDecode} from 'jwt-decode'

let token = localStorage.getItem('token')
let decodedToken = null;

if(token){
        decodedToken = jwtDecode(token);
}


const initialState = {
    signupData: null,
    loading: false,
    token:localStorage.getItem("token") ? decodedToken : null
};


// singup token setLocalStorage - 

export const authSlice = createSlice({
    name:"auth",
    initialState,
    reducers:{
        setToken(state, action){
            state.token = action.payload
        },
        
        setLoading(state, action){
            state.loading = action.payload
        },

        setSignUpData(state,action){
            state.signupData = action.payload
        }
    }
})

export const {setToken, setLoading, setSignUpData} = authSlice.actions;
export default authSlice.reducer