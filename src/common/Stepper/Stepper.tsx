import React, { useEffect, useState } from 'react'
import Step from './Step'
import "./stepper.css"
function Stepper(props: any) {
    const {onsubmit,displaySubmit} = props
    useEffect(() => {
        const form1:any = document.getElementById("form1")
        const form2:any = document.getElementById("form2")
        const form3:any = document.getElementById("form3")
        form2.style.display = "none"
        form3.style.display = "none"
        form1.style.left = "25px"
     
    }, [])
    
   const onBackButtonClick = (index:number) => {
    if(index !== 0){
        const form1:any = document.getElementById("form"+(index+1))
        const form2:any = document.getElementById("form"+(index))
        form2.style.left = "25px";
        form1.style.left = "100%";
        const progress:any = document.getElementById("progress")
        progress.style.width =`calc(((100%) / 3 ) * ${index})`;
    }
   }
   const onNextButtonClick = (index:number) => {
    if(index !== props.children.length-1){
        const form1:any = document.getElementById("form"+(index+1))
        const form2:any = document.getElementById("form"+(index+2))
        form2.style.display = "block"
        form1.style.left = "-100%";
        form2.style.left = "25px";
        
        const progress:any = document.getElementById("progress")
        if(index+2 === props.children.length-1)
        progress.style.width =`calc(((100%) / 3 ) * ${index+2})`;
        else
        progress.style.width =`calc(((100%) / 3 ) * ${index+2})`;
    }
   }
    return (
        <div className="stepper-container">
            {props.children.map((ele:any,i:number)=>(<div className="step-form" id={"form"+(i+1)}>
            <h3>{ele.props.title}</h3>
                {ele.props.children}
                <div className="btn-box">
                {i>0?<button type="button" id={"back"+(i+1)} onClick={()=>{onBackButtonClick(i)}}>Back</button>:<></>}
                {i !== props.children.length-1 ?<button type="button" id={"next"+(i+1)} onClick={()=>{onNextButtonClick(i)}}>Next</button>:<></>}
                { i === props.children.length-1 && displaySubmit?<button type="button" id={"back"+(i+1)} onClick={()=>onsubmit("save")}>Submit</button>:<></>} 
            </div>
            </div>))}
        <div className="step-row">
        <div id="progress"></div>
            {props.children.map((ele:any, i:number) => (<Step name={ele.props.name}/>)
            )
            }
        </div>
        </div>
    )
}

export default React.memo(Stepper)