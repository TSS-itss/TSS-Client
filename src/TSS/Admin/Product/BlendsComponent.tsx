import React, { useState } from 'react'
import { connect } from 'react-redux'
import Composition from './common/Compositiontype'
import Difference from './common/Difference'
import Percentage from './common/Percentage'
import Tolerance from './common/Tolerance'

export const BlendsComponent = ({currdoc,modifydoc,disabled}:any) => {
  const [section, setSection] = useState("")
  if(section!==""){
    if(currdoc.yarntype=="Blends" && (currdoc[section]!==undefined && currdoc[section]!=="")){
      let remainder=(100-Number(currdoc[section].split("/")[0]))
      if(section==="percentage1"){
      currdoc['percentage2'] = remainder+"/100"
    }
      else{
      currdoc['percentage1'] = remainder+"/100"
    }
    }
    //modifydoc({...currdoc})
  }
  return (
    <div className="grid">
      <div className="row">
        <Composition currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Composition 1"} section="composition1" disabled={disabled}/>
        <Percentage  currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Percentage 1"} section="percentage1" changepercent={setSection} disabled={disabled}/>
        <div className={"col-3"}></div>        
        <div className={"col-3"}></div>
      </div>
      <div className="row">
      <Composition currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Composition 2"} section="composition2" disabled={disabled}/>
        <Percentage  currdoc={currdoc} modifydoc={modifydoc} wd={3} label={"Percentage 2"} section="percentage2" changepercent={setSection} disabled={disabled}/>
        <div className={"col-3"}></div>
        <div className={"col-3"}></div>
      </div>
      <div className="row">
      <Tolerance currdoc={currdoc} modifydoc={modifydoc} wd={3} disabled={disabled}/>
      <div className={"col-3"}></div>
      {/* <Difference currdoc={currdoc} modifydoc={modifydoc} wd={3}/> */}
        <div className={"col-3"}></div>
        <div className={"col-3"}></div>
      </div>
    </div>
  )
}

const mapStateToProps = (state:any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(BlendsComponent)