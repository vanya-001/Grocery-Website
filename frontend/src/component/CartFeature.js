import React from 'react'
import { Link } from 'react-router-dom'
import { addCartItem } from '../redux/productSlice'
import {useDispatch} from 'react-redux'

const CartFeature = ({image, name, price, category, loading, id}) => {
  const dispatch = useDispatch()
  const handleAddCart = (e) =>{
    e.stopPropagation()
    dispatch(addCartItem({
      _id : id,
      name : name,
      price : price,
      category : category,
      image : image
    }))
  }

  return (
    <div className='w-full min-w-[200px] max-w-[200px] bg-white hover:shadow-lg drop-shadow-lg px-4 pt-5 cursor-pointer flex flex-col'>
        {
            image ? <>
            <Link to={`/menu/${id}`} onClick={() => window.scrollTo({top: "0", behavious: "smooth"})} >
            <div className='h-28 flex flex-col justify-center items-center'>
                <img src={image} alt={name} className='h-full' />
            </div>
            <h3 className='font-semibold text-slate-600 capitalize text-lg mt-4'>{name}</h3>
            <p className=' text-slate-500 font-m'>{category}</p>
            <p className=' text-slate-700 font-bold'><span className='text-red-400'>₹</span>{price}</p>
            </Link>
            <button className='bg-yellow-500 py-1 my-3 rounded hover:bg-yellow-600 w-full' onClick={handleAddCart}>Add Cart</button>            
            </>

            :
            <div className='min-h-[150px] flex justify-center items-center'>
                <p>{loading}</p>
            </div>            
        }
    </div>
    
  )
}

export default CartFeature
