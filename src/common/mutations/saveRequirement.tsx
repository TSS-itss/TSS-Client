import gql from 'graphql-tag';
export default  gql`
mutation saveRequirement(
  $client: String,
  $lang: String,
  $z_id: String,
  $t_id: String,
  $applicationid:String,
  $yarntype: String,
  $count: String,
  $purposevariety: String,
  $type:String,
  $nature:String,
  $quality:String,
  $slug:String,
  $composition1: String,
  $percentage1: String,
  $composition2: String,
  $percentage2: String,
  $tolerance: String,
  $diff: String ,  

  $yarncsp: String ,
  $deliverysch: String ,
  $reqqty: String ,
  $targetprice: String ,
  $restreportreq: String ,
  $targetmills: String ,

  $remarks: String ,
  $uom: String ,
  $paymentterms: String ,
  $bcicertificate: String ,
$deliverylocation: String,
  $reqid: String ,
  $buyid: String 


   )
  {
      saveRequirement(
        applicationid:$applicationid,
      client: $client,
  lang: $lang,
  z_id:$z_id,
  t_id:$t_id,
  yarntype: $yarntype,
  count: $count,
  purposevariety:$purposevariety,
  type:$type,
  nature:$nature,
  quality:$quality,
  slug:$slug,
  composition1:$composition1,
  percentage1:$percentage1,
  composition2:$composition2,
  percentage2:$percentage2,
  tolerance:$tolerance,
  diff:$diff ,
  yarncsp: $yarncsp ,
  deliverysch: $deliverysch ,
  reqqty: $reqqty ,
  targetprice: $targetprice ,
  restreportreq: $restreportreq ,
  targetmills: $targetmills,

deliverylocation: $deliverylocation,
  remarks: $remarks ,
  uom: $uom ,
  paymentterms: $paymentterms ,
  bcicertificate: $bcicertificate ,


  reqid: $reqid,
  buyid : $buyid



    )
    {
    applicationid,
    client,
    lang,
    z_id,
    t_id
    yarntype,
    count,
    purposevariety,
    type,
    nature,
    quality,
    slug,
    z_id,
    composition1,
    percentage1,
    composition2,
    percentage2,
    tolerance,
    diff,
    yarncsp ,
    deliverysch ,
    reqqty ,
    targetprice ,
    restreportreq ,
    targetmills,
    remarks ,
    uom,
    paymentterms ,
    bcicertificate ,
    deliverylocation,
    reqid,
    buyid 
  }
  }
  
`;