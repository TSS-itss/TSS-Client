import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [
        { 'key': '1', 'value': '1' },
        { 'key': '2', 'value': '2' },
        { 'key': '3', 'value': '3' },
        { 'key': '4', 'value': '4' },
        { 'key': '5', 'value': '5' },
    ]
function Tolerance({currdoc,modifydoc,wd,label,section,disabled}:any) {
  return (
    <SelectInput wd={wd} label={"Tolerance"} options={typeoption} name={"tolerance"} currdoc={currdoc} section={"tolerance"} modifydoc={modifydoc} disabled={disabled}/>
  )
}

export default React.memo(Tolerance)