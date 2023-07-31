import React from 'react'
import { useSelector } from 'react-redux'

const Cart = () => {
  const productCartItem = useSelector((state) =>state.product.cartItem)
  console.log(productCartItem)
  
  return (
    <div className='p-2 md:p-4'>
      <h2 className='text-lg md:text-2xl font-bold text-green-500'>Your Cart</h2>
      <div className=''>
        {/* Your Display Cart */}
        <div className=''>
            {/* Total Cart Items */}
        </div>
        <div className=''></div>
      </div>
    </div>
  )
}

export default Cart
