import React from 'react'
import { useSelector } from 'react-redux'
import { NavLink , Outlet } from 'react-router-dom'

export default function Rapp() {
  const { data} = useSelector( state => state.user)
  console.log(data)
  return (
    <div>
    <Outlet/>

    </div>
  )
}
