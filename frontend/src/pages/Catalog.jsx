import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { getCatalogPageData } from '../services/pageAndComponentData'
import { category } from '../services/courseDetail'
import ShowCourseCard from '../components/core/catalog/ShowCourseCard'
import CourseSlider from '../components/core/catalog/CourseSlider'



const Catalog = () => {
    const {catalogName } = useParams()
    const [catalogPageData, setCatalogPageData] = useState(null)
    const [categoryId, setCategoryId] = useState('')

 

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
            console.log(error)
        }
    }

        

    useEffect(()=>{
            if(categoryId){
                getCategoriesDetails()
            }
    },[categoryId])

  return (
    <div className='text-white min-h-[calc(100vh-12.5rem)]'>
        <div>
            <p>{'Home / Catalog / '}<span className='text-yellow-50'>{catalogPageData?.selectedCategory?.name}</span></p>
            <p> <span className='text-yellow-50'>{catalogPageData?.selectedCategory?.name}</span></p>
            <p><span className='text-yellow-50'>{catalogPageData?.selectedCategory?.description}</span></p>
        </div>

        <div>
            {/* section1 */}
            <div>
                <div>Courses to get you started</div>
                <div className='flex'>
                    <p>Most popular course</p>
                    <p>New </p>
                </div>
                <div>

                <CourseSlider Courses={catalogPageData?.selectedCategory?.course} />
                </div>
            </div>

            {/* section 2 */}
            <div>
                <div>Top courses in {catalogPageData?.selectedCategory?.name}</div>
                <CourseSlider Courses = {catalogPageData?.differentCategory?.course}/>
            </div>

            <div>
                <div>Frequently Bought</div>
                    <div className='py-8'>
                        <div className='grid grid-cols-1 lg:grid-cols-2'>
                            {
                                catalogPageData?.mostSellingCourses?.slice(0,4).map((course, index)=>{
                                    return (
                                        <ShowCourseCard  key={index} course={course} height={`h-[400px]`}/>
                                    )
                                })
                            }
                        </div>

                    </div>
            </div>
        </div>
    </div>
  )
}

export default Catalog