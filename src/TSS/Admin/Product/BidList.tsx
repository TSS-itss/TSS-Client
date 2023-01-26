import React,{useEffect,useState} from 'react'
import { execGql, execGql_xx } from '../../../common/gqlclientconfig';
import requirementQuery from '../../../common/queries/requirementQuery'
import bidQuery from '../../../common/queries/bidQuery'
import Table from '../../../common/table/Table';
import Column from '../../../common/table/Column';
import { FlatInput } from '../../../common/InputFields/Input';
import Yarntype from './common/Yarntype';
import CottonComponent from './CottonComponent';
import SyntheticComponent from './SyntheticComponent';
import ViscoseComponent from './ViscoseComponent';
import FancyComponent from './FancyComponent';
import BlendsComponent from './BlendsComponent';
import Deliveryperiod from './common/Deliveryperiod';
import CSP from './common/CSP';
import { SelectInput } from '../../../common/InputFields/Select'
import { Checkbox } from '../../../common/InputFields/Checkbox';
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'
import { initDocumentstatus } from '../../../common/constant';
import AcceptBid from '../../../common/mutations/AcceptBid' 
import Loader from '../../../common/Loader/Loader';
import BidCardList from './BidCardList'
import { Redirect, withRouter } from 'react-router-dom'
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

 const acceptBid=async (values:any)=>{
  var result: any = '', errorMessage = '', errors = new Array();
  try {
    result = await execGql('query', AcceptBid, values)
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

export const BidList = (props:any) => {

  const [documentstatus, setDocumentstatus] = useState(initDocumentstatus)
  let { action, yesaction, noaction, dailogtext, dailogtitle } = documentstatus;
  console.log('props***************',props.authuser.userauthorisations)
    const [currentdocument, modifydocument] = useState({})
    const [loaderDisplay, setloaderDisplay] = useState(false)
    const [redirect, setRedirect] = useState(false)
    useEffect(() => {
        console.log(props.authenticated)
        
        let z_id:string = new URLSearchParams(window.location.search).get("z_id")
        let code:string = new URLSearchParams(window.location.search).get("code")
        let currdoc:any = {...currentdocument}
        currdoc['supid']=code
        
        if (z_id != 'NO-ID') {
          getRequirementsAndBids(currdoc,z_id,code)
        }
        if (z_id == 'NO-ID') {
        //   let newdoc=newDocument(doctype, doctypetext)
        //   newdoc.buyid=props.authuser.username;
        //     modifydocument(newdoc);
    
        }
  
  
  
      }, []);

      if(redirect){
        let redirectpath = '/buyerManagement'
    return <Redirect push to={redirectpath} />;
      }
      const getRequirementsAndBids=(currdoc:any,z_id:string,code:string)=>{
        setloaderDisplay(true)
          
          getRequirement({ client: '45004500', lang: 'EN', z_id,applicationid:"15001500" }).then((data: any) => {
            currdoc = {...currdoc,...data[0]}

            modifydocument(currdoc)
            
            //setloaderDisplay(false)
            getBid({ client: '45004500', lang: 'EN', z_id:"",applicationid:"15001500",supid:code,reqid:data[0].reqid }).then((data1: any) => {
            
              if(data1[0]){
                currdoc = {...currdoc,biddata:data1}
                modifydocument(currdoc)
            }
          });
          
          setloaderDisplay(false)
          });
      }
      console.log("Kedar",currentdocument)
      let buyerComp;
      let disabled = true

  
    //if (props.authuser.userauthorisations=='Buyer') {
      buyerComp = <FlatInput wd="3" label="Buyer" name="buyid" currdoc={currentdocument} section={'buyid'} modifydoc={modifydocument} disabled={disabled}/>;
   // }
    
   const wantToApproveBid=(id:string)=>{
    const newDocstatus = {...documentstatus}
    newDocstatus.dailogtext = "Are you sure you want to approve the bid?"
    newDocstatus.dailogtitle= "Bid Approval";
    newDocstatus.action = true
    let z_id:string = new URLSearchParams(window.location.search).get("z_id")
    let code:string = new URLSearchParams(window.location.search).get("code")
    newDocstatus.noaction=()=>{
      let newDocstatus1 = {...documentstatus}
      newDocstatus1.action = false
      setDocumentstatus(newDocstatus1)
    }
    newDocstatus.yesaction=async ()=>{
      setloaderDisplay(true)
      let newDocstatus1 = {...documentstatus}
      newDocstatus1.action = false
      setDocumentstatus(newDocstatus1)
     const result = await acceptBid({ client: '45004500', lang: 'EN', z_id:id,applicationid:"15001500" })
     const currdoc = {...currentdocument}
     getRequirementsAndBids(currdoc,z_id,code)
     setloaderDisplay(false)
     console.log(result) 
     
    }
    setDocumentstatus(newDocstatus)
   }
  return (
    <div className="container">
      
      <Loader display={loaderDisplay}/>
      <div onClick={()=>{setRedirect(true)}} className="back-btn">Back</div>
      {currentdocument.status==="accepted"? <div className="grid"><div className="row"><div className="col-12" style={{fontSize:"28px",fontWeight:600,color:"#39FF14",background:"#000",textAlign:"center"}}>Requirement is closed</div></div></div>:null}

        <div className="grid">
        <div className="row">
            <FlatInput wd="3" label="Requirement Id" name="reqid" currdoc={currentdocument} section={'reqid'} modifydoc={modifydocument} disabled={true}/>
            {buyerComp}
            <div className={"col-6"}></div>
          </div>
          <div className="row">
            <Yarntype wd="3" currdoc={currentdocument} modifydoc={modifydocument}  disabled={disabled}/>
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
        <BidCardList data={currentdocument.biddata?currentdocument.biddata:[]} cardclick={()=>{}} addNew={()=>{}} auth={props.authuser.userauthorisations} approveBid={wantToApproveBid}/>
        <Table
                 data={currentdocument.biddata?currentdocument.biddata:[]}
                 defaultNoOfRows={10}
                 actionColWidth={80}
                 headerText="Products"
                  addNew={()=>{}}
                  onRowClick={()=>{}}
                  actions={currentdocument.status !=='accepted'?[
                    {
                        action: (id: any) => {
                          wantToApproveBid(id)                         
                        },
                        icon: 'fas fa-thumbs-up',
                        text: 'Edit',
                        className: 'table-button submit',
                        fieldname:"apprstatus"
                      }
                  ]:[]}
                 
               >
                
               {props.authuser.userauthorisations==='Admin'?<Column fieldname="supid" columnname="Supplier Id"/>:null}
                 <Column fieldname="amount1" columnname="Ex Mills Amount"></Column>
                 <Column fieldname="amount2" columnname="Landed Amount"></Column>
                 <Column fieldname="uombid" columnname="Unit"></Column>
                 <Column fieldname="paymenttermsbid" columnname="Payment Terms"></Column>
                 <Column fieldname="supremarks" columnname="Supplier remark"></Column>
                 <Column fieldname="status" columnname="Status"></Column>
               </Table>
               <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>
    </div>
  )
}

export default BidList