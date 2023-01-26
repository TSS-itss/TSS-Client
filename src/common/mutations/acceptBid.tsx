import gql from 'graphql-tag';
export default gql`mutation acceptBid(
    $applicationid:String,
      $client:String,
      $lang:String,
      $z_id:String
       )
      {
        acceptBid(
            applicationid:$applicationid,
            client: $client,
            lang: $lang,
            z_id:$z_id
           
            
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
      }`