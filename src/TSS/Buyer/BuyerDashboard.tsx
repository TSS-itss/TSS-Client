import React,{useState} from 'react'
import {BrowserRouter as Rounter, Route, Switch} from 'react-router-dom'
import Header from '../common/Header'
import { SideBar } from '../Buyer/BuyerMenu'
import Requirement from '../Admin/Product/Requirement'
import RequirementList from '../Admin/Product/RequirementList'
import BidList from '../Admin/Product/BidList'
function BuyerDashboard(props:any) {
    const {systemsRedirect}=props
    const [displayComponent, setDisplayComponent] = useState('Dashboard')
    return (!props.displaySystem ?
      <Rounter>
        <SideBar selectcomponent={setDisplayComponent}  systemsRedirect={systemsRedirect}/>
        <div className="main-content">
          <Header title={displayComponent}/>
          
          <main>
            <Switch>
              <Route exact path="/manageBid">
                <></>
              </Route>
              <Route exact path="/managePassword">
              <></>
              </Route>
              <Route exact path="/requirementedit">
                <Requirement {...props}/>
              </Route>
              <Route exact path="/bidlist">
                <BidList {...props}/>
              </Route>
           
              <Route exact path="/requirementManagement">
                <RequirementList {...props}/>
              </Route>

            </Switch>
          </main>
        </div>
        </Rounter>:<></>
    )
}

export default React.memo(BuyerDashboard)