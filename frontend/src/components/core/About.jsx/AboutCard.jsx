const AboutCard = ({heading, description1, description2, textColor}) =>{
    return <div className="text-white flex flex-col lg:w-[34%] lg:gap-5 gap-3 lg:p-4 py-4">
            <h1 className={`text-start text-4xl font-bold ${textColor}`}>{heading}</h1>
            <div>
            <p className="text-[#838894]"> {description1}</p>
             <br/>{
                description2 !== '' && 
                 <p className="text-[#838894]">{description2}</p>
             }
            
            </div>
    </div>
}

export default AboutCard