import React,{useState,useEffect,useRef} from 'react'
import { connect } from 'react-redux'
import { FlatInput } from "../../../common/InputFields/Input"
import Loader from '../../../common/Loader/Loader'
import BlendsComponent from './BlendsComponent'
import Yarntype from './common/Yarntype'
import CottonComponent from './CottonComponent'
import FancyComponent from './FancyComponent'
import SyntheticComponent from './SyntheticComponent'
import ViscoseComponent from './ViscoseComponent'
import useSaveAction from '../../../common/Hooks/useSaveAction'
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../../common/CommonLogic';
import {
  runCheck, requiredCheck, getDtFormat, getTimeFormat, getFromToDate, getDateYYYYMMDDHHMI, getDateYYYYMMDD, maxLength40, maxLength128,
  setErrorValue, getValue, setValue
} from '../../../common/validationlib';
import shortid from 'shortid'
import * as doctypes from '../../../common/Doctypes';
import deleteGQL from '../../../common/mutations/deleteProduct'
import constant from '../../../common/constant'
import productQuery from '../../../common/queries/productQuery'
import recommendationItems from '../../../common/queries/recommendationItemsQuery'
import deleteRecommendation from '../../../common/mutations/DeleteRecommendation';
import saveProduct from '../../../common/mutations/saveProduct';
import sendRecommendationNotification from '../../../common/mutations/sendRecommendationNotification';
import { execGql, execGql_xx } from '../../../common/gqlclientconfig';
import Messagesnackbar from '../../../common/Alert'
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'
import AppbarBottom from '../../../common/AppbarBottom'
import {Redirect,withRouter } from 'react-router-dom'
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

export const handleSaveCheck = (currentdocument: any) => {
  const { touched, yarntype, count, purposevariety, type, nature, quality, slug,composition1,composition2,percentage1,percentage2,tolerance,diff, validatemode } = currentdocument;

  let yarntype_check, count_check, purposevariety_check, type_check, nature_check, quality_check, slug_check,composition1_check
  ,composition2_check,percentage1_check,percentage2_check,tolerance_check,diff_check = "";
    yarntype_check = runCheck(nvl(yarntype, ''), [requiredCheck]);
    if(yarntype!=='Blends'){
    count_check = runCheck(nvl(count, ''), [requiredCheck]);
    purposevariety_check = runCheck(nvl(purposevariety, ''), [requiredCheck]);
    type_check = runCheck(nvl(type, ''), [requiredCheck]);
    nature_check = runCheck(nvl(nature, ''), [requiredCheck]);
    
    slug_check = runCheck(nvl(slug, ''), [requiredCheck])}
  if (yarntype === 'Cotton') {
    quality_check = runCheck(nvl(quality, ''), [requiredCheck]);
  }
  if(yarntype==='Blends'){
    composition1_check=runCheck(nvl(composition1, ''), [requiredCheck]);
    composition2_check=runCheck(nvl(composition2, ''), [requiredCheck]);
    percentage1_check=runCheck(nvl(percentage1, ''), [requiredCheck]); 
    percentage2_check=runCheck(nvl(percentage2, ''), [requiredCheck]); 
    tolerance_check=runCheck(nvl(tolerance, ''), [requiredCheck]);
    //diff_check=runCheck(nvl(diff, ''), [requiredCheck]);
  }
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
        composition1:composition1_check,
        composition2:composition2_check,
        percentage1:percentage1_check,
        percentage2:percentage2_check,
        tolerance:tolerance_check,
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
        composition1:checkTouched(nvl(touched.composition1, false), composition1_check),
        composition2:checkTouched(nvl(touched.composition2, false), composition2_check),
        percentage1:checkTouched(nvl(touched.percentage1, false), percentage1_check),
        percentage2:checkTouched(nvl(touched.percentage2, false), percentage2_check),
        tolerance:checkTouched(nvl(touched.tolerance, false), tolerance_check),
        //diff:checkTouched(nvl(touched.diff, false), diff_check)
      }
    }

  
  return currentdocument;
}

export const handleSave = async (currentdocument: any) => {
    var result: any = '', errorMessage = '', errors = new Array();
    return new Promise<void>(async(resolve, reject) => {
      
    
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
        z_id:nvl(currentdocument.z_id, ''),
        t_id:nvl(currentdocument.t_id, ''),
       //reffiles:nvl(currentdocument.reffiles,[])
      }

      //recoForSave.reffiles.forEach(element => {delete element.__typename});


      result = await execGql('mutation', saveProduct, recoForSave)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      }
      else {
        resolve(result.data)
        return result.data;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
    }
    
  }) 
  }
 async function getProduct(values: any) {
    var result: any = '', errorMessage = '', errors = new Array();
    try {
      result = await execGql('query', productQuery, values)
      if (!result) {
        console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
        return [];
        // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
      }
      else {
        //return result.data;
        return result.data.products;
      }
    }
    catch (err:any) {
      errors = err.errorsGql;
      errorMessage = err.errorMessageGql;
      console.log({ "errors": errors, "errorMessage": errorMessage })
      // return callback({"errors":errors,"errorMessage":errorMessage},'' );
    }
    
  }  
export const Product = (props:any) => {
  const yarntypeinp: any = useRef(0)
  const doctype = doctypes.PRODUCT;
  const doctypetext = 'Product';
  const resetFocus = () => {
    setTimeout(() => yarntypeinp.current.focus(), 1000)
  }
  const [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(handleSave, handleSaveCheck, doctype, doctypetext, resetFocus, deleteGQL)

    useEffect(() => {
      let z_id = new URLSearchParams(window.location.search).get("z_id")
      yarntypeinp.current.focus()
      if (z_id != 'NO-ID') {
        setloaderDisplay(true)
        getProduct({ client: '45004500', lang: 'EN', z_id,applicationid:"15001500" }).then((data: any) => {
          modifydocument(data[0])
          setloaderDisplay(false)
        });
      }
      if (z_id == 'NO-ID') {
          modifydocument(newDocument(doctype, doctypetext));
  
      }
    }, []);
    
    const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
    if(redirect){
      let redirectpath='/productManagement'
      return <Redirect push to={redirectpath} />;
  
       
    }

    
  return (
    <>
     <div className="container">
     <Loader display={false}/>
              
                  <div className="grid">
                    <div className="row">
                    <Yarntype wd="3"  currdoc={currentdocument}  modifydoc={modifydocument} inpref={yarntypeinp} />
                    </div>
                  </div>
                  {currentdocument.yarntype ==="Cotton" && <CottonComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Synthetic" && <SyntheticComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Viscose" && <ViscoseComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Fancy" && <FancyComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
        {currentdocument.yarntype ==="Blends" &&<BlendsComponent currdoc={currentdocument}  modifydoc={modifydocument}/>}
             {/* {JSON.stringify(currentdocument)} 
              <button type="button" onClick={()=>{console.log(currentdocument)}}>Submit</button>:<></> */}
          <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
          <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />
          </div>
    
          <AppbarBottom setAction={setDocumentAction} handleGoback={goBack} setfocus={resetFocus} />
        
    </>
    
  )
}

const mapStateToProps = (state:any) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Product)