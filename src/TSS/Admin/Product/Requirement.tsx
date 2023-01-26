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
  setErrorValue, getValue, setValue,numberCheck,numberPositiveCheck, maxLength200
} from '../../../common/validationlib';
import shortid from 'shortid'
import * as doctypes from '../../../common/Doctypes';
import deleteRequirement from '../../../common/mutations/deleteRequirement'
import constant from '../../../common/constant'
import requirementQuery from '../../../common/queries/requirementQuery'
import saveRequirement from '../../../common/mutations/saveRequirement';
import { execGql, execGql_xx } from '../../../common/gqlclientconfig';
import Messagesnackbar from '../../../common/Alert'
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'
import AppbarBottom from '../../../common/AppbarBottom'
import approvedBuyers from '../../../common/queries/approvedBuyersQuery'
import { Redirect, withRouter } from 'react-router-dom'

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
    remarks,
uom,
paymentterms,
deliverylocation,
bcicertificate,
    validatemode } = currentdocument;

  let yarntype_check, count_check, purposevariety_check, type_check, nature_check, quality_check, slug_check, composition1_check
    , composition2_check, percentage1_check, percentage2_check, tolerance_check, reqid_check,
    buyid_check,
    yarncsp_check,
    deliverysch_check,
    reqqty_check,
    targetprice_check,
    restreportreq_check,
    targetmills_check,
    remarks_check,
    uom_check,
    paymentterms_check,
    deliverylocation_check,
    bcicertificate_check,
    diff_check = "";


  yarntype_check = runCheck(nvl(yarntype, ''), [requiredCheck]);
  if (yarntype !== 'Blends') {
    count_check = runCheck(nvl(count, ''), [requiredCheck]);
    purposevariety_check = runCheck(nvl(purposevariety, ''), [requiredCheck]);
    type_check = runCheck(nvl(type, ''), [requiredCheck]);
    nature_check = runCheck(nvl(nature, ''), [requiredCheck]);

    slug_check = ""//runCheck(nvl(slug, ''), [requiredCheck])
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
  targetmills_check = runCheck(nvl(targetmills, ''), [maxLength200]);
  remarks_check = runCheck(nvl(remarks, ''), [maxLength200]);
  uom_check = runCheck(nvl(uom, ''), [requiredCheck]);
  paymentterms_check = runCheck(nvl(paymentterms, ''), [requiredCheck]);
  deliverylocation_check = runCheck(nvl(deliverylocation, ''), [requiredCheck,maxLength200]);
  bcicertificate_check = ""//runCheck(nvl(bcicertificate, 'N'), [requiredCheck]);

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

      remarks: remarks_check,
      uom: uom_check,
      paymentterms: paymentterms_check,
      deliverylocation: deliverylocation_check,
      bcicertificate: bcicertificate_check,




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
      remarks: checkTouched(nvl(touched.remarks, false), remarks_check),
      uom: checkTouched(nvl(touched.uom, false), uom_check),
      paymentterms: checkTouched(nvl(touched.paymentterms, false), paymentterms_check),
      deliverylocation: checkTouched(nvl(touched.deliverylocation, false), deliverylocation_check),
      bcicertificate: checkTouched(nvl(touched.bcicertificate, false), bcicertificate_check),
      //diff:checkTouched(nvl(touched.diff, false), diff_check)
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
        remarks: nvl(currentdocument.remarks, ''),
        uom: nvl(currentdocument.uom, ''),
        paymentterms: nvl(currentdocument.paymentterms, ''),
        deliverylocation: nvl(currentdocument.deliverylocation, ''),
        bcicertificate: nvl(currentdocument.bcicertificate, 'N'),

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
  const doctypetext = 'Requirement';
  const resetFocus = () => {
    setTimeout(() => yarntypeinp.current.focus(), 1000)
  }
  let [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(handleSave, handleSaveCheck, doctype, doctypetext, resetFocus, deleteRequirement)
  const [approvedBuyersData, setApprovedBuyers] = useState([]);
  const [submitRequirement,setSubmitRequirement]=useState(false)
  let disabled=false
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

  


    useEffect(() => {
      getApprovedBuyers({ client: '45004500', lang: 'EN',applicationid:"15001500" })
      let z_id = new URLSearchParams(window.location.search).get("z_id")
      
      if(!disabled && yarntypeinp.current.focus!==undefined)yarntypeinp.current.focus()
      if (z_id != 'NO-ID') {
        setloaderDisplay(true)
        getRequirement({ client: '45004500', lang: 'EN', z_id,applicationid:"15001500" }).then((data: any) => {
          if(data[0].bcicertificate==='N' || data[0].bcicertificate==='' || data[0].bcicertificate=== undefined || data[0].bcicertificate===null){
            data[0].bcicertificate=false
          }else data[0].bcicertificate=true

          if(data[0].restreportreq==='N' || data[0].restreportreq==='' || data[0].restreportreq=== undefined || data[0].restreportreq===null){
            data[0].restreportreq=false
          }else data[0].restreportreq=true
          modifydocument(data[0])
          setloaderDisplay(false)
        });
      }
      if (z_id == 'NO-ID') {
        let newdoc=newDocument(doctype, doctypetext)
        newdoc.buyid=props.authuser.username;
          modifydocument(newdoc);
  
      }



    }, []);
    
    if(currentdocument.status === 'accepted'){
      disabled=true
    }
    let { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
    if(redirect){
      let redirectpath='/requirementManagement'
      return <Redirect push to={redirectpath} />;
  
       
    }
    const submitReqAction=(act:boolean)=>{
      setSubmitRequirement(act)
    }
    if(submitRequirement){
      action=true
      dailogtext="Are you sure you want to submit the requirement?"
      dailogtitle="Submit Requirement.";
      yesaction=()=>{setDocumentAction('save');submitReqAction(false)}
      noaction=()=>{submitReqAction(false)}
    }else{
      action=false
      dailogtext=""
      dailogtitle="";
    }
    let buyerComp;
    if (props.authuser.userauthorisations=='Buyer') {
      buyerComp = <></>//<FlatInput wd="3" label="Buyer" name="buyid" currdoc={currentdocument} section={'buyid'} modifydoc={modifydocument} />;
    } else {
      buyerComp =  <SelectInput wd="3" label="Buyer" options={approvedBuyersData} name="userauthorisations" currdoc={currentdocument} section={'buyid'} modifydoc={modifydocument} />
      ;
    }
    

  return (







    <>
      <div className="container">
      <div onClick={()=>{goBack(true)}} className="back-btn">Back</div>
        <Loader display={loaderDisplay} />

        {currentdocument.status==="accepted"? <div className="grid"><div className="row"><div className="col-12" style={{fontSize:"28px",fontWeight:600,color:"#39FF14",background:"#000",textAlign:"center"}}>Requirement is closed</div></div></div>:null}
        <div className="grid">
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
            <SelectInput wd="3" label="Unit" options={uomoptions} name="uomoptions" currdoc={currentdocument} section={'uom'} modifydoc={modifydocument} disabled={disabled}/>
            <CSP wd="3" currdoc={currentdocument} modifydoc={modifydocument} disabled={disabled}/>
            <div className={"col-3"}></div>
          </div>
          <div className="row">
            <FlatInput wd="3" label="Target Price" name="targetprice" currdoc={currentdocument} section={'targetprice'} modifydoc={modifydocument} disabled={disabled}/>
            <SelectInput wd="3" label="Payment Terms" options={paymenttermsoptions} name="paymenttermoptions" currdoc={currentdocument} section={'paymentterms'} modifydoc={modifydocument} disabled={disabled}/>
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
          {
            currentdocument.status !=='accepted'?
          <div className="row">
          <div className={"col-12"}>
            <div className="stepper-container">
              <div className="btn-box">
              <button type="button" id={"SaveBid"} onClick={()=>{setDocumentAction('save')}}>Save </button>&nbsp;&nbsp;&nbsp;
              <button type="button" id={"back"} onClick={()=>{submitReqAction(true)}}>Save & Submit</button>
              </div>
            </div>
        </div>
        </div>:""
        }
        </div>
        
        {/* {JSON.stringify(currentdocument)} 
              <button type="button" onClick={()=>{console.log(currentdocument)}}>Submit</button>:<></> */}
        <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
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