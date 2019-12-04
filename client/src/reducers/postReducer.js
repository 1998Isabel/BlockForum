import { 
    GET_POSTS, 
    ADD_POST, 
    DELETE_POST, 
    POSTS_LOADING } from '../actions/types';

const initialState = {
    POSTS: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_POSTS:
            return {
                ...state,
                POSTS: action.payload,
                loading: false
            };
        case ADD_POST:
            return {
                ...state,
                POSTS: [action.payload, ...state.POSTS]
            };
        case DELETE_POST:
            return {
                ...state,
                POSTS: state.POSTS.filter(POST => POST.id !== action.payload)
            };  
        case POSTS_LOADING:
            return {
                ...state,
                loading: true
            }; 
        default:
            return state;
    }
};