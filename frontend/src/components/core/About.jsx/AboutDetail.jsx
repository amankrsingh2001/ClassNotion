const Details = [
    {
        count:"5K",
        name:"Active Students"
    },
    {
        count:"10+",
        name:"Mentors"
    },
    {
        count:"200+",
        name:"Courses"
    },
    {
        count:"50+",
        name:"Awards"
    },
]

const AboutDetail = () =>{
    return <div className="text-white flex gap-10 justify-evenly items-center py-14">
        {
            Details.map((detail, index)=>{
                return (<div key={index}>
                    <h1 className="text-4xl tracking-wide text-center">{detail.count}</h1>
                    <p className="tr text-sm tracking-wider text-[#585D69] py-2 text-center"> {detail.name}</p>
                </div>)
            })
        }
    </div>
}

export default AboutDetail