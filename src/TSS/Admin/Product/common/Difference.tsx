import React from 'react'
import { FlatInput } from '../../../../common/InputFields/Input'

function Difference({currdoc,modifydoc,wd,disabled={disabled}}:any) {
  return (
    <FlatInput wd={wd} label="Diff" name="diff" currdoc={currdoc} section={'diff'} modifydoc={modifydoc} disabled={disabled}/>
  )
}

export default React.memo(Difference)