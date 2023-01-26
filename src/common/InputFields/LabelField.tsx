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
interface Iinput {
  wd?: string;
  label: string;
  currdoc: any;
  section: string;
  cal?:string;
}

export function Labelfield(props: Iinput) {
  let { wd, label, section, currdoc,cal } = props
  let classname = 'input-label-container'

  if(!onclick)[
    onclick = ()=>{}
  ]
  return (
    <div className={`col-${wd}`}>
      <div className={classname}>
      <span className='label-header'>{label}</span>
      <br/>
      <span>{getValue(currdoc, section)}</span>
      </div>
      
    </div>
  )
}

export const LabelField = React.memo(Labelfield)
