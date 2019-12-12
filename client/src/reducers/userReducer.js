import { 
    GET_USER, 
    ADD_USER, 
    USER_LOADING } from '../actions/types';

const initialState = {
    user: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_USER:
            return {
                ...state,
                user: action.payload,
                loading: false
            };
        case ADD_USER:
            return {
                ...state,
                user: action.payload,
            };
        case USER_LOADING:
            return {
                ...state,
                loading: true
            }; 
        default:
            return state;
    }
};