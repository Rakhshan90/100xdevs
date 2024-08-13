import React from 'react'

const CustomButton = (props) => {
  return (
    <button className='w-full p-4 m-4 bg-blue-500 rounded-full px-6 py-3 text-white'>{props.text}</button>
  )
}

export default CustomButton