import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink, Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import {fetchData} from '../redux/userSlice'
import logo from '../villa/logo.jpg'
import Cookies from 'universal-cookie';
import axios from 'axios'
import {signInSuccess} from '../redux/userSlice'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser, faGear, faArrowRightFromBracket  } from '@fortawesome/free-solid-svg-icons';



 
const cookies = new Cookies();

export  const RouteLyout = React.memo(()=> {

  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.user)
  const locToken = localStorage.getItem("token")
  const curentU = useLoaderData()
  const navigate = useNavigate()


  if(curentU) dispatch(signInSuccess(curentU))

  

  useEffect(()=>{ 
    dispatch(fetchData())    

  },[dispatch])





  const logOut = ()=>{
    localStorage.removeItem('token')
    // window.location.reload()
    navigate('/')
  }



  return (
    <div className='bg-body-secondary'>
    <div className="navbar navbar-expand-lg bg-body-tertiary py-3 bg-dark-subtle">
        <div className="container w-75">
            <NavLink to={'/'} className="navbar-brand fw-bold fs-3 p-0" >Rstate</NavLink>
            <div>
                <form className="d-flex" role="search">
                    <input className="form-control   bg-body-secondary py-2 pe-5" type="search" placeholder="Search..." aria-label="Search"/>
                </form>
            </div>
            <div>
                <ul className="navbar-nav" >
                    <li className="nav-item">
                    <NavLink to={'/'} className="nav-link" >Home</NavLink>
                    </li>
                    <li className="nav-item">
                    <NavLink to={'about'} className="nav-link">About</NavLink>
                    </li>
                    <li className="nav-item">
                    {userData && locToken ? (


                    <div class="dropdown mx-3">
                      <a class="rounded-circle " id="navbarDropdownMenuLink" role="button"  data-bs-toggle="dropdown" aria-expanded="false"  >
                         <img src={userData.photo || logo} className="  rounded-circle" width={'40px'}   alt="photo"  loading="lazy"/>
                      </a>
                      <ul class="dropdown-menu dropdown-menu-end "  aria-labelledby="navbarDropdownMenuLink">
                        <li><span class="dropdown-item  text-secondary  disabled "  >{userData.email} </span></li>
                        <li><a class="btn dropdown-item "><FontAwesomeIcon icon={faUser} /> <span className='ms-2'> Profile </span></a></li>
                        <li><a class="btn dropdown-item" ><FontAwesomeIcon icon={faGear} /> <span className='ms-2'> <NavLink to={'create-listing'} className="nav-link d-inline p-0">Listing</NavLink> </span></a></li>
                        <li><hr class="dropdown-divider"/></li>
                        <li><a class="btn dropdown-item"  onClick={logOut}><FontAwesomeIcon icon={faArrowRightFromBracket} /> <span className='ms-2'> Logout </span></a></li>
                      </ul>
                    </div>


                    ):
                    (
                      <NavLink to={'signIn'} className="nav-link">signIn</NavLink>
 
                    )}

                    </li>
              </ul>
            </div>
        </div>
    </div>
    <main >
      <Outlet/>
    </main>
    </div>
  )
})
