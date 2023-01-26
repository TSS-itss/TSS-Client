import React, { useMemo,useCallback } from 'react'
import Table from '../../../common/table/Table'
import Column from '../../../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import fetchGQL from '../../../common/queries/supplierQuery'
import deleteGQL from '../../../common/mutations/deleteSupplier'
import useTableAction from '../../../common/Hooks/useTableAction'
import {useAltKey,useKey} from '../../../common/shortcurkeys'
import Loader from '../../../common/Loader/Loader'
import Messagesnackbar from '../../../common/Alert'
import AlertDialog from '../../../common/PopupModals/ConfirmationModal'

import SupplierCardList from '../Supplier/SupplierCardList'
function SupplierList() {

   const fetchquery = useMemo(()=>(fetchGQL),[1])
   const deletequery = useMemo(()=>(deleteGQL),[1])
   const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar]:any=useTableAction(fetchquery,"supplier",deletequery)
   
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
  useAltKey("n",() =>{setDocStatus("NO-ID",true)})
  if (redirect) {
    let redirectpath = '/supplieredit?z_id=' + docno
    return <Redirect push to={redirectpath} /> 
  } else
   return (
        <div className="card">
          <SupplierCardList data={tabledata} cardclick={setDocStatus} addNew={setDocStatus}/>
            <Loader display={loaderDisplay}/>
          <div className="card-body">
          <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="Supplier"
                 addNew={M_setDocStatus}
                 onRowClick={M_setDocStatus}
                 
                actions={[
                  // {
                  //   action: (id: any) => {
                  //     setDocStatus(id, true)
                  //   },
                  //   icon: 'fas fa-edit',
                  //   text: 'Edit',
                  //   className: 'table-button submit',
                  // },
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
                <Column fieldname="supid" columnname="Sup Id"></Column>
                <Column fieldname="firstname" columnname="First Name"></Column>
                <Column fieldname="lastname" columnname="Last Name"></Column>
                <Column fieldname="companyname" columnname="Company Name"></Column>
                <Column fieldname="primarynumber" columnname="Primary Number"></Column>
                <Column fieldname="email" columnname="Email"></Column>
              </Table>
              
        </div>
        <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    

        </div>
    )
}

export default SupplierList
