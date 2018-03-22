import React  from 'react';
import SignIn from './SignIn';
import CurrentUser from './CurrentUser';
import Loader from './Loader';
import Header from './Header';


import './App.css';


const App = (props) => {
    return(
      <div>
        <div className="App">
          <div className = "row">
          <div className="AppSidebar">
            { console.log(props.auth.status) }
            { props.auth.status === 'ANONYMOUS' && <SignIn {...props}/> }
            { props.auth.status === 'AWAITING_AUTH_RESPONSE' && <Loader /> }
            { props.auth.status === 'SIGNED_IN' && <CurrentUser {...props}/> }
          </div>
        </div>
        </div>
      </div>
    );
  }


export default App;
