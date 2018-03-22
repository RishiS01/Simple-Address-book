import React from 'react'
import { connect } from 'react-redux';
import EditImageUpload from '../components/editImageUpload';
import { withRouter} from 'react-router-dom';
import {reset} from 'redux-form';

 
class EditImageUploadConatiner extends React.Component  {
    render(){
       return(
           <EditImageUpload {...this.props}/>
       )
    }
}    


const mapStateToProps = (state) => {
    return {
        id: state.contacts.id
    }
};


const mergeProps = (state,actions,ownProps) => ({
    ...state,
    ...actions,
    ...ownProps,
    changeImage:(id) => {
        actions.changeImage(id)
    },  
    
});

export default withRouter(connect(mapStateToProps, null, mergeProps)(EditImageUploadConatiner));