import { 
    GET_CATEGORYS, 
    ADD_CATEGORY, 
    DELETE_CATEGORY, 
    CATEGORYS_LOADING } from '../actions/types';

const initialState = {
    categories: [],
    loading: false
}

export default function(state = initialState, action) {
    switch(action.type) {
        case GET_CATEGORYS:
            return {
                ...state,
                CATEGORYs: action.payload,
                loading: false
            };
        case ADD_CATEGORY:
            return {
                ...state,
                categories: [action.payload, ...state.CATEGORYS]
            };
        case DELETE_CATEGORY:
            return {
                ...state,
                posts: state.posts.filter(category => category.id !== action.payload)
            };  
        case CATEGORYS_LOADING:
            return {
                ...state,
                loading: true
            }; 
        default:
            return state;
    }
};