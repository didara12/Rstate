// import axios from 'axios'
import React, { useEffect } from 'react'
import { NavLink } from 'react-router-dom'
// import Cookies from 'universal-cookie';

// const cookies = new Cookies();

export default function Oauth() {
    
//   useEffect(()=>{

//     // const urlParams = new URLSearchParams(window.location.search);
//     // const token = urlParams.get('token');

//     const token = cookies.get('token');

//     console.log('token', token)
    

//     async function f(){

      
//      const  res = await axios.post("http://192.168.0.173:5000/user", { token })
//      console.log(res.data)
//      cookies.remove('token');
//      console.log('useeffect workd')

//    }
//    if(token) f() 


//  },[])


  return (
    <>

        <a className="btn btn-primary mb-3 py-2 btn-danger "  style={{width:'100%'}}  href="http://192.168.0.173:5000/general/auth/google" >Sign in with google</a>
        <div className='text-start my-2 ps-0'>Don't have an account?  <NavLink to='/signUp'>Sign up</NavLink> </div>

    </>
  )
}




