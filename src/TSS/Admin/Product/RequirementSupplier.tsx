import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { FlatInput } from "../../../common/InputFields/Input"

import { SelectInput } from '../../../common/InputFields/Select'
import {Checkbox} from    '../../../common/InputFields/Checkbox'
import Loader from '../../../common/Loader/Loader'
import BlendsComponent from './BlendsComponent'
import Yarntype from './common/Yarntype'
import CottonComponent from './CottonComponent'
import FancyComponent from './FancyComponent'
import SyntheticComponent from './SyntheticComponent'
import ViscoseComponent from './ViscoseComponent'
import CSP from './common/CSP'
import Deliveryperiod from './common/Deliveryperiod'
import useSaveAction from '../../../common/Hooks/useSaveAction'
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../../common/CommonLogic';
import {
  runCheck, requiredCheck, getDtFormat, getTimeFormat, getFromToDate, getDateYYYYMMDDHHMI, getDateYYYYMMDD, maxLength40, maxLength128,
  setErrorValue, getValue, setValue,numberCheck,numberPositiveCheck
} from '../../../common/validationlib';
import shortid from 'shortid'
import * as doctypes from '../../../common/Doctypes';
import deleteRequirement from '../../../common/mutations/deleteRequirement'
import constant from '../../../common/constant'
import requirementQuery from '../../../common/queries/requirementQuery'
import bidQuery from '../../../common/queries/bidQuery'
import saveRequirement from '../../../common/mutations/saveRequirement';
import saveBid from '../../../common/mutations/saveBid';
import { execGql, execGql_xx } from '../../../common/gqlclientconfig';
import Messagesnackbar from '../../../common/Alert'
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'
import AppbarBottom from '../../../common/AppbarBottom'
import approvedBuyers from '../../../common/queries/approvedBuyersQuery'
import { Redirect, withRouter } from 'react-router-dom'
import { OnlineFileuploadComponent } from '../../../common/OnlineFileuploadComponent'

const newDocument = (doctype: String, doctypetext: String) => {
  return {
    doctype,
    doctypetext,
    status: 'active',
    validatemode: 'touch',
    buyid:'',
    uploadfiles: [],
    onlineuploadfiles: [],
    t_id: shortid.generate()
  }
};

let backupdoc:any=null

export const handleSaveCheck = (currentdocument: any) => {
  const { touched, yarntype, count, purposevariety, type, nature, quality, slug, composition1, composition2, percentage1, percentage2, tolerance, diff,
    reqid,
    buyid,
    yarncsp,
    deliverysch,
    reqqty,
    targetprice,
    restreportreq,
    targetmills,
    validatemode } = currentdocument;

  let yarntype_check, count_check, purposevariety_check, type_check, nature_check, quality_check, slug_check, composition1_check
    , composition2_check, percentage1_check, percentage2_check, tolerance_check, reqid_check,
    buyid_check,
    yarncsp_check,
    deliverysch_check,
    reqqty_check,
    targetprice_check,
    restreportreq_check,
    targetmills_check, diff_check = "";
  yarntype_check = runCheck(nvl(yarntype, ''), [requiredCheck]);
  if (yarntype !== 'Blends') {
    count_check = runCheck(nvl(count, ''), [requiredCheck]);
    purposevariety_check = runCheck(nvl(purposevariety, ''), [requiredCheck]);
    type_check = runCheck(nvl(type, ''), [requiredCheck]);
    nature_check = runCheck(nvl(nature, ''), [requiredCheck]);

    slug_check = runCheck(nvl(slug, ''), [requiredCheck])
  }
  if (yarntype === 'Cotton') {
    quality_check = runCheck(nvl(quality, ''), [requiredCheck]);
  }
  if (yarntype === 'Blends') {
    composition1_check = runCheck(nvl(composition1, ''), [requiredCheck]);
    composition2_check = runCheck(nvl(composition2, ''), [requiredCheck]);
    percentage1_check = runCheck(nvl(percentage1, ''), [requiredCheck]);
    percentage2_check = runCheck(nvl(percentage2, ''), [requiredCheck]);
    tolerance_check = runCheck(nvl(tolerance, ''), [requiredCheck]);
    //diff_check=runCheck(nvl(diff, ''), [requiredCheck]);
  }


  reqid_check = ""//runCheck(nvl(reqid, ''), [requiredCheck]);
  buyid_check = runCheck(nvl(buyid, ''), [requiredCheck]);
  yarncsp_check = runCheck(nvl(yarncsp, ''), [requiredCheck,numberPositiveCheck]);
  deliverysch_check = runCheck(nvl(deliverysch, ''), [requiredCheck]);
  reqqty_check = runCheck(nvl(reqqty, ''), [requiredCheck,numberPositiveCheck]);
  targetprice_check = runCheck(nvl(targetprice, ''), [requiredCheck,numberPositiveCheck]);
  restreportreq_check = ""//runCheck(nvl(restreportreq, 'N'), [requiredCheck]);
  targetmills_check = runCheck(nvl(targetmills, ''), [requiredCheck]);


  console.log('currentdocument.errorsAll', currentdocument.errorsAll)
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      yarntype: yarntype_check,
      count: count_check,
      purposevariety: purposevariety_check,
      type: type_check,
      nature: nature_check,
      quality: quality_check,
      slug: slug_check,
      composition1: composition1_check,
      composition2: composition2_check,
      percentage1: percentage1_check,
      percentage2: percentage2_check,
      tolerance: tolerance_check,

      reqid: reqid_check,
      buyid: buyid_check,
      yarncsp: yarncsp_check,
      deliverysch: deliverysch_check,
      reqqty: reqqty_check,
      targetprice: targetprice_check,
      restreportreq: restreportreq_check,
      targetmills: targetmills_check,




      //diff:diff_check
    }
    validatemode == 'touch'
  }
  if (validatemode == 'touch' && touched != null) {
    currentdocument.errorsAll = {
      yarntype: checkTouched(nvl(touched.yarntype, false), yarntype_check),
      count: checkTouched(nvl(touched.count, false), count_check),
      purposevariety: checkTouched(nvl(touched.purposevariety, false), purposevariety_check),
      type: checkTouched(nvl(touched.type, false), type_check),
      nature: checkTouched(nvl(touched.nature, false), nature_check),
      quality: checkTouched(nvl(touched.quality, false), quality_check),
      slug: checkTouched(nvl(touched.slug, false), slug_check),
      composition1: checkTouched(nvl(touched.composition1, false), composition1_check),
      composition2: checkTouched(nvl(touched.composition2, false), composition2_check),
      percentage1: checkTouched(nvl(touched.percentage1, false), percentage1_check),
      percentage2: checkTouched(nvl(touched.percentage2, false), percentage2_check),
      tolerance: checkTouched(nvl(touched.tolerance, false), tolerance_check),
      reqid: checkTouched(nvl(touched.reqid, false), reqid_check),
      buyid: checkTouched(nvl(touched.buyid, false), buyid_check),
      yarncsp: checkTouched(nvl(touched.yarncsp, false), yarncsp_check),
      deliverysch: checkTouched(nvl(touched.deliverysch, false), deliverysch_check),
      reqqty: checkTouched(nvl(touched.reqqty, false), reqqty_check),
      targetprice: checkTouched(nvl(touched.targetprice, false), targetprice_check),
      restreportreq: checkTouched(nvl(touched.restreportreq, false), restreportreq_check),
      targetmills: checkTouched(nvl(touched.targetmills, false), targetmills_check),

      //diff:checkTouched(nvl(touched.diff, false), diff_check)
    }
  }


  return currentdocument;
}
export const handleSaveCheckBid = (currentdocument: any) => {
  const { 
    reqid, supid, amount1, amount2, supremarks,validatemode,touched,
    status,uombid,paymenttermsbid
  } = currentdocument;

  let reqid_check, supid_check, amount1_check, amount2_check, supremark_check,status_check,uombid_check,paymenttermsbid_check
  reqid_check = runCheck(nvl(reqid, ''), [requiredCheck]);
  supid_check = runCheck(nvl(supid, ''), [requiredCheck]);
  amount1_check = runCheck(nvl(amount1, ''), [requiredCheck,numberPositiveCheck]);
  amount2_check = runCheck(nvl(amount2, ''), [requiredCheck,numberPositiveCheck]);
  supremark_check = runCheck(nvl(supremarks, ''), [requiredCheck]);
  uombid_check = runCheck(nvl(uombid, ''), [requiredCheck]);
  paymenttermsbid_check = runCheck(nvl(paymenttermsbid, ''), [requiredCheck]);

  //status_check = runCheck(nvl(status, ''), [requiredCheck]);


  console.log('currentdocument.errorsAll', currentdocument.errorsAll)
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      reqid: reqid_check,
      supid: supid_check,
      amount2: amount2_check,
      amount1: amount1_check,
      supremarks: supremark_check,
      status:status_check,
      uombid_files:uombid_check,
      paymenttermsbid_files:paymenttermsbid_check
      //diff:diff_check
    }
    validatemode == 'touch'
  }
  if (validatemode == 'touch' && touched != null) {
    currentdocument.errorsAll = {
      reqid: checkTouched(nvl(touched.reqid, false), reqid_check),
      supid: checkTouched(nvl(touched.supid, false), supid_check),
      amount2: checkTouched(nvl(touched.amount2, false), amount2_check),
      amount1: checkTouched(nvl(touched.amount1, false), amount1_check),
      supremarks: checkTouched(nvl(touched.supremarks, false), supremark_check),
      status: checkTouched(nvl(touched.status, false), status_check),
      uombid: checkTouched(nvl(touched.uombid, false), uombid_check),
      paymenttermsbid: checkTouched(nvl(touched.paymenttermsbid, false), paymenttermsbid_check)
    }
  }


  return currentdocument;
}

export const handleSave = async (currentdocument: any) => {
  var result: any = '', errorMessage = '', errors = new Array();
  return new Promise<void>(async (resolve, reject) => {


    try {
      let recoForSave = {
        ...constant,
        yarntype: nvl(currentdocument.yarntype, ''),
        count: nvl(currentdocument.count, ''),
        purposevariety: nvl(currentdocument.purposevariety, ''),
        type: nvl(currentdocument.type, ''),
        nature: nvl(currentdocument.nature, ''),
        quality: nvl(currentdocument.quality, ''),
        slug: nvl(currentdocument.slug, ''),
        composition1: nvl(currentdocument.composition1, ''),
        composition2: nvl(currentdocument.composition2, ''),
        percentage1: nvl(currentdocument.percentage1, ''),
        percentage2: nvl(currentdocument.percentage2, ''),
        tolerance: nvl(currentdocument.tolerance, ''),
        //diff: nvl(currentdocument.diff, ''),
        z_id: nvl(currentdocument.z_id, ''),
        t_id: nvl(currentdocument.t_id, ''),


        reqid: nvl(currentdocument.reqid, ''),
        buyid: nvl(currentdocument.buyid, ''),
        yarncsp: nvl(currentdocument.yarncsp, ''),
        deliverysch: nvl(currentdocument.deliverysch, ''),
        reqqty: nvl(currentdocument.reqqty, ''),
        targetprice: nvl(currentdocument.targetprice, ''),
        restreportreq: nvl(currentdocument.restreportreq, 'N'),
        targetmills: nvl(currentdocument.targetmills, ''),
        //reffiles:nvl(currentdocument.reffiles,[])
      }

      //recoForSave.reffiles.forEach(element => {delete element.__typename});


      result = await execGql('mutation', saveRequirement, recoForSave)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      }
      else {
        resolve(result.data)
        return result.data;
      }
    }
    catch (err: any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
    }

  })
}

export const handleSaveBid = async (currentdocument: any) => {
  var result: any = '', errorMessage = '', errors = new Array();
  return new Promise<void>(async (resolve, reject) => {


    try {
      let recoForSave = {
        ...constant,
        reqid: nvl(currentdocument.reqid, ''),
        supid: nvl(currentdocument.supid, ''),
        amount2: nvl(currentdocument.amount2, ''),
        amount1: nvl(currentdocument.amount1, ''),
        supremarks: nvl(currentdocument.supremarks, ''),
        status: nvl(currentdocument.status, ''),
        uombid: nvl(currentdocument.uombid, ''),
        paymenttermsbid: nvl(currentdocument.paymenttermsbid, ''),
        z_id:nvl(currentdocument.z_id,''),
        testcertificate_files:nvl(currentdocument.testcertificate_files,[]),
        bcicertificate_files:nvl(currentdocument.bcicertificate_files,[])
      }


      recoForSave.testcertificate_files.forEach((element:any) => {delete element.__typename});
      recoForSave.bcicertificate_files.forEach((element:any) => {delete element.__typename});
      //recoForSave.reffiles.forEach(element => {delete element.__typename});


      result = await execGql('mutation', saveBid, recoForSave)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      }
      else {
        resolve(result.data)
        return result.data;
      }
    }
    catch (err: any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
    }

  })
}

async function getBid(values: any) {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    result = await execGql('query', bidQuery, values)
    if (!result) {
      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      return [];
      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
    }
    else {
      //return result.data;
      console.log(result.data)
      return result.data.bids;
    }
  }
  catch (err: any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log({ "errors": errors, "errorMessage": errorMessage })
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
}
async function getRequirement(values: any) {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    result = await execGql('query', requirementQuery, values)
    if (!result) {
      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      return [];
      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
    }
    else {
      //return result.data;
      return result.data.requirements;
    }

  }
  catch (err: any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log({ "errors": errors, "errorMessage": errorMessage })
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }

}
const uomoptions = [{ 'key': 'Tonne', 'value': 'Tonne' },
			  { 'key': 'KG', 'value': 'KG' }
			 ]

const paymenttermsoptions = [{ 'key': 'Advance', 'value': 'Advance' },
			           { 'key': '30-Days', 'value': '30-Days' },
 				     { 'key': '60-Days', 'value': '60-Days' },
				     { 'key': 'LC', 'value': 'LC' }
			 ]
export const Requirement = (props: any) => {
  const yarntypeinp: any = useRef(0)
  const doctype = doctypes.REQUIREMENT;
  const doctypetext = 'Bid';
  const resetFocus = () => {
    setTimeout(() => yarntypeinp.current.focus(), 1000)
  }
  const [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(handleSaveBid, handleSaveCheckBid, doctype, doctypetext, resetFocus, deleteRequirement)
  //const bidacc: any = useSaveAction(handleSaveBid, handleSaveCheckBid, doctype, doctypetext, resetFocus, deleteRequirement)
  const [approvedBuyersData, setApprovedBuyers] = useState([]);
  const [action1, setAction] = useState(false);
  let disabled=true
  // if (props.authuser.userauthorisations=='Buyer') {
  //   disabled=false
  // }
  async function getApprovedBuyers(values: any) {
    var result: any = '', errorMessage = '', errors = new Array();
  
    try {
    
      result = await execGql('query', approvedBuyers, { client: '45004500', lang: 'EN',applicationid:"15001500" })
      if (!result) {
       
        return [];
        // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
      }
      else {
        let apprBuyer=result.data.approvedBuyers.map((buyer:any)=>{return {'key': buyer.buyid , 'value': buyer.buyid }});
        setApprovedBuyers(apprBuyer)
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
    
  } 



useEffect(()=>{
  if(!currentdocument.yarntype && backupdoc!==null){
   modifydocument({...backupdoc,...currentdocument})
}
}, [currentdocument.yarntype])
useEffect(() => {
      console.log(props.authenticated)
      getApprovedBuyers({ client: '45004500', lang: 'EN',applicationid:"15001500" })
      let z_id = new URLSearchParams(window.location.search).get("z_id")
      let code = new URLSearchParams(window.location.search).get("code")
      let currdoc:any = {...currentdocument}
      currdoc['supid']=code
      if(!disabled){yarntypeinp.current.focus()}
      if (z_id != 'NO-ID') {
        setloaderDisplay(true)
        
        getRequirement({ client: '45004500', lang: 'EN', z_id,applicationid:"15001500" }).then((data: any) => {
          currdoc = {...currdoc,...data[0]}
          backupdoc ={...currdoc}
          currdoc.z_id = ""
          modifydocument(currdoc)

          //setloaderDisplay(false)
          getBid({ client: '45004500', lang: 'EN', z_id:"",applicationid:"15001500",supid:code,reqid:data[0].reqid }).then((data1: any) => {
          
            if(data1[0]){
              currdoc = {...currdoc,...data1[0]}
              modifydocument(currdoc)
          }
        });
        
        setloaderDisplay(false)
        });
      }
      if (z_id == 'NO-ID') {
        let newdoc=newDocument(doctype, doctypetext)
        newdoc.buyid=props.authuser.username;
          modifydocument(newdoc);
  
      }



    }, []);
    
    const { action,   dailogtext, dailogtitle } = documentstatus;
    let {yesaction,noaction} = documentstatus
    yesaction = ()=>{
      const docstatus = {...documentstatus}
      setAction(false)
      docstatus.action = false
      setDocumentstatus({...docstatus})
      onClickSave('submit')
    }
    noaction=()=>{
      setAction(false)
      const docstatus = {...documentstatus}
      docstatus.action = false
      setDocumentstatus({...docstatus})
      
    }
    if(redirect){
      let redirectpath='/requirementManagement'
      return <Redirect push to={redirectpath} />;
  
       
    }
 
    let buyerComp;
    if (props.authuser.userauthorisations=='Buyer') {
      buyerComp = <FlatInput wd="3" label="Buyer" name="buyid" currdoc={currentdocument} section={'buyid'} modifydoc={modifydocument} disabled={disabled}/>;
    } else {
      buyerComp =  <SelectInput wd="3" label="Buyer DDL" options={approvedBuyersData} name="userauthorisations" currdoc={currentdocument} section={'buyid'} modifydoc={modifydocument} disabled={disabled}/>
      ;
    }
    
    const onClickSave=(status:string)=>{
      const curdoc = {...currentdocument}
      curdoc['status'] =status
      currentdocument['status']=status
      //modifydocument({...curdoc})
      setDocumentAction('save')
    }
    const onClickSubmit=(status:string)=>{
      currentdocument['validatemode']="save"
      //currentdocument['status']="submit"
     const currentdocument0= handleSaveCheckBid(currentdocument)
      let isSaveOk = !Object.keys(currentdocument0.errorsAll).some((x: any) => currentdocument0.errorsAll[x]);
      if(isSaveOk){
      const docstatus = {...documentstatus}
      setAction(true)
      docstatus.action = false
      docstatus.dailogtext="Are you sure you want to submit the bid. Once submitted cannot be edited" 
      docstatus.dailogtitle="Submit Bid"
      setDocumentstatus({...docstatus})
    }else{
      modifydocument({...currentdocument0})
    }
      // const curdoc = {...currentdocument}
      // curdoc['status'] =status
      // currentdocument['status']=status
      // //modifydocument({...curdoc})
      // setDocumentAction('save')
    }

  return (







    <>
      <div className="container">
        <Loader display={loaderDisplay} /> 
        {currentdocument.status==="accepted"? <div className="grid"><div className="row"><div className="col-12" style={{fontSize:"28px",fontWeight:600,color:"#39FF14",background:"#000",textAlign:"center"}}>Requirement is closed</div></div></div>:null}
   
        <FlatInput wd="3" label="Status" name="status" currdoc={currentdocument} section={'status'} modifydoc={modifydocument} disabled={true}/>
        <div className="grid">
        <div className="row">
        <FlatInput wd="3" label="Ex Mills Amount" name="Amount1" currdoc={currentdocument} section={'amount1'} modifydoc={modifydocument} />
        <FlatInput wd="3" label="Landed Amount" name="Amount2" currdoc={currentdocument} section={'amount2'} modifydoc={modifydocument} />
        <SelectInput wd="3" label="Unit" options={uomoptions} name="uomoptions" currdoc={currentdocument} section={'uombid'} modifydoc={modifydocument} />
        <SelectInput wd="3" label="Payment Terms" options={paymenttermsoptions} name="paymenttermoptions" currdoc={currentdocument} section={'paymenttermsbid'} modifydoc={modifydocument} />
        <div className="row">
        <FlatInput wd="12" label="Remarks" name="Remarks" currdoc={currentdocument} section={'supremarks'} modifydoc={modifydocument} />
        </div>

                   <div className="row">
                {currentdocument.bcicertificate && <div className={"col-3"}>
                  Attach Test Certificate
                  <OnlineFileuploadComponent
                    section={'testcertificate_files'}
                    autoupload={true}

                    saveasis={() => { }}
                    currdoc={currentdocument}
                    modifydoc={modifydocument}
                  />
                </div>}
                {currentdocument.restreportreq &&
                <div className={"col-3"}>
                  Attach BCI Certificate
                  <OnlineFileuploadComponent
                    section={'bcicertificate_files'}
                    autoupload={true}

                    saveasis={() => { }}
                    currdoc={currentdocument}
                    modifydoc={modifydocument}
                  />
                </div>}
              </div>

        <div className={"col-6"}>
        <div className="stepper-container">
        <div className="btn-box">
        {currentdocument.status !== 'submit'? <><button type="button" id={"SaveBid"} onClick={()=>{onClickSave('save')}}>Save Bid</button>&nbsp;&nbsp;&nbsp;
        <button type="button" id={"back"} onClick={()=>{onClickSubmit('submit')}}>Submit Bid</button></>:<></>}
        </div>
        </div>
        </div>
        </div>
     
          <div className="row">
            <FlatInput wd="3" label="Requirement Id" name="reqid" currdoc={currentdocument} section={'reqid'} modifydoc={modifydocument} disabled={true}/>
            {buyerComp}
            <div className={"col-6"}></div>
          </div>
          <div className="row">
            <Yarntype wd="3" currdoc={currentdocument} modifydoc={modifydocument} inpref={yarntypeinp} disabled={disabled}/>
          </div>
          </div>
          {currentdocument.yarntype === "Cotton" && <CottonComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Synthetic" && <SyntheticComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Viscose" && <ViscoseComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Fancy" && <FancyComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
        {currentdocument.yarntype === "Blends" && <BlendsComponent currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>}
          <div className="grid">
          <div className="row">
            <Deliveryperiod wd="3" currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>
            <FlatInput wd="3" label="Required Qty" name="reqqty" currdoc={currentdocument} section={'reqqty'} modifydoc={modifydocument} disabled={disabled}/>
            <SelectInput wd="3" label="Unit" name="uomoptions" currdoc={currentdocument} section={'uom'} modifydoc={modifydocument} disabled={disabled}/>
          
            <CSP wd="3" currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>
            <div className={"col-3"}></div>
          </div>
          <div className="row">
            <FlatInput wd="3" label="Target Price" name="targetprice" currdoc={currentdocument} section={'targetprice'} modifydoc={modifydocument} disabled={disabled}/>
            <SelectInput wd="3" label="Payment Terms" name="paymenttermoptions" currdoc={currentdocument} section={'paymentterms'} modifydoc={modifydocument} disabled={disabled} />
            <Checkbox wd="3" label={"Test Report"} name={"restreportreq"} currdoc={currentdocument} section={"restreportreq"} modifydoc={modifydocument} disabled={disabled}/>
            <Checkbox wd="3" label={"BCI Certificate"} name={"bcicertificate"} currdoc={currentdocument} section={"bcicertificate"} modifydoc={modifydocument} disabled={disabled}/>
            <div className={"col-6"}></div>
          </div>
          <div className="row">
            <FlatInput wd="12" label="Delivery Location" name="deliverylocation" currdoc={currentdocument} section={'deliverylocation'} modifydoc={modifydocument} disabled={disabled}/>
          </div>
          <div className="row">
            <FlatInput wd="12" label="Target Mills" name="targetmills" currdoc={currentdocument} section={'targetmills'} modifydoc={modifydocument} disabled={disabled}/>
          </div>
          <div className="row">
            <FlatInput wd="12" label="Remarks" name="remarks" currdoc={currentdocument} section={'remarks'} modifydoc={modifydocument} disabled={disabled}/>
          </div>
        </div>
        
        {/* {JSON.stringify(currentdocument)} 
              <button type="button" onClick={()=>{console.log(currentdocument)}}>Submit</button>:<></> */}
        <AlertDialog open={action1} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
      </div>

      {/* <AppbarBottom setAction={setDocumentAction} handleGoback={goBack} setfocus={resetFocus} /> */}

    </>

  )
}




const mapStateToProps = (state:any) => { 
    
  
  return { authenticated:state.auth.authenticated,
           authuser:state.auth.authuser ,
           
          };
 };
  



const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Requirement)