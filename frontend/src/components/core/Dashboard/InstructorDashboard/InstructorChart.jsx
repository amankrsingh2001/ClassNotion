import { useState } from 'react'
import {Chart, registerables} from 'chart.js'
import { useTheme } from '../../../../theme/useTheme'
import {Doughnut} from "react-chartjs-2"

Chart.register(...registerables)

const InstructorChart = ({ courses }) => {
    const [currChart, setCurrChart] = useState('students')
    const { theme } = useTheme()
    const dark = theme === 'dark'
    const panel = dark ? '#181f2a' : '#ffffff'
    const label = dark ? '#a3afbf' : '#5d6b7d'


    // Restrained categorical colors remain distinct in both themes.
    const PALETTE = ['#4474a5', '#66958a', '#b09b6c', '#7b88a4', '#a07d86', '#789bac']

    const getRandomColors = (numColors) =>{
        const colors = [];
        for(let i = 0;i<numColors; i++){
            colors.push(PALETTE[i % PALETTE.length])
        }
        return colors
    }

    //create data for chart displaying student info
    const chartDataForStudents = {
        labels:courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalStudentsEnrolled),
            backgroundColor: getRandomColors(courses.length),
            borderColor: panel,
            borderWidth: 3,
            hoverOffset: 8,
        }]
    }



    //create data for income info

    const chartDataForIncome = {
        labels:courses.map((course)=>course.courseName),
        datasets:[{
            data:courses.map((course)=>course.totalAmountGenerated),
            backgroundColor: getRandomColors(courses.length),
            borderColor: panel,
            borderWidth: 3,
            hoverOffset: 8,
        }]
    }

    // create option

    const options = {
        maintainAspectRatio: false,
        cutout: '62%',
        plugins: {
            legend: {
                position: 'bottom',
                labels: {
                    color: label,
                    usePointStyle: true,
                    pointStyle: 'circle',
                    boxWidth: 8,
                    boxHeight: 8,
                    padding: 16,
                    font: { family: 'Inter', weight: '500', size: 12 },
                },
            },
            tooltip: {
                backgroundColor: panel,
                titleColor: dark ? '#e6ebf2' : '#17202e',
                bodyColor: label,
                borderColor: dark ? '#303b4b' : '#dde3eb',
                borderWidth: 1,
                cornerRadius: 14,
                padding: 12,
                usePointStyle: true,
                titleFont: { family: 'Inter', weight: '600' },
                bodyFont: { family: 'Inter' },
            },
        },
    }

  const tabs = [
    { key: 'students', label: 'Students' },
    { key: 'income', label: 'Income' },
  ]

  return (
    <div className='glass flex h-full w-full flex-col p-5 sm:p-7'>

        <div className='flex flex-wrap items-center justify-between gap-4'>
            <div>
                <p className='eyebrow'>Insights</p>
                <p className='mt-1.5 text-xl font-medium tracking-tight'>
                    {currChart === 'students' ? 'Students per course' : 'Income per course'}
                </p>
            </div>
            <div className='segmented'>
                {tabs.map((tab) => (
                    <button
                        key={tab.key}
                        type='button'
                        onClick={()=>setCurrChart(tab.key)}
                        className={`segmented-item ${currChart === tab.key ? 'segmented-item-active' : ''}`}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
        </div>

        <div className='relative mt-6 h-[320px] w-full sm:h-[360px]'>
            {courses.length > 0 ? (
                <Doughnut data={currChart === "students" ? chartDataForStudents : chartDataForIncome}
                    options={options}
                />
            ) : (
                <div className='grid h-full place-items-center text-center text-sm text-foreground/45'>No data to chart yet</div>
            )}
        </div>

    </div>
  )
}

export default InstructorChart
