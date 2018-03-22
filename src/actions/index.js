import { auth,database,storage } from '../components/firebase';
import firebase from 'firebase';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';



const contactRef = database.ref(`users`)
const storageRef = storage.ref('images')


export const addContact = (id,value) => {
  contactRef.child(id).child('contacts').push({...value})
    return {
      type: 'ADD_CONTACT',
      payload: value,
    } 
  };

export const addImage = (id,uid,value) => {

  contactRef.child(uid).child(`contacts/${id}`).child('image').set(value)
  return {
    type: 'XYX',
    payload:value
  }
}

export const changeImage = (id) => {
  return {
    type:'CHANGE_IMAGE',
    payload: id
  }
};
  
export const removeContact = (id,uid,value) => {
  contactRef.child(uid).child(`contacts/${id}`).remove()
  var desertRef = firebase.storage().refFromURL(value.image[0])
  desertRef.delete()
  return {
    type:'DELETE_CONTACT'
  }
  NotificationManager.success('Contact Deleted Successfully');
};

export const editContact = (id,value,uid) => {
  delete value.image;
  contactRef.child(uid).child(`contacts/${id}`).update({...value})
  return {
    type:'EDIT_CONTACT',
    payload: value,
  }
};
  
  
export const displayContact = (id) => {
  return dispatch => {
    firebase.database().ref(`/users/${id}/contacts`)
            .on('value', snapshot => {
              console.log("Contacts: ", snapshot.val());
              const newValue = snapshot.val();
              dispatch({ type: 'DISPLAY_CONTACT', payload: newValue });
            });
    }
}
export const searchContact = (data) => {
  console.log(data,'ACTION ');
  return {
    type:'SEARCH_CONTACT',
    payload:data
  }
}

export const clearSearch = (id) => {
  return dispatch => {
    firebase.database().ref(`/users/${id}/contacts`)
            .on('value', snapshot => {
              console.log(snapshot.val(),"CLEAR");
                const newValue = snapshot.val();
                dispatch({ type:'CLEAR_SEARCH', payload: newValue });
            });
  }
}