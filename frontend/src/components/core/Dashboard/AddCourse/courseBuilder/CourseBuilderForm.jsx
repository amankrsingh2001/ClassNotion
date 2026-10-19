import { useForm } from 'react-hook-form';
import IconBtn from '../../../../Common/IconBtn';
import { FiPlusCircle, FiArrowLeft, FiArrowRight } from "react-icons/fi";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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

    return <div className="glass flex flex-col gap-6 p-5 sm:p-8">
            <div className='flex flex-wrap items-end justify-between gap-3'>
                <div>
                    <p className='eyebrow'>Step 2 of 3</p>
                    <h2 className='mt-2 text-2xl font-medium tracking-tight sm:text-3xl'>Course builder</h2>
                </div>
                <span className='pill'>
                    Sections <sup className='text-white/60'>{course?.courseContent?.length || 0}</sup>
                </span>
            </div>
            <div className='divider' />
            <form className='flex flex-col gap-4' onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label className='field-label' htmlFor='sectionName'>Section name</label>
                    <input id='sectionName'
                        placeholder='Add section name'
                        {...register("sectionName",{ required:true })}
                         className='field'
                    />{
                        errors.sectionName && (
                            <p className="field-error">Section name is required</p>
                        )
                    }
                </div>

                <div className='flex flex-wrap items-center gap-3'>
                    <button type='submit' className='btn btn-primary' >
                        <FiPlusCircle className='text-base'/>
                        {editSectionName ?"Edit Section Name":"Create Section"}
                    </button>

                        {
                            editSectionName && (
                                <button type='button'
                                    onClick={cancelEdit}
                                    className='btn btn-ghost btn-sm'
                                >Cancel Edit</button>
                            )
                        }
                </div>
            </form>

            { course?.courseContent?.length > 0 && (
                <NestedView handleChangeEditSectionName={handleChangeEditSectionName}/>
            )}
            <div className='divider' />
            <div className='flex flex-wrap justify-end gap-3'>
                <button className='btn btn-glass' onClick={goBack}><FiArrowLeft /> Back</button>
                <button onClick={goToNext} className='btn btn-gradient'>Next
                <FiArrowRight />
                </button>
            </div>

    </div>
}

export default CourseBuilderForm
