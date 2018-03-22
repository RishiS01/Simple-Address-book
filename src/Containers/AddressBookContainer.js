import React from 'react'
import { connect } from 'react-redux';
import AddressBook from '../components/addressBook';
import { signOut } from '../actions/auth';
import { withRouter} from 'react-router-dom';
 


const mapStateToProps = (state) => ({
    auth:state.auth
});

const mapDispatchToProps = (dispatch) => ({
    signOut:() => dispatch(signOut())
});


const mergeProps = (state,actions,ownProps) => ({
    ...state,
    ...actions,
    ...ownProps,
    signOut:() => {
        actions.signOut()
        .then(() => {
            ownProps.history.push('/')
        })
    }
});

export default withRouter(connect(mapStateToProps,mapDispatchToProps,mergeProps)(AddressBook));