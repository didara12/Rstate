import Cookies from 'universal-cookie';
import { useDispatch } from 'react-redux'
import {signInSuccess} from '../redux/userSlice'
import axios from 'axios';


const cookies = new Cookies();


export const FuserData =async  ()=>{

    console.log('loauder worked::::::::')

    try {
        const {cookieToken,userData:curentU} = cookies.get('useANDtoken') || {}
        const locToken = localStorage.getItem('token') || null
        
        if(locToken){
            const  res = await axios.post("https://serrstate.onrender.com/user", { token:locToken })
            // const  res = await axios.post("http://192.168.0.173:5000/user", { token:locToken })
            const curentU = res.data.user

            if(curentU === undefined) return null
            return curentU
        }


        if(cookieToken){
         localStorage.setItem('token',cookieToken)
         cookies.remove('useANDtoken');
         if(curentU === undefined) return null
         return curentU
           
       }

       return null

       
    } catch (e) {
        console.log(e.massage)
        return null
    }
}