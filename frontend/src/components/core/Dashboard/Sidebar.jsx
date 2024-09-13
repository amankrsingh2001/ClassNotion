import { sidebarLinks } from '../../../data/dashboard-links'
import { logOut } from '../../../services/authApi'
import { useSelector } from 'react-redux';
import SidebarLink from './SidebarLink';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../Common/ConfirmationModal';
import { useState } from 'react';
import { VscSignOut } from 'react-icons/vsc';


const Sidebar = () =>{
  
    // solve loading
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector(state=>state.profile)
    const [confirmationModal, setConfirmationModal] = useState(null)

    return <div>
    <div className='h-[calc(100vh-3.5rem)] flex flex-col min-w-[200px] border-r-richblack-700 border-t-richblack-700 border-r-[1px] bg-richblack-800 text-white py-10'>
        <div className='flex flex-col gap-2'>
            {
                sidebarLinks.map((link)=>{
                    if(link.type && user?.accountType !== link.type){
                        return null
                    }
                    return  <SidebarLink link={link} iconName = {link.icon} key = {link.id  }/>
                    
                })
            }
        </div>
        <div className='mx-auto mt-6 mb-6 h-[1px] w-10/12 bg-richblack-600'></div>

        
        <div className='flex flex-col'>
                <SidebarLink link={{name:"Settings",path:"/dashboard/setting"}} iconName ="VscSettingsGear"/>



                <button onClick={()=>setConfirmationModal({text1:"Are You Sure",
                    text2:"You will be logged Out of your Account",
                    btn1Text:"Logout",
                    btn2Text:"Cancel",
                    btn1Handler:() => dispatch(logOut(navigate)),
                    btn2Handler:() => setConfirmationModal(null),
                    disabled:false
                })}
                className='text-sm font-medium text-richblack-300'
                > <div className='flex px-8 py-2 flex-row items-center gap-x-2'>
                <VscSignOut className='text-lg'/>
                <span className='text-white' >Logout</span>
            </div></button>
               
            </div> 
        
         </div>

         {
            ConfirmationModal !==null && <ConfirmationModal  modalData={confirmationModal}/>
         }
         </div>
}

export default Sidebar