import { auth,database,googleAuthProvider } from '../components/firebase';
import pick from 'lodash/pick';


const usersRef = database.ref(`users`);

export const signIn = () => {
    
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({type:'ATTEMPTING_LOGIN'});
            const promise = auth.signInWithPopup(googleAuthProvider);
            promise.then((user) => {
                resolve(user);
            }).catch((error) => {
                reject(error);
            });
        })
        
        };

    };

export const signOut = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({type:'ATTEMPTING_LOGIN'});
           const promise =  auth.signOut();
           promise.then(() => {
               resolve();
           }).catch(() => {
               reject();
           });
        })
        // auth.signOut();
    };
};

const signedIn = (user) =>{
    return{
        type:'SIGN_IN',
        email:user.email,
        displayName:user.displayName,
        photoURL:user.photoURL,
        uid:user.uid
    };
};
const signedOut = () =>{
    return{
        type:'SIGN_OUT'
    }
}

export const startListeningToAuthChanges = () => {
    return (dispatch) => {
        auth.onAuthStateChanged((user) => {
            if(user){
                dispatch(signedIn(user))
                usersRef.child(user.uid).child('profile').set(pick(user,['displayName','photoURL','email','uid']));
                
            } else{
                dispatch(signedOut());
            }
        })
    }
}