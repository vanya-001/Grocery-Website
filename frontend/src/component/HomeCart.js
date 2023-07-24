import React from 'react'

const HomeCart = ({name, image, category, price}) => {
  return (
    <div className='bg-white shadow p-2 rounded'>
      <div className='w-40 min-h-[200px]'>
        <img src={image} className='h-full w-full' />
      </div>
      <h3 className='font-semibold text-slate-600 text-center capitalize text-lg'>{name}</h3>
      <p className='text-left text-slate-500 font-m'>{category}</p>
      <p className='text-left text-slate-700 font-bold'><span className='text-red-400'>₹</span>{price}</p>
    </div>
  )
}

export default HomeCart
