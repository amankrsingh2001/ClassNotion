import React, { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { motion } from 'motion/react'
import { FiBookOpen, FiChevronRight, FiStar, FiTrendingUp, FiUsers } from 'react-icons/fi'
import { getCatalogPageData } from '../services/pageAndComponentData'
import { category } from '../services/courseDetail'
import ShowCourseCard from '../components/core/catalog/ShowCourseCard'
import CourseSlider from '../components/core/catalog/CourseSlider'
import SectionHeader from '../components/ui/SectionHeader'

const TABS = [
    { id: 'popular', label: 'Most popular' },
    { id: 'new', label: 'New' },
]

const fadeUp = {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' },
    transition: { type: 'spring', stiffness: 220, damping: 24 },
}

const Catalog = () => {
    const {catalogName } = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState('')
    const [activeTab, setActiveTab] = useState('popular')

    useEffect(()=>{
        const getCategories = async() =>{
            const res = await category()
            const category_id = res?.filter((ct)=>ct.name.split(" ").join("_").toLowerCase()=== catalogName)[0]._id
            setCategoryId(category_id)
        }
        getCategories()

    },[catalogName])

    const getCategoriesDetails = async () =>{
        try {
                const res = await getCatalogPageData(categoryId)

                setCatalogPageData(res)
        } catch (error) {
            throw(error)
        }
    }

    useEffect(()=>{
            if(categoryId){
                getCategoriesDetails()
            }
    },[categoryId])

    const selectedCategory = catalogPageData?.selectedCategory
    const categoryCourses = selectedCategory?.course

    // Purely presentational ordering for the segmented tabs
    const sortedCourses = useMemo(() => {
        if (!categoryCourses?.length) return categoryCourses
        const list = [...categoryCourses]
        if (activeTab === 'new') {
            return list.sort((a, b) => new Date(b?.createdAt || 0) - new Date(a?.createdAt || 0))
        }
        return list.sort((a, b) => (b?.studentsEnrolled?.length || 0) - (a?.studentsEnrolled?.length || 0))
    }, [categoryCourses, activeTab])

    const courseCount = categoryCourses?.length ?? 0
    const learnerCount = (categoryCourses || []).reduce((acc, c) => acc + (c?.studentsEnrolled?.length || 0), 0)
    const reviewCount = (categoryCourses || []).reduce((acc, c) => acc + (c?.ratingAndReviews?.length || 0), 0)

  return (
    <div className='w-full min-h-[calc(100vh-12.5rem)] pt-6 md:pt-10 pb-20'>
        {/* Hero */}
        <div className='container-x'>
            <motion.section
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ type: 'spring', stiffness: 220, damping: 24 }}
                className='relative overflow-hidden glass rounded-5xl'
            >
                <div aria-hidden className='pointer-events-none absolute -top-24 -right-20 w-[420px] h-[420px] rounded-full bg-magenta/25 blur-[110px]' />
                <div aria-hidden className='pointer-events-none absolute -bottom-32 left-10 w-[360px] h-[360px] rounded-full bg-violet/20 blur-[110px]' />

                <div className='relative p-6 sm:p-10 md:p-14 flex flex-col lg:flex-row lg:items-end lg:justify-between gap-10'>
                    <div className='max-w-2xl min-w-0'>
                        <nav className='eyebrow flex flex-wrap items-center gap-2'>
                            <Link to='/' className='hover:text-foreground transition-colors'>Home</Link>
                            <FiChevronRight className='text-foreground/30' />
                            <span>Catalog</span>
                            <FiChevronRight className='text-foreground/30' />
                            <span className='text-foreground/80'>{selectedCategory?.name || '…'}</span>
                        </nav>
                        {selectedCategory ? (
                            <>
                                <h1 className='mt-6 h-display text-5xl sm:text-6xl md:text-7xl text-foreground break-words'>
                                    {selectedCategory?.name}
                                </h1>
                                <p className='mt-5 text-base md:text-lg text-foreground/55 max-w-xl'>{selectedCategory?.description}</p>
                            </>
                        ) : (
                            <div className='mt-6 space-y-3'>
                                <div className='skeleton h-14 w-2/3' />
                                <div className='skeleton h-5 w-full' />
                                <div className='skeleton h-5 w-4/5' />
                            </div>
                        )}
                    </div>

                    <div className='grid grid-cols-3 gap-2 sm:gap-3 shrink-0'>
                        {[
                            { icon: FiBookOpen, value: courseCount, label: courseCount === 1 ? 'Course' : 'Courses' },
                            { icon: FiUsers, value: learnerCount, label: 'Learners' },
                            { icon: FiStar, value: reviewCount, label: 'Reviews' },
                        ].map(({ icon: Icon, value, label }) => (
                            <div key={label} className='rounded-3xl bg-foreground/[0.05] border border-foreground/10 px-4 py-4 sm:px-5 sm:min-w-[120px]'>
                                <Icon className='text-foreground/45' />
                                <p className='mt-3 text-3xl sm:text-4xl font-medium tracking-tight leading-none'>{value}</p>
                                <p className='mt-1.5 text-xs text-foreground/45'>{label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </motion.section>
        </div>

        <div className='container-x'>
            {/* section1 */}
            <motion.section {...fadeUp} className='mt-16 md:mt-20'>
                <SectionHeader
                    eyebrow='Start here'
                    title='Courses to get you started'
                    actions={
                        <div role='tablist' className='segmented'>
                            {TABS.map((tab) => (
                                <button
                                    key={tab.id}
                                    role='tab'
                                    aria-selected={activeTab === tab.id}
                                    onClick={() => setActiveTab(tab.id)}
                                    className={`segmented-item ${activeTab === tab.id ? 'segmented-item-active' : ''}`}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    }
                />
                <div className='pt-8'>
                  <CourseSlider key={activeTab} Courses={sortedCourses} />
                </div>
            </motion.section>

            {/* section 2 */}
            <motion.section {...fadeUp} className='mt-20'>
                <SectionHeader
                    eyebrow='Hand-picked'
                    title={<>Top courses in <span className='text-gradient'>{catalogPageData?.differentCategory?.name || 'other topics'}</span></>}
                />
                {catalogPageData?.differentCategory?.course?.length ? (
                    <div className='pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5'>
                        {catalogPageData?.differentCategory?.course?.slice(0, 8).map((course, index) => (
                            <ShowCourseCard key={index} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className='pt-8'>
                        <CourseSlider Courses = {catalogPageData?.differentCategory?.course}/>
                    </div>
                )}
            </motion.section>

            <motion.section {...fadeUp} className='mt-20'>
                <SectionHeader
                    eyebrow='Bestsellers'
                    title='Frequently bought'
                    subtitle='What other learners in this space are picking up right now.'
                />

                {catalogPageData?.mostSellingCourses?.length ? (
                    <div className='pt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5'>
                        {
                            catalogPageData?.mostSellingCourses?.slice(0,4).map((course, index)=>{
                                return (
                                    <ShowCourseCard  key={index} course={course} height={`h-[300px]`}/>
                                )
                            })
                        }
                    </div>
                ) : (
                    <div className='mt-8 glass p-10 flex flex-col items-center text-center gap-3'>
                        <div className='relative'>
                            <div className='absolute inset-0 -z-10 rounded-full bg-violet/40 blur-2xl' />
                            <span className='icon-circle-glass w-14 h-14'><FiTrendingUp className='text-xl' /></span>
                        </div>
                        <p className='text-lg font-medium tracking-tight'>Nothing trending yet</p>
                        <p className='text-sm text-foreground/55'>Be the first to grab a course from this category.</p>
                    </div>
                )}
            </motion.section>
        </div>
    </div>
  )
}

export default Catalog
