import { useState } from 'react';
import '../../componets/styles/gestationStyle.css';
import firebase from '../../componets/firebase/firebase';
import {getAuth} from 'firebase/auth';
import Modal from '../../componets/modal/modal';
import { Instant } from '../../componets/Instant/Instant';
import '../../componets/styles/varracoStyles/verracoModalInfo.css';
import { useGetInfoFirebase } from '../../componets/hook/usegetInfoFirebase';


const auth = getAuth(firebase); 


/**
 *  Create => const [show, setShow]=useState(false).
 * Then provided  visible={show} as props.
 **/


export default function VerracoSetInfoModal(props) {
   
    const {format} = Instant()
    const {visible, setShow, generalData, setGeneralData} = props; 
    const {saveInfoToFirebase }=useGetInfoFirebase()
    const collectionName = `Verraco-${auth.currentUser.uid}`; 
    const [openModal, setOpenModal] = useState(false)
    const [formData, setFormData] = useState({
       NoDelCerdo:'',
       Fecha:'',
       Edad:'',
       NoDeLaCerdaGest贸:'',
       Hoy:new Date(),
       startAt: new Date().getTime()

    })



const text = '隆Por favor complete el formulario! 馃槄';



const handelTextChange=(value, name)=>{
   setFormData({...formData, [name]:value.target.value})
  
}


const submit= async ()=>{
   
  let errors = {};

    const Info= {
        NoDelCerdo: formData.NoDelCerdo,
        Fecha: format(formData.Fecha),
        Edad: formData.Edad,
        NoDeLaCerdaGest贸:formData.NoDeLaCerdaGest贸,
        Hoy:formData.Fecha,
        startAt:new Date()
       }

    if(!formData.NoDelCerdo.trim() || !formData.Edad.trim() || !formData.Fecha.trim() || !formData.NoDeLaCerdaGest贸.trim()
     
     ){
      
      if(!formData.NoDelCerdo) errors.NoDelCerdo=true;
      if(!formData.Edad) errors.Edad =true;
      if(!formData.Fecha) errors.Fecha=true;
      if(!formData.NoDeLaCerdaGest贸) errors.NoDeLaCerdaGest贸=true;
    
      setOpenModal(true)

      return;
    } 

      try {
          /* await addDoc(collection(db, collectionName), Info )

           .then(()=> {

            setData([Info, ...data])

           })*/
           setGeneralData([Info, ...generalData]);
           saveInfoToFirebase(collectionName, Info);

          

       } catch (error) {

          console.error("Error adding document: ", error)
       }

       setFormData({
       NoDelCerdo:'',
       Fecha:'',
       Edad:'',
       NoDeLaCerdaGest贸:'',
       Hoy:new Date(),
       startAt: new Date().getTime()
    
      })
  
      setShow(show => !show)


}



    return(

        <>
          {visible?(
               <div className="V_modal_container">
               <div className="V_modal_body animate">
   
                  <form className="V_modal_form">
   
                      <label className="V_modal_label">N. del cerdo:</label>
                      <input className="V_modal_input"  placeholder="N. del cerdo" type={'text'} value={formData.NoDelCerdo} onChange={(value)=> handelTextChange(value, 'NoDelCerdo')} />
                      <label className="V_modal_label">Fecha:</label>
                      <input className="V_modal_input" placeholder="Fecha" type={'date'} value={formData.Fecha} onChange={(value)=> handelTextChange(value, 'Fecha')}/>
                      <label className="V_modal_label">Edad:</label>
                      <input className="V_modal_input" placeholder="Edad"  type={'text'} value={formData.Edad} onChange={(value)=> handelTextChange(value, 'Edad')}/>
                      <label className="V_modal_label">No de la cerda que gest贸:</label>
                      <input className="V_modal_input" placeholder="No de la cerda que gest贸" type={'text'} value={formData.NoDeLaCerdaGest贸} onChange={(value)=> handelTextChange(value, 'NoDeLaCerdaGest贸')}/>
                            
                  </form>
   
                  <section className="V_modal_btn_body">
                      <button  className="V_modal_btn" onClick={()=> setShow(show => !show)}>Cancelar</button>
                      <button className="V_modal_btn" onClick={()=>submit()} >Guardar</button>
                  </section>
               </div>
              
               <Modal
                 visible={openModal}
                 title={text} 
                 button1={'Ok'}  
                 fnButton1={()=> setOpenModal(false)}
                 /> 
   
           </div>
          ):(
              <></>
          )}
        </>
       
    )
}