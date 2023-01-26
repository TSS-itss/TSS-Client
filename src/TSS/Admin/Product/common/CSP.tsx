import React from 'react'
import { FlatInput } from '../../../../common/InputFields/Input'

function CSP({currdoc,modifydoc,wd,disabled}:any) {
  return (
    <FlatInput wd={wd} label="CSP" name="yarncsp" currdoc={currdoc} section={'yarncsp'} modifydoc={modifydoc} disabled={disabled}/>
  )
}

export default React.memo(CSP)