import React from 'react'
import { useSelector } from 'react-redux'
import CartProduct from '../component/CartProduct'
import emptyCartImage from '../image/Empty_cart.gif'

const Cart = () => {
  const productCartItem = useSelector((state) =>state.product.cartItem)
  console.log(productCartItem)

  const totalPrice = productCartItem.reduce((acc,curr) => acc + parseInt(curr.total), 0)

  const totalQty = productCartItem.reduce((acc,curr) => acc + parseInt(curr.qty), 0)

  const handlePayment = ()=>{
    console.log("Payment Button")
  }

  return (
    <>
      <div className='p-2 md:p-4 bg-white'>
        <h2 className='text-lg md:text-2xl font-bold text-green-500'>Your Cart</h2>

        { productCartItem[0] ?
          <div className='my-4 flex gap-3'>
            {/* Your Display Cart */}
            <div className='w-full max-w-3xl'>
                  {
                    productCartItem.map(el => {
                      return(
                        <CartProduct  
                          key={el._id}
                          id = {el._id}
                          name = {el.name}
                          image = {el.image}
                          category = {el.category} 
                          qty = {el.qty}
                          total = {el.total}
                          price={el.price}
                        />
                      )
                    })
                  }            
            </div>
            {/* Total Cart Items */}
            <div className='w-full max-w-md bg-white ml-auto'>
              <h2 className='bg-green-500 text-white p-2 text-lg '>Summary</h2>
              <div className='flex w-full py-2 text-lg border-b'>
                <p>Total Quantity :</p>
                <p className='ml-auto w-32 font-bold'>{totalQty}</p>
              </div>
              <div className='flex w-full py-2 text-lg border-b'>
                <p>Total Price</p>
                <p className='ml-auto w-32 font-bold'><span className='text-red-500'>₹</span>{totalPrice}</p>
              </div>
              <button className='bg-green-500 w-full text-lg font-bold py-2 text-white' onClick={handlePayment}>Payment</button>
            </div>
          </div>
          :
          <>
            <div className='flex justify-center items-center h-full w-full flex-col'>
              <img src="https://assets.materialup.com/uploads/66fb8bdf-29db-40a2-996b-60f3192ea7f0/preview.png" className='w-full max-w-2xl' alt="Loading" />
              <p className='text-green-700 text-3xl font-bold'>Empty Cart</p>
            </div>
          </>
        }
      </div>
    </>
  )
}

export default Cart
