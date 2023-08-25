import React, {useState} from 'react'
import SignupImage from '../image/Login.png'
import {BiShowAlt, BiHide} from 'react-icons/bi'
import { Link, useNavigate } from 'react-router-dom'
import ImagetoBase64 from '../utility/ImagetoBase64'
import toast from 'react-hot-toast'

const Signup = () => {

  const navigate = useNavigate()

    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [data, setData] = useState({
        firstName : "",
        lastName : "",
        email : "",
        password : "",
        confirmPassword : "",
        image : ""
    })
    // console.log(data);

    const handleShowPassword = ()=>{
        setShowPassword(preve => !preve)
    }

    const handleConfirmPassword = () =>{
        setShowConfirmPassword(preve => !preve)
    }

    const handleOnChange = (e) =>{
      const {name, value} = e.target
      setData((preve)=>{
        return{
          ...preve,
          [name] : value
        }
      })
    }

    const handleUploadProfileImage = async(e)=>{
      const data = await ImagetoBase64(e.target.files[0])
      console.log(data)

      setData((preve) =>{
        return{
          ...preve,
          image : data
        }
      })
    }

    console.log(process.env.REACT_APP_SERVER_DOMAIN)
    const handleSubmit = async(e)=>{
      e.preventDefault()

      const {firstName, email, password, confirmPassword} = data
      if(firstName && email && password && confirmPassword){
        if(password === confirmPassword){
          const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/signup` , {
            method: "POST",
            headers :{
              "content-type" : "application/json"
            },
            body : JSON.stringify(data)
          })

          const resData = await fetchData.json()
          console.log(resData)
          // alert(resData.message)
          toast(resData.message)
          if(resData.alert){
            navigate('/')
          }
          else{
            navigate('/login')
          }
          
        }
        else{
          alert("Password and Confirm Password are not equal")
        }
      }
      else{
        alert("Please Enter required fields")
      }
    }


  return (
    <div className='p-3 md:p-4'>
      <div className='flex items-center justify-center bg-white m-auto max-w-sm p-2 flex-col'>
        {/* <h1 className='text-center text-2xl  font-bold'>SignUp</h1> */}

        <div className='w-20 h-20 overflow-hidden drop-shadow-md shadow-md m-auto relative'>
            <img src={data.image ? data.image : SignupImage} alt='Sign Up' className='w-full h-full object-cover' /> 

            <label htmlFor='profileImage'>
            <div className='absolute bottom-0 h-1/3 bg-slate-500 bg-opacity-60  text-white w-full text-center'>
              <p className='text-sm p-1 cursor-pointer'>Upload</p>  
            </div>
            
            <input type={"file"} id='profileImage' accept="image/*" className='hidden' onChange={handleUploadProfileImage} />
            </label>        
        </div>
        <form className='w-full py-3 m-2' onSubmit={handleSubmit}>
            <label htmlFor='firstName'>First Name</label>
            <input type={"text"} id='firstName' name='firstName' className='mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-green-500' value={data.firstName} onChange={handleOnChange}/>

            <label htmlFor='lastName'>Last Name</label>
            <input type={"text"} id='lastName' name='lastName' className='mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-green-500' value={data.lastName} onChange={handleOnChange} />

            <label htmlFor='email'>Email</label>
            <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-green-500' value={data.email} onChange={handleOnChange}/>

            <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-green-500'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' className=' w-full bg-slate-200 p-1 rounded border-none outline-none' value={data.password} onChange={handleOnChange} />
                <span className='flex text-xl items-center cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShowAlt/> : <BiHide/>}</span>
            </div>

            <label htmlFor='confirmPassword'>Confirm Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-green-500'>
                <input type={showConfirmPassword ? 'text' : 'password'} id='confirmPassword' name='confirmPassword' className=' w-full bg-slate-200 p-1 rounded border-none outline-none' value={data.confirmPassword} onChange={handleOnChange}/>
                <span className='flex text-xl items-center cursor-pointer' onClick={handleConfirmPassword}>{showConfirmPassword ? <BiShowAlt/> : <BiHide/>}</span>
            </div>

            <button className='max-w-[120] w-full bg-green-500 hover:bg-green-600 cursor-pointer m-auto text-white text-xl font-medium text-center py-1 rounded-full mt-5'>Sign Up</button>

            <p className='mt-2 text-base'>Already a User! <Link to={'/login'} className='text-green-600 underline'>Login</Link></p>
        </form>
        
      </div>
    </div>
  )
}

export default Signup
