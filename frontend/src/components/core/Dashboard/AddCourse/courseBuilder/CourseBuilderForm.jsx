import { useForm } from 'react-hook-form';
import IconBtn from '../../../../Common/IconBtn';
import { IoMdAddCircleOutline } from "react-icons/io";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { BiRightArrow } from "react-icons/bi";
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/courseDetail';
import { setLoading } from '../../../../../slices/authSlice';
import NestedView from './NestedView';




const CourseBuilderForm = () =>{

    const {register, handleSubmit, setValue, formState:{errors}} = useForm()
    const [editSectionName, setEditSectionName] = useState(null)
    const [loading , setLaoding]  = useState(false)
    const {course} = useSelector(state => state.course)
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()
    


    

        const onSubmit = async(data) =>{
            setLaoding(true)
            let result;
            if(editSectionName){
                result = await updateSection({ sectionName:data.sectionName, sectionId : editSectionName, courseId:course._id }, token)
                if(result){
                    const updateCourse = course?.courseContent.map((section)=>{
                        if(section._id === result._id){
                           return {...section = result}
                        }else{
                            return {...section}
                        }
                    })

                   const courseNew =  {...course,courseContent:updateCourse}
                    dispatch(setCourse(courseNew))
                    setEditSectionName(null)
                    setValue('sectionName','')
                    return;
                }
            }else{
                    result = await createSection({
                    sectionName:data.sectionName,
                    courseId : course._id
                 },token)
            }
            if(result){
                dispatch(setCourse(result))
                setEditSectionName(null)
                setValue('sectionName','')
            }
            setLoading(false)
        }


        const cancelEdit = () =>{
            setEditSectionName(null)
            setValue('sectionName', '');
        }

        const goBack = () =>{
            dispatch(setStep(1))
            dispatch(setEditCourse(true))
        }

        const goToNext = () =>{
            if(course.courseContent.length===0){
                toast.error("Please add at least one section")
                return;
            }
            if(course.courseContent.some((section)=>section.subSection.length===0)){
                toast.error("please add addleast lecture in each section")
                return
            }
            dispatch(setStep(3));

        }

        const handleChangeEditSectionName = (sectionId, sectionName) =>{
            if(editSectionName === sectionId){
                cancelEdit()
                return;
            }
            setEditSectionName(sectionId)
            setValue("sectionName", sectionName)
        }

    return <div className="rounded-md w-11/12 border-richblack-300 border-2 bg-[#161D29] p-4 mt-8 flex flex-col gap-4">
            <p className='text-3xl mt-4 font-bold'>Course Builder</p>
            <form className='flex flex-col ' onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col gap-2 px-2' >
                    <label  className='font-[#F1F2FF]' htmlFor='sectionName'>Section name</label>
                    <input id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName",{ required:true })}
                         className='w-full p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]'
                    />{
                        errors.sectionName && (
                            <span  className="text-[#EF476F]" >Section name is required</span>
                        )
                    }
                </div>

                <div className='mt-10 px-2'>
                    <button type='submit' className='border-2 py-2 px-3 text-yellow-50 border-yellow-50 rounded-md inline-block' >
                        {editSectionName ?"Edit Section Name":"Create Section"}  <IoMdAddCircleOutline className='inline mb-[1px]'/></button>
                   
                        {
                            editSectionName && (
                                <button type='button'
                                    onClick={cancelEdit}
                                    className='text-sm text-richblack-300'
                                >Cancel Edit</button>
                            )
                        }
                </div>
            </form>



            { course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )}
            <div className='flex justify-end gap-x-4 py-2'>
                <button className='bg-white text-[#161D29] p-2 border-2 rounded-md border-richblack-400' onClick={goBack}>Back</button>
                <button onClick={goToNext} className='border-2 border-yellow-50 p-2 rounded-md text-yellow-50'>Next
                <BiRightArrow className='inline mb-1' />

                </button>
            </div>
                 

    </div>
}

export default CourseBuilderForm