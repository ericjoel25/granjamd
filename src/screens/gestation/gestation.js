import { useState, useEffect, useRef } from "react";
import '../../componets/styles/gestationStyle.css';
import '../../componets/styles/gestationStyles/gestationMedia/G-media-phone.css';
import GestationSetInfoModal from './GestationSetInfoModal';
import firebase from "../../componets/firebase/firebase";
import { getAuth } from 'firebase/auth';
import Modal from "../../componets/modal/modal";
import GestationSearchInfo from './GestationSearchInfo';
import UpdateGestation from './updateGestation';
import { useGetInfoFirebase } from "../../componets/hook/usegetInfoFirebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faPenToSquare, faTable, faSquare, faMagnifyingGlass, faCirclePlus, faCircleArrowLeft, faAnglesRight, faAnglesLeft } from '@fortawesome/free-solid-svg-icons';
import Loading from '../../componets/modal/Loading';
import NoInformation from '../../componets/modal/NoInformation';

const auth = getAuth(firebase);


export default function Gestation() {

  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showLoading, setShowLoading] = useState(true)
  const [showTable, setShowTable] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [updateId, setUpdateId] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [close, setClose] = useState(false)
  const [noInfo, setNoInfo] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [search, setSearch] = useState('');
  const [removeId, setRemoveId] = useState('');
  const collectionName = `Getation-${auth.currentUser.uid}`;
  const scrollView = useRef();
  const [openModalSearch, setOpenModalSearch] = useState(false)
  const [tableLimit, setTableLimit] = useState(8)
  const { getFirebaseInfo, removeInfoFromFirebase, removeInfoFromSearch,
    getMoreInfoFirebase, searchInfoFirebase, generalData,
    setGeneralData, generalSearchData, setGeneralSearchData } = useGetInfoFirebase()


  useEffect(() => {

    getFirebaseInfo(collectionName).then((e) => setShowLoading(false));


  }, [])



  /** handle remove information */
  function handleRemove(id) {
    setRemoveId(id);
    setOpenModal(true)
  }

  /** / handle remove information */



  const handelOpenaddModal = () => {

    if (showSearch === true) {
      setShowSearch(false);
      return;
    }
   
    setClose(true); 
    setTimeout(()=>{
      
      setShow(show => !show);
      setClose(false); 

    },500)

  }

  /** This seccion handle the search function  */




  function handleSearch() {
    setShowSearch(true)

    function clearInput() {
      setSearch('')
    }

    function openSearchAlert() {
      setOpenModalSearch(true)
    }

    searchInfoFirebase(collectionName, "NoDelCerdo", search, clearInput, openSearchAlert)
  }


  /** / This seccion handle the search function  */


  function handleOpenUpdate(id) {
    setUpdateId(id);
    setShowUpdate(true);
  }

  function DataForTable() {
    let data = generalData.slice(tableLimit - 8, tableLimit)

    return data
  }


  function DataTableNext() {
    if (generalData.length - tableLimit <= 0) {
      return;
    }

    setTableLimit(tableLimit + 8);
  }

  function DataTableBack() {
    if (tableLimit === 8) {
      return;
    }

    setTableLimit(tableLimit - 8);
  }

  return (
    <div className="gestation_conatainer">

      <header className="G_header">

        <span className="G_header_btn" onClick={() => handelOpenaddModal()}>
          {showSearch === true ? <FontAwesomeIcon icon={faCircleArrowLeft} className="G_header_btn" title={'Regresar'} /> : <FontAwesomeIcon className="G_header_btn" title={'Agregar'} icon={faCirclePlus} />}
          <p className="Icon_header_btn_Text">{showSearch ? 'Regresar' : 'Agregar'}</p>
        </span>

        <div>
          <input className="G_header_buscar" type={'text'} placeholder='Buscar' onChange={(e) => setSearch(e.target.value)} value={search} />
          <span className="G_header_buscar_btn" onClick={() => handleSearch()}>
            <FontAwesomeIcon icon={faMagnifyingGlass} size={'sm'} color={'#fff'} />
          </span>
        </div>
        {data.length > 24 ? <button className="G_hearder_more" onClick={() => getMoreInfoFirebase(collectionName, () => setNoInfo(true))}>Cargar Más</button> : <></>}

        <span className="G_header_btn_table" onClick={() => setShowTable(!showTable)}>
          {showTable ? <FontAwesomeIcon className="IconTable" icon={faSquare} size={'2xl'} color={'#141A23'} title={'Tarjetas'} />
            : <FontAwesomeIcon className="IconTable" icon={faTable} size={'2xl'} color={'#141A23'} title={'Tabla'} />
          }
          <p className="IconTableText">{showTable ? 'Tarjeta' : 'Tabla'}</p>
        </span>
      </header>

      {showTable ? (
        <section ref={scrollView} className="G_table_container animate">

          <div className="gestation_table_body">

            <table className="gestation_table">


              <thead className="gestation_table_header">
                <tr>
                  <th>No Del Cerdo</th>
                  <th>Edad</th>
                  <th>No Cerda</th>
                  <th>No Parto</th>
                  <th>Inicio De Gestación</th>
                  <th>Fin De Gestación</th>
                  <th>No De Lechones</th>
                  <th>Vivos</th>
                  <th>Muertos</th>
                  <th></th>
                  <th></th>
                </tr>
              </thead>

              {generalData.length > 0 ? DataForTable().map((list, index) =>
                <tbody key={index}>
                  <tr>
                    <td>{list.NoDelCerdo}</td>
                    <td>{list.Edad}</td>
                    <td>{list.NoCerda}</td>
                    <td>{list.NoParto}</td>
                    <td>{list.InicioDeGestación}</td>
                    <td>{list.FinDeGestación}</td>
                    <td>{list.NoDeLechones}</td>
                    <td>{list.Vivos}</td>
                    <td>{list.Muertos}</td>
                    <td>
                      <span onClick={() => handleOpenUpdate(list.id)}>
                        <FontAwesomeIcon icon={faPenToSquare} size={'xl'} color={'#000'} />
                      </span>
                    </td>

                    <td>
                      <button className="G_info_header_delete" onClick={() => handleRemove(list.id)}>
                        <FontAwesomeIcon icon={faTrash} color={'#000'} />
                      </button>

                    </td>

                  </tr>
                </tbody>
              ) : <></>}
            </table>

            <footer className="table-footer">
              <span className="table-footer-btn" onClick={() => DataTableBack()}>
                <FontAwesomeIcon icon={faAnglesLeft} />
              </span>
              <p>{generalData.length - tableLimit < 0 ? generalData.length : tableLimit}-{generalData.length}</p>
              <span className="table-footer-btn" onClick={() => DataTableNext()}>
                <FontAwesomeIcon icon={faAnglesRight} />
              </span>
            </footer>
          </div>


        </section>
      ) : (
        <section ref={scrollView} className="G_info_container" >

          {generalData.length > 0 ? (generalData.map((list, index) => 
           
           
        <div className="G_info_body animate" key={index}>

            <header className="G_info_header">
              <p className="G_info_header_title">Gestación {index + 1}</p>

              <div className="G_info_header_btn">
                <span className="G_info_header_delete" onClick={() => handleOpenUpdate(list.id)}>
                  <FontAwesomeIcon icon={faPenToSquare} color={'#fff'} />
                </span>
                <button className="G_info_header_delete" onClick={() => handleRemove(list.id)}>
                  <FontAwesomeIcon icon={faTrash} color={'#fff'} />
                </button>
              </div>

            </header>

            <div>
              <p className="G_info_text"><span className="G_info_text2" >Fecha:</span > {list.Hoy}</p>
              <p className="G_info_text"><span className="G_info_text2">No del cerdo:</span > {list.NoDelCerdo}</p>
              <p className="G_info_text"><span className="G_info_text2" >Edad:</span > {list.Edad}</p>
              <p className="G_info_text"><span className="G_info_text2" >No cerda:</span > {list.NoCerda}</p>
              <p className="G_info_text"><span className="G_info_text2" >No parto:</span > {list.NoParto}</p>
              <p className="G_info_text"><span className="G_info_text2" >Inicio de gestación:</span > {list.InicioDeGestación}</p>
              <p className="G_info_text"><span className="G_info_text2" >Fin de gestación</span > {list.FinDeGestación}</p>
              <p className="G_info_text"><span className="G_info_text2" >No de lechones</span > {list.NoDeLechones}</p>
              <p className="G_info_text"><span className="G_info_text2" >Vivos:</span > {list.Vivos}</p>
              <p className="G_info_text"><span className="G_info_text2" >Muertos:</span > {list.Muertos}</p>

            </div>

          </div>
          )) : (
            <NoInformation setShow={setShow} show={show}/>
          )}


        </section>
      )}


      <Modal
        visible={openModal}
        title={'Esta seguro que deseas eliminar esta información?'}
        bodyColor={'#39645C'}
        textColor={'#fff'}
        buttonColor={'#1E3D37'}
        button1={'Descartar'}
        button2={'Borrar'}
        fnButton1={() => setOpenModal(false)}
        fnButton2={() => removeInfoFromFirebase(collectionName, removeId).then(() => {
          setOpenModal(false);
        })}
      />

      <Modal
        visible={noInfo}
        title={'No hay más información que mostrar'}
        button1={'Aceptar'}
        fnButton1={() => setNoInfo(false)}
      />

      <Loading visible={showLoading} />


     <GestationSetInfoModal 
         visible={show} 
         show={show}
         setShow={setShow}
         setGeneralData={setGeneralData} 
         generalData={generalData}
         close={close}
         setClose={setClose}
       
       /> 

     <UpdateGestation 
       visible={showUpdate} 
       showUpdate={showUpdate} 
       setShowUpdate={setShowUpdate} 
       id={updateId} 
       setGeneralData={setGeneralData} 
       generalData={generalData} 
       
       />


      <GestationSearchInfo 
        visible={showSearch} 
        collectionName={collectionName} 
        generalSearchData={generalSearchData}    
        setGeneralSearchData={setGeneralSearchData}
        openModalSearch={openModalSearch} 
        setOpenModalSearch={setOpenModalSearch} 
        removeInfoFromSearch={removeInfoFromSearch} 
        
      /> 


    </div>
  )
}

