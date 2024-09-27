import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import IconBtn from '../../../Common/IconBtn'
import { buyCourse } from '../../../../services/studentFeaturesAPI'
import { useNavigate } from 'react-router-dom'

const RenderTotalAmount = ({cart}) => {
    const {total} = useSelector(state=>state.auth)
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
    <div>
        <p>Total:</p>
        <p>Rs {total}</p>

        <IconBtn text="Buy now" onclick={()=>handlerBuyCourse()} customClasses={"w-full justify-center"}/>
    </div>
  )
}

export default RenderTotalAmount