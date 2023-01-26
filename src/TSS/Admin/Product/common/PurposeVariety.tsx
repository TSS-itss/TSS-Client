import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
 const options:any={Cotton : [
            { 'key': 'Weaving', 'value': 'Weaving' },
            { 'key': 'Hosiery', 'value': 'Hosiery' },
        ],
 Synthetic : [
            { 'key': 'PSF', 'value': 'PSF' },
            { 'key': 'PV', 'value': 'PV' },
            { 'key': 'PC', 'value': 'PC' }
        ],
 Viscose : [
            { 'key': 'Viscose', 'value': 'Viscose' },
            { 'key': 'Modal', 'value': 'Modal' },
            { 'key': 'Excel', 'value': 'Excel' }
],
 Fancy : [
            { 'key': 'Lycra/Stretche', 'value': 'Lycra/Stretch' },
            { 'key': 'Tencel', 'value': 'Tencel' },
]}

function PurposeVariety({currdoc,modifydoc,wd,yarntype,label,disabled}:any) {
  return (
    <><SelectInput wd={wd} label={label} options={options[yarntype]} name="purposevariety" currdoc={currdoc} section={"purposevariety"} modifydoc={modifydoc} disabled={disabled}/></>
  )
}

export default React.memo(PurposeVariety)