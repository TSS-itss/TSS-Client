import React from 'react'
import './modal.css'
import {useKey,useAltKey} from '../shortcurkeys'
import { FlatInput } from '../InputFields/Input'
function Modal({open,handleno,handleyes,dailogtext,dailogtitle,currentdocument,modifydocument}: any) {
    useAltKey("y",() =>{handleyes()})
    useAltKey("q",() =>{handleno()})
    if(open){
    return (
        <>
        {/* <input type="checkbox" id="click" />
                <label htmlFor="click" className="click-me">Click Me</label> */}
        <div className="modal-container">
            <div className="center">
                
                <div className="content">
                    <div className="header">
                        <h2>{dailogtitle}</h2>
                        <label htmlFor="click" className="fas fa-times" onClick={()=>handleno()}></label>
                    </div>
                    {/* <label htmlFor="click" className="fas fa-check"></label>
                    <p>{dailogtext}</p> */}
                    <div className="grid" style={{padding:"1rem"}}>
              <div className="row">
                <FlatInput wd="12" label="OTP" name="otp" currdoc={currentdocument} section={'otp'} modifydoc={modifydocument} />
                <div className={"col-12"}></div>
              </div>
              </div>
                    <div className="line"></div>
                    {/* <label htmlFor="click" className="close-btn">close</label> */}
                    <div className="modal-buttons-section" >
                    <div className="modal-button" onClick={()=>handleno()}><span>Cancel</span></div>
                    <div className="modal-button confirm" onClick={()=>handleyes()}><span>Confirm</span></div>
                    </div>


                </div>
            </div>
        </div>
        </>
    )
}else{
        return null
}
}
export default React.memo(Modal)
