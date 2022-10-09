import {useState, useEffect} from "react";
import '../App.css'; 
import {Link} from 'react-router-dom';
import Imagen1 from '../componets/imagenes/uno.png';
import Imagen2 from '../componets/imagenes/dos.png'
import Imagen3 from '../componets/imagenes/tres.png'
import Imagen4 from '../componets/imagenes/cuatro.png'
import Imagen5 from '../componets/imagenes/5.png'
import {signOut, getAuth } from 'firebase/auth';
import firebase from "../componets/firebase/firebase";
import Modal from '../componets/modal/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import granja from '../componets/imagenes/granja.png'

const auth = getAuth(firebase)

export  function Home(props) {
  
    const {setUse} = props; 
    const [color, setColor]= useState('')
    const [open, setOpen] = useState(false); 
    const [changeStyle, setChangeStyle] = useState(false)
    const [openMenu, setOpenMenu]= useState(false)


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
      
      
function close(){
    signOut(auth).then(()=> setUse(undefined))
    setChangeStyle(false)
}


function openModal(section){
    setColor(section)
    setOpen(true); 
    setChangeStyle(true)
    
    
}

function handleColor(section){
setColor(section)
setChangeStyle(false)
setOpenMenu(!openMenu)
}

function HandleopenMenu(){
setOpenMenu(!openMenu)
   }
    return (

        <div className={`${changeStyle?'container2':openMenu?'container3':'container'}`}>
            <header className='header'>

               <span  onClick={()=>HandleopenMenu()}>
                 <FontAwesomeIcon  className="headerMuneButton" icon={faBars} /> 
               </span>
                <h1>Granja M&D</h1>            
            </header>

            <aside className='menu_container' >
                     
                <div className={`${openMenu?'menu':'closeMenu'} menu`}>

                <img  className="logo-menue" src={granja}  alt='granja' />  

                <Link to={'/'} className={`${color==='Gestación'?'menu_btn2':null} menu_btn`} onClick={()=>handleColor('Gestación')} >
                    <p className="menu_btn_text">Gestación</p> 
                    <img  className="imagen" src={Imagen4}  alt='imagen' height='40vh' width='40vw'></img>   
                </Link>

                <Link to={'/Verraco'} className={`${color==='Verraco'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Verraco')}>
                    <p className="menu_btn_text">Verraco</p> 
                    <img src={Imagen1} alt='imagen' height='40vh' width='40vw'></img>  
                </Link>    

                <Link to={'/Engordar'} className={`${color==='Engordar'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Engordar')}>                  
                    <p className="menu_btn_text">Engordar</p>
                    <img src={Imagen2} alt='imagen' height='40vh' width='40vw'></img>
                </Link> 

                <Link to={'/Destete'} className={`${color==='Destete'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Destete')}>
                    <p className="menu_btn_text">Destete</p> 
                    <img src={Imagen3} alt='imagen' height='40vh' width='40vw'></img>
                </Link> 


                <Link to={'/Vaccination'} className={`${color==='Vaccination'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Vaccination')}>
                    <p className="menu_btn_text">Vacunación</p> 
                    <img src={Imagen5} alt='imagen' height='40vh' width='40vw'></img>
                </Link> 

                
                <button  className={`${color==='Cerrar'? 'close_btn2':'close_btn'} close_btn`} onClick={()=> openModal('Cerrar')}>Cerrar Sesión</button>
                
                </div>
            
             
           </aside>
           
        
        
        {/* This is for the movile version  */}

         <section className='section'>

            <aside className='menu_container2' > 

               <div className={`${openMenu?'menu':'closeMenu'} menu`}>

                <Link to={'/'} className={`${color==='Gestación'?'menu_btn2':null} menu_btn`} onClick={()=>handleColor('Gestación')} >
                 <p className="menu_btn_text">Gestación</p> 
                 <img  className="imagen" src={Imagen4}  alt='imagen' height='40vh' width='40vw'></img>   
                </Link>

                <Link to={'/Verraco'} className={`${color==='Verraco'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Verraco')}>
                    <p className="menu_btn_text">Verraco</p> 
                    <img src={Imagen1} alt='imagen' height='40vh' width='40vw'></img>  
                </Link>    

                <Link to={'/Engordar'} className={`${color==='Engordar'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Engordar')}>                  
                    <p className="menu_btn_text">Engordar</p>
                    <img src={Imagen2} alt='imagen' height='40vh' width='40vw'></img>
                </Link> 

                <Link to={'/Destete'} className={`${color==='Destete'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Destete')}>
                    <p className="menu_btn_text">Destete</p> 
                    <img src={Imagen3} alt='imagen' height='40vh' width='40vw'></img>
                </Link> 


                <Link to={'/Vaccination'} className={`${color==='Vaccination'?'menu_btn2':'menu_btn'} menu_btn`} onClick={()=> handleColor('Vaccination')}>
                    <p className="menu_btn_text">Vacunación</p> 
                    <img src={Imagen5} alt='imagen' height='40vh' width='40vw'></img>
                </Link> 

                <div className="close_btn_container">
                    <button  className={`${color==='Cerrar'? 'close_btn2':'close_btn'} close_btn`} onClick={()=> openModal('Cerrar')}>Cerrar Sesión</button>
                </div>
                
                </div>

              

           </aside>

              <Modal
                visible={open}
                title={'Esta seguro que deseas cerrar esta sesión'}
                button1={'Descartar'}
                button2={'Cerrar'}
                fnButton1={()=>{
                        setOpen(false)
                        setChangeStyle(false)}}
                fnButton2={()=>close()}
                />

         </section>
           
        </div>
    )
}