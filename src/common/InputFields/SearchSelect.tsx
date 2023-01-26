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
import Select from 'react-select'
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
export function SearchSelect(props: any) {
  const { wd, label, options, name, section,currdoc,modifydoc,cal,refresh,inpref} = props
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  let selectclassname = 'input-field'
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      selectclassname = 'error-input-field'
    }
  }
  let yz=getValue(currdoc,section)
  if(yz===""){
    yz=null
  }

  // else{
  //   yz={  value: yz,  label: yz}
  // }

  if(currdoc[section] !== undefined && currdoc[section]!==null && typeof currdoc[section]==='string'){
    let category_arr:string[]=currdoc[section].split(',')
    currdoc[section] = []
    for(let i=0;i<category_arr.length;i++){
      currdoc[section].push({'label': category_arr[i], 'value':category_arr[i]})
    }}
  return (<>
  <div className={`col-${wd}`}>
    <div style={{display:'flex'}}>
    <span style={{flex:11}}><Select  
    name={name}
    ref={inpref}
          value={yz} 
          onChange={(value:any)=>{value.length>0 ? setCalValue(currdoc,section,value,modifydoc,cal):setCalValue(currdoc,section,null,modifydoc,cal)}} 
          onBlur={event => modifydoc(setValue(currdoc, 'touched.' + section, true))}
          //onBlur={event => modifydoc(setValue(currdoc,'touched.'+section,true))}
          placeholder={"Select "+ name}
          options={options}
          isClearable={true}
          className={""}
          isMulti={true}
          isSearchable={true}
          /></span>
          <span className="las la-sync" onClick={()=>{refresh()}} style={{flex:1,height:"100%",fontSize:"1.8rem",padding:"5px"}}/>
          </div>
          <div className="field-error">{errorMsg}</div>
          </div>
  
    </>
  )
}

export const SearchSelectInput = React.memo(SearchSelect)
