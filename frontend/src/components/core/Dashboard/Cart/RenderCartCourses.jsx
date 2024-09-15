import axios from 'axios'
import React, { useState } from 'react'
import { courseApi } from '../../../../services/api'
import { useDispatch, useSelector } from 'react-redux'
import ReactStars from 'react-stars'
import { FaRegStar } from "react-icons/fa";
import { IoIosStar } from "react-icons/io";
import { removeFromCart } from '../../../../slices/cartSlice'


const RenderCartCourses = ({cart}) => {
    const [averageRating, setAverageRating] = useState(0)
    const {GET_AVERAGE_RATING} = courseApi
     const dispatch = useDispatch()   
    const {token} = useSelector(state => state.auth)

    const getAverageRating = async() =>{
        const response = await axios.get(GET_AVERAGE_RATING,cart.course.id,{
            header:{
                "Authorization": `Bearer ${token}`
            }
        })
    }

  return (
    <div>
        {
            cart.map((course, index)=>{
                            return  <div key={index}>
                        <div>
                            <img src={course.thumbnail}/>
                            <div>
                                <p>{course?.courseName}</p>
                                <p>{course?.category?.name}</p>
                                <div>
                                <span>{averageRating || 4.0 }</span>
                            <ReactStars 
                                count={5}
                                size={20}
                                edit={false}
                                activeColor = "ffd700"
                                emptyIcon = {<FaRegStar />}
                                fullIcon ={<IoIosStar />}
                            />
                            <span>{course?.ratingAndReviews?.length}</span>
                                </div>
                            </div>
                            <div>
                                <button onClick={()=>dispatch(removeFromCart(course._id))}>Remove <span><MdDeleteForever /></span></button>
                                <p>Rs {course?.price}</p>
                            </div>
                            
                        </div>
                    </div>
            })
        }
    </div>
  )
}

export default RenderCartCourses