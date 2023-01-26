import React, { useMemo, useEffect, useState } from 'react'
import { connect } from 'react-redux'
import AddFabButton from '../common/InputFields/AddFabButton'
import Table from '../common/table/Table'
import Column from '../common/table/Column'
import { Redirect, withRouter } from 'react-router-dom'
import {addusers} from '../TSS/Redux/ActionCreators'
import { getUsers1 } from '../TSS/Redux/reducers/actions'
import {useAltKey,useKey} from '../common/shortcurkeys'
import fetchquery from '../common/queries/usersQuery';
import deletequery from '../common/mutations/deleteUsername';
import useTableAction from '../common/Hooks/useTableAction'
import AlertDialog from '../common/PopupModals/ConfirmationModal'
import Messagesnackbar from '../common/Alert'
import Loader from '../common/Loader/Loader'
import Card from './UserCardList'
export const UserListComponent = (props: any) => {

  // const [docno, setDocno] = useState('NO-ID')
  // const [redirect, setRedirect] = useState(false)
  const setDocStatus = (id: string, redirect: boolean) => {
    setDocno(id)
    setRedirect(redirect)
  }
  const goback = () => {
    setDocno('')
    setRedirect(redirect)
  }
  const [tableData,loaderDisplay,docno, setDocno,redirect, setRedirect,documentstatus,deleteDocument,closeSnackBar]:any=useTableAction(fetchquery,"user",deletequery)
  let tabledata:any=[]
  if(tableData) {
    tabledata= useMemo(()=>tableData,[loaderDisplay])
    props.addusers(tabledata)
   }
  // useEffect(() => {
  //   getUsers1({applicationid:'15001500',client:'45004500',lang: 'EN'}).then((users:any)=>{
  //     if(props){
  //     props.addusers(users)
  //   }
  //   });
  //   return () => {
      
  //   }
  // }, [])
  const {action,yesaction,noaction,dailogtext,dailogtitle} = documentstatus;
//   let tabledata:any = []
//   if(props.users?.length>0){
//     tabledata =useMemo(() =>props?.users?.length>0?[...props?.users]:[], [props?.users])
// }
useAltKey("n",() =>{setDocStatus("NO-ID",true)})
  if (redirect) {
    let redirectpath = '/useredit?z_id=' + docno
    return <Redirect push to={redirectpath} />
  } else
    return (
      <div className="projects">
        <div className="card">
          <div className="card-body">
          <Card data={tabledata} cardclick={setDocStatus} addNew={setDocStatus}/>
          <Loader display={loaderDisplay}/>
              
              <Table
                data={tabledata}
                defaultNoOfRows={10}
                actionColWidth={80}
                headerText="User List"
                addNew={setDocStatus}
                onRowClick={setDocStatus}
                
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
                    action: (id: any) => {
                      deleteDocument(id)
                    },
                    icon: 'fas fa-trash-alt',
                    text: 'delete',
                    className: 'table-button danger',
                  }
                ]}
              >
                <Column
                  fieldname="firstname"
                  columnname="First Name"
                ></Column>
                <Column fieldname="lastname" columnname="Last Name"></Column>
                <Column fieldname="username" columnname="User Id"></Column>
                <Column fieldname="username" columnname="User Name"></Column>
                <Column fieldname="email" columnname="Email Id"></Column>
                <Column fieldname="mobile" columnname="Phone No."></Column>
              </Table>
              </div>
          </div>
        
        <AlertDialog open={action}  handleno={noaction} handleyes={yesaction} dailogtext={dailogtext} dailogtitle={dailogtitle}/>           
        <Messagesnackbar snackbaropen={documentstatus.snackbaropen} snackbarseverity={documentstatus.snackbarseverity} handlesnackbarclose={closeSnackBar} snackbartext={documentstatus.snackbartext}/>                    

         {/* <AddFabButton action={setDocStatus} /> */}
      </div>
    )
}

const mapStateToProps = (state: any) => ({
  users: state.documents.users,
  docnos: state.documents.docnos,
  companies: state.documents.companies,
})

const mapdispatcherToProp=(dispatch:any)=>{
  return {
    addusers :(users:any)=> dispatch(addusers(users))
  }
}
export default withRouter(
  connect(mapStateToProps,mapdispatcherToProp)(UserListComponent)
)
