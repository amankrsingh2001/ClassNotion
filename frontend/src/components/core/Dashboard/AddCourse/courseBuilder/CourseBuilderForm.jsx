import LessonFolders from '../../../../studio/LessonFolders';
import { useForm } from 'react-hook-form';
import { FiPlus, FiArrowLeft, FiArrowRight, FiLayers, FiPlayCircle, FiCheck, FiX } from "react-icons/fi";
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setCourse, setEditCourse, setStep } from '../../../../../slices/courseSlice';
import toast from 'react-hot-toast';
import { createSection, updateSection } from '../../../../../services/courseDetail';
import NestedView from './NestedView';
import { ActionBar, Checklist, CoursePreviewCard, Tips } from '../StudioParts';

const TIPS = [
  'Aim for sections of 3–7 lessons, each with one clear goal.',
  'Keep lessons short — 5 to 15 minutes holds attention best.',
  'Click a lesson to preview it, or the pencil to edit it.',
  'Every section needs at least one lesson before publishing.',
]

const CourseBuilderForm = () =>{

    const {register, handleSubmit, setValue, setFocus, formState:{errors}} = useForm()
    const [editSectionName, setEditSectionName] = useState(null)
    const [loading , setLoading]  = useState(false)
    const {course} = useSelector(state => state.course)
    const {token} = useSelector(state => state.auth)
    const dispatch = useDispatch()

        const onSubmit = async(data) =>{
            setLoading(true)
            let result;

            if(editSectionName){
                result = await updateSection({ sectionName:data.sectionName, sectionId : editSectionName, courseId:course._id }, token)
                if(result){
                    const updateCourse = course?.courseContent.map((section)=>{
                        if(section._id === result._id){
                           return result
                        }else{
                            return {...section}
                        }
                    })

                   const courseNew =  {...course,courseContent:updateCourse}
                    dispatch(setCourse(courseNew))
                    setEditSectionName(null)
                    setValue('sectionName','')
                    setLoading(false)
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
                toast.error("Add at least one lesson to every section")
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
            setTimeout(() => setFocus('sectionName'), 0)
        }

    const sections = course?.courseContent || []
    const lessonCount = sections.reduce((sum, section) => sum + (section.subSection?.length || 0), 0)
    const emptySections = sections.filter(section => !section.subSection?.length).length
    const sectionError = errors.sectionName && <p className="field-error">Give the section a name.</p>

    // Inline rename form rendered inside the section header being edited
    const sectionEditor = (
        <form className='cs-inline-edit' onSubmit={handleSubmit(onSubmit)}>
            <input aria-label='Section name' {...register("sectionName",{ required:true })} className='field' placeholder='Section name' />
            <button type='submit' className='btn btn-primary' disabled={loading} aria-label='Save section name'><FiCheck /></button>
            <button type='button' className='btn btn-glass' onClick={cancelEdit} aria-label='Cancel rename'><FiX /></button>
        </form>
    )

    return <div className='cs-workspace'>
        <div className='cs-main'>
            <LessonFolders courseId={course._id} editable refreshKey={JSON.stringify(course.courseContent)} />
            <section className='cs-card'>
                <div className='cs-card-head'>
                    <div>
                        <h2>Curriculum</h2>
                        <p>Organise your course into sections, then add lessons to each one.</p>
                    </div>
                </div>
                <div className='cs-card-body !pt-4'>
                    <div className='cs-curriculum-stats'>
                        <span className='cs-stat'><FiLayers /><b>{sections.length}</b> {sections.length === 1 ? 'section' : 'sections'}</span>
                        <span className='cs-stat'><FiPlayCircle /><b>{lessonCount}</b> {lessonCount === 1 ? 'lesson' : 'lessons'}</span>
                        {emptySections > 0 && <span className='cs-stat !text-[var(--warn)] !bg-[var(--warn-soft)]'>{emptySections} {emptySections === 1 ? 'section needs' : 'sections need'} a lesson</span>}
                    </div>
                </div>
            </section>

            {sections.length === 0 && (
                <div className='cs-card cs-empty'>
                    <span><FiLayers /></span>
                    <h3>Start with your first section</h3>
                    <p>Sections group related lessons — like chapters in a book. Name it below to get going.</p>
                </div>
            )}

            {sections.length > 0 && (
                <NestedView
                    handleChangeEditSectionName={handleChangeEditSectionName}
                    editingSectionId={editSectionName}
                    sectionEditor={sectionEditor}
                    sectionError={sectionError}
                />
            )}

            {!editSectionName && (
                <form className='cs-composer-card' onSubmit={handleSubmit(onSubmit)}>
                    <p>{sections.length ? 'Add another section' : 'New section'}</p>
                    <div className='cs-composer'>
                        <div>
                            <input id='sectionName'
                                aria-label='Section name'
                                placeholder={`e.g. ${sections.length ? 'Working with APIs' : 'Getting started'}`}
                                {...register("sectionName",{ required:true })}
                                className='field'
                            />
                            {sectionError}
                        </div>
                        <button type='submit' className='btn btn-primary' disabled={loading}>
                            <FiPlus /> {loading ? 'Adding…' : 'Add section'}
                        </button>
                    </div>
                </form>
            )}

            <ActionBar hint={sections.length === 0 ? 'Add a section to begin.' : emptySections > 0 ? <><b>{emptySections}</b> {emptySections === 1 ? 'section has' : 'sections have'} no lessons yet.</> : <><b>Looks good.</b> Next: review & publish.</>}>
                <button type='button' className='btn btn-glass' onClick={goBack}><FiArrowLeft /> Back</button>
                <button type='button' onClick={goToNext} className='btn btn-primary' disabled={loading}>Review & publish <FiArrowRight /></button>
            </ActionBar>
        </div>

        <aside className='cs-aside'>
            <CoursePreviewCard
                cover={course?.thumbnail}
                category={course?.Category?.name}
                title={course?.courseName}
                price={course?.price}
                sections={sections.length}
                lessons={lessonCount}
            />
            <Checklist title='Curriculum' items={[
                { label: 'At least one section', done: sections.length > 0 },
                { label: 'At least one lesson', done: lessonCount > 0 },
                { label: 'Every section has a lesson', done: sections.length > 0 && emptySections === 0 },
            ]} />
            <Tips tips={TIPS} />
        </aside>
    </div>
}

export default CourseBuilderForm
