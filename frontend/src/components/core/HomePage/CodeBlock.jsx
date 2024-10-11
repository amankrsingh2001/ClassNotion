import { TypeAnimation } from "react-type-animation";
import Cpabutton from "./Cpabutton"


const CodeBlock = ({position, heading, subHeading, cpa1, cpa2, backgroundGradient,codeBlock,codeColor}) =>{
    return <div className={`flex ${position} flex-wrap my-20 justify-between gap-10`}>
        {/*section1*/}
        <div className="sm:w-[50%] flex flex-col gap-8 ">
        {heading}
        <div className="text-richblack-300 font-bold w-[80%] max-w-maxContent">
            {subHeading}
        </div>
            <div className="flex gap-7 m-7">
                <Cpabutton active={cpa1.active} linkto={cpa1.linkto}>
                    <div className="flex gap-2 items-center">
                        {cpa1.btnText }
                    </div>
                </Cpabutton>

                <Cpabutton active={cpa2.active} linkto={cpa2.linkto}>
                        {cpa2.btnText }
                </Cpabutton>
                
            </div>
   
        </div>
         {/*section-2*/}
       
       <div className="h-fit flex  text-[10px] relative w-[100%] py-2 lg:w-[500px] sm:ml-10 border-1 border-solid border-[#0E1A2D] ">
        <div className={`${backgroundGradient} h-2/3 w-1/2 rounded-2xl absolute z-[1] top-[-10px] hidden sm:block blur-2xl opacity-40 left-[-30px]` }> </div>

           <div className="relative z-[1] flex  bg-[#111E32]/40 p-4 w-full max-w-80">
           <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
                <p>1</p>
                <p>2</p>
                <p>3</p>
                <p>4</p>
                <p>5</p>
                <p>6</p>
                <p>7</p>
                <p>8</p>
                <p>9</p>
                <p>10</p>
                <p>11</p>
            </div>
                <div className={`w-[90%] flex flex-col gap-2 font-bold font-mono ${codeColor} pr-2`}>
                    <TypeAnimation sequence={[codeBlock, 2000, ""]} repeat={Infinity} cursor={true} style={{whiteSpace:"pre-line",display:"block"}} omitDeletionAnimation={true} />
                </div>
           </div>


       </div>
            

    </div>
}

{/*
     */}

// 


export default CodeBlock