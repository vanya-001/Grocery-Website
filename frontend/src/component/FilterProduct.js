import React from 'react'
import {GiForkKnifeSpoon} from 'react-icons/gi'

const FilterProduct = ({category, onClick, isActive}) => {
  return (
    <div onClick={onClick}>
      <div className={`text-3xl p-5 rounded-full cursor-pointer ${isActive ? "bg-green-600 text-white" : "bg-yellow-500" }`}>
        <GiForkKnifeSpoon />
      </div>
      <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct
