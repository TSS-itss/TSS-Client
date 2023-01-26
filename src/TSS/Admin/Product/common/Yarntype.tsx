import React from 'react'
import { SelectInput } from '../../../../common/InputFields/Select'
import shortid from 'shortid'
const typeoption = [{ 'key': 'Cotton', 'value': 'Cotton' },{ 'key': 'Synthetic', 'value': 'Synthetic' }, { 'key': 'Viscose', 'value': 'Viscose' }, { 'key': 'Fancy', 'value': 'Fancy' },{ 'key': 'Blends', 'value': 'Blends' }]
const newDocument = (doctype: String, doctypetext: String) => {
  return {
    doctype,
    doctypetext,
    status: 'active',
    validatemode: 'touch',
    uploadfiles: [],
    onlineuploadfiles: [],
    t_id: shortid.generate()
  }
};
function Yarntype({currdoc,modifydoc,wd,inpref,_onchange,disabled}:any) {
  const onYarnTypeChange = (newcurrdoc:any) => {
    const backup = {...currdoc} 
    if(backup.yarntype !==newcurrdoc.yarntype){     
      const newDoc:any = newDocument("PRODUCT","Product")
      newDoc['yarntype']=newcurrdoc.yarntype
      newDoc['buyid']=newcurrdoc.buyid
      newDoc['z_id']=backup.z_id
      modifydoc({...newDoc})}
      else{
        modifydoc({...newcurrdoc})
      }
    }
  return (
    <><SelectInput wd={wd} label="Yarntype" options={typeoption} name="yarntype" currdoc={currdoc} section={"yarntype"} modifydoc={onYarnTypeChange} inpref={inpref} _onchange={_onchange} disabled={disabled}/></>
  )
}

export default Yarntype