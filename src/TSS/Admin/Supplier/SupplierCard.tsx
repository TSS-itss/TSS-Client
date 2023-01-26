import React from 'react'

function BuyerCard({title,mobile,email,companyname,supid,cardclick,z_id}:any) {
  return (
    <div className="card-container" >
     <div className="card-content">
       <h1>{title.trim()===""?"Not Disclosed":title}</h1>
       <h3>Mobile: {mobile}</h3>
       <div>Supplier ID: {supid}</div>
       <div>Email: {email}</div>
       <div>Company: {companyname}</div>
       {<div className="approve-btn" onClick={()=>cardclick(z_id,true)}>Edit Supplier</div>}
     </div>
   </div>
  )
}

export default BuyerCard