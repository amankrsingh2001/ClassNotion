import React, { useState } from 'react'
import {Chart, registerables} from 'chart.js'
import {Pie} from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({ courses }) => {
    const [currChart, setCurrChart] = useState('students')
    

    const getRandomColors = (numColors) =>{
        const colors = [];
        for(let i = 0;i<numColors; i++){
            const color = `rgb(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)})`
            colors.push(color)
        }
        return colors
    }

    

    //create data for chart displaying student info
    const chartDataForStudents = {
        labels:courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalStudentsEnrolled),
            backgroundColor: getRandomColors(courses.length)
        }]
    }



    //create data for income info
    
    const chartDataForIncome = {
        labels:courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalAmountGenerated),
            backgroundColor: getRandomColors(courses.length)
        }]
    }

    // create option

    const options = {

    }

  return (
    <div className='w-[40%] '>
       
        <div className='flex gap-4 w-fit'>
        <p className='text-2xl text-[#F1F2FF] '>Visualise:-</p>
            <button className={`${currChart === "students"? "bg-yellow-25 text-black rounded-md py-2 px-3": " py-2 px-3 bg-richblack-700 text-white rounded-md"}`} onClick={()=>setCurrChart('students')}>Student</button>
            <button className={`${currChart === "income"? "bg-yellow-25 text-black rounded-md py-2 px-3": " py-2 px-3 bg-richblack-700 text-white rounded-md"}`} onClick={()=>setCurrChart('income')}>Income</button>
        </div>

        <div className=' w-[100%] mt-6 aspect-square p-4 bg-gray-900 rounded-lg shadow-lg'>
            <Pie  data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                options={options}
            />
        </div>

    </div>
  )
}

export default InstructorChart