import React from 'react'
import './checkbox.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../validationlib';
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
  disabled?:boolean
}
export function Checkbox(props: Iinput) {
  let { wd, label, name, section, currdoc,modifydoc,cal, disabled} = props
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  let classname = 'input-field'
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      classname = 'error-input-field'
    }
  }
  return (
    <div className={`col-${wd}`}>
      <div className="checkbox-container">
        <input type="checkbox"
        className={classname} 
        id={label}
        required
          placeholder=" "
          checked = {getValue(currdoc, section)}
          value={getValue(currdoc, section)}
          onChange={(event) => { setCalValue(currdoc, section, event.target.checked, modifydoc, cal) }}
          onBlur={event => modifydoc(setValue(currdoc, 'touched.' + section, true))}
          disabled={disabled}
        />
        <label htmlFor={label}>{label}</label>
      </div>
      <div className="field-error">{errorMsg}</div>
    </div>
  )
}

export const M_Checkbox = React.memo(Checkbox)
