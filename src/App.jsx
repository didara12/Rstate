import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.bundle.min.js'

import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from 'react-router-dom';
import {RouteLyout} from './pages/RouteLyout';
import SignIn from './pages/SignIn'
import About from './pages/About'
import Home from './pages/Home'
import { Provider, useDispatch  } from 'react-redux';
import { store } from './redux/store';
import Signup from './pages/Signup';
import Rapp from './pages/Rapp';
import Villa from './pages/Villa';
import { FuserData } from './loauder/FuserData';
import Cookies from 'universal-cookie';
import { signInSuccess } from './redux/userSlice';
import Prov from './components/Prov';
import CreateListing from './pages/CreateListing';

const cookies = new Cookies();


// import { store } from './cont/store'
// import { Provider } from 'react-redux'


const router = createBrowserRouter(




  createRoutesFromElements(
    <>
    <Route path='/' element={<RouteLyout/> }  loader={FuserData} >
      <Route index element={<Home/>}  />
      <Route path='signIn' element={<SignIn/>} />
      <Route path='about' element={<About/>} />
      <Route path='signUp' element={<Signup/>} />
      <Route path='create-listing' element={<CreateListing/>} />
      <Route path='Rapp' element={<Rapp/>} >       
        <Route path=':id' element={<Villa/>} />
      </Route>
    </Route>
    
    </>
  )
)






function App() {





  return (
    <>
    <Provider  store={store} >

      
        <RouterProvider router={router} />


    </Provider>

    


    </>
  )
}

export default App



