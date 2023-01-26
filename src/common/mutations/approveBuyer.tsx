import gql from 'graphql-tag';
export default gql`
mutation approveBuyer(
  $applicationid:String,
$client:String,
$lang:String,
  $z_id:String
$buyid:String
)
    {
        approveBuyer(
        applicationid:$applicationid,
        client: $client,
    lang: $lang,
    z_id:$z_id,
        buyid:$buyid,
       )
      {
        applicationid
    client
    lang
firstname,
    z_id,
    t_id,
    apprstatus       
 }
    }
`;