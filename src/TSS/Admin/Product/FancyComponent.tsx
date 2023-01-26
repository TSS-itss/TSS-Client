import React from 'react'
import { connect } from 'react-redux'
import Count from './common/Count'
import CSP from './common/CSP'
import Deliveryperiod from './common/Deliveryperiod'
import Nature from './common/Nature'
import PurposeVariety from './common/PurposeVariety'
import Quality from './common/Quality'
import Slug from './common/Slug'
import Weavingtype from './common/Weavingtype'

export const FancyComponent = ({currdoc,modifydoc,disabled}:any) => {
  return (
    <div className="grid">
      <div className="row">
        <PurposeVariety currdoc={currdoc} modifydoc={modifydoc} wd={3} yarntype={currdoc["yarntype"]} label={"Variety"} disabled={disabled}/>
        <Count  currdoc={currdoc} modifydoc={modifydoc} wd={3} disabled={disabled}/>
        <div className={"col-3"}></div>        
        <div className={"col-3"}></div>
      </div>
      <div className="row">
        <Weavingtype currdoc={currdoc} modifydoc={modifydoc} wd={3} disabled={disabled}/>
        <Nature currdoc={currdoc} modifydoc={modifydoc} wd={3} disabled={disabled}/>
        <div className={"col-3"}></div>
        <div className={"col-3"}></div>
      </div>
      <div className="row">
      <Slug currdoc={currdoc} modifydoc={modifydoc} wd={3} disabled={disabled}/>
      <div className={"col-3"}></div>
        <div className={"col-3"}></div>
        <div className={"col-3"}></div>
      </div>
      
    </div>
  )
}

const mapStateToProps = (state:any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(FancyComponent)