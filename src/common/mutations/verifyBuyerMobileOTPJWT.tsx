import gql from 'graphql-tag';
export default  gql`
mutation verifyBuyerMobileOTPJWT (
  $applicationid:String,
$client:String,
$lang:String,
  $z_id:String,
  $verificationuser:String,
$mobileotp:String,
  $primarynumber:String
)
    {
        verifyBuyerMobileOTPJWT(
        applicationid:$applicationid,
        client: $client,
    		lang: $lang,
    		z_id:$z_id,
        mobileotp:$mobileotp,
         verificationuser :$verificationuser,
          primarynumber:$primarynumber
       )
      
    }
  
`;
