import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
const typeoption = [
            { 'key': 'Carded', 'value': 'Carded' },
            { 'key': 'Combed', 'value': 'Combed' },
            { 'key': 'Combed-Compact', 'value': 'Combed-Compact' },
            { 'key': 'Carded-Compact', 'value': 'Carded-Compact' },
            { 'key': 'Virgin', 'value': 'Virgin' },
            { 'key': 'Giza', 'value': 'Giza' }
        ]
function Quality({currdoc,modifydoc,wd,disabled}:any) {
  return (
    <><SelectInput wd={wd} label="Quality" options={typeoption} name="quality" currdoc={currdoc} section={"quality"} modifydoc={modifydoc} disabled={disabled}/></>
  )
}

export default React.memo(Quality)