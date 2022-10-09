
import '../modal/noInformation.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCirclePlus} from '@fortawesome/free-solid-svg-icons';
import logo from '../imagenes/granja.webp';



/** This component need these =>  show={show} setShow={setShow}  */
export default function NoInformation(props){

     const {setShow, show} = props

    return(
        <div className='noInfo-container'>

          <div className='noInfo-body animate'>
            <img src={logo}   className='noInfo-Icon'/>
             <h3>¡No hay información guardada!</h3>
            <p>Click en el icono para Agregar información</p>
            
            <FontAwesomeIcon onClick={()=>setShow(!show)} className="G_header_btn" title={'Agregar'} icon={faCirclePlus} />

          </div>
           
        </div>
    )
} 