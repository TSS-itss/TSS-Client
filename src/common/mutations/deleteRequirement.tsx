import gql from 'graphql-tag';
export default gql`
mutation deleteRequirement(

  $z_id: String,
  $applicationid:String,
  $client:String,
        $lang:String,
        $username:String,
   )
  {
      deleteRequirement(
        z_id:$z_id,
        applicationid:$applicationid,
        client:$client,
        lang:$lang,
        username:$username,

    )
    {
      applicationid
  client
  lang,
  z_id,
  t_id
  yarntype,
  count,
  purposevariety,
  type,
  nature,
  quality,
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
   targetmills ,
   reqid,
  buyid
  }
  }  
`;