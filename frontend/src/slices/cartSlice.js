import { createSlice } from "@reduxjs/toolkit";
import {toast} from 'react-hot-toast'

const initialState = {
    cart :localStorage.getItem("cart")?JSON.parse(localStorage.getItem('cart')):[],
    total:localStorage.getItem('total')?JSON.parse(localStorage.getItema('total')):0,
    totalItem : localStorage.getItem("totalItem") ? JSON.parse(localStorage.getItem('totalItem')):0
}

const cartSlice = createSlice({
    name:"cart",
    initialState,
    reducers:{
        addToCart:(state, action)=>{
            const course = action.payload
            const index = state.cart.findIndex((item)=>item._id === course._id)

            if(index >= 0){
                toast.error("Course Already added in Cart")
                return
            }
            // If the course is not in the cart, add it to the cart

            state.cart.push(course)
            //Update the total quantity
            state.toastItem++
            //update the total price
            state.total += course.price
            // update to localStorage
            localStorage.setItem("cart", JSON.stringify(state.cart))
            localStorage.setItem('total', JSON.stringify(state.total))
            localStorage.setItem("totalItem", JSON.stringify(state.totalItem))
            // show Toast
            toast.success("Course added to the cart")

        },
        removeFromCart:(state, action)=>{
            const courseId = action.payload
            const index = state.cart.findIndex((item)=>item._id === courseId )

            if(index>=0){
                //If the course is found in the cart, remove it
                state.toastItem--;
                state.total -= state.cart[index].price
                state.cart.splice(index,1)

                //update the localStorage
                localStorage.setItem("cart", JSON.stringify(state.cart))
                localStorage.setItem('total', JSON.stringify(state.total))
                localStorage.setItem("totalItem", JSON.stringify(state.totalItem))

                //show toast
                toast.success("Course remove from the cart")
            }
        },
        resetCard(state, action){
            state.cart = []
            state.total = 0;
            state.totalItem = 0

            //update the localStorage

            localStorage.removeItem('cart')
            localStorage.removeItem('total')
            localStorage.removeItem('totalItem')
        }
    }
})

export const { addToCart, removeFromCart, resetCard } = cartSlice.actions

export default cartSlice.reducer