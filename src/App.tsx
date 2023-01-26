import './styles.css'
import {Provider} from 'react-redux'
import {ConfigureStore} from './TSS/Redux/configureStore'
import {AuthorisationswitchComponent} from './Login/AuthorisationswitchComponent'
import { PersistGate } from 'redux-persist/integration/react'
import Buyer from './TSS/Admin/Buyer/Buyer'


import React,{useState} from 'react'
import {Systems} from './TSS/Systems/Systems'
const {persistor,store} = ConfigureStore();

/*
  */


export const App = () => {
  const [currentdocument, modifydocument] = useState({})
  const handleSubmit = (obj: any) => {
    console.log(obj)
    console.log('clicked on Submitted')
  }





  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      {/* <React.StrictMode> */}
      {/* <Systems/> */}
      {/* <Buyer /> */}
   <AuthorisationswitchComponent/>
{/* </React.StrictMode> */}
 {/* <Login/> */}
    </PersistGate>
    </Provider>
//    <Login/>
    //     <FormContextProvider>

    //         {/* <h1>
    //           Hello React TypeScript WebPack Starter Template -{' '}
    //           {process.env.NODE_ENV} - {process.env.name}
    //         </h1> */}

    //          <FormComponent FormJson={FormJson} handleFormSubmit={handleSubmit}/>
    //         {/* <img src={Image} alt="React Logo" /> */}
    //         {/* <p>Hi Kedar Lachke, how r u</p>
    //         <div>Hello Kedar</div>
    // <i><b>India</b><input value="123"/><input value="12345"/> <input value="7890"/></i> */}

    //       </FormContextProvider>
  )
}
