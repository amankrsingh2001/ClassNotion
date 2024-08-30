import React from 'react'

export const HilightText = ({text, font="font-inter"}) => {
  return (
        <span className={`font-bold ${font} text-[#12D8FA]`}>
           {" "} {text}
        </span>
  )
}
