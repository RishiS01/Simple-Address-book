import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import reducer from './reducers';
import initialState from './initialState';
import { createStore,applyMiddleware,compose } from 'redux';
import AppContainer from './Containers/AppContainer';
import AddContactContainer from './Containers/AddContactContainer';
import ContactListContainer from './Containers/ContactListContainer';
import EditImageContainer from './Containers/EditImageContainer';
import { startListeningToAuthChanges } from './actions/auth';
import { displayContact } from './actions/index'
import { Router, Route,Switch} from "react-router-dom";
import createHistory from 'history/createBrowserHistory';
import AddressBookContainer from './Containers/AddressBookContainer';
import Header from './components/Header';
import { ModalContainer, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';
import {NotificationContainer} from 'react-notifications';

 
const history = createHistory();
const middleware = [ thunk ];
const enhancers = [];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const createStoreWithMiddleware = createStore(
    reducer,
    initialState,
    composeEnhancers(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );

  createStoreWithMiddleware.dispatch(startListeningToAuthChanges());
  createStoreWithMiddleware.dispatch(displayContact());
  
  

ReactDOM.render(
<Provider store = {createStoreWithMiddleware}>
    <div>
        <Router history = {history}>
        <div>
            <Header/>
           
                <Switch>
                    <Route exact path = '/' component = {AppContainer}/>
                    <Route exact path = '/addContact' component = {AddContactContainer}/>
                    <Route exact path = '/addressBook/:id' component = {AddressBookContainer}/>
                    <Route exact path = '/contactList' component = {ContactListContainer}/>
                    <Route exact path = '/editImageUpload' key="route" component = {EditImageContainer}/>
                    <ModalRoute path='/editImageUpload' key="modal-route" component={EditImageContainer} />
                </Switch>  
            <NotificationContainer/>
            <ModalContainer/>
        </div> 
        </Router>
    </div>
</Provider>
, document.getElementById('root'));
