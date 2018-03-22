import React, { Component } from 'react';
import { connect } from 'react-redux';
import ContactList from '../components/contactList';
import { withRouter} from 'react-router-dom';
import { displayContact,removeContact,editContact,searchContact,clearSearch,addImage, changeImage } from '../actions/index';
import { signIn, signOut } from '../actions/auth';


class contactListContainer extends Component {
    render(){
        return(
            <ContactList {...this.props}/>
        )
    }
}

const mapStateToProps = (state) => ({
    contacts:state.contacts
})

const mapDispatchToProps = (dispatch) => ({
    displayContact:(id) => dispatch(displayContact(id)),
    removeContact:(id,uid,value) => dispatch(removeContact(id,uid,value)),
    editContact:(id,value,uid)=>dispatch(editContact(id,value,uid)),
    searchContact:(data) => dispatch(searchContact(data)),
    clearSearch:(id) => dispatch(clearSearch(id)),
    addImage:(id,uid,value) =>dispatch(addImage(id,uid,value)),
    changeImage:(id) => dispatch(changeImage(id)),
    
})

const mergeProps = (state,actions,ownProps) => ({
    ...state,
    ...actions,
    ...ownProps,
    displayContact:() => {
        actions.displayContact(ownProps.match.params.id)
    },
    removeContact:(id,value)=>{
        const uid = ownProps.match.params.id;
        actions.removeContact(id,uid,value)
    },
    editContact:(id,value)=>{
        const uid = ownProps.match.params.id
        actions.editContact(id,value,uid)
    },
    searchContact:(data)=>{
        const id = ownProps.match.params.id;
        actions.searchContact(data)
    },
    clearSearch:() => {
        actions.clearSearch(ownProps.match.params.id)
    },
    addImage:(id,uid,value) => {
        console.log(id,uid,value,"ADDACTION");
        
        actions.addImage(id,uid ,value)
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps,mergeProps)(contactListContainer));