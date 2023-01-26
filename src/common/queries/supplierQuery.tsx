import gql from 'graphql-tag';
//export default tmasterdocList ()
export default gql`
query suppliers($applicationid:String!,$client:String!,$lang:String!,$z_id:String)
{
  suppliers(
	  applicationid:$applicationid,
    client:$client,
    lang:$lang,
    z_id:$z_id
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
    gst_files{z_id,
      fileid,
      filepath,
      filename,
      filetype,
      filesize},
    tannumber,
    businesspannumber,
    pan_files{z_id,
      fileid,
      filepath,
      filename,
      filetype,
      filesize},
      yarntypes,
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
