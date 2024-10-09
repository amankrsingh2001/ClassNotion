import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../Common/IconBtn'
import { buyCourse } from '../../../../services/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = ({cart}) => {
    const {total} = useSelector(state=>state.cart)
    const {token} = useSelector(state=>state.auth)
    const {user} = useSelector(state=>state.profile)
    
    const navigate = useNavigate()
    const dispatch = useDispatch()

    console.log(cart)

    const handlerBuyCourse = () =>{
        const courseId = cart.map((course)=>course._id)
        buyCourse([courseId],token, user, navigate, dispatch)

    }
  return (
    <div className='flex flex-col bg-richblack-800 w-[22%] h-[220px]  px-12 py-6 rounded-md gap-3'>
        <p className='text-sm'>  Total:</p>
        <p className='text-3xl text-yellow-25'>Rs {total}</p>
        <strike className="text-[#838894]">Rs {total + 500}</strike>

        <button onclick={()=>handlerBuyCourse()} className='text-black bg-yellow-50 p-2 rounded-md'>Buy Now</button>
    </div>
  )
}

export default RenderTotalAmount