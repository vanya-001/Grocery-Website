import React, { useEffect, useState } from 'react'
import FilterProduct from './FilterProduct'
import CartFeature from './CartFeature'
import { useSelector } from 'react-redux'

const AllProduct = ({heading}) => {
  const productData = useSelector((state)=>state.product.productList)

  const categoryList = [...new Set(productData.map(el => el.category))]

  const loadingArrayFeature = new Array(10).fill(null)

     //filter data
  const [filterBy, setFilterBy] = useState("")
  const [dataFilter, setDataFilter] = useState([])

  useEffect(()=>{
    setDataFilter(productData)
  },[productData])

  const handleFilterProduct = (category) =>{
    setFilterBy(category)
    const filter = productData.filter(el => el.category.toLowerCase() === category.toLowerCase())
    setDataFilter(() =>{
      return[
        ...filter
      ]
    })
  }

  return (
    <div className='my-5'>
          <h2 className='font-bold text-2xl text-green-700 mb-4'>{heading}</h2>

          <div className='flex gap-4 justify-center overflow-scroll scrollbar-none cursor-pointer'>
            {
              categoryList[0] ? categoryList.map(el => {
                return(
                  <FilterProduct 
                    category={el} 
                    key={el}
                    isActive = {el.toLowerCase() === filterBy.toLowerCase()}
                    onClick={()=> handleFilterProduct(el)} />
                )
              })
              :
              <div className='min-h-[150px] flex justify-center items-center'>
                <p>Loading...</p>
              </div>
            }
          </div>
          <div className='flex flex-wrap justify-center gap-4 my-4'>
            {
              dataFilter[0] ? dataFilter.map(el => {
                return(
                  <CartFeature 
                    key = {el._id}
                    id = {el._id}
                    image = {el.image}
                    name = {el.name}
                    category= {el.category}
                    price= {el.price}
                  />
                )
              }) 
              :
              loadingArrayFeature.map((el, index) => (
              <CartFeature key={index} loading="loading..."/>)  )
            }
          </div>
        </div>
  )
}

export default AllProduct
