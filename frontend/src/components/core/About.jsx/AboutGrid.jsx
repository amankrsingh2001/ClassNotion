import { Link } from "react-router-dom"
import { HilightText } from "../HomePage/HilightText"

const LearningGridArray = [
    {
        order:-1,
        heading:"World-Class Learning for",
        hilightText:"Anyone, AnyWhere",
        description:"classnotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relative online learning to individuals and organizations worldwide.",
        BtnText:"Learn More",
        BtnLink:'/'
    },
    {
        order:1,
        heading:"Curriculum Based on Industry Needs",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs"
    },
    {
        order:2,
        heading:"Our Learning Methods",
        description:"Classnotion partners with more than 275+ leading universities and companies to bring",

    },
    {
        order:3,
        heading:"Certification",
        description:"Classnotion partners with more than 275+ leading universities and companies to bring"
    },
    {
        order:4,
        heading:"Rating 'Auto-grading'",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs"
    },
    {
        order:5,
        heading:"Ready to Work",
        description:"Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs"
    }
]

const AboutGrid = () =>{
    return <div className="w-10/12  text-white  grid-cols-1 grid lg:grid-cols-4 p-12">
        {
            LearningGridArray.map((card, index)=>{
                return <div key={index}
                className={`${index === 0 && 'lg:col-span-2 bg-transparent'} 
                   ${card.order % 2 === 1 ?'bg-richblack-700':'bg-richblack-800'}
                   ${card.order === 3 && 'lg:col-start-2'}
                `}
                >
                    {

                        card.order < 0 ?( 
                        <div className="py-4 flex flex-col gap-4">
                            <div >
                                <h1 className="text-md lg:text-4xl">{card.heading}</h1>
                                <HilightText font={'text-md lg:text-4xl'} text={card.hilightText}/>
                            </div>
                            <p className="text-[#838894] text-sm lg:text-lg font-inter text-start">{card.description}</p>
                            <Link to={card.BtnLink}>
                                <button className="bg-yellow-100 py-2 px-3 rounded-md text-black">{card.BtnText }</button>
                            </Link>
                        </div>
                        ):(
                            <div className="flex flex-col justify-evenly mb-20 h-[250px] gap-10 px-6">
                                <h1 className="text-xl text-start text-white font-bold">{card.heading}</h1>
                                <p className="  text-sm text-start text-[#AFB2BF]">{card.description}</p>
                            </div>
                         )
                    }

                 </div>
            })
        }
    </div>
}

export default AboutGrid