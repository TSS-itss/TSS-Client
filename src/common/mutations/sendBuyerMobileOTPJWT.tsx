import gql from 'graphql-tag';
export default  gql`
mutation sendBuyerMobileOTPJWT (
  $applicationid:String,
$client:String,
$lang:String,
  $z_id:String,
$primarynumber:String
)
    {
        sendBuyerMobileOTPJWT(
        applicationid:$applicationid,
        client: $client,
    		lang: $lang,
    		z_id:$z_id,
        primarynumber:$primarynumber
       
       )
      
    }
`;
