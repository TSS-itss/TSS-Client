import React, { useMemo,useCallback } from 'react'
import Table from '../../../common/table/Table'
import Column from '../../../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import fetchRequirements from '../../../common/queries/requirementQuery'
import buyerRequirements from '../../../common/queries/buyerrequirementsQuery'
import deleteRequirement from '../../../common/mutations/deleteRequirement'
import useTableAction from '../../../common/Hooks/useTableAction'
import {useAltKey,useKey} from '../../../common/shortcurkeys'
import Loader from '../../../common/Loader/Loader'
import Messagesnackbar from '../../../common/Alert'
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'
import Card from './RequirementCardList'
import { connect } from 'react-redux'
//function RequirementList() {
  let url='/requirementedit'
  export const RequirementList =  (props:any) => {

   if (props.authuser.userauthorisations=='Buyer') {
    const fetchquery = useMemo(()=>(buyerRequirements),[1])
    const deletequery = useMemo(()=>(deleteRequirement),[1])

    let para={applicationid: '15001500', client: '45004500', lang: 'EN', buyid:props.authuser.username };

    const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar]:any=useTableAction(fetchquery,"requirement",deletequery,para);
 
 
 let tabledata:any=[]
    if(tableData) {
     tabledata= useMemo(()=>tableData,[loaderDisplay])
    }
    const setDocStatus = (id: string, redirect: boolean) => {
     setDocno(id)
     setRedirect(redirect)
   }
 
   const M_setDocStatus = useCallback((id,redirect) => {
    url='/requirementedit';
    setDocStatus(id,redirect)},[url])
   const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
   useAltKey("n",() =>{setDocStatus("NO-ID",true)})
   if (redirect) {
     let redirectpath = `${url}?z_id=` + docno
     return <Redirect push to={redirectpath} /> 
   } else
    return (
         <div className="card">
          <Card data={tabledata} cardclick={M_setDocStatus} addNew={M_setDocStatus} acceptbid={(id:string,redirect:boolean)=>{url='/bidlist';
          setDocStatus(id,redirect)}}/>
             <Loader display={loaderDisplay}/>
           <div className="card-body">
           <Table
                 data={tabledata}
                 defaultNoOfRows={10}
                 actionColWidth={80}
                 headerText="Products"
                  addNew={M_setDocStatus}
                  onRowClick={M_setDocStatus}
                  
                 actions={[
                  {
                    action: (id: any) => {
                      url='/bidlist';
                      setDocStatus(id, true)
                    },
                    icon: 'fas fa-hammer',
                    text: 'My Bid',
                    className: 'table-button submit',
                  },
                   {
                     action: (id: String) => {
                         deleteDocument(id)
                     },
                     icon: 'fas fa-trash-alt',
                     text: 'delete',
                     className: 'table-button danger',
                   }
                 ]}
               >
                 <Column fieldname="reqid" columnname="Req Id"></Column>
                 <Column fieldname="yarntype" columnname="Yarn Type"></Column>
                 <Column fieldname="count" columnname="Count"></Column>
                 <Column fieldname="type" columnname="Type"></Column>
                 <Column fieldname="quality" columnname="Quality"></Column>
                 <Column fieldname="nature" columnname="Nature"></Column>
                 <Column fieldname="status" columnname="Status"></Column>
               </Table>
               
         </div>
         <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
         <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    
 
         </div>
     )

    
  } else {
    const fetchquery = useMemo(()=>(fetchRequirements),[1])
   const deletequery = useMemo(()=>(deleteRequirement),[1])
 
   const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar]:any=useTableAction(fetchquery,"requirement",deletequery);


let tabledata:any=[]
   if(tableData) {
    tabledata= useMemo(()=>tableData,[loaderDisplay])
   }
   const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }

  const M_setDocStatus = useCallback((id,redirect) => {
    url='/requirementedit';
    setDocStatus(id,redirect)},[url])
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  useAltKey("n",() =>{setDocStatus("NO-ID",true)})
  if (redirect) {
    let redirectpath = `${url}?z_id=` + docno
    return <Redirect push to={redirectpath} /> 
  } else
   return (
        <div className="card">
            <Loader display={loaderDisplay}/>
            <Card data={tabledata} cardclick={M_setDocStatus} addNew={M_setDocStatus} acceptbid={(id:string,redirect:boolean)=>{url='/bidlist';
          setDocStatus(id,redirect)}}/>
          <div className="card-body">
          <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="Products"
                 addNew={M_setDocStatus}
                 onRowClick={M_setDocStatus}
                 
                actions={[
                  {
                    action: (id: any) => {
                      url='/bidlist';
                      setDocStatus(id, true)
                    },
                    icon: 'fas fa-hammer',
                    text: 'My Bid',
                    className: 'table-button submit',
                  },
                  {
                    action: (id: String) => {
                        deleteDocument(id)
                    },
                    icon: 'fas fa-trash-alt',
                    text: 'delete',
                    className: 'table-button danger',
                  }
                ]}
              >
                <Column fieldname="reqid" columnname="Req Id"></Column>
                <Column fieldname="yarntype" columnname="Yarn Type"></Column>
                <Column fieldname="count" columnname="Count"></Column>
                <Column fieldname="type" columnname="Type"></Column>
                <Column fieldname="quality" columnname="Quality"></Column>
                <Column fieldname="nature" columnname="Nature"></Column>
                <Column fieldname="status" columnname="Status"></Column>
              </Table>
              
        </div>
        <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    

        </div>
    )
  }
   



   
}





const mapStateToProps = (state:any) => { 
    
  
  return { authenticated:state.auth.authenticated,
           authuser:state.auth.authuser ,
           
          };
 };
  


const mapDispatchToProps = {}

//export default RequirementList

export default connect(mapStateToProps, mapDispatchToProps)(RequirementList)

