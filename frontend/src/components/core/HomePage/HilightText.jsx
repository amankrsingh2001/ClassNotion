import React from 'react'

export const HilightText = ({text, font="font-inter", color}) => {
  console.log(color)
  return (
        <span className={`${font} ${color}`}>
          {text}
        </span>
  )
}
