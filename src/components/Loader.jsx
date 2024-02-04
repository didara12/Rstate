import axios from 'axios'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'


const Loader = async ()=>{


  const res =  await axios.get('http://localhost:5000/home')
  const data = res.data.data

return data

}

export default Loader





