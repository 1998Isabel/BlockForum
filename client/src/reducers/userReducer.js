import { 
    GET_USER, 
    ADD_USER, 
    USER_LOADING,
    LOAD_WEB3 } from '../actions/types';

const initialState = {
    web3: null,
    username: null,
    myAccount: null,
    serverAccount: null,
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case LOAD_WEB3:
            return {
                ...state,
                ...action.payload,
                loading: false
            }
        case GET_USER:
            return {
                ...state,
                username: action.payload,
                loading: false
            };
        case ADD_USER:
            return {
                ...state,
                username: action.payload,
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