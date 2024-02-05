import Cookies from "universal-cookie";
import { useEffect } from "react";
import { signInSuccess } from "../redux/userSlice";
import { useDispatch } from "react-redux";
import axios from "axios";


const cookies = new Cookies();


export default function Prov({children} ) {

    const dispatch = useDispatch()



    useEffect(()=>{ 

         const FuserData =async  ()=>{

            console.log('prov worked::::::::')
        
            try {
                const {cookieToken,userData:curentU} = cookies.get('useANDtoken') || {}
                const locToken = localStorage.getItem('token') || null
                
                if(locToken){
                    const  res = await axios.post("https://serrstate.onrender.com/user", { token:locToken })
                    // const  res = await axios.post("http://192.168.0.173:5000/user", { token:locToken })
                    const curentU = res.data.user
                     dispatch(signInSuccess(curentU))
                 console.log('prov axios:::::::: ')

                    return null
                }
    
        
                if(cookieToken){
                 localStorage.setItem('token',cookieToken)
                 cookies.remove('useANDtoken');
                 dispatch(signInSuccess(curentU))
                 console.log('prov cookie:::::::: ')

                 return null
                   
               }
        
        
        
        
           
               
            } catch (e) {
                console.log('prov error::::::::')
                console.log(e)
                return null
            }
        }

        FuserData()

    
      },[dispatch])
    
    
    //   try {
    
        
    //     if(curentU){
    //      dispatch(signInSuccess(curentU))
      
    //      console.log('user data:::::::::',userData)
    //      console.log('curent u:::::::::',curentU)
      
      
    //    }
        
    //   } catch (e) {
    //     console.log(e.message)
    //   }
    
    




  return (
    <>
        {children}
    </>
  )
}
