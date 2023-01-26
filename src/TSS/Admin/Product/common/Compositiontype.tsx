import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [
        { 'key': 'Cotton', 'value': 'Cotton' },
        { 'key': 'Linen', 'value': 'Linen' },
        { 'key': 'Polyester', 'value': 'Polyester' },
        { 'key': 'Viscose', 'value': 'Viscose' },
        { 'key': 'Excel', 'value': 'Excel' },
        { 'key': 'Modal', 'value': 'Modal' },
        { 'key': 'Hemp', 'value': 'Hemp' },
        { 'key': 'Flax', 'value': 'Flax' },
        { 'key': 'Nylon', 'value': 'Nylon' },
        { 'key': 'Lycra', 'value': 'Lycra' },
        { 'key': 'Bamboo', 'value': 'Bamboo' },
    ]
function Composition({currdoc,modifydoc,wd,label,section,disabled}:any) {
  const newOption = section==='composition1'? typeoption.filter(item=>item.key!==currdoc['composition2']) : typeoption.filter(item=>item.key!==currdoc['composition1'])
  return (
    <SelectInput wd={wd} label={label} options={newOption} name={section} currdoc={currdoc} section={section} modifydoc={modifydoc} disabled={disabled}/>
  )
}

export default React.memo(Composition)