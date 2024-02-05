import React, { useState } from 'react'
import * as Yup from 'yup'
import { useFormik } from 'formik'
import { NavLink } from 'react-router-dom'
import axios from 'axios'


export default function Signup() {
  
  const [Serror, setSerror] = useState("")
  const [load , setLoad] = useState(false)

  const validationSchema  = Yup.object({
    username: Yup.string().required('username is required'),
    email: Yup.string().email().required('Email is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
  })


  
  const initialValues = {
    username:"",
    email:"",
    password:""
  }

  
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(val,e)=>{
      try{
        setLoad(true)
        const res = await axios.post('https://serrstate.onrender.com/general/signUp',val)
        // const res = await axios.post('http://localhost:5000/general/signUp',val)
        setLoad(false)
      }catch(e){
        setLoad(false)
        console.log(e.message)
        console.log(e.response.data.error)
        setSerror(e.response.data.error)
      }
    }
  })




  return (
   <>
    
    <div className="container  text-center mt-5 " style={{width:'35%'}}>
      <div className="fs-2 fw-bold mb-3 ">sing up</div>
      <form onSubmit={formik.handleSubmit}>

        <div className='mb-3'>
        <input name='username' className='form-control form-control-lg ' placeholder='username' onBlur={formik.handleBlur} value={formik.values.username} onChange={formik.handleChange} />
        {formik.touched.username && formik.errors.username && ( <div className="text-start text-danger">{formik.errors.username}</div>)}
        </div>


        <div className='mb-3'>
        <input name='email' className='form-control form-control-lg ' placeholder='email' onBlur={formik.handleBlur} value={formik.values.email} onChange={formik.handleChange} />
        {formik.touched.email && formik.errors.email && ( <div className="text-start text-danger">{formik.errors.email}</div>)}
        </div>

        <div className='mb-3'>
        <input name='password' className='form-control form-control-lg ' placeholder='password' onBlur={formik.handleBlur} value={formik.values.password} onChange={formik.handleChange}/>
        {formik.touched.password && formik.errors.password && (<div className="text-start text-danger">{formik.errors.password}</div>)}
        </div>

          {Serror && (<div className="text-center text-danger mb-3">{Serror} </div>)} 

        <div className="row">
          <button type='submit' className="btn btn-primary mb-3 py-2"  disabled={load} >
             {load ? <span class="spinner-border spinner-border-sm" ></span> : <>SIGN UP</> } 
          </button >
          <button  className="btn btn-danger py-2">CONTINUE WITH GOOGLE</button >
          <div className='text-start my-2 ps-0'>Don't have an account?  <NavLink to='/signIn' >Sign In</NavLink> </div>
        </div>



      </form>
    </div>
    </>
  )
}
