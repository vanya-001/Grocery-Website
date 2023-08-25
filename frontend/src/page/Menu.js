import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import AllProduct from '../component/AllProduct'
import { addCartItem } from '../redux/productSlice'

const Menu = () => {
  const {filterby} = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const productData = useSelector(state => state.product.productList)
  
  const productDisplay = productData.filter(el => el._id === filterby)[0]
  // console.log(productDisplay)

  if (!productDisplay) {
    return <div>Loading...</div>;
  }

  const handleAddCart = (e) =>{
    dispatch(addCartItem(productDisplay))
  }

  const handleBuyNow = () =>{
    dispatch(addCartItem(productDisplay))
    navigate("/cart")
  }

  return (
    <div className='p-2 md:p-4'>
      <div className='w-full max-w-4xl bg-white m-auto md:flex'>
        <div className='w-60 min-h-[200px] max-w-sm overflow-hidden p-5'>  
          <img src={productDisplay.image} alt={productDisplay.name} className='hover:scale-105 transition-all h-full w-full' />
        </div>
        <div className='flex flex-col gap-1'>
          <h3 className='font-semibold text-slate-600 text-left capitalize text-2xl md:text-4xl'>{productDisplay.name}</h3>
          <p className='text-left text-slate-500 font-medium text-2xl'>{productDisplay.category}</p>
          <p className='font-bold md:text-2xl'><span className='text-red-400'>₹</span>{productDisplay.price}</p>
          <div className='flex gap-3'>
            <button className='bg-yellow-500 py-1 my-3 rounded hover:bg-yellow-600 min-w-[100px]' onClick={handleBuyNow}>Buy Now</button>
            <button className='bg-yellow-500 py-1 my-3 rounded hover:bg-yellow-600 min-w-[100px]' onClick={handleAddCart}>Add Cart</button>
          </div>
          <div>
            <p className='text-slate-500 font-medium'>Description : </p>
            <p>{productDisplay.description}</p>
          </div>          
        </div>
      </div>
      <AllProduct heading={"Related Product"}/>
    </div>
  )
}

export default Menu
