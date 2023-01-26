import gql from 'graphql-tag';
export default  gql`
mutation saveProduct(
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
   )
  {
      saveProduct(
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
    diff
  }
  }
  
`;