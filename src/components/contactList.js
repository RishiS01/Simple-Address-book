import React, { Component } from 'react';
import firebase from 'firebase'
import { Button, Table } from 'react-bootstrap';
import AddContact from './addContact';
import AddContactContainer from '../Containers/AddContactContainer';
import './contactList.css';
import { Modal, ModalRoute } from 'react-router-modal';
import 'react-router-modal/css/react-router-modal.css';
import {displayContact} from '../actions/index';
import Search from '../components/searchContact';
import contactListContainer from '../Containers/ContactListContainer';
import ContactListContainer from '../Containers/ContactListContainer';
import _ from 'lodash';
import Dropzone from 'react-dropzone';
import { ContactForm } from './addContact';
import EditImageUploadContainer from '../Containers/EditImageContainer';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

let initialValues = {};
class ContactList extends Component {
  
    constructor(props) {
        super(props);
        this.state = {
          show: false,
          isEditing: false,
          userId: null,
          files:[],
          showImageModal: false
        };
        
      }

      componentWillMount() {
        const id  = this.props.match.params;
        this.props.displayContact(id);
      }
     
      handleShow = () => {
        initialValues = {};
        this.setState({ show: true });
      }
      
      handleClose = () => {
        this.setState({ show: false, isEditing: false, userId: null,showImageModal:false});
      }
    
      handleEdit = (id,value) => {
        this.setState({ show: true, isEditing: true, userId:this.props.match.params.id });
        initialValues = {
          ...value
        } 
      }
    
      handleDelete = (id,value) => {
        if(window.confirm("Sure to delete?")){
          this.props.removeContact(id,value);
        }
        NotificationManager.success('Contact Deleted Successfully');
        
      }
      onDrop(files) {
        this.setState({
          files
        });
      }   
      
      handleEditImage = (id,image) => {
        this.props.changeImage(id); 
        this.setState({ showImageModal: true });   
      }

      render() {

        const { data } = this.props.contacts;
        const contactList =  data;
        
        return (
          <div className="container">
            <div className="addContact col-md-8">
              <Button bsStyle="info"  onClick={this.handleShow}>
              <i className="fa fa-user-plus"></i>
                Add Contact
              </Button>
            </div>
            <div className = "searchContact col-md-4">
              <Search {...this.props}/>
            </div>
            
            <hr/>
            {this.state.show && (
          <Modal onBackdropClick={(dispatch) => {this.setState({show: false,isEditing: false})}}>
            <div className = "closeModal pull-right" onClick={(dispatch) => {this.setState({show: false,isEditing: false})}}>
              <i className="fa fa-times"></i>
            </div>
              <AddContactContainer
                          {...this.props}
                         addContact={this.props.addContact} 
                         removeContact={this.props.removeContact}
                         editContact={this.props.editContact} 
                         hideModal={this.handleClose} 
                         initialValues={initialValues} 
                         isEditing={this.state.isEditing} 
                         userId={this.props.match.params.id} 
              />
          </Modal>
        )}
            
            <div className = "contactList">
               <div className = "title">
                <h2>
                    <i className="fa fa-users"></i>    
                    ContactList
                </h2>
               </div>
               <div className="table-responsive">          
                    <table className="table">
                    <thead className = "tableHeader"> 
                    <tr>
                        <th>#</th>
                        <th>Person</th>
                        <th>Firstname</th>
                        <th>Lastname</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Address</th>
                    </tr>
                    </thead>
                    <tbody>
                    {  !_.isEmpty(contactList) ? (_.map(contactList,(contact,index) =>{
                        return(
                          <tr key = {index}>
                          <td>{ index + 1}</td>
                          <td className = "contactImage">
                            <img src = {contact.image}
                              onClick={() => this.handleEditImage(contact.key)}/>
                            {this.state.showImageModal && (
                              <Modal onBackdropClick={(dispatch) => this.setState({showImageModal: false})} >
                                <div className = "closeImageModal pull-right" onClick={(dispatch) => this.setState({showImageModal: false})}>
                                  <i className="fa fa-times"></i>
                                </div>
                                <div  onClick = {() => this.handleEditImage(contact.key,contact.image)}>
                                
                                  <EditImageUploadContainer
                                    {...this.props}
                                    hideModal={this.handleClose}
                                  />
                                </div>
                              </Modal> 
                            )}
                    
                          </td>
                          <td>{contact.firstName}</td>
                          <td>{contact.lastName}</td>
                          <td>{contact.email}</td>
                          <td>{contact.contact}</td>
                          <td className="contactAddress">{contact.address} </td>
                          <td>
                            <span className = "editContact" onClick={() => this.handleEdit(contact.key,contact)}>
                            <i className="fa fa-pencil" aria-hidden="true"></i>
                            </span>
                          </td>
                          <td>
                            <span className = "removeContact" onClick={() => this.handleDelete(contact.key,contact)}>
                            <i className="fa fa-trash-o" aria-hidden="true"></i>
                            </span>
                          </td>
                        </tr>
                        )  
                      })):<h3 className = "text">'No Contacts to show'</h3>
                    }
                     </tbody>
                </table>
                </div>
            </div>
            </div>
        )
    }
}
<ModalRoute path='/addContact' component={AddContact} />
export default ContactList;