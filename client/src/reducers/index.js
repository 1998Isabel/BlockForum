import { combineReducers } from 'redux';
import POSTReducer from './postReducer';

export default combineReducers({
    POST: POSTReducer
});