import axios from 'axios';
import { 
    GET_POSTS, 
    ADD_POST, 
    DELETE_POST, 
    POSTS_LOADING } from './types';

export const getPosts = () => dispatch => {
    dispatch(setPostsLoading());
    axios
        .get('/api/POSTS')
        .then(res => 
            dispatch({
                type: GET_POSTS,
                payload: res.data
            }));
};

export const addPost = POST => dispatch => {
    axios
        .post('/api/POSTS', POST)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            }));
};

export const deletePost = id => dispatch => {
    axios.delete(`/api/POSTS/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            }));
};

export const setPostsLoading = () => {
    return {
        type: POSTS_LOADING
    };
};