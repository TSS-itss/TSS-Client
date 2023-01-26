import gql from 'graphql-tag';
export default gql`
mutation deleteBid(
    $applicationid:String,
      $client:String,
      $lang:String,
      $z_id:String,
      $supid:String
  )
      {
        deleteBid(
            applicationid:$applicationid,
            client: $client,
            lang: $lang,
            z_id:$z_id,
            supid:$supid,
            
        )
        {
          applicationid
      client
      lang
       
      z_id,
      t_id,
      supid,
      reqid,
      cdate,
      ctime,
      cuser,
      udate,
      utime,
      uuser,
      ddate,
      dtime,
      duser,
      isdel
        }
      }
`