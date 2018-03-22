import initialState from "../initialState";
import { ADD_CONTACT,FETCH_CONTACTS,DELETE_CONTACT,SEARCH_CONTACT,CLEAR_SEARCH} from '../actions/index';
import _ from 'lodash';
import { data } from '../components/contactList';
import firebase from 'firebase';




export function userInput (state =initialState ,action){
    switch(action.type) {
        case 'ADD_CONTACT':
            return {
               ...state, 
                data:state.data,
                success:true
            }
        case 'DISPLAY_CONTACT':
            return {
                data:_.map(action.payload,(data,index) => {
                    return{
                        key:index,
                        ...data
                    }
                }),
                success:true
            };
        case 'DELETE_CONTACT':
            return {
                ...state,
                success:action.payload
            }
        case 'EDIT_CONTACT':
        return {
            ...state,
            success:action.payload
        };
        case 'SEARCH_CONTACT':
        if(action.payload){
            const filtered = _.filter(state.data,(data) => _.toLower(data.firstName).includes(_.toLower(action.payload )))
            return {
                ...state,
                data:filtered
            };
        }else{
            return {
                ...state,
                data:_.map(state.data,(data,index) => {
                    return{
                        key:index,
                        ...data
                    }
                }),
            
                success:true
            };
        }
        
        case 'CLEAR_SEARCH':
        return {
            ...state,
            data:_.map( action.payload,(data,index) => {
                return{
                    key:index,
                    ...data
                }
            }),
            success:true
        };
        case 'CHANGE_IMAGE':
        console.log("payload", action.payload)
        return{
            ...state,
            id: action.payload,
        };
        case 'XYX' :
        return{
            ...state,
            value:action.payload
        }
        default:
            return state
    }
}  
