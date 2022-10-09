
import './Loading.css';



/**  You need to have a state with this    const [showLoading, setShowLoading]= useState(true); 
 *  And pass visible={showLoading}
 */
export default function Loading({ visible }) {
    return (
        <>  
          {visible ? (
                <main className="loading-container">
                    <div className='loader'></div>
                    <p className='loader-text'>Cargando datos...</p>
                </main>
            ) : (<></>)}
        </>



    )
}