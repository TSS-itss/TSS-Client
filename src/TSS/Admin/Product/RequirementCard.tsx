import React from 'react'

function BuyerCard({title,count,type,quality,nature,status,buyid,cardclick,z_id,acceptbid}:any) {
  return (
    <div className="card-container" >
     <div className="card-content">
       <h1>{title.trim()===""?"Not Disclosed":title}</h1>
       <h3>Count: {count}</h3>
       <div>Buyer ID: {buyid}</div>
       <div>Type: {type}</div>
       <div>Quality: {quality}</div>
       <div>Nature: {nature}</div>
       <div>Status: {status}</div>
       {status!=="accepted" &&<div className="approve-btn" onClick={()=>acceptbid(z_id,true)}>Accept Bid</div>}
       <div className="approve-btn" onClick={()=>cardclick(z_id,true)}>Edit Requirement</div>
     </div>
   </div>
  )
}

export default BuyerCard