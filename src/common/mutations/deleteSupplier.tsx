import gql from 'graphql-tag';
export default gql`
mutation deleteSupplier(

    $z_id: String,
    $applicationid:String,
  	$client:String,
          $lang:String,
    			
     )
    {
        deleteSupplier(
    			z_id:$z_id,
          applicationid:$applicationid,
          client:$client,
          lang:$lang,
    			
  
      )
      {
        applicationid
    client
    lang
	 firstname,
    z_id,
    t_id,
    supid,
    firstname,
    lastname,
    country,
    city,
    inbusinesssince,
    email,
    primarynumber,
    addemail,
    addnumber,
    addemailnumber,
    website,
    companyname,
    accounttype,
    category,
    address,
    completeaddress,
    gstnumber,
    gst_files{fileid},
    tannumber,
    businesspannumber,
    pan_files{fileid},
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
`;