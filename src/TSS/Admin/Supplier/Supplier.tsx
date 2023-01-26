import { useState, useEffect, useMemo, useRef } from 'react'
import DatePicker from '../../../common/DatePicker'
import { FlatInput } from '../../../common/InputFields/Input'
import { SelectInput } from '../../../common/InputFields/Select'
import { SearchSelectInput } from '../../../common/InputFields/SearchSelect'
import * as doctypes from '../../../common/Doctypes';
import { getDocs, getDocconfig, getLblVal, checkTouched, nvl, checkItem, isCheckedbool, getDocumenForSave } from '../../../common/CommonLogic';
import useSaveAction from '../../../common/Hooks/useSaveAction'
//import { handleDelete, getSuppliers, handleSave,handlesendSupplierNotification } from './CrudSupplier'
import Messagesnackbar from '../../../common/Alert'
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'
import {
  runCheck, requiredCheck, getDtFormat, getTimeFormat, getFromToDate, getDateYYYYMMDDHHMI, getDateYYYYMMDD, maxLength40, maxLength128,
  setErrorValue, getValue, setValue,emailCheck,numberCheck, alphaNumericCheck, minLength10, minLength15, minLength8
} from '../../../common/validationlib';
import { Redirect, withRouter } from 'react-router-dom'
import AppbarBottom from '../../../common/AppbarBottom'
import { initDocumentstatus } from '../../../common/constant'
import { fetchStocks, addstocks } from '../../Redux/ActionCreators'
import { connect } from 'react-redux';
import * as ActionTypes from '../../Redux/ActionTypes'
import Loader from '../../../common/Loader/Loader'
import { FileuploadComponent } from '../../../common/FileuploadComponent'
import { OnlineFileuploadComponent } from '../../../common/OnlineFileuploadComponent'
import shortid from 'shortid'
import Stepper from '../../../common/Stepper/Stepper'
import Step from '../../../common/Stepper/Step'
import constant from '../../../common/constant'
import saveSupplier from '../../../common/mutations/saveSupplier'
import { execGql } from '../../../common/gqlclientconfig'
import deleteGQL from '../../../common/mutations/deleteSupplier'
import supplierQuery from '../../../common/queries/supplierQuery'
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
  const { touched, firstname, lastname, country, city, inbusinesssince, email, primarynumber, addemail, addnumber,
    addemailnumber, website, companyname, accounttype, category,yarntypes, address, completeaddress,gstnumber,
    tannumber,businesspannumber, validatemode,oldpassword,newpassword } = currentdocument;


  console.log('nvl(email, )', runCheck(nvl(email, ''), [requiredCheck]))

  let firstname_check = runCheck(nvl(firstname, ''), [requiredCheck]);
  let lastname_check = ""//runCheck(nvl(lastname, ''), [requiredCheck]);
  let country_check = ""//runCheck(nvl(country, ''), [requiredCheck]);
  let city_check = ""//runCheck(nvl(city, ''), [requiredCheck]);
  let inbusinesssince_check = runCheck(nvl(inbusinesssince, ''), [requiredCheck]);
  let email_check = runCheck(nvl(email, ''), [requiredCheck,emailCheck,maxLength128]);
  let primarynumber_check = runCheck(nvl(primarynumber, ''), [requiredCheck,numberCheck,minLength10])
  let addemail_check = ""//runCheck(nvl(addemail, ''), [requiredCheck]);
  let addnumber_check = ""//runCheck(nvl(addnumber, ''), [requiredCheck]);
  let addemailnumber_check = ""//runCheck(nvl(addemailnumber, ''), [requiredCheck]);
  let website_check = "";//runCheck(nvl(website, ''), [requiredCheck]);
  let companyname_check = runCheck(nvl(companyname, ''), [requiredCheck]);
  let accounttype_check = runCheck(nvl(accounttype, ''), [requiredCheck]);
 // let category_check = runCheck(nvl(category, ''), [requiredCheck]);
  let yarntypes_check = runCheck(nvl(yarntypes, ''), [requiredCheck]);
  let address_check = runCheck(nvl(address, ''), [requiredCheck])
  let completeaddress_check = runCheck(nvl(completeaddress, ''), [requiredCheck]);
  let gstnumber_check=runCheck(nvl(gstnumber, ''), [requiredCheck,alphaNumericCheck,minLength15]);
  let tannumber_check=""//runCheck(nvl(tannumber, ''), [requiredCheck,alphaNumericCheck,minLength15]);
  let businesspannumber_check=runCheck(nvl(businesspannumber, ''), [requiredCheck,alphaNumericCheck,minLength10]); 
  let oldpassword_check = runCheck(nvl(oldpassword, ''), [requiredCheck,alphaNumericCheck,minLength8]);
  let newpassword_check = runCheck(nvl(newpassword, ''), [requiredCheck,alphaNumericCheck,minLength8]); 
  if(oldpassword!==newpassword){
    oldpassword_check=oldpassword_check="Password and Retype Password should match"
  }
  console.log('currentdocument.errorsAll', currentdocument.errorsAll)
  if (validatemode == 'save') {
    currentdocument.errorsAll = {
      firstname: firstname_check,
      lastname: lastname_check,
      country: country_check,
      city: city_check,
      inbusinesssince: inbusinesssince_check,
      email: email_check,
      primarynumber: primarynumber_check,
      addemail: addemail_check,
      addnumber: addnumber_check,
      addemailnumber: addemailnumber_check,
        website: website_check,
        companyname: companyname_check,
        accounttype: accounttype_check,
     //   category: category_check,
        yarntypes: yarntypes_check,
        address: address_check,
        completeaddress: completeaddress_check,
        gstnumber:gstnumber_check,
        tannumber:tannumber_check,
        businesspannumber:businesspannumber_check,
        oldpassword:oldpassword_check,
        newpassword:newpassword_check,
    }
    validatemode == 'touch'
  }
  if (validatemode == 'touch' && touched != null) {
    currentdocument.errorsAll = {
      firstname: checkTouched(nvl(touched.firstname, false), firstname_check),
      lastname: checkTouched(nvl(touched.lastname, false), lastname_check),
      country: checkTouched(nvl(touched.country, false), country_check),
      city: checkTouched(nvl(touched.city, false), city_check),
      inbusinesssince: checkTouched(nvl(touched.inbusinesssince, false), inbusinesssince_check),
      email: checkTouched(nvl(touched.email, false), email_check),
      primarynumber: checkTouched(nvl(touched.primarynumber, false), primarynumber_check),
      addemail: checkTouched(nvl(touched.addemail, false), addemail_check),
      addnumber: checkTouched(nvl(touched.addnumber, false), addnumber_check),
      addemailnumber: checkTouched(nvl(touched.addemailnumber, false), addemailnumber_check),
        website: checkTouched(nvl(touched.website, false), website_check),
        companyname: checkTouched(nvl(touched.companyname, false), companyname_check),
        accounttype: checkTouched(nvl(touched.accounttype, false), accounttype_check),
       // category: checkTouched(nvl(touched.category, false), category_check),
        yarntypes: checkTouched(nvl(touched.yarntypes, false), yarntypes_check),
        address: checkTouched(nvl(touched.address, false), address_check),
        completeaddress: checkTouched(nvl(touched.completeaddress, false), completeaddress_check),
        gstnumber:checkTouched(nvl(touched.gstnumber, false), gstnumber_check),
        tannumber:checkTouched(nvl(touched.tannumber, false), tannumber_check),
        businesspannumber:checkTouched(nvl(touched.businesspannumber, false), businesspannumber_check),
        oldpassword:checkTouched(nvl(touched.oldpassword, false), oldpassword_check),
        newpassword:checkTouched(nvl(touched.newpassword, false), newpassword_check),
        
    }
  }


  return currentdocument;
}

export const handleSave = async (currentdocument: any) => {
  var result: any = '', errorMessage = '', errors = new Array();
  return new Promise<void>(async(resolve, reject) => {
    console.log('saving record supplier***************')
  
  try {
    let recoForSave = {
      ...constant,
      firstname: nvl(currentdocument.firstname, ""),
      lastname: nvl(currentdocument.lastname,""),
      country: nvl(currentdocument.country,""),
      city: nvl(currentdocument.city,""),
      inbusinesssince: nvl(currentdocument.inbusinesssince,""),
      email: nvl(currentdocument.email,""),
      primarynumber: nvl(currentdocument.primarynumber,""),
      addemail: nvl(currentdocument.addemail,""),
      addnumber: nvl(currentdocument.addnumber,""),
      addemailnumber: nvl(currentdocument.addemailnumber, ''),
      website: nvl(currentdocument.website, ''),
      companyname: nvl(currentdocument.companyname, ''),
      accounttype: nvl(currentdocument.accounttype, ''),
    //  category: nvl(currentdocument.category, ''),
      yarntypes: nvl(currentdocument.yarntypes, ''),
      address: nvl(currentdocument.address, ''),
      completeaddress: nvl(currentdocument.completeaddress, ''),
      gstnumber: nvl(currentdocument.gstnumber, ''),
      tannumber: nvl(currentdocument.tannumber, ''),
      businesspannumber: nvl(currentdocument.businesspannumber, ''),
      z_id:nvl(currentdocument.z_id, ''),
      t_id:nvl(currentdocument.t_id, ''),
     gst_files:nvl(currentdocument.gst_files,[]),
     pan_files:nvl(currentdocument.pan_files,[])
    }
    console.log('saving record supplier***************')
    recoForSave.gst_files.forEach((element:any) => {delete element.__typename});
    recoForSave.pan_files.forEach((element:any) => {delete element.__typename});
    //recoForSave.reffiles.forEach(element => {delete element.__typename});
    // let cat:string[]=[]
    // recoForSave.category.forEach((ele:any)=>{cat.push(ele.value)})
    // recoForSave.category = cat.toString()

    let yarn:string[]=[]
    recoForSave.yarntypes.forEach((ele:any)=>{yarn.push(ele.value)})
    recoForSave.yarntypes = yarn.toString()
    
    result = await execGql('mutation', saveSupplier, recoForSave)
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
const countryoptions = [
  { 'key': 'IN', 'value': 'India' },
  { 'key': 'AUS', 'value': 'Australia' },
  { 'key': 'USA', 'value': 'United States of America' },
]
const cityoptions = [
  { 'key': 'Mumbai', 'value': 'Mumbai' },
  { 'key': 'Pune', 'value': 'Pune' },
]
const inbussinesssinceoptions  = [
  { 'key': '1900', 'value': '1900' },
  { 'key': '1910', 'value': '1910' },
  { 'key': '1920', 'value': '1920' },
  { 'key': '1930', 'value': '1930' },
  { 'key': '1940', 'value': '1940' },
  { 'key': '1950', 'value': '1950' },
  { 'key': '1960', 'value': '1960' },
  { 'key': '1970', 'value': '1970' },
  { 'key': '1980', 'value': '1980' },
  { 'key': '1990', 'value': '1990' },
  { 'key': '2000', 'value': '2000' },
  { 'key': '2010', 'value': '2010' },
]
const Categoryoptions = [{ 'label': '0', 'value': '0' },
{ 'label': 'Category-1', 'value': 'Category-1' },
{ 'label': 'Category-2', 'value': 'Category-2' },
{ 'label': 'Category-3', 'value': 'Category-3' },
{ 'label': 'Category-4', 'value': 'Category-4' },
{ 'label': 'Category-5', 'value': 'Category-5' },
{ 'label': 'Category-6', 'value': 'Category-6' },
{ 'label': 'Category-7', 'value': 'Category-7' },
{ 'label': 'Category-8', 'value': 'Category-8' },
{ 'label': 'Category-9', 'value': 'Category-9' },
{ 'label': 'Category-10', 'value': 'Category-10' }

]

const yarnoptions = [
  { 'label': 'Cotton', 'value': 'Cotton' },
  { 'label': 'Synthetic', 'value': 'Synthetic' }, 
  { 'label': 'Viscose', 'value': 'Viscose' }, 
  { 'label': 'Fancy', 'value': 'Fancy' },
  { 'label': 'Blends', 'value': 'Blends' }
]
async function getSupplier(values: any) {
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    result = await execGql('query', supplierQuery, values)
    if (!result) {
      console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
      return [];
      // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
    }
    else {
      //return result.data;
      return result.data.suppliers;
    }
  }
  catch (err:any) {
    errors = err.errorsGql;
    errorMessage = err.errorMessageGql;
    console.log({ "errors": errors, "errorMessage": errorMessage })
    // return callback({"errors":errors,"errorMessage":errorMessage},'' );
  }
  
} 


export const SupplierComponent = (props: any) => {
  const compinp: any = useRef(0)
  const doctype = doctypes.SUPPLIER;
  const doctypetext = 'Supplier';
  const resetFocus = () => {
    setTimeout(() => compinp.current.focus(), 1000)
  }
  const [addContact, setDisplayAddContact] = useState(false)
  const [setDocumentAction, documentstatus, setDocumentstatus, currentdocument, modifydocument, redirect, goBack, closeSnackBar, loaderDisplay, setloaderDisplay]: any = useSaveAction(handleSave, handleSaveCheck, doctype, doctypetext, resetFocus, deleteGQL)
  const [contactList, setContactList] = useState([{contactname:"", phoneno:"", email:"",index:0}])
  const addNewcontact=()=>{
    const contact_arr=[...contactList];
    contact_arr.push({contactname:"", phoneno:"", email:"",index:(contactList.length)})
    setContactList(contact_arr)
  }
  const removecontact=(i:number)=>{
    //contactList.slice(i,1)
    let contact_arr=[...contactList];
    contact_arr.splice(i,1)
    setContactList(contact_arr)
  }
  const modifyContactDoc=(contact:any)=>{
    const contact_arr=[...contactList];
    contact_arr[contact.index] = contact
    setContactList(contact_arr)
  }
    useEffect(() => {
      let z_id = new URLSearchParams(props.location.search).get("z_id")
      compinp.current.focus()
      if (z_id != 'NO-ID') {
        setloaderDisplay(true)
        getSupplier({ applicationid: '15001500', client: '45004500', lang: 'EN', z_id }).then((data: any) => {
          let contact_arr:any = []
          if(data[0].addemailnumber!==null){
          let contactname: string[] = data[0].addemailnumber.split(",");
          let email: string[] = data[0].addemail.split(",");
          let phoneno: string[] = data[0].addnumber.split(",");
          
          for(let i = 0;i<contactname.length;i++){
            const contact = {contactname:contactname[i], phoneno:phoneno[i], email:email[i],index:i}
            contact_arr.push(contact)
          }}
          if(data[0].category!==null){
          let category_arr:string[]=data[0].category.split(',')
          data[0].category = []
          for(let i=0;i<category_arr.length;i++){
            data[0].category.push({'label': category_arr[i], 'value':category_arr[i]})
          }}
          if(data[0].yarntypes!==null && typeof data[0].yarntypes==='string'){
            let yarntypes_arr:string[]=data[0].yarntypes?.split(',')
            data[0].yarntypes = []
            for(let i=0;i<yarntypes_arr?.length;i++){
              data[0].yarntypes.push({'label': yarntypes_arr[i], 'value':yarntypes_arr[i]})
            }}
          if(contact_arr.length===0){
            contact_arr.push({contactname:"", phoneno:"", email:"",index:0})
          }
          modifydocument(data[0])
          setContactList(contact_arr)
          setloaderDisplay(false)
        });
      }
      if (z_id == 'NO-ID') {
        modifydocument(newDocument(doctype, doctypetext));
      }
    }, [])
   

  const { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
  
  const addContactsToSaveDoc=(action:string)=>{
    const curDoc={...currentdocument}
    let contactname: string[] = [];
    let phoneno: string[] = [];
    let email: string[] = [];
    contactList.forEach(element => {
      contactname.push(element.contactname);
      phoneno.push(element.phoneno);
      email.push(element.email)
    });
    currentdocument.addemailnumber = contactname.toString();
    currentdocument.addemail = email.toString()
    currentdocument.addnumber = phoneno.toString()
    modifydocument(currentdocument)
    setDocumentAction(action)
  }

  if(redirect){
    let redirectpath = '/supplierManagement'
    return <Redirect push to={redirectpath} />;
  }
  
  if (documentstatus.snackbarseverity==="success") {
    let redirectpath = '/supplierManagement'
    return <Redirect push to={redirectpath} />;
  } else {



    let currentdocument1 = handleSaveCheck(currentdocument);

    return (
      <>

        <Loader display={loaderDisplay} />
        <div onClick={()=>{goBack(true)}} className="back-btn">Back</div>
        <Stepper onsubmit={addContactsToSaveDoc} displaySubmit={true}>
          <Step name={"Step 1"} title="Basic Profile">
            <div className="grid">
              <div className="row">
                <FlatInput wd="3" label="First Name" name="firstname" currdoc={currentdocument1} section={'firstname'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Last Name" name="lastname" currdoc={currentdocument1} section={'lastname'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
                <div className={"col-3"}></div>
              </div>
              <div className="row">
                <SelectInput wd="3" label="Country" options={countryoptions} name="country" currdoc={currentdocument1} section={'country'} modifydoc={modifydocument} />
                <SelectInput wd="3" label="City" options={cityoptions} name="city" currdoc={currentdocument1} section={'city'} modifydoc={modifydocument} />
                <SelectInput wd="3" label="In business Since" options={inbussinesssinceoptions} name="inbusinesssince" currdoc={currentdocument1} section={'inbusinesssince'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
              </div>
              <div className="row">
                <FlatInput wd="3" label="Email" name="email" currdoc={currentdocument1} section={'email'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Primary number" name="primarynumber" currdoc={currentdocument1} section={'primarynumber'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Website" name="website" currdoc={currentdocument1} section={'website'} modifydoc={modifydocument} />
                <div className={"col-3"}>{!addContact && <button type="button"  onClick={()=>{setDisplayAddContact(!addContact)}}>Add Contact</button>}</div>
              </div>
              {addContact && contactList.map((contact, i) => 
                {return(<div className="row" key={i+""}>
                  <FlatInput wd="3" label="Contact Name" name="contactname" currdoc={contactList[i]} section={'contactname'} modifydoc={modifyContactDoc} />
                  <FlatInput wd="3" label="Phone No" name="phoneno" currdoc={contactList[i]} section={'phoneno'} modifydoc={modifyContactDoc} />
                  <FlatInput wd="3" label="Email" name="email" currdoc={contactList[i]} section={'email'} modifydoc={modifyContactDoc} />
                  <div className={"col-3"}>
                    {i===0?<div onClick={()=>{addNewcontact()}} style={{fontSize:"26px", cursor:"pointer", color:"#1F51FF",width:"30px"}}>+</div>:<div onClick={()=>{removecontact(i)}} style={{fontSize:"26px", cursor:"pointer",color:"#FF3131",width:"30px"}}>-</div>}
                    </div>
                </div>)}
              )}

              {/* <div className="row">
              <OnlineFileuploadComponent
                section={'reffiles'}
                autoupload={true}
               
                saveasis={() => {  }}
                currdoc={currentdocument1}
                modifydoc={modifydocument}
              />

            </div> */}
            </div>
          </Step>
          <Step name={"Step 2"} title="Business Details">
            <div className="grid">
              <div className="row">
                <FlatInput wd="3" label="Company Name" name="companyname" currdoc={currentdocument1} section={'companyname'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Account Type" name="accounttype" currdoc={currentdocument1} section={'accounttype'} modifydoc={modifydocument} />
                <SearchSelectInput inpref={compinp} wd="6" label="" options={yarnoptions} name="yarn type" currdoc={currentdocument1} section={'yarntypes'} modifydoc={modifydocument} refresh={()=>{}} isMulti={true}/>
                {/* <FlatInput wd="3" label="Edit Category" name="editcategory" currdoc={currentdocument1} section={'category'} modifydoc={modifydocument} /> */}
                {/* <div className={"col-3"}></div> */}
              </div>
              <div className="row">
                <FlatInput wd="6" label="Address" name="address" currdoc={currentdocument1} section={'address'} modifydoc={modifydocument} />
              </div>
              <div className="row">
                <FlatInput wd="12" label="Complete Address" name="completeaddress" currdoc={currentdocument1} section={'completeaddress'} modifydoc={modifydocument} />
              </div>
              <div className="row">
                <FlatInput wd="3" label="GST Number" name="gstnumber" currdoc={currentdocument1} section={'gstnumber'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="TAN Number" name="tannumber" currdoc={currentdocument1} section={'tannumber'} modifydoc={modifydocument} />
                <FlatInput wd="3" label="Business PAN Number" name="businesspannumber" currdoc={currentdocument1} section={'businesspannumber'} modifydoc={modifydocument} />
                <div className={"col-3"}></div>
              </div>
              <div className="row">
                <div className={"col-3"}>
                  Attach GST Document
                  <OnlineFileuploadComponent
                    section={'gst_files'}
                    autoupload={true}

                    saveasis={() => { }}
                    currdoc={currentdocument1}
                    modifydoc={modifydocument}
                  />
                </div>
                <div className={"col-3"}>
                  Attach Pan Card
                  <OnlineFileuploadComponent
                    section={'pan_files'}
                    autoupload={true}

                    saveasis={() => { }}
                    currdoc={currentdocument1}
                    modifydoc={modifydocument}
                  />
                </div>
              </div>
            </div>
          </Step>
          <Step name={"Step 3"} title="Change Password">
            <div className="grid">
              <div className="row">
              <FlatInput type="password" wd="6" label="Password" name="oldpassword" currdoc={currentdocument1} section={'oldpassword'} modifydoc={modifydocument} />
              <div className={"col-6"}></div>
              </div>
              <div className="row">
                <FlatInput type="password" wd="6" label="Retype Password" name="newpassword" currdoc={currentdocument1} section={'newpassword'} modifydoc={modifydocument} />
                <div className={"col-6"}></div>
              </div>
            </div>
          </Step>
        </Stepper>
        <AlertDialog open={action} handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle} />
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext} />

      </>
    )

  }
}

const mapDispatchToProps = (dispatch: any) => ({
  addstocks: (stocks: any, callback: any) => {
    console.log(addstocks(stocks)); dispatch(addstocks(stocks));
    if (callback && typeof callback === "function") {
      callback();
    }
  }
})

const mapStateToProps = (state: any) => {

  return {
    stocks: state.stocks.stocks.stocks,

  }
}



export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SupplierComponent));

