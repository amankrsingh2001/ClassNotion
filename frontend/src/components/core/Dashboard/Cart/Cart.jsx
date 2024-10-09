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
            navigate('/dashboard')
        }
    }, [user.accountType, navigate])

    return <div className="text-[#F1F2FF]  min-h-[calc(100vh-12.5rem)] flex  flex-col gap-4 px-4 mt-8 mb-8 ">
      <div className="w-11/12 px-8 flex flex-col gap-3">
      <h1 className="text-white text-3xl">My WishList</h1>
        <p className="mb-4">{totalItem} Courses in cart</p>
        <hr className="border-[1px] border-richblack-800"/>
      </div>
      {
        total>0 ? (<div className="flex justify-around">
            <RenderCartCourses cart={cart}/> 
            <RenderTotalAmount cart={cart}/>
        </div>
        ) :(<p className="w-11/12 ml-10">Your Cart is Empty</p>)
       }
    </div>
}
export default Cart