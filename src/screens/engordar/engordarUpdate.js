import { useEffect, useState } from 'react';
import '../../componets/styles/gestationStyle.css';
import firebase from '../../componets/firebase/firebase';
import { getFirestore, updateDoc, doc } from "firebase/firestore";
import { getAuth } from 'firebase/auth';
import Modal from "../../componets/modal/modal";
import { Instant } from '../../componets/Instant/Instant';


const db = getFirestore(firebase);
const auth = getAuth(firebase);


/**
 * 
 * @param {visible} props visible={boolean}
 * @returns  a modal with a form to update the information.
 */

export default function EngordarUpdate(props) {

    const {format, add_days} = Instant()
    const { visible,  id, showUpdate, setShowUpdate, generalData, setGeneralData } = props;
    const collectionName = `Engorgar-${auth.currentUser.uid}`;
    const [openModal, setOpenModal] = useState(false)
    const [formData, setFormData] = useState({
        NoLechones:'',
        FechaDelDestete:'',
        Inicio:'',
        Crecimiento:'',
        Desarrolo:'',
        Engorda:'',
        Hoy:new Date(),
        startAt: new Date().getTime()
    })


    useEffect(() => {

      CustomerInfo();

    }, [showUpdate])



const text = '¡Por favor complete el formulario! 😅';


const handelTextChange = (value, name) => {
        
        setFormData({ ...formData, [name]: value.target.value });
    }


const CustomerInfo = async () => {

        const Información = generalData.filter((list) => {
            let response = list.id === id;

            return response;
        })

        setFormData(...Información);


    }

  

 const submit = async () => {

        let errors = {};

        const Info= {
                NoLechones:formData.NoLechones,
                FechaDelDestete:format(add_days(formData.FechaDelDestete, 1), '', 'es','short'),
                Inicio:format(add_days(formData.FechaDelDestete, 1)),
                Crecimiento:format(add_days(formData.FechaDelDestete, 22)),
                Desarrolo:format(add_days(formData.FechaDelDestete, 43)),
                Engorda:format(add_days(formData.FechaDelDestete, 64)),
                id:formData.id,
                Hoy:new Date(),
                startAt:new Date()
           }
    
          if(!formData.NoLechones.trim() || !formData.FechaDelDestete.trim() ){
          
          if(!formData.NoLechones) errors.NoLechones=true;
          if(!formData.FechaDelDestete) errors.FechaDelDestete =true;

            setOpenModal(true);

            return;
        }

        try {

            const collectionRef = doc(db, collectionName, id)

            await updateDoc(collectionRef, Info).then(() => {
                //setData([Info, ...data])
                const Información = generalData.filter((list) => {
                    let response = list.id !== id;
                    return response;
                })

                setGeneralData([Info, ...Información]);
                //getFirebaseInfo(collectionName);
             })

        } catch (error) {

         console.error("Error adding document: ", error); 

        }

    setFormData({
        NoLechones:'',
        FechaDelDestete:'',
        Inicio:'',
        Crecimiento:'',
        Desarrolo:'',
        Engorda:'',
        Hoy:new Date(),
        startAt: new Date().getTime()
    })

     setShowUpdate(showUpdate => !showUpdate);

}



    return (

        <>
          {visible?(
                <div className="G_modal_container">
                <div className="V_modal_body animate">
    
                    <form className="V_modal_form">
    
                        <label className="V_modal_label">No. Lechones:</label>
                        <input className="V_modal_input" placeholder="N. del cerdo" type={'text'} value={formData?.NoLechones ||''} onChange={(value) => handelTextChange(value, 'NoLechones')} />
                        <label className="V_modal_label">Fecha del destete:</label>
                        <input className="V_modal_input" placeholder="Fecha" type={'date'} value={formData?.FechaDelDestete ||''} onChange={(value) => handelTextChange(value, 'FechaDelDestete')} />
    
                        <label className="V_modal_label">Inicio:</label>
                        <input className="V_modal_input" placeholder="Fecha" type={'text'} value={format(add_days(formData?.FechaDelDestete, 1), 'Inicio')} onChange={(value) => handelTextChange(value, 'Inicio')} />
    
                        <label className="V_modal_label">Crecimiento:</label>
                        <input className="V_modal_input" placeholder="Fecha" type={'text'} value={format(add_days(formData?.FechaDelDestete, 22), 'Crecimiento')} onChange={(value) => handelTextChange(value, 'Crecimiento')} />
    
                        <label className="V_modal_label">Desarrollo:</label>
                        <input className="V_modal_input" placeholder="Fecha" type={'text'} value={format(add_days(formData?.FechaDelDestete, 43), 'Desarrollo')} onChange={(value) => handelTextChange(value, 'Desarrollo')} />
    
                        <label className="V_modal_label">Engorda:</label>
                        <input className="V_modal_input" placeholder="Fecha" type={'text'} value={format(add_days(formData?.FechaDelDestete, 64), 'Engorda')} onChange={(value) => handelTextChange(value, 'Engorda')} />
    
                    </form>
    
                    <section className="V_modal_btn_body">
                        <button className="V_modal_btn" onClick={() => setShowUpdate(false)}>Cancelar</button>
                        <button className="V_modal_btn" onClick={() => submit()} >Guardar</button>
                    </section>
                </div>
    
               <Modal
                  visible={openModal}
                  title={text} 
                  button1={'Ok'} 
                  fnButton1={() => setOpenModal(false)} 
                />
    
          
            </div>
          ):(<></>)}
        </>
      
    )
}