import React, { useEffect, useState } from 'react'
import { FiPlus } from 'react-icons/fi'
import { RxCross2 } from 'react-icons/rx'


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
    <div>
        <label htmlFor={name} className='field-label'>{label} <span className="text-rose">*</span></label>
        <div className='flex flex-col gap-3 sm:flex-row'>
            <input type='text'
                id={name}
                value={requirement}
                onChange={(e)=>setRequirement(e.target.value)}
                placeholder='e.g. Basic JavaScript knowledge'
                className='field'
            />
            <button type='button' className='btn btn-glass h-12 shrink-0' onClick={handleAddButton}>
                <FiPlus /> Add
            </button>
        </div>
        {
            requirementList.length > 0 && (
            <ul className='mt-4 flex flex-wrap gap-2'>
                {
                    requirementList.map((requirements, index)=>{
                      return  <li key={index} className='pill pr-1.5'>
                            <span>{requirements}</span>
                            <button type='button' aria-label={`Remove ${requirements}`} className='grid h-4 w-4 place-items-center rounded-full text-white/60 transition hover:bg-white/20 hover:text-white' onClick={(index)=>handlerRemoveButton(index)}>
                              <RxCross2 className='text-[10px]' />
                            </button>
                        </li>
                    })
                }
            </ul>
            )
        }

        {
            errors[name] && (<p className="field-error">{label} is required</p>)
        }

    </div>
  )
}

export default RequirementField
