import {useEffect, useState} from 'react';
import './App.css';
import {Home} from './screens/home';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Gestation from './screens/gestation/gestation';
import Verraco from './screens/verraco/verraco';
import Engordar from './screens/engordar/engordar';
import Destete  from './screens/destete/destete';
import Vaccination from './screens/vacunación/vaccination'; 
import {getAuth, onAuthStateChanged } from 'firebase/auth';
import firebase from './componets/firebase/firebase';
import LogingView from './screens/login/logingView';
import granja from './componets/imagenes/granja.webp';


const auth = getAuth(firebase)

export default function App() {
 
  const [use, setUse] = useState()
  const [show, setShow] = useState(true)

  
 

  
  useEffect(()=>{

    checkState()
    
  }, [use])


  useEffect(() => {
    const handleTabClose = event => {
      event.preventDefault();

      console.log('beforeunload event triggered');

      return (event.returnValue = 'Are you sure you want to exit?');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []); 


 async function checkState(){
 onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        //const uid = user.uid;
        setUse(user)
        setShow(false)
        // ...
      } else {
        // User is signed out
        // ...
        setShow(false)
      }
    });


}


  return (
    <>
     
    {show?( <div className='splashScreen-container'>
        <h1>Granja M&D</h1>
        <img src={granja} className='splashImage'/>
     </div>):(<></>)}
       
     {use === undefined?<LogingView />:(
     <BrowserRouter>
              <Home setUse={setUse} />
              
              <Routes>
              
               <Route path='/' element={< Gestation/>} /> 
               <Route path='/Verraco' element={< Verraco/>} /> 
               <Route path='/Engordar' element={< Engordar />} /> 
               <Route path='/Destete' element={<Destete />} />
               <Route path='/Vaccination' element={<Vaccination />} />
               <Route path='Home' element={<Home/>} />
             </Routes>
              
       </BrowserRouter>
  
   ) }
 
   
   
    </>
     
    
       
   
  );
}


