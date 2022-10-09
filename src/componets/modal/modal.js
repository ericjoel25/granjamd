import './modalStyle.css';

export default function Modal({visible, title, bodyColor='#7CAD4A', textColor='#000', buttonColor='#204108', button1='', button2='', fnButton1, fnButton2 }){

    return(

        <>

         {visible?( 
            
            <div className="Modal_Container">
             <div className="Modal_body animate" style={{ backgroundColor:`${bodyColor}`}}>
                 <div className='Modal_text_body'>
                    <p className='Modal_text' style={{color:`${textColor}`}}>{title}</p>
                 </div>
     
                 <div className='Modal_btn_body'>
     
                     {button1 !==''? <button className='Modal_btn' style={{ backgroundColor:`${buttonColor}`}} onClick={()=> fnButton1()}>{button1}</button>: <></>}
                    
                     {button2 !==''? <button className='Modal_btn'  style={{ backgroundColor:`${buttonColor}`}}  onClick={()=> fnButton2()}>{button2}</button>: <></>}
                 </div>
                 
             </div>
         </div>): <></>
     
         }
     </>
   
      
    )
 }