import { Link } from "react-router-dom"
import { FiArrowUpRight, FiBookOpen, FiLayers, FiAward, FiStar, FiBriefcase } from "react-icons/fi"
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

const ICONS = [FiBookOpen, FiLayers, FiAward, FiStar, FiBriefcase]

const AboutGrid = () =>{
    return <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {
            LearningGridArray.map((card, index)=>{
                const Icon = ICONS[(index - 1 + ICONS.length) % ICONS.length]
                return <div key={index}
                className={`${index === 0 ? 'md:col-span-2 lg:row-span-2' : ''}`}
                >
                    {
                        card.order < 0 ?(
                        <div className="glass-strong relative overflow-hidden h-full min-h-[280px] flex flex-col justify-between gap-8 p-7 md:p-10">
                            <span aria-hidden="true" className="pointer-events-none absolute -top-20 -left-16 w-72 h-72 rounded-full bg-magenta/25 blur-3xl" />
                            <span aria-hidden="true" className="pointer-events-none absolute -bottom-24 right-0 w-72 h-72 rounded-full bg-violet/25 blur-3xl" />
                            <p className="relative eyebrow">Why ClassNotion</p>
                            <div className="relative flex flex-col gap-5">
                                <h2 className="h-display text-3xl md:text-5xl text-white">
                                    {card.heading}{" "}
                                    <HilightText text={card.hilightText}/>
                                </h2>
                                <p className="text-white/55 text-base lg:text-lg max-w-lg">{card.description}</p>
                                <div>
                                    <Link to={card.BtnLink} className="btn btn-primary btn-lg">
                                        {card.BtnText} <FiArrowUpRight />
                                    </Link>
                                </div>
                            </div>
                        </div>
                        ):(
                            <div className="glass card-hover h-full min-h-[220px] flex flex-col gap-5 p-6">
                                <div className="flex items-center justify-between">
                                    <span className="icon-circle-glass w-10 h-10">
                                        <Icon className="text-base" />
                                    </span>
                                    <span className="text-sm font-medium text-white/35 tabular-nums">
                                        {String(card.order).padStart(2, "0")}
                                    </span>
                                </div>
                                <div className="mt-auto flex flex-col gap-2">
                                    <h3 className="text-lg font-medium tracking-tight text-white leading-snug">{card.heading}</h3>
                                    <p className="text-sm text-white/55 leading-relaxed">{card.description}</p>
                                </div>
                            </div>
                         )
                    }
                 </div>
            })
        }
    </div>
}

export default AboutGrid
