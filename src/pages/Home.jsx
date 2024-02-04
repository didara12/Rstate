import React, { useEffect } from 'react'
import { NavLink, useLoaderData } from 'react-router-dom'

import logo from '../villa/logo.jpg'
import v1 from '../villa/v1.jpg'
import v2 from '../villa/v2.jpg'
import Card from '../components/Card'
import { useDispatch, useSelector } from 'react-redux'
import ListCard from '../components/ListCard'
import axios from 'axios'

export default function Home() {
  const {data} = useSelector( state => state.user)


//   useEffect(()=>{
//     async function f(){
//      const  res = await axios("http://192.168.0.173:5000/user", { withCredentials: true })
//      console.log(res.data)
//      console.log('useeffect workd')

//    }
//    f()


//  },[])

  
  

  
  console.log(data)

  return (
    <div>
      <div className='container p-5'>
        <div className='fs-1 fw-bold w-75  mb-2'>Find your next<span className='text-secondary'> perfect </span> <br/> place with ease</div>
        <div className='fs-7 text-body-secondary mb-2' >Sahand Estate will help you find your home fast, easy and comfortable. <br/>Our expert support are always available. </div>
        <NavLink to='/Rapp'>Let's Start now...</NavLink>
      </div>



      <div id="carouselExample" className="carousel slide">
        <div className="carousel-inner">
          <div className="carousel-item active">
          <img src={logo} className="d-block w-100" width="800" height="400" alt="photo"/>
          </div>
          <div className="carousel-item">
          <img src={v1} className="d-block w-100" width="800" height="400" alt="photo"/>
          </div>
          <div className="carousel-item">
            <img src={v2} className="d-block w-100" width="800" height="400" alt="photo"/>
          </div>
        </div>

        <button className="carousel-control-prev " type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
          <span className="carousel-control-prev-icon " aria-hidden="true" ></span>
          <span className="visually-hidden ">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
    </div>


    <div className="container m-4">
       
       <ListCard data={data}/>
       
       
    </div>


    



    </div>
  )
}
