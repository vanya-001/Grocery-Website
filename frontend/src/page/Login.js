import React, {useState} from 'react'
import SignupImage from '../image/Login.png'
import {BiShowAlt, BiHide} from 'react-icons/bi'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux"
import { loginRedux } from '../redux/userSlice'

const Login = () => {
  const [showPassword, setShowPassword] = useState(false)
    const [data, setData] = useState({
        email : "",
        password : ""
    })
    const navigate = useNavigate()
    // console.log(data);

    const userData = useSelector(state => state)
    

    const dispatch = useDispatch()

    const handleShowPassword = ()=>{
        setShowPassword(preve => !preve)
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

    const handleSubmit = async(e)=>{
      e.preventDefault()

      const {email, password} = data
      if(email && password){
        const fetchData = await fetch(`${process.env.REACT_APP_SERVER_DOMAIN}/login` , {
          method: "POST",
          headers :{
            "content-type" : "application/json"
          },
          body : JSON.stringify(data)
        })

        const resData = await fetchData.json()
        console.log(resData)
        
        toast(userData.user.firstName + resData.message)
        if(resData.alert){
          dispatch(loginRedux(resData))
          navigate('/')
        }
        else{
          navigate('/signup')
        }
        console.log(userData)
      }
      else{
        alert("Please Enter required fields")
      }
    }

  return (
    <div className='p-3 md:p-4'>
      <div className='flex items-center justify-center bg-white m-auto max-w-sm p-2 flex-col'>
        {/* <h1 className='text-center text-2xl  font-bold'>SignUp</h1> */}

        <div className='w-70 h-45 overflow-hidden'>
            <img src={SignupImage} alt='Login' className='w-full h-full object-cover' />
        </div>
        <form className='w-full py-3' onSubmit={handleSubmit}>
            <label htmlFor='email'>Email</label>
            <input type={'email'} id='email' name='email' className='mt-1 mb-2 w-full bg-slate-200 p-1 px-2 py-1 rounded focus-within:outline-green-500' value={data.email} onChange={handleOnChange}/>

            <label htmlFor='password'>Password</label>
            <div className='flex px-2 py-1 bg-slate-200 rounded mt-1 mb-2 focus-within:outline focus-within:outline-green-500'>
                <input type={showPassword ? 'text' : 'password'} id='password' name='password' className=' w-full bg-slate-200 p-1 rounded border-none outline-none' value={data.password} onChange={handleOnChange} />
                <span className='flex text-xl items-center cursor-pointer' onClick={handleShowPassword}>{showPassword ? <BiShowAlt/> : <BiHide/>}</span>
            </div>

            <button className='max-w-[120] w-full bg-green-500 hover:bg-green-600 cursor-pointer m-auto text-white text-xl font-medium text-center py-1 rounded-full mt-5'>Login</button>
        </form>
        <p className='mt-1 text-base'>Not Signed In Yet? <Link to={'/signup'} className='text-green-600 underline'>SignUp</Link></p>
      </div>
    </div>
  )
}

export default Login
