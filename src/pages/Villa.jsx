import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import logo from '../villa/logo.jpg'
import { useDispatch, useSelector } from 'react-redux'
import { Geo } from 'react-bootstrap-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee, faBath, faBed, faChair  } from '@fortawesome/free-solid-svg-icons';
// import { fetchOneData } from '../redux/userSlice'

export default function Villa() {
    const {data} = useSelector(state => state.user)
    const dispatch = useDispatch()
    const {id} = useParams()

    let vil = null

  
    if (!data) {
      // You can render a loading state or return null here until the data is fetched
      console.log('datais  heeeeeeeeeeer', data);

      return <div>Loading...</div>;

    }else{
      vil = data.find((item) => item._id === id);
    }
  
  


  return (
    <div>
        

        
        {
        vil.images[0] ?  <img src={vil.images[0]} className="d-block w-100" width="800" height="400" alt="photo"/>: 
        
        <img src={logo} className="d-block w-100" width="800" height="400" alt="photo"/>
        
        }


        <div className="container w-75">

          <h3 className="my-3">{vil.name} </h3>
          <p className=" text-truncate fw-light  text-secondary" style={{fontSize:"15px"}} ><Geo color='green'/><  >{Object.values(vil.location).join(' ')} </></p>


          <div className='my-3'>
            <div className="badge bg-success w-25 ml-3" >For Sell</div>
            <div className="badge bg-danger w-25 ">discount</div>
          </div>

          <p className="  w-75 " style={{fontSize:"15px"}}   ><span className='fw-bold' >description -</span>  {vil.description} </p>

          <div className='text-success' > <FontAwesomeIcon icon={faBed} /> {vil.features.bedrooms} &nbsp; <FontAwesomeIcon icon={faBath}  /> {vil.features.bathrooms} &nbsp;<FontAwesomeIcon icon={faChair} /> Furnished </div>



          <div class="mb-3" className='collapse' id='collapseWidthExample'>
            <label for="exampleFormControlTextarea1" class="form-label">Example textarea</label>
            <textarea class="form-control" id="exampleFormControlTextarea1" rows="3" placeholder='Enter your message here...' ></textarea>
          </div>


          <div class="d-grid gap-2 my-3">
              <button class="btn btn-primary" type="button" data-bs-toggle="collapse" data-bs-target="#collapseWidthExample" aria-expanded="false" aria-controls="collapseWidthExample">SEND MESSAGE</button>
          </div>



        </div>

        

     </div>
  )
}



