import axios from 'axios';
import { 
    GET_CATEGORYS, 
    ADD_CATEGORY, 
    DELETE_CATEGORY, 
    CATEGORYS_LOADING } from './types';

export const getPosts = () => dispatch => {
    dispatch(setcategoriesLoading());
    axios
        .get('/categories')
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: GET_CATEGORYS,
                payload: res.data
            })});
};

export const addPost = category => dispatch => {
    axios
        .post('/categories', category)
        .then(res => 
            dispatch({
                type: ADD_CATEGORY,
                payload: res.data
            }));
};

export const deletePost = id => dispatch => {
    axios.delete(`/categories/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_CATEGORY,
                payload: id
            }));
};

export const setcategoriesLoading = () => {
    return {
        type: CATEGORYS_LOADING
    };
};