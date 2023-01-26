import React from 'react'
import './select.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../validationlib';
import { LabelField } from './LabelField';

interface Iinput {
  wd?: string
  label: string
  name: string
  currdoc: any,
  section: string,
  cal:string,
  modifydoc:any,
  options:any,
  
}
export function Select(props: any) {
  let { wd, label, options, name, section,currdoc,modifydoc,cal, inpref,_onchange, disabled} = props
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  let selectclassname = 'input-field'
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      selectclassname = 'error-input-field'
    }
  }
  if(!_onchange){
    _onchange = ()=>{}
  }
  return (
    <div className={`col-${wd}`}>
      {!disabled?<><div className={selectclassname}>
        <select required name={name}
          ref={inpref} 
          value={getValue(currdoc,section)} 
          onChange={(event)=>{ setCalValue(currdoc,section,event.target.value,modifydoc,cal);_onchange(section)  } } 
          onBlur={event => modifydoc(setValue(currdoc,'touched.'+section,true))}>
          <option />
          {options.map((item: any, i: string) => (
            <option label={item.value} value={item.key} key={i} />
          ))}
        </select>
        <label className="label-name">
          <span className="content-name">{label}</span>
        </label>
      </div>
      <div className="field-error">{errorMsg}</div></>:
      <LabelField label={label} currdoc={currdoc} section={section} wd={"12"}/>
      }
    </div>
  )
}

export const SelectInput = React.memo(Select)
