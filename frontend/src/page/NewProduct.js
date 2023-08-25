import React, { useState } from 'react'
import {BsCloudUpload} from 'react-icons/bs'
import ImagetoBase64 from '../utility/ImagetoBase64'
import { toast } from 'react-hot-toast'

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

  const handleSubmit = async(e) =>{
    e.preventDefault()
    console.log(data)

    const {name,image,category,price} = data

    if(name && image && category && price){
      const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/uploadProduct`, {
        method : "POST",
        headers :{
          "content-type" : "application/json"
        },
        body : JSON.stringify(data)
      })
  
      const fetchResponse = await fetchData.json()
  
      console.log(fetchResponse)
      toast(fetchResponse.message)

      setData(() =>{
        return{
          name : "",
          category : "",
          image : "",
          price : "",
          description : "",
        }
      })
    }
    else{
      toast("Enter Required Fields!")
    }  
  }

  return (
    <div className='p-4 '>
      <form className='m-auto w-full max-w-md shadow p-3 flex flex-col bg-white' onSubmit={handleSubmit}>
        <label htmlFor='name'>Name</label>
        <input type='text' name='name' value={data.name} className='bg-green-200 p-1 my-1 rounded' onChange={handleOnChange}/>

        <label htmlFor="category">Category</label>
        <select className='bg-green-200 p-1 my-1 rounded' name='category' onChange={handleOnChange} value={data.category} id='category'>
          <option value="other">Select Category</option>
          <option value="fruit">Fruit</option>
          <option value="vegetable">Vegetable</option>
          <option value="cereal">Cereal</option>
          <option value="pulses">Pulses</option>
          <option value="dietfood">Diet Food</option>
          <option value="beverages">Beverages</option>
          <option value="rice">Rice</option>
        </select>

        <label htmlFor='image'>Image
        <div className='h-full w-full bg-green-200 rounded flex items-center justify-center cursor-pointer'>
          {
            data.image ? <img src={data.image} alt='Loading' className='h-full w-full rounded'/> : <span className='text-8xl'><BsCloudUpload/></span>
          }
        <input type='file' accept='image/*' id='image' className='hidden' onChange={uploadImage}/>
        </div>
        </label>

        <label htmlFor='price' className='my-1'>Price</label>
        <input type="text" value={data.price} name='price' onChange={handleOnChange}  className='bg-green-200 p-1 my-1 rounded'/>

        <label htmlFor='description'>Description</label>
        <textarea value={data.description} rows="3" name='description' onChange={handleOnChange} className='bg-green-200 p-1 my-1 rounded'></textarea>

        <div className='flex items-center justify-center'>
          <button className='w-20 text-white my-2 bg-green-500 hove:bg-green-600 rounded drop-shadow text-lg'>Save</button>
        </div>
      </form>
    </div>
  )
}

export default NewProduct
