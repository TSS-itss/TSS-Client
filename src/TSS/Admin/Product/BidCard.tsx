import React from 'react'

function BuyerCard({title,amount1,amount2,uombid,paymenttermsbid,supremarks,status,cardclick,z_id,approveBid}:any) {
  return (
    <div className="card-container" 
    //onClick={()=>cardclick(z_id,true)}
    >
     <div className="card-content">
       <h1>{title.trim()===""?"Not Disclosed":title}</h1>
       <h3>Ex Mills Amount: {amount1}</h3>
       <div>Landed Amount: {amount2}</div>
       <div>Unit: {uombid}</div>
       <div>Payment Terms: {paymenttermsbid}</div>
       <div>Supplier remark: {supremarks}</div>
       <div>Status: {status}</div>
       {status==="submit" &&<div className="approve-btn" onClick={()=>approveBid(z_id)}>Accept Bid</div>}
     </div>
     
   </div>
  )
}

export default BuyerCard