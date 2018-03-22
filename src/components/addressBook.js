import React from 'react';
import CurrentUser from './CurrentUser';
import {Link} from 'react-router-dom';
import ContactList from './contactList';
import './addressBook.css';
import ContactListContainer from '../Containers/ContactListContainer';



const AddressBook = (props) => {
    return(
        <div className = "addressBook">
            <div className = "row">
            <div className = "userInfo col-md-3">
                { props.auth.status === 'SIGNED_IN' && <CurrentUser {...props}/>}
            </div>
            <div className = "container">
                <div className = "col-md-9">
                    <ContactListContainer {...props}/>
                </div>
                
            </div>
            </div>
            
        </div>
        
        )
    }
export default AddressBook;
