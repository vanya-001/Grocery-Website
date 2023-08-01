import React from 'react'
import {AiOutlineMinus, AiOutlinePlus, AiTwotoneDelete} from 'react-icons/ai'
import { useDispatch } from 'react-redux'
import { deleteCardItem, increaseQty, decreaseQty } from '../redux/productSlice'

const CartProduct = ({id, name, image, category, price, qty, total}) => {

  const dispatch = useDispatch()

  return (
    
    <div className='bg-green-200 p-2 flex gap-4 rounded border border-green-400'>
      <div className='bg-white p-3 rounded overflow-hidden'>
        <img src={image} alt="Loading" className='h-28 w-40 object-cover'/>
      </div>
      <div className='flex flex-col gap-1 w-full'>
        <div className='flex justify-between'>
          <h3 className='font-semibold text-green-900 text-left capitalize text-lg md:text-xl'>{name}</h3>
          <div className='cursor-pointer hover:text-red-700' onClick={()=>dispatch(deleteCardItem(id))}>
            <AiTwotoneDelete />
          </div>
          </div>
          <p className='text-left text-slate-500 font-medium text-medium '>{category}</p>
          <p className='font-bold text-base text-green-700'><span className='text-red-400'>₹</span>{price}</p>
        
            <div className='flex justify-between '>
                <div className='flex gap-3 items-center'>
                <button onClick={() => dispatch(increaseQty(id))} className='bg-green-400 py-1 mt-1 rounded hover:bg-green-500 p-1'><AiOutlinePlus/></button>
                <p className='font-semibold p-1'>{qty}</p>
                <button onClick={()=> dispatch(decreaseQty(id))} className='bg-green-400 py-1 mt-1 rounded hover:bg-green-500 p-1' ><AiOutlineMinus/></button>
                </div>
                <div className='flex items-center gap-2 font-bold '>
                    <p>Total : ₹{total}</p>
                </div>
            </div>
        </div>    
    </div>
  )
}

export default CartProduct
