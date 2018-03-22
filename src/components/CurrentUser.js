import React  from 'react';
import './CurrentUser.css';

const CurrentUser = ({auth,signOut}) => {
    return(
        <div className = "currentUser">
            <img
                className = "currentUserPhoto"
                src = {auth.photoURL}
                alt = {auth.displayName}
            />
            <div className = "currentUserInfo">
                <h3 className = "currentUserName">{auth.displayName}</h3>
                <p className = "currentUserEmail">{auth.email}</p>
                <button className = "currentUserSignOut btn btn-success"
                    onClick = {signOut}
                >
                <i className="fa fa-power-off"></i>
                    Sign Out
                </button>
            </div>
        </div>
    );
}
export default CurrentUser;