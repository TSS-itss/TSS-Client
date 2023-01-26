import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query($client:String!,$lang:String!,$z_id:String,$applicationid:String!)
{
  products(
    client:$client,
    lang:$lang,
    z_id:$z_id,
    applicationid:$applicationid
  )
  {
    z_id
    applicationid
    client
    lang
    yarntype
    count
    purposevariety
    type
    nature
    quality
    composition1
    composition2
    percentage1
    percentage2
    tolerance
    diff
    slug,
    cdate
    ctime
    cuser
    udate
    utime
    uuser
    ddate
    dtime
    duser
    isdeleted
  }
}

`;
