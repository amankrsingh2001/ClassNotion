import React from 'react'
import { useSelector } from 'react-redux'
import IconBtn from '../../../Common/IconBtn'

const RenderTotalAmount = ({cart}) => {
    const {total} = useSelector(state=>state.cart)

    const handlerBuyCourse = () =>{
        const course = cart.map((course)=>course._id)
        console.log(course,"Brought these courses")
        //Intergrate API to payment gateway
    }
  return (
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>

        <IconBtn text="Buy now" onclick={handlerBuyCourse} customClasses={"w-full justify-center"}/>
    </div>
  )
}

export default RenderTotalAmount