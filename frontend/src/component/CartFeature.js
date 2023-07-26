import React from 'react'

const CartFeature = ({image, name, price, category}) => {
  return (
    <div className='w-full min-w-[200px] bg-white hover:shadow-lg drop-shadow-lg px-4 pt-5 cursor-pointer flex flex-col'>
        <div className='h-28 flex flex-col justify-center items-center'>
            <img src={image} className='h-full' />
        </div>
        <h3 className='font-semibold text-slate-600 capitalize text-lg mt-4'>{name}</h3>
        <p className=' text-slate-500 font-m'>{category}</p>
        <p className=' text-slate-700 font-bold'><span className='text-red-400'>₹</span>{price}</p>
        <button className='bg-yellow-500 py-1 my-2 '>Add Cart</button>
    </div>
  )
}

export default CartFeature
