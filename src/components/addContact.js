import React, { Component } from 'react';
import firebase from 'firebase';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import './addContact.css';
import {storage} from './firebase';
import Dropzone from 'react-dropzone';
import {reset} from 'redux-form';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class AddContact extends Component{
    constructor(props){
        super(props);
        this.storageRef = storage.ref('images')
        this.onFormSubmit = this.onFormSubmit.bind(this);
    }
    
    renderInput(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':'' }`
        return(
            <div className = {className}>
               <label>{field.myLabel}</label>
               <input 
               type="text"
               {...field.input}
               placeholder = "First Name"
               />
               <div className = "error">
                    {field.meta.touched ? field.meta.error:''}
               </div>
            </div>
        )    
    }
    renderInputFrom(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':'' }`
        return(
            <div className = {className}>
               <label>{field.myLabel}</label>
               <input 
               type="text"
               {...field.input}
               placeholder = "Last Name"
               />
               <div className = "error">
                    {field.meta.touched ? field.meta.error:''}
               </div>
            </div>
        )    
    }
    renderTextarea(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':'' }`
        return(
            <div className = {className}>
                <label>{field.myLabel}</label>
                <textarea type = "text"
                    placeholder = "Address"
                    {...field.input}>
                </textarea>
                <div className = "error">
                    {field.meta.touched ? field.meta.error:''}
               </div>
            </div>
        )    
    }
    renderEmail(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':'' }`
        return(
            <div className = {className}>
               <label>{field.myLabel}</label>
               <input 
               type="text"
               {...field.input}
               placeholder = "email@email.com"
               />
               <div className = "error">
                    {field.meta.touched ? field.meta.error:''}
               </div>
            </div>
        )      
    }

    renderPhone(field){
        const className = `form-input ${field.meta.touched && field.meta.error ? 'has-error':'' }`
        return(
            <div className = {className}>
               <label>{field.myLabel}</label>
               <input 
               type="text"
               {...field.input}
               placeholder = "Phone Number"
               />
               <div className = "error">
                    {field.meta.touched ? field.meta.error:''}
               </div>
            </div>
        )      
    }
    
    onFormSubmit = (values) => {   
       
        if (this.props.isEditing) {
            this.props.editContact(values.key,values);
            NotificationManager.success('Contact Updated Successfully');
            this.props.clearSubmit();
        } else {
          const id = new Date().valueOf();
          const fileName = this.newGuid()
          this.storageRef.child(fileName).put(values.image[0])
            .then((snapshot) => {
                console.log(values.image[0]);
                values.image[0] = snapshot.downloadURL;
                this.props.addContact(this.props.auth.uid,values,id);
                NotificationManager.success('Contact Added Successfully');
            })
        }   
        this.props.hideModal();
    }

    newGuid() {
         return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
           var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
           return v.toString(16);
         });
       }  

    renderDropzoneInput = (field) => {
        const files = field.input.value;
        return (
          <div>
            <Dropzone className = "addImage"
              name={field.name}
              onDrop={( filesToUpload, e ) => {field.input.onChange(filesToUpload); console.log(filesToUpload);
              }}
              multiple={ false }
            >
                <div className = "text"> 
                <i className="fas fa-cloud-upload-alt"></i>
                    Click to select files to upload.
                </div>
            </Dropzone>
            {field.meta.touched &&
              field.meta.error &&
              <span className="error">{field.meta.error}</span>}
            {files && Array.isArray(files) && (
              <ul className = "contactImage">
                { files.map((file) =>
                    <li key = {file.name}>
                    {(this.props.isEditing) ? 
                        <img src = {file}/>
                        :
                        <img src = {file.preview} />}
                    </li>
                ) }
              </ul>
            )}
          </div>
        );
      }

    render(){
        console.log(this.props)
        return(
            <div>
               <div className = "container  panel-body formContainer">
                <div className = "form col-md-12">
                    <div className = "top">
                    </div>
                    <form  onSubmit = {this.props.handleSubmit((event) => this.onFormSubmit(event))}>
                        <Field
                            myLabel="First Name"
                            name="firstName"
                            component={this.renderInput}
                            
                        />
                        <Field
                            myLabel="Last Name"
                            name="lastName"
                            component={this.renderInputFrom}
                            
                        />
                        <Field
                            myLabel="Phone"
                            name="contact"
                            component={this.renderPhone}
                            normalize={normalizePhone}
                        />
                        <Field
                            myLabel="Email"
                            name="email"
                            component={this.renderEmail}
                        />
                        
                        <Field
                            myLabel="Address"
                            name = "address"
                            component = {this.renderTextarea}
                        />
                         {(this.props.isEditing) ? 
                            <span></span>
                        :
                        <Field
                            myLabel="Image"
                            name = "image"
                            component = {this.renderDropzoneInput}
                        />}
                        
                        <button type = 'submit' className = "btn btn-success addContactButton">Add Contact</button>
                    </form>
                </div>
            </div>   
            </div>
        )
    }
}
function validate (values){
    const errors = {}
    if(!values.firstName){
        errors.firstName = "First Name Required";
    }
    if(!values.lastName){
        errors.lastName = " Required";
    }
    if(!values.email) {
        errors.email = "Email required";
      } else if(!values.email.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)) {
        errors.email = "Enter valid email.";
      }
    if(!values.address){
        errors.address = "Address Required";
    }
    if(!values.image){
        errors.image = " Required";
    }
    if(!values.contact) {
        errors.contact = "Contact number required.";
      } else if(!(values.contact.length >= 10 && values.contact.length <= 13)) {
        errors.contact = "Enter a valid Phone number."
      }
    return errors;
};
function mapStateToProps(state){
    return{
        success:state.success,
    }
}
const normalizePhone = value => {
    if (!value) {
      return value
    }
    const onlyNums = value.replace(/[^\d]/g, '')
    if (onlyNums.length <= 3) {
      return onlyNums
    }
    if (onlyNums.length <= 7) {
      return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3)}`
    }
    return `${onlyNums.slice(0, 3)}-${onlyNums.slice(3, 6)}-${onlyNums.slice(
      6,
      10
    )}`
  };
    
  
export default connect(mapStateToProps)(reduxForm({validate,form:'ContactForm',enableReinitialize: true})(AddContact));