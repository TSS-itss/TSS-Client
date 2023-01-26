import React, { useState } from 'react'
import './login.css'
import register from './img/register.svg'
import log from './img/log.svg'
import { M_SignInForm } from './SignInForm'
import { M_SignUpForm } from './SignUpForm'
import { M_OTPSignUpForm } from './OTPSignUpForm'
import {M_OTPSignInForm} from './OTPSignInForm'
import {connect} from 'react-redux' 
import {Systems} from '../TSS/Systems/Systems'
import { ActionToDispatch } from '../TSS/Redux/reducers/actions/index'
import {setCurrentCompany} from '../TSS/Redux/ActionCreators'
const logintype = ""   //should be OTP or Blank
function Login(props: any) {
  const [form, setForm] = useState('signin')
  function setSignupForm() {
    setForm('signup')
    console.log(form)
  }
  function setSigninForm() {
    setForm('signin')
    console.log(form)
  }
// if(sessionStorage.getItem('jwtToken') !== undefined || sessionStorage.getItem('jwtToken') !== null ){
// props.checkuserLogggedIn()
// }
//check git 20220912

const {companies,setCurrentCompany,currentcmpn,authenticated,changeForm}= props;
          let selectedcmpn='';
          if(currentcmpn=='' && companies.length>0)
          {
          if(companies.length==1)
          {
            selectedcmpn=companies[0].cmpn;
          }
          else
          {
            companies.map((cmpn:any,index:any)=>{  
              if(cmpn.isdefault=='Y')
                  {  
                    selectedcmpn=cmpn.cmpn
                   }
               }
          
            )
          }
  
          if(selectedcmpn=='' && companies.length>0 )
          {
              selectedcmpn=companies[0].cmpn;
          }
  
          setCurrentCompany(selectedcmpn);
      }
      

if(authenticated){
  return (<Systems/>)
}else
  return (<>
    <div className={form === 'signin' ? 'login-container' : 'login-container sign-up-mode'}>
      <div className="form-container">
        <div className="signin-signup">
        {logintype ==="otp" ? <M_OTPSignInForm changeForm={changeForm}/>:<M_SignInForm changeForm={changeForm}/>}
          {logintype ==="otp" ? <M_OTPSignUpForm changeForm={changeForm}/>:<M_SignUpForm changeForm={changeForm}/>}
          
        </div>
      </div>
      <div className="panels-container">
        <div className="panel panel-left">
          <div className="content">
            <h3>New Here?</h3>
            <p>
              Click below to to register as a Buyer with us.
            </p>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={setSignupForm}
              style={{display:"none"}}
            >
              Sign Up
            </button>
            <button
              className="btn transparent"
              id="sign-up-btn"
              onClick={()=>{changeForm()}}
            >
              New Buyer
            </button>
          </div>
          <img src={log} className="image" alt="" />
        </div>

        <div className="panel panel-right">
          <div className="content">
            <h3>One of us?</h3>
            <p>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit. Beatae
              voluptate blanditiis sit.
            </p>
            <button
              className="btn transparent"
              id="sign-in-btn"
              onClick={setSigninForm}
            >
              Sign In
            </button>
          </div>
          <img src={register} className="image" alt="" />
        </div>
      </div>
    </div>
    
    <div className='login-container-mobile'>
    {form ==='signin'?logintype ==="otp"? <M_OTPSignInForm setForm={setSignupForm} changeForm={changeForm}/>:<M_SignInForm setForm={setSignupForm} changeForm={changeForm}/>
      :logintype ==="otp" ? <M_OTPSignUpForm setForm={setSigninForm}/>:<M_SignUpForm setForm={setSignupForm}/>
      
    }
    </div>
    </>
  )
}

const mapStateToProps = (state:any) => { 
  return { authenticated:state.auth.authenticated,
              authuser:state.auth.authuser ,
              companies:state.documents.companies,
              currentcmpn:state.documents.currentcmpn,
             };
    };
 const mapDispatchToProps = (dispatch:any) =>({
     ActionToDispatch,
     setCurrentCompany: (currentcmpn:any,callback:any) =>{
       dispatch(setCurrentCompany(currentcmpn));
       if(callback && typeof callback === "function"){
                   callback();
               }
     }});
export default React.memo(connect(mapStateToProps,mapDispatchToProps)(Login))