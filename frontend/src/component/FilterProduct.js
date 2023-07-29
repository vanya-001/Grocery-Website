import React from 'react'
import {GiForkKnifeSpoon} from 'react-icons/gi'

const FilterProduct = ({category, onClick}) => {
  return (
    <div onClick={onClick}>
      <div className='text-3xl p-5 bg-yellow-500 rounded-full'>
        <GiForkKnifeSpoon />
      </div>
      <p className='text-center font-medium my-1 capitalize'>{category}</p>
    </div>
  )
}

export default FilterProduct
