import React from 'react'
import logo from '../villa/logo.jpg'
import { ArrowRight, Geo } from 'react-bootstrap-icons';
import { NavLink } from 'react-router-dom';

export default function Card({item}) {

  const handleClick = ()=>{

  }
  
  console.log('card:::::::', item.images)
 

  const linkStyle = {
    textDecoration: 'none',
    color: 'inherit', 
  }
  return (
    
    <div className="card  m-3 " style={{width: "18rem" }}>
      <NavLink to={`/Rapp/${item._id}`} style={linkStyle} onClick={handleClick}>
    {!item.images[0] ? 
      <img src={logo} className="card-img-top" alt="test" height={"200px"}/> :
      
      // item.images.map((m, index) =>( <img key={index} src={m} className="card-img-top" alt="test" height={"200px"}/>))
      <img src={item.images[0]} className="card-img-top" alt="test" height={"200px"}/>
  
  } 
    <div className="card-body">
      <h5 className="card-title">{item.name} </h5>
      <p className="card-text text-truncate fw-light  text-secondary" style={{fontSize:"15px"}} ><Geo color='green'/><  >{Object.values(item.location).join(' ')} </></p>
      <p className="card-text text-truncate fw-light text-secondary" style={{fontSize:"15px"}}   >{item.description} </p>
      <p className="card-text fw-bold">${item.price.amount} </p>
      
    </div>
    </NavLink>

  </div>
  )
}





