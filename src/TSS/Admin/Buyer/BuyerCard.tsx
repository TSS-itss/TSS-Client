import React from 'react'

function BuyerCard({title,mobile,email,companyname,status,buyid,cardclick,z_id,approveDoc}:any) {
  return (
    <div className="card-container" >
     <div className="card-content">
       <h1>{title.trim()===""?"Not Disclosed":title}</h1>
       <h3>Mobile: {mobile}</h3>
       <div>Buyer ID: {buyid}</div>
       <div>Email: {email}</div>
       <div>Company: {companyname}</div>
       <div>Status: {status}</div>
       {status!=="Approved" &&<div className="approve-btn" onClick={()=>approveDoc(z_id)}>Approve</div>}
       {<div className="approve-btn" onClick={()=>cardclick(z_id,true)}>Edit Buyer</div>}
     </div>
     
   </div>
  )
}

export default BuyerCard