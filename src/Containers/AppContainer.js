import React from 'react'
import { connect } from 'react-redux';
import App from '../components/App';
import { signIn, signOut } from '../actions/auth';
import { withRouter} from 'react-router-dom';

const mapDispatchToProps = (dispatch) => ({
    signIn: () => dispatch(signIn()),
    signOut:() => dispatch(signOut())
})
const mapStateToProps = (state) => ({
    auth:state.auth
});

const mergeProps = (state,actions,ownProps) => ({
...state,
...actions,
...ownProps,
signIn:() => {
    actions.signIn().then(({user}) => {
        ownProps.history.push(`/addressBook/${user.uid}`)
      })
     ;
},

signOut:() => {
    actions.signOut()
}

})
export default withRouter(connect(mapStateToProps,mapDispatchToProps,mergeProps)(App));