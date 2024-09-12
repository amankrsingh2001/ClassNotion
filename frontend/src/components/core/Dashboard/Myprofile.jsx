import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import IconBtn from "../../Common/IconBtn"

const Myprofile = ()=>{
    const {user} = useSelector(state =>state.profile)
    const navigate = useNavigate()


    return <div className="text-white">
             
                    <h1>My Profile</h1>

                    <div className="">
                        <div>
                            <img src={user.image} alt={`profile-${user.firstName}`}
                                className="aspect-square w-[78px] rounded-full object-cover"
                            />
                            <div>
                            <p>{user?.firstName +" "+ user?.lastName }</p>
                            <p>{user.email}</p>
                            </div>
                        </div>
                        <IconBtn  text="Edit" onclick={()=>{navigate('/dashboard/settings')}}/>
                            <button onClick={()=>navigate('setting')}>Salaman clicked</button>
                       
                    </div>

                        {/* section2 */}
                        <div>
                            <div>
                            <p>About</p>
                            <IconBtn text="Edit" onclick={()=>navigate('/dashboard/setting')}/>
                            </div>
                            <p>Write something about yourself</p>
                             {/*  {user?.additionalDetail?.about} fix the above one */}
                        </div>
                        {/* section 3 */}
                        <div>
                            <div>
                            <p>Personal Details</p>
                            <IconBtn text="edit" onclick={()=>navigate('/dashboard/setting')}/>
                            </div>
                            <div>
                                <p>First Name</p>
                                <p>First Name Value</p>
                            </div>
                            <div>
                                <p>Email </p>
                                <p>Email Value</p>
                            </div>

                            <div>
                                <p>Gender </p>
                                <p>Gender Value</p>
                            </div>
                            <div>
                                <p>Last name</p>
                                <p>Last Name Value</p>
                            </div>
                            <div>
                                <p>Phone Number</p>
                                <p>Phone Number Value</p>
                            </div>
                            <div>
                                <p>Date of Birth</p>
                                <p>DOB Value</p>
                            </div>

                        </div>

    </div>
}
export default Myprofile