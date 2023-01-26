
import {useState,useEffect} from 'react'
import { execGql, execGql_xx } from '../../common/gqlclientconfig';
import constant,{initDocumentstatus,newDocument} from '../constant';
import { useCallback } from 'react';

function ApprovalUserAction(doctype:String,GraphQuery:any,getTableData:any,setloaderDisplay:any,loaderDisplay:boolean,setTableData:any,documentstatus:any,setDocumentstatus:any) {
    // const [tableData, setTableData] = useState([])
    // const [loaderDisplay, setloaderDisplay] = useState(true) 
    // const [docno, setDocno] = useState('NO-ID')
    // const [redirect, setRedirect] = useState(false)
    //const [documentstatus, setDocumentstatus] = useState(initDocumentstatus)
    const values = {...constant}
   

//    const getTableData = useCallback(() => {
//         var result: any = '';
//         return new Promise(async(reolve,reject)=>{
//           try {       
//             result = await execGql('query', fetchGraphQuery, values)
//             if (!result) {
//               console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
//               alert("No data to display")
//               reject("No data to display")
//               // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
//             }
//             else {
//               console.log(result.data[doctype+"s"])
//               reolve(result.data[doctype+"s"])
//             }
//           }
//           catch (err:any) {
//             let errors = err.errorsGql;
//             let errorMessage = err.errorMessageGql;
//             console.log({ "errors": errors, "errorMessage": errorMessage })
//             reject({ "errors": errors, "errorMessage": errorMessage })
            
//           }
//         })
//       },[1])

     const ApproveDocument = useCallback((id:String) =>{
      const docstatus = {...documentstatus}
      docstatus.action= true;
      docstatus.dailogtitle= doctype + ' Approval';
      docstatus.dailogtext= 'Approve ' + doctype + '?'
      docstatus.yesaction= async () => {
        await ApproveUser(id)
        setloaderDisplay(loaderDisplay) 
        getTableData().then((data:any)=>{
          
          setTableData(data)
          setloaderDisplay(!loaderDisplay)
          docstatus.action= false;
          docstatus.snackbaropen=true;
          docstatus.snackbarseverity='success';
          docstatus.snackbartext= doctype + ' Approved'
          setDocumentstatus({...docstatus})         
           });
          
      }
      docstatus.noaction= () => {
        docstatus.action = false;
        setDocumentstatus({...docstatus})
      }
      setDocumentstatus({...docstatus});
    },[1])

     const ApproveUser =useCallback( async (id: String) => {
       return new Promise(async (resolve, reject) => {
        var result: any = '', errorMessage = '', errors = new Array();
        try {
          result = await execGql('mutation', GraphQuery, { applicationid:'15001500',client:'45004500',lang:'EN',z_id:id,buyid:"" })
          if (!result) {
          console.log({ "errors": [], "errorMessage": 'No errors and results from GQL' })
          reject({ "errors": [], "errorMessage": 'No errors and results from GQL' })
          // return callback({"errors":[],"errorMessage":'No errors and results from GQL'} ,'');
        } else {
          resolve(result.data)
          return result.data;
        }
        }catch (err:any) {
          errors = err.errorsGql;
          errorMessage = err.errorMessageGql;
          console.log({ "errors": errors, "errorMessage": errorMessage })
          reject({ "errors": errors, "errorMessage": errorMessage })
          // return callback({"errors":errors,"errorMessage":errorMessage},'' );
        }
       })
      
    },[1])
    const closeSnackBar=useCallback(()=>{
      let docstatus={...documentstatus}
        docstatus.snackbaropen=false;
      setDocumentstatus(docstatus)
    },[1])
      return [ApproveDocument]
}

export default ApprovalUserAction
