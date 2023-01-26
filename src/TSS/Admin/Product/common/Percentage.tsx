import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [
        { 'key': '0/100', 'value': '0/100' },
        { 'key': '10/100', 'value': '10/100' },
        { 'key': '20/100', 'value': '20/100' },
        { 'key': '30/100', 'value': '30/100' },
        { 'key': '40/100', 'value': '40/100' },
        { 'key': '50/100', 'value': '50/100' },
        { 'key': '60/100', 'value': '60/100' },
        { 'key': '70/100', 'value': '70/100' },
        { 'key': '80/100', 'value': '80/100' },
        { 'key': '90/100', 'value': '90/100' },
        { 'key': '100/100', 'value': '100/100' },
    ]

function Percentage({currdoc,modifydoc,wd,label,section,changepercent,disabled}:any) {
  //const newOption = section==='percentage1'? typeoption.filter(item=>item.key!==currdoc['percentage2']) : typeoption.filter(item=>item.key!==currdoc['percentage1'])
  return (
    <SelectInput wd={wd} label={label} options={typeoption} name={section} currdoc={currdoc} section={section} modifydoc={modifydoc} _onchange={changepercent} disabled={disabled}/>
  )
}

export default React.memo(Percentage)