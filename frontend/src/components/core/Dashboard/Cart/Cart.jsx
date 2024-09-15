import { useSelector } from "react-redux"
import RenderCartCourses from "./RenderCartCourses"
import RenderTotalAmount from "./RenderTotalAmount"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"



const Cart = () =>{
    const {totalItem, total ,cart} = useSelector(state => state.cart)
    const {user} = useSelector(state =>state.profile)
    const navigate = useNavigate()


    useEffect(() => {
        if (user.accountType !== "Student") {
            navigate('/dashboard/my-profile')
        }
    }, [user.accountType, navigate])

    return <div className="text-white">
        <h1 className="text-white text-3xl">Your Cart</h1>
        <p>{totalItem} Courses in cart</p>
      {
        total>0 ? (<>
         <RenderCartCourses cart={cart}/> 
        <RenderTotalAmount cart={cart}/>
        </>
        ) :(<p>Your Cart is Empty</p>)
       }
    </div>
}
export default Cart