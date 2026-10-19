import toast from 'react-hot-toast'
import axios from 'axios'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
import { courseApi } from '../../../../../services/api'
import { HiOutlineCurrencyRupee } from "react-icons/hi2";
import { FiArrowRight, FiChevronDown, FiSave } from "react-icons/fi";
import RequirementField from './RequirementField'
import { setCourse, setStep } from '../../../../../slices/courseSlice'
import { COURSE_STATUS } from '../../../../../utils/constants'
import CustomTag from './CustomTag'
import ThumbnailUpload from './ThumbnailUpload'
import { addCourseDetails, editCourseAPI } from '../../../../../services/courseDetail'
import { ActionBar, Checklist, CoursePreviewCard, Tips } from '../StudioParts'

const TITLE_MAX = 100
const DESC_SOFT_MAX = 300

const TIPS = [
  'Lead with the outcome: "Build a portfolio site with React" beats "React course".',
  'Write the description for one specific learner.',
  'A bright 16:9 cover with a short label stands out in the catalog.',
  'Set the price to ₹0 to offer the course for free.',
]

const Card = ({ title, description, children, aside }) => (
  <section className='cs-card'>
    <div className='cs-card-head'>
      <div>
        <h2>{title}</h2>
        {description && <p>{description}</p>}
      </div>
      {aside}
    </div>
    <div className='cs-card-body'>{children}</div>
  </section>
)

const CourseInformationForm = () => {

  const dispatch = useDispatch()
  const { course, editCourse } = useSelector(state => state.course)
  const details = course?.courseDetails || course || {}
  const { token } = useSelector(state => state.auth)
  const { register, handleSubmit, setValue, getValues, watch, formState: { errors } } = useForm({ defaultValues: {
    projectType: details.projectType || '', courseTitle: details.courseName || '', courseShortDesc: details.courseDescription || '',
    coursePrice: details.price ?? '', courseTag: details.tag || [], courseBenefits: details.whatYouWillLearn || '',
    courseCategory: details.Category?._id || details.Category || '', instructions: details.instructions || [], image: details.thumbnail || null,
  } })
  const [loading, setLoading] = useState(false)
  const [categoriesLoading, setCategoriesLoading] = useState(true)
  const [categoryError, setCategoryError] = useState(false)
  const [categoryRetry, setCategoryRetry] = useState(0)
  const [courseCategories, setCourseCategories] = useState([])

  // Live values for the preview card and checklist
  const title = watch('courseTitle', '') || ''
  const description = watch('courseShortDesc', '') || ''
  const price = watch('coursePrice')
  const categoryId = watch('courseCategory')
  const tags = watch('courseTag') || []
  const benefits = watch('courseBenefits', '') || ''
  const instructions = watch('instructions') || []
  const image = watch('image')
  const [coverUrl, setCoverUrl] = useState(typeof details.thumbnail === 'string' ? details.thumbnail : null)

  useEffect(() => {
    if (image instanceof File) {
      const url = URL.createObjectURL(image)
      setCoverUrl(url)
      return () => URL.revokeObjectURL(url)
    }
    setCoverUrl(typeof image === 'string' ? image : null)
  }, [image])

  useEffect(() => {
    let active = true
    setCategoriesLoading(true)
    setCategoryError(false)
    axios.get(courseApi.GET_ALL_COURSE_CATEGORY, { headers: { Authorization: `Bearer ${token}` } })
      .then(response => { if (active) setCourseCategories(response.data.allCategory || []) })
      .catch(() => { if (active) setCategoryError(true) })
      .finally(() => { if (active) setCategoriesLoading(false) })
    return () => { active = false }
  }, [token, categoryRetry])

  const onSubmit = async data => {
    setLoading(true)
    try {
      const formData = new FormData()
      if (editCourse) formData.append('courseId', details._id)
      formData.append('projectType', data.projectType)
      formData.append('courseName', data.courseTitle.trim())
      formData.append('courseDescription', data.courseShortDesc.trim())
      formData.append('price', data.coursePrice)
      formData.append('courseTags', JSON.stringify(data.courseTag))
      formData.append('whatYouWillLearn', data.courseBenefits.trim())
      formData.append('category', data.courseCategory)
      formData.append('instructions', JSON.stringify(data.instructions))
      if (data.image instanceof File) formData.append('image', data.image)
      if (!editCourse) formData.append('status', COURSE_STATUS.DRAFT)
      const result = await (editCourse ? editCourseAPI(formData, token) : addCourseDetails(formData, token))
      if (result) { dispatch(setCourse(result)); dispatch(setStep(2)) }
    } catch { toast.error('Unable to save your course. Please try again.') }
    finally { setLoading(false) }
  }

  const categoryName = courseCategories.find(c => c?._id === categoryId)?.name
  const priceSet = price !== '' && price !== null && price !== undefined && !Number.isNaN(price)
  const checklist = [
    { label: 'Project type', done: Boolean(watch('projectType')) },
    { label: 'Course title', done: title.trim().length > 0 },
    { label: 'Short description', done: description.trim().length > 0 },
    { label: 'Category & price', done: Boolean(categoryId) && priceSet },
    { label: 'Cover image', done: Boolean(image) },
    { label: 'Learning outcomes', done: benefits.trim().length > 0 },
    { label: 'At least one requirement', done: instructions.length > 0 },
    { label: 'At least one tag', done: tags.length > 0 },
  ]
  const remaining = checklist.filter(item => !item.done).length

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data" className='cs-workspace'>
      <div className='cs-main'>

        <Card title='What are you building?' description='Choose the project learners will create before adding course details.'>
          <label htmlFor='projectType' className='field-label'><span>Project type<span className='cs-req'>*</span></span></label>
          <select id='projectType' className='field' {...register('projectType', { required: true })}>
            <option value='' disabled>Select a project type</option><option value='React'>React application</option><option value='NextJS'>Next.js application</option><option value='NodeJS'>Node.js application / API</option><option value='Python'>Python project</option><option value='Other'>Other project</option>
          </select>
          {errors.projectType && <p className='field-error'>Choose what learners will build.</p>}
        </Card>
        <Card title='Basics' description='What learners see first when they browse the catalog.'>
          <div>
            <label htmlFor='courseTitle' className='field-label'>
              <span>Course title<span className='cs-req'>*</span></span>
              <span className={`cs-label-meta ${title.length >= TITLE_MAX ? 'is-over' : ''}`}>{title.length}/{TITLE_MAX}</span>
            </label>
            <input maxLength={TITLE_MAX} id='courseTitle' placeholder='e.g. React from the ground up'
              {...register('courseTitle',{required:true, validate: value => value.trim().length > 0, maxLength:TITLE_MAX}) }
              className='field'
            />
            {errors.courseTitle && <p className="field-error">Add a course title.</p>}
          </div>

          <div>
            <label htmlFor='courseShortDesc' className='field-label'>
              <span>Short description<span className='cs-req'>*</span></span>
              <span className={`cs-label-meta ${description.length > DESC_SOFT_MAX ? 'is-over' : ''}`}>{description.length}/{DESC_SOFT_MAX}</span>
            </label>
            <textarea id='courseShortDesc'
              placeholder='Who is this course for, and what will they be able to do afterwards?'
              {...register('courseShortDesc',{required:true})}
              className='field'
            />
            {errors.courseShortDesc ? <p className="field-error">Add a short description.</p> : <p className='cs-hint'>Two or three sentences work best.</p>}
          </div>

          <div className='cs-grid-2'>
            <div>
              <label htmlFor='courseCategory' className='field-label'><span>Category<span className='cs-req'>*</span></span></label>
              <div className='cs-input-icon'>
                <select id='courseCategory' disabled={categoriesLoading} className='field [&>option]:bg-surface-2' {...register("courseCategory",{required:true})}>
                  <option value="" disabled>{categoriesLoading ? 'Loading categories…' : 'Choose a category'}</option>
                  {!categoriesLoading && courseCategories.map((category, index) => (
                    <option key={index} value={category?._id}>{category?.name}</option>
                  ))}
                </select>
                <FiChevronDown />
              </div>
              {errors.courseCategory && <p className="field-error">Choose a category.</p>}
              {categoryError && <p className='field-error'>Categories couldn’t load. <button type='button' onClick={() => setCategoryRetry(value => value + 1)} className='underline'>Try again</button></p>}
            </div>

            <div>
              <label htmlFor='coursePrice' className='field-label'><span>Price<span className='cs-req'>*</span></span><span className='cs-label-meta'>₹0 = free</span></label>
              <div className='cs-input-icon'>
                <HiOutlineCurrencyRupee />
                <input id='coursePrice' type='number' min='0' step='0.01' placeholder='0.00'
                  {...register('coursePrice',{required:true, valueAsNumber:true, min:0}) }
                  className='field has-icon'
                />
              </div>
              {errors.coursePrice && <p className="field-error">Enter a price of ₹0 or more.</p>}
            </div>
          </div>
        </Card>

        <Card title='Cover image' description='Shown on the course card and the course page. 16:9, at least 1024 × 576 px.'>
          <ThumbnailUpload
            name = 'image'
            label = 'Browse'
            register = {register}
            errors = {errors}
            setValue = {setValue}
            getValues = {getValues}
            editData = {details.thumbnail}
          />
        </Card>

        <Card title='Learning outcomes' description='Set expectations so the right learners enrol.'>
          <div>
            <label htmlFor='courseBenefits' className='field-label'><span>What will learners be able to do?<span className='cs-req'>*</span></span></label>
            <textarea id='courseBenefits' className='field' placeholder={'e.g.\nBuild and deploy a React app\nManage state with hooks\nWrite reusable components'}
             {...register('courseBenefits', {required:true})} />
            {errors.courseBenefits ? <p className="field-error">Describe what learners will achieve.</p> : <p className='cs-hint'>Tip: put one outcome per line.</p>}
          </div>

          <RequirementField
            name= 'instructions'
            label = "Requirements"
            register = {register}
            errors = {errors}
            setValue = {setValue}
            getValues = {getValues}
          />
        </Card>

        <Card title='Discovery' description='Tags help learners find your course in search.'>
          <CustomTag
            label='Tags'
            name="courseTag"
            placeholder = "e.g. react, frontend, hooks"
            register = {register}
            errors = {errors}
            setValue = {setValue}
            getValues = {getValues}
          />
        </Card>

        <ActionBar hint={remaining === 0 ? <><b>All set.</b> Next: build your curriculum.</> : <><b>{remaining}</b> {remaining === 1 ? 'item' : 'items'} left before you can continue.</>}>
          <button type='submit' disabled={loading || categoriesLoading || categoryError} className='btn btn-primary'>
            {loading ? <><FiSave /> Saving…</> : <>Save & continue <FiArrowRight /></>}
          </button>
        </ActionBar>
      </div>

      <aside className='cs-aside'>
        <CoursePreviewCard
          cover={coverUrl}
          category={categoryName}
          title={title.trim()}
          description={description.trim()}
          price={price}
          tags={tags}
        />
        <Checklist title='Course details' items={checklist} />
        <Tips tips={TIPS} />
      </aside>
    </form>
  )
}

export default CourseInformationForm
