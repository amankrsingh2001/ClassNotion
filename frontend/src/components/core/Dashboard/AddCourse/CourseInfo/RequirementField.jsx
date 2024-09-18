import React, { useEffect, useState } from 'react'


const RequirementField = ({name, label, register, errors, setValue, getValues}) => {
    const [requirement, setRequirement] = useState('')
    const [requirementList, setRequirementList] = useState([]);



    const handleAddButton = (e) =>{
        if(requirement){
            e.preventDefault()
            setRequirementList([...requirementList, requirement])
            setRequirement("")
        }
    }

    const handlerRemoveButton = (index) =>{
        const updatedRequirementList = [...requirementList]
        updatedRequirementList.splice(index, 1);
        setRequirementList(updatedRequirementList)
    }

    useEffect(()=>{
        register(name,{
            required:true,
            validate : (value) =>value.length > 0
        })
    },[])

    useEffect(()=>{
        setValue(name, requirementList);
    },[requirementList])


  return (
    <div className='flex flex-col gap-2 px-2'>

        <label htmlFor={name}  className='font-[#F1F2FF]' >{label}<span className="text-[#EF476F]"> *</span> </label>
        <div className='gap-4 flex flex-col'>
            <input type='text'
                id={name}
                value={requirement}
                onChange={(e)=>setRequirement(e.target.value)}
                className=' w-full  p-3 rounded-md bg-[#2C333F] outline-none text-[#F1F2FF]'
            />
           
        </div>
        {
            requirementList.length > 0 && (
            <ul className='flex  gap-4 '>
                {
                    requirementList.map((requirements, index)=>{
                      return  <li className='text-[#F1F2FF]' key={index}  >
                            <span className='text-white mr-4'>{requirements}</span>
                            <button type='button' className='text-richblack-400 text-sm' onClick={(index)=>handlerRemoveButton(index)}>Clear</button>
                        </li>
                    })
                }
            </ul>
            )
        }
        
        <button type='button' className='bg-yellow-50  w-[12%] py-2 rounded-md text-[#2C333F]' onClick={handleAddButton}>
                    Add
            </button>


           

            {
            errors[name] && (<span  className="text-[#EF476F]" >{label} is  required</span>)
        }

    </div>
  )
}

export default RequirementField