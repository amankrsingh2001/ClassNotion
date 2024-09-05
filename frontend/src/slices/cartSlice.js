import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

const initialState = {
    totalItem : localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem('totalItem')):0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        setTotalItem(state, action){
            state.token = value.payload
        },
        addToCart(state, action){

        },
        removeFromCart(state, action){

        },
        resetCard(state, action){

        }
    }
})

export const { setTotalItem } = cartSlice.actions

export default cartSlice.reducer