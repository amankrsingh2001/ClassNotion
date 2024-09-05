import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import ProfileReducer from '../slices/profileSlice'
import cartReducer from '../slices/cartSlice'

export const rootReducer = combineReducers({
    auth:authReducer,
    profile:ProfileReducer,
    cart:cartReducer
})