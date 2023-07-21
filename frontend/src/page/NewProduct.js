import React, { useState } from 'react'
import {BsCloudUpload} from 'react-icons/bs'
import ImagetoBase64 from '../utility/ImagetoBase64'

const NewProduct = () => {

  const [data,setData] = useState({
    name : "",
    category : "",
    image : "",
    price : "",
    description : "",
  })

  const handleOnChange = (e) =>{
    const {name,value} = e.target 

    setData((preve)=>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const uploadImage = async(e) =>{
    const data = await ImagetoBase64(e.target.files[0])
    // console.log(data)

    setData((preve)=>{
      return{
        ...preve,
        image : data
      }
    })
  }

  const handleSubmit = (e) =>{
    e.preventDefault()
    console.log(data)
  }

  return (
    <div className='p-4 '>
      <form className='m-auto w-full max-w-md shadow p-3 flex flex-col bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' className='bg-green-200 p-1 my-1 rounded' onChange={handleOnChange}/>

        <label htmlFor="category">Category</label>
        <select className='bg-green-200 p-1 my-1 rounded' name='category' onChange={handleOnChange} id='category'>
          <option value="">Fruit</option>
          <option value="">Vegetable</option>
          <option value="">Cereal</option>
          <option value="">Diet Food</option>
          <option value="">Beverages</option>
        </select>

        <label htmlFor='image'>Image
        <div className='h-40 w-full bg-green-200 rounded flex items-center justify-center cursor-pointer object-cover'>
          {
            data.image ? <img src={data.image} className='h-full w-full rounded'/> : <span className='text-8xl'><BsCloudUpload/></span>
          }
        <input type='file' accept='image/*' id='image' className='hidden' onChange={uploadImage}/>
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type="text" name='price' onChange={handleOnChange}  className='bg-green-200 p-1 my-1 rounded'/>

        <label htmlFor='description'>Description</label>
        <textarea rows="3" name='description' onChange={handleOnChange} className='bg-green-200 p-1 my-1 rounded'></textarea>

        <div className='flex items-center justify-center'>
          <button className='w-20 text-white my-2 bg-green-500 hove:bg-green-600 rounded drop-shadow text-lg'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default NewProduct
