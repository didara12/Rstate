import React, { useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import ListUser from '../components/ListUser';
import {addData} from '../redux/userSlice'



export default function CreateListing() {

  const dispatch = useDispatch()
  const {userData} = useSelector(state => state.user)
  const [load , setLoad] = useState(false)
  const [sec , setSuc] = useState(false)
  const [id , setId] = useState()




  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    description: Yup.string().required('Description is required'),
  });


  const initialValues = {
    name: '',
    description: '',
    sell: false,
    rent: false,
    parking: false,
    furnished: false,
    offer: false,
    beds:0,
    baths:0,
    regularPrice:0,
    images:[],
    phone:"",
    city:"",
    neighborhood:"",
    country:""

  };




  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async(val,e)=>{
      setLoad(true)
      const formData = new FormData();

       Object.keys(val).forEach(key =>{

        if(key !== 'images') formData.append(key,val[key])

      })

      val.images.forEach(image => {
        formData.append('images',image)
      })

      formData.append('uid',userData.uid)

      console.log('creat listing::::::::',userData)
      
        const res = await axios.post('https://serrstate.onrender.com/cust/auth/add',formData,{
          // const res = await axios.post('http://192.168.0.173:5000/cust/auth/add',formData,{
          headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`,  
              'Content-Type': 'multipart/form-data',
          }
        })

        setLoad(false)
        // res.data.error?  setSuc(false) : setSuc(true)
      if(res.data.error) return setSuc(false)
      setSuc(true)
      setId(res.data.id)

      if(sec){
        dispatch(addData(res.data.savedVilla))
      }
    }
  })



  const handleImageChange = (e) => {

    const files = Array.from(e.target.files);

console.log('test::::',e.target.files)
console.log(files)

    // Convert files to URLs using URL.createObjectURL
    // const imageUrls = files.map((file) => URL.createObjectURL(file));
  
  
    // Update Formik state with the array of image URLs
    formik.setFieldValue('images', [...formik.values.images, ...files]); 
    console.log(formik.values.images)
  };



  return (
    <div className="container  text-center " style={{width:'65%'}}>

      <h2 className='fw-bold fs-2 my-4 '>Create a Listing</h2>

    <form onSubmit={formik.handleSubmit}>
      <div className=" row  ">
      
        <div className="col">
          <input name="name" className='form-control mb-3 py-2' placeholder='Name'  onBlur={formik.handleBlur} value={formik.values.name} onChange={formik.handleChange} />
          <textarea name="description"  className='form-control mb-3' placeholder='Descreption' onBlur={formik.handleBlur} value={formik.values.description} onChange={formik.handleChange} />
          <input  className='form-control mb-3 py-2' name="phone"  placeholder='phone' onBlur={formik.handleBlur} value={formik.values.phone} onChange={formik.handleChange}  />

          <div className="d-flex flex-wrap">

            <input  className='form-control m-3 py-2 w-25' name="city"  placeholder='city' onBlur={formik.handleBlur} value={formik.values.city} onChange={formik.handleChange}  />
            <input  className='form-control m-3 py-2 w-25' name="neighborhood"  placeholder='neighborhood' onBlur={formik.handleBlur} value={formik.values.neighborhood} onChange={formik.handleChange}  />
            <input  className='form-control m-3 py-2 w-25' name="country"  placeholder='country' onBlur={formik.handleBlur} value={formik.values.country} onChange={formik.handleChange}  />

          </div>


          <div className="d-flex flex-wrap">

            <div class="form-check me-3">
              <input  name='sell' className="form-check-input p-2" type="checkbox" value="" id="flexCheckDefault" checked={formik.values.sell} onChange={formik.handleChange} />
              <label className="form-check-label" for="flexCheckDefault">Sell</label>
            </div>
            <div class="form-check  me-3">
              <input name='rent' className="form-check-input p-2" type="checkbox" value="" id="flexCheckDefault" checked={formik.values.rent} onChange={formik.handleChange} />
              <label className="form-check-label" for="flexCheckDefault">Rent</label>
            </div>
            <div class="form-check  me-3">
              <input name='parking' className="form-check-input p-2" type="checkbox" value="" id="flexCheckDefault" checked={formik.values.parking} onChange={formik.handleChange} />
              <label className="form-check-label" for="flexCheckDefault">Parking spot</label>
            </div>
            <div class="form-check me-3">
              <input name='furnished' className="form-check-input p-2" type="checkbox" value="" id="flexCheckDefault" checked={formik.values.furnished} onChange={formik.handleChange} />
              <label className="form-check-label" for="flexCheckDefault">Furnished</label>
            </div>
            <div class="form-check me-3">
              <input name='offer' className="form-check-input p-2" type="checkbox" value="" id="flexCheckDefault" checked={formik.values.offer} onChange={formik.handleChange} />
              <label className="form-check-label" for="flexCheckDefault">Offer</label>
            </div>

          </div>
          <div className='d-flex my-2'>
              <input name='beds' className="form-control w-25 me-3" type="number" id="r1" min={"1"} max={"10"}  value={formik.values.beds} onChange={formik.handleChange}/>
              <label className=" p-2" for="r1">Beds</label>
            </div>
            <div className='d-flex my-2'>
              <input name='baths'  className="form-control w-25 me-3" type="number" id="r1" min={"1"} max={"10"} value={formik.values.baths} onChange={formik.handleChange}/>
              <label className=" p-2" for="r1">Baths</label>
            </div>
            <div className='d-flex my-2'>
              <input name='regularPrice'  className="form-control w-25 me-3" type="number" id="r1" min={"50"} max={"100000"} value={formik.values.regularPrice} onChange={formik.handleChange}/>
              <label className=" p-2 " for="r1">Regular price<span className='text-secondary'> ($ / Month)</span></label>
            </div>

        </div>

        <div className="col ">
          <div className='text-start mb-3'><span className='fw-bold'>Image:</span><span className="text-secondary">The first image will be the cover (max 6)</span> </div>
          <input class="form-control mb-3" name='images' type="file" onChange={handleImageChange} multiple/>
          <button className='form-control btn btn-outline-primary w-100'  >{load ? <span className="spinner-border spinner-border-sm" ></span> : <>CREATE LISTING</> }</button>
          {sec ? <p className='text-success'>vill added</p>:null}

         
        </div>


      </div>
      </form>
      <ListUser/>
    </div>


  )
}
