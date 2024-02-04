import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { NavLink, Navigate, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import {signInSuccess} from '../redux/userSlice'
import Oauth from '../components/Oauth'


export default function SignIn() {

  const [Serror, setSerror] = useState("")
  const [load , setLoad] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch()



  const validationSchema  = Yup.object({
    email: Yup.string().email('Invalid email address').required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  })


  
  const initialValues = {
    email:"",
    password:""
  }
 

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(val,e)=>{
      try{
        setLoad(true)
        const res = await axios.post('http://192.168.0.173:5000/general/signIn',val)
        setLoad(false)

        localStorage.setItem('token',res.data.token)

        dispatch(signInSuccess(res.data.userData))
        console.log('sign in:::::::::::::::',res.data.userData)
         navigate('/')
        
      }catch(e){
        setLoad(false)
        console.log('sign in::::',e.message)
        console.log(e.response.data.error)
        setSerror(e.response.data.error)
      }

    }
  })




  
  return (
   <>
    
    <div className="container  text-center mt-5 " style={{width:'35%'}}>
      <div className="fs-2 fw-bold mb-3 ">sing In</div>
      <form onSubmit={formik.handleSubmit}>

        <div className='mb-3'>
        <input name='email' className='form-control form-control-lg ' placeholder='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
        {formik.touched.email && formik.errors.email && ( <div className="text-start text-danger">{formik.errors.email}</div>)}
        </div>

        <div className='mb-3'>
        <input name='password' className='form-control form-control-lg ' placeholder='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}/>
        {formik.touched.password && formik.errors.password && (<div className="text-start text-danger">{formik.errors.password}</div>)}
        </div>
 
        
          <button type='submit' className="btn btn-primary mb-3 py-2 w-100" >
          {load ? <span className="spinner-border spinner-border-sm" ></span> : <>SIGN IN</> }
          </button >
          
          
        
      </form>
      <Oauth/>
    </div>
    </>
  )
}
