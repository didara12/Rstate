import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useSelector } from 'react-redux'
import {  faTrash } from '@fortawesome/free-solid-svg-icons';


export default function ListUser() {
    const {userData,data} = useSelector(state => state.user)
    let udata = null;
    console.log('lstUser:::::::::::userData',userData)
    console.log('lstUser:::::::::::data',data)
    if(userData && data){
        const uid = userData.uid
         udata = data.filter(villa => (villa.uid === uid ))
    console.log('lstUser:::::::::::udata',udata)

    }
  return (
    <div>
        <ol class="list-group list-group-numbered my-2 ">

            {udata ? udata.map(item => 
                  (<li class="list-group-item d-flex justify-content-between align-items-start bg-primary-subtle">
                        <div class="ms-2 me-auto">
                            <div class="fw-bold">{item.name} </div>
                            <p className='text-truncate text-danger-emphasis '>{item.description} </p>
                        </div>
                        <button className='btn' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="This top tooltip is themed via CSS variables."><FontAwesomeIcon icon={faTrash} /></button>
                    </li>)
                
                ) : null}

        </ol>

    </div>
  )
}
