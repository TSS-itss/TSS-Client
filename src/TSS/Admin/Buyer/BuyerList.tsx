import React, { useMemo,useCallback } from 'react'
import Table from '../../../common/table/Table'
import Column from '../../../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import fetchGQL from '../../../common/queries/buyerQuery'
import deleteGQL from '../../../common/mutations/deleteBuyer'
import useTableAction from '../../../common/Hooks/useTableAction'
import {useAltKey,useKey} from '../../../common/shortcurkeys'
import Loader from '../../../common/Loader/Loader'
import Messagesnackbar from '../../../common/Alert'
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'
import ApprovalUserAction from '../../../common/Hooks/ApproveUserAction'
import approveBuyer from '../../../common/mutations/approveBuyer'
import OPTModal from '../../../common/PopupModals/OPTModal'
import Card from './BuyerCardList'
function BuyerList() {

   const fetchquery = useMemo(()=>(fetchGQL),[1])
   const deletequery = useMemo(()=>(deleteGQL),[1])
   useAltKey("n",() =>{setDocStatus("NO-ID",true)})
   const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar,getTableData,setloaderDisplay,setTableData,setDocumentstatus]:any=useTableAction(fetchquery,"buyer",deletequery)

   const [ApproveDocument]:any=ApprovalUserAction("Buyer",approveBuyer,getTableData,setloaderDisplay,loaderDisplay,setTableData,documentstatus,setDocumentstatus)
   
   let tabledata:any=[]
   if(tableData) {
    tabledata= useMemo(()=>tableData,[loaderDisplay])
   }
   const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }

  const M_setDocStatus = useCallback((id,redirect) => {setDocStatus(id,redirect)},[1])
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
  
  

  if (redirect) {
    let redirectpath = '/buyeredit?z_id=' + docno
    return <Redirect push to={redirectpath} /> 
  } else
   return (
        <div className="card">
          <Card data={tabledata} cardclick={setDocStatus} addNew={setDocStatus} approveDoc={ApproveDocument}/>
            <Loader display={loaderDisplay}/>
          <div className="card-body">
          <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="Buyer"
                 addNew={M_setDocStatus}
                 onRowClick={M_setDocStatus}
                 
                actions={[
                  
                  {
                    action: (id: String) => {
                        deleteDocument(id)
                    },
                    icon: 'fas fa-trash-alt',
                    text: 'delete',
                    className: 'table-button danger',
                  },{
                    action: (id: any) => {
                      ApproveDocument(id)
                    },
                    icon: 'fas fa-thumbs-up',
                    text: 'Edit',
                    className: 'table-button submit',
                    fieldname:"apprstatus"
                  }
                ]}
              >
                <Column fieldname="buyid" columnname="Buyer Id"></Column>
                <Column fieldname="firstname" columnname="First Name"></Column>
                <Column fieldname="lastname" columnname="Last Name"></Column>
                <Column fieldname="companyname" columnname="Company Name"></Column>
                <Column fieldname="primarynumber" columnname="Primary Number"></Column>
                <Column fieldname="email" columnname="Email"></Column>
                <Column fieldname="apprstatus" columnname="Status"></Column>
              </Table>
              
        </div>
        
         <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    

        </div>
    )
}

export default BuyerList
