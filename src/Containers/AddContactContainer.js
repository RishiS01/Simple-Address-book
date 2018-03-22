import React from 'react'
import { connect } from 'react-redux';
import AddContact from '../components/addContact';
import { addContact,removeContact } from '../actions/index';
import { withRouter} from 'react-router-dom';
 
class addContactContainer extends React.Component  {
    render(){
       return(
           <AddContact {...this.props}/>
       )
    }
}    


const mapStateToProps = (state) => ({
    users:state.users
});

const mapDispatchToProps = (dispatch) => ({
    addContact:(id,value) => dispatch(addContact(id,value)),
    removeContact:(id,value) => dispatch(removeContact(id,value))
})


const mergeProps = (state,actions,ownProps) => ({
    ...state,
    ...actions,
    ...ownProps,
    addContact:(id,value) => {
        actions.addContact(id,value)
    },  
    
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps, mergeProps)(addContactContainer));