import { combineReducers } from 'redux';
import postReducer from './postReducer';
import categoryReducer from './categoryReducer';
import userReducer from './userReducer';

export default combineReducers({
    post: postReducer,
    category: categoryReducer,
    user: userReducer,
});