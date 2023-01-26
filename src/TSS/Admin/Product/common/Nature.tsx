import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [{ 'key': 'OpenEnd', 'value': 'Open End' },{ 'key': 'Ringspun', 'value': 'Ringspun' },{ 'key': 'Vortex', 'value': 'Vortex' }]
function Nature({currdoc,modifydoc,wd,disabled}:any) {
  return (
  <SelectInput wd={wd} label="Nature" options={typeoption} name="nature" currdoc={currdoc} section={"nature"} modifydoc={modifydoc} disabled={disabled}/>
  )
}

export default React.memo(Nature)