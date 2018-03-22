import { combineReducers } from 'redux';
import authReducer from './auth';
import { reducer as formReducer } from 'redux-form';
import {userInput} from './userInput'


const rootReducer = combineReducers({
    auth:authReducer,
    form: formReducer,
    users:userInput,
    contacts:userInput
})
export default rootReducer;