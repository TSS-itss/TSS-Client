import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch,
    useParams,
    useHistory,
    useLocation
  } from "react-router-dom";
  import { ActionToRedirect,ActionToDispatch,checkCurrentUsernameJWT} from '../TSS/Redux/reducers/actions'

  import {Systems} from '../TSS/Systems/Systems'
  import HomeComponent from './Login'
 

  import { connect } from 'react-redux';
import AdminDashboard from "../TSS/Admin/AdminDashboard";
import BuyerDashboard from "../TSS/Buyer/BuyerDashboard";
import SupplierDashboard from "../TSS/Supplier/SupplierDashboard";
import Buyer from "../TSS/Admin/Buyer/Buyer";
  

  interface IProps{
    ActionToDispatch:any;
    ActionToRedirect:any;
    authenticated:boolean,
    authuser:any
  }
  class AuthorisationswitchComponent1 extends React.Component<IProps>{


    constructor(props:any) {

        super(props);
         this.state = {
        loader:false,
        changeform:false
                     };
      }

changeForm=()=>{
  this.setState({changeform:!this.state.changeform})
}

    
async componentDidMount(){
  checkCurrentUsernameJWT(async (err:any,result:any)=>
                 {
                  if(!err)
                   {
                  
                             if(!result)
                             {
                               this.props.ActionToDispatch({ type: 'AUTH_ERROR' ,payload : err });
                               //setState({formErrorMessage: errorMessage,formErrors : errors}); 
                               this.setState({loader:false})
                             }
                             else
                             {
                             //setState({formErrorMessage: 'Authenticated'});  
                             this.props.ActionToDispatch({ type: 'AUTH_USER' ,payload :  result  });
                             this.props.ActionToRedirect('/Systems');
                             this.setState({loader:false})
                             }
 
                   }
                 }
                 )
}


      render()
      {

        
          const {authenticated,authuser} = this.props
         
          if(authenticated)
          {
     
            return    (
                <Router>
                  {authuser.userauthorisations ==='Admin'?<AdminDashboard {...this.props}/>:<></>}
                  {authuser.userauthorisations ==='Buyer'?<BuyerDashboard {...this.props}/>:<></>}
                  {authuser.userauthorisations ==='Supplier'?<SupplierDashboard {...this.props}/>:<></>}             
                </Router>
              )

          }
          else if(!authenticated && this.state.changeform){
              return(<Router><Buyer {...this.props} changeForm={this.changeForm}/></Router>)
          }
          else
          {
            return    (
                <Router>
        
            
           
                 <HomeComponent changeForm={this.changeForm}/>
                
                {/* <Switch>
             <Route key={100} path={"/"} exact={true} children={<HomeComponent/>}/>
            
                </Switch> */}
                </Router>
              )
          }
          
          
      }
    
    
    }

    const mapStateToProps = (state:any) => { 
    
        return { authenticated:state.auth.authenticated,
                 authuser:state.auth.authuser ,
                 
                };
       };
        



       


    let AuthorisationswitchComponent = connect(mapStateToProps,{ ActionToDispatch,ActionToRedirect})(AuthorisationswitchComponent1);


    export {AuthorisationswitchComponent}