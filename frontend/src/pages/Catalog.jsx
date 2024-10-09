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
    <div className='text-white w-full min-h-[calc(100vh-12.5rem)] flex justify-center items-center flex-col mb-16'>
         <div className='bg-[#161D29] w-full flex justify-center items-center py-8 '>
            <div className='w-11/12 max-w-maxContent'>
            <p className='font-inter text-md text-[#999DAA]'>{'Home / Catalog / '}<span className='text-yellow-50 font-medium'>{catalogPageData?.selectedCategory?.name}</span></p>
                <p className='text-3xl mt-3'> <span className='text-[#F1F2FF]'>{catalogPageData?.selectedCategory?.name}</span></p>
                 <p className='mt-2'><span className='text-[#999DAA]'>{catalogPageData?.selectedCategory?.description}</span></p>

            </div>
              
        </div>
        <div className='w-11/12  max-w-maxContent'>
        <div>
            {/* section1 */}
            <div className='mt-16'>
                <div className='mt-6 mb-2'>
                    <p className='text-2xl font-inter'>Courses to get you started</p>
                </div>
                <div className='flex py-2 text-sm ml-4 gap-4'>
                    <p className=''>Most popular</p>
                    <p>New </p>
                    <p>Trending</p>
                </div>
                <hr className='w-full items-center border-[#424854] h-[1px]'/>
                <div className='py-4 '>
                  <CourseSlider Courses={catalogPageData?.selectedCategory?.course} />
                </div>
            </div>

            {/* section 2 */}
            <div className='py-4 '>
                <div className='text-2xl py-4'>Top courses in <span className='text-yellow-50'>{catalogPageData?.selectedCategory?.name} </span> </div>
                <CourseSlider Courses = {catalogPageData?.differentCategory?.course}/>
            </div>

            <div className='py-4'>
                <div className='text-2xl mt-6 mb-4'>Frequently Bought Courses</div>

                        <div className='grid grid-cols-1 lg:grid-cols-2 gap-x-6 gap-y-8'>
                            {
                                catalogPageData?.mostSellingCourses?.slice(0,4).map((course, index)=>{
                                    return (
                                        <ShowCourseCard  key={index} course={course} height={`h-[300px]`}/>
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