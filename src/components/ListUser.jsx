import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  faTrash } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { deleteData } from '../redux/userSlice';


export default function ListUser() {
    const {userData,data} = useSelector(state => state.user)
    const dispatch = useDispatch()
    let udata = null;
    console.log('lstUser:::::::::::userData',userData)
    console.log('lstUser:::::::::::data',data)
    if(userData && data){
        const uid = userData.uid
         udata = data.filter(villa => (villa.uid === uid ))
    console.log('lstUser:::::::::::udata',udata)

    }


    const handleClick =async (_id)=>{
        const res = await axios.post("https://serrstate.onrender.com/cust/auth/delete",{_id} ,{
            // const res = await axios.post("http://192.168.0.173:5000/cust/auth/delete",{_id} ,{
            headers:{
                Authorization: `Bearer ${localStorage.getItem('token')}`,  
            }
        })
        console.log('res.data.deletedCount',res.data[0].deletedCount)
        if(res.data[0].deletedCount > 0) dispatch(deleteData(_id))
        
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
                        <button onClick={()=>handleClick(item._id)} className='btn' data-bs-toggle="tooltip" data-bs-placement="top" data-bs-custom-class="custom-tooltip" data-bs-title="This top tooltip is themed via CSS variables."><FontAwesomeIcon icon={faTrash} /></button>
                    </li>)
                
                ) : null}

        </ol>

    </div>
  )
}
