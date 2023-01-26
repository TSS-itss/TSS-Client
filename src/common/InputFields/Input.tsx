import React from 'react'
import './input.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../validationlib';
import {LabelField} from './LabelField'
interface Iinput {
  wd?: string;
  label: string;
  name: string;
  currdoc: any;
  section: string;
  cal?:string;
  modifydoc:any;
  inpref?:any;
  onclick?:any;
  disabled?:boolean,
  type?:string
}

export function Input(props: Iinput) {
  let { wd, label, name, section, currdoc,modifydoc,cal,inpref,onclick,disabled,type } = props
  let classname = 'input-field'
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      classname = 'error-input-field'
    }
  }
  if(!onclick)[
    onclick = ()=>{}
  ]
  if(type===undefined){
    type="text"
  }
  return (
    <div className={`col-${wd}`}>
      {!disabled?<>
      <div className={classname}>
        {!disabled? <input
          disabled={disabled}
          type={type}
          name={name}
          autoComplete="off"
          required
          placeholder=" "
          ref={inpref}
          value={getValue(currdoc, section)}
          onChange={(event) => { setCalValue(currdoc, section, event.target.value, modifydoc, cal) }}
          onBlur={event => modifydoc(setValue(currdoc, 'touched.' + section, true))}
          onClick={()=>onclick(true)}
          onFocus={()=>{onclick(true)}}
        />:""}
        <label className="label-name">
          <span className="content-name"> {disabled? label+":"+getValue(currdoc, section):label}</span>
         
        </label>
        
      </div>
      <div className="field-error">{errorMsg}</div></>:
      <LabelField label={label} currdoc={currdoc} section={section} wd={"12"}/>
      
      }
    </div>
  )
}

 export const FlatInput = React.memo(Input)
