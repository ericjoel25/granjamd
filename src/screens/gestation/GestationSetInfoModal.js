import { useState } from 'react';
import '../../componets/styles/gestationStyle.css';
import firebase from '../../componets/firebase/firebase';
import { getAuth } from 'firebase/auth';
import Modal from '../../componets/modal/modal';
import { Instant } from '../../componets/Instant/Instant';
import { useGetInfoFirebase } from '../../componets/hook/usegetInfoFirebase';


const auth = getAuth(firebase);


/**
 * We need to provided a state to habdle the visible by props. 
 */

export default function GestationSetInfoModal(props) {

  const { format, add_days } = Instant()
  const { visible, show, close, setClose, setShow, generalData, setGeneralData } = props;
  const collectionName = `Getation-${auth.currentUser.uid}`;
  const { saveInfoToFirebase } = useGetInfoFirebase()
  const [openModal, setOpenModal] = useState(false)
  const [formData, setFormData] = useState({
    NoDelCerdo: '',
    Edad: '',
    NoCerda: '',
    NoParto: '',
    InicioDeGestaci贸n: '',
    FinDeGestaci贸n: '',
    NoDeLechones: '',
    Vivos: '',
    Muertos: '',
    Hoy: new Date(),
    startAt: new Date().getTime()

  })




  const text = '隆Por favor complete el formulario! 馃槄';
  //const FinDeGestaci贸n =formData.InicioDeGestaci贸n !==''? Instant.add_days(formData.InicioDeGestaci贸n, 115).format():''
  const No_muerto = formData.NoDeLechones ? formData.NoDeLechones - formData.Vivos : '';


  const handelTextChange = (value, name) => {
    setFormData({ ...formData, [name]: value.target.value })

  }


  const submit = async () => {

    let errors = {};

    const Info = {
      NoDelCerdo: formData.NoDelCerdo,
      Edad: formData.Edad,
      NoCerda: formData.NoCerda,
      NoParto: formData.NoParto,
      InicioDeGestaci贸n: format(formData.InicioDeGestaci贸n),
      FinDeGestaci贸n: format(add_days(formData.InicioDeGestaci贸n, 115)),
      NoDeLechones: formData.NoDeLechones,
      Vivos: formData.Vivos,
      Muertos: formData.NoDeLechones - formData.Vivos,
      Hoy: formData.InicioDeGestaci贸n,
      startAt: new Date()
    }

    if (!formData.NoDelCerdo.trim() || !formData.Edad.trim() || !formData.NoCerda.trim() || !formData.NoParto.trim() ||
      !formData.NoDeLechones.trim()
    ) {

      if (!formData.NoDelCerdo) errors.NoDelCerdo = true;
      if (!formData.Edad) errors.Edad = true;
      if (!formData.NoCerda) errors.NoCerda = true;
      if (!formData.NoParto) errors.NoParto = true;
      if (!formData.InicioDeGestaci贸n) errors.InicioDeGestaci贸n = true;
      if (!formData.FinDeGestaci贸n) errors.FinDeGestaci贸n = true;
      if (!formData.NoDeLechones) errors.NoDeLechones = true;
      if (!formData.Vivos) errors.Vivos = true;

      setOpenModal(true)

      return;
    }

    try {
      setGeneralData([Info, ...generalData]);
      saveInfoToFirebase(collectionName, Info);

    } catch (error) {

      console.error("Error adding document: ", error)
    }

    setFormData({
      NoDelCerdo: '',
      Edad: '',
      NoCerda: '',
      NoParto: '',
      InicioDeGestaci贸n: '',
      FinDeGestaci贸n: '',
      NoDeLechones: '',
      Vivos: '',
      Muertos: '',
      Hoy: '',
      startAt: new Date()

    })

    setShow(show => !show)


  }

  function handleClose(){

   setClose(true); 

   setTimeout(()=>{
    
    setShow(show => !show);
    setClose(false); 

   },500)
  }


  return (

    <>
      {visible ? (

        <div className="G_modal_container">
          <div className={`${close?"G_modal_body animate2":"G_modal_body animate"} "G_modal_body animate"`}>

            <form className="G_modal_form">

              <label className="G_modal_label">N. del cerdo:</label>
              <input className="G_modal_input" placeholder="N. del cerdo" type={'text'} value={formData.NoDelCerdo} onChange={(value) => handelTextChange(value, 'NoDelCerdo')} />

              <label className="G_modal_label">Edad:</label>
              <input className="G_modal_input" placeholder="Edad" type={'text'} value={formData.Edad} onChange={(value) => handelTextChange(value, 'Edad')} />

              <label className="G_modal_label">No. cerda:</label>
              <input className="G_modal_input" placeholder="No. cerda" type={'text'} value={formData.NoCerda} onChange={(value) => handelTextChange(value, 'NoCerda')} />

              <label className="G_modal_label">No. parto:</label>
              <input className="G_modal_input" placeholder="No. parto" type={'text'} value={formData.NoParto} onChange={(value) => handelTextChange(value, 'NoParto')} />

              <label className="G_modal_label">Inicio de gestaci贸n:</label>
              <input className="G_modal_input" type={'date'}
                value={formData.InicioDeGestaci贸n} onChange={(value) => handelTextChange(value, 'InicioDeGestaci贸n')} />

              <label className="G_modal_label">Fin de gestaci贸n:</label>
              <label className="G_modal_input" > {format(add_days(formData.InicioDeGestaci贸n, 115), 'Fin de gestaci贸n')}</label>

              <label className="G_modal_label">Numero de lechones:</label>
              <input className="G_modal_input" placeholder="No. de lechones" type={'number'} value={formData.NoDeLechones} onChange={(value) => handelTextChange(value, 'NoDeLechones')} />

              <label className="G_modal_label">Vivos:</label>
              <input className="G_modal_input" placeholder="Vivos" type={'text'} value={formData.Vivos} onChange={(value) => handelTextChange(value, 'Vivos')} />

              <label className="G_modal_label">Muertos:</label>
              <input className="G_modal_input" placeholder="Muerto" type={'text'} value={No_muerto} onChange={(value) => handelTextChange(value, 'Muertos')} />
            </form>

            <section className="G_modal_btn_body">
              <button className="G_modal_btn" onClick={() => handleClose()}>Cancelar</button>
              <button className="G_modal_btn" onClick={() => submit()} >Guardar</button>
            </section>
          </div>

          <Modal
            visible={openModal}
            title={text}
            button1={'Ok'}
            fnButton1={() => setOpenModal(false)} />


        </div>

      ) : (
        <></>
      )

      }
    </>


  )
}