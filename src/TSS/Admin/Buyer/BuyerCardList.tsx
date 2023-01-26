import React,{useState,useRef,useEffect} from 'react'
import BuyerCard from './BuyerCard'
import {Pagination} from '../../../common/table/Pagination'
import '../../../common/card/card.css'
function BuyerCardList({data,cardclick,addNew,approveDoc}:any) {
    const [activePage, setActivePage] = useState(1);
    const [filterdata, setFilter] = useState([]);
    const [numberOfRecordsPerPage, setNumberOfRecordsPerPage] = useState(10)
    const searchref:any = useRef(0)
    useEffect(() => {
        setFilter(data)
        if(searchref.current.focus){
            searchref.current.focus()
          }
    }, [data])

    const globalSearch = (searchtext: string) => {
        let keys = Object.keys(data[0])
        let filteredData:any=[]
        for (let i = 0; i < data?.length; i < i++) {
            for (let key of keys) {

                if(data[i][key]!=null)
                {
                    if(typeof(data[i][key])=='string')    
                    {
                        if((data[i][key])?.toLowerCase()?.includes(searchtext?.toLowerCase())){
                            filteredData.push(data[i])
                            break;
                        }       
                    }

                }
            }
        }
        setFilter(filteredData);
        
    }
    let pageData:any=[]
    for(let i=(activePage-1)*numberOfRecordsPerPage;i<(((activePage-1)*numberOfRecordsPerPage)+numberOfRecordsPerPage) && i<filterdata?.length;i++){
        pageData?.push(filterdata[i])
      }
  return (
    <div className='card-list-component'>
    <div className="card-header">
                        {/* <div className="table-header-text">
                            <h3>{headerText}</h3><span>({data.length})</span>
                        </div> */}
                        <div className="goble-search"><input ref={searchref} placeholder="search"  onChange={(e)=>{globalSearch(e.target.value)}}/><i className="fas fa-search"/></div>
                        <button className="tabel-add-button" onClick={()=>addNew("NO-ID",true)}>Add new <span className="las la-arrow-right"></span></button>
                        
                    </div>
    <div className="cards-row">{pageData.map((user:any)=>{
        return(<>
        <BuyerCard title={user.firstname+" "+user.lastname} mobile={user.primarynumber} email={user.email} companyname={user.companyname} status={user.apprstatus} buyid={user.buyid} cardclick={cardclick} z_id={user.z_id} approveDoc={approveDoc}/>
       
        </>)
        
    })}
    </div>
    {//(numberOfRecordsPerPage < filterdata.length) &&
     <Pagination 
     number={Math.ceil(filterdata?.length/numberOfRecordsPerPage)} 
     activePage={activePage} setActivePage={setActivePage} 
     numberOfRecordsPerPage={numberOfRecordsPerPage}
     setNumberOfRecordsPerPage={setNumberOfRecordsPerPage}
     total={filterdata?.length}
     />}
    </div>
  )
}

export default BuyerCardList