import axios from 'axios';
import { 
    GET_POSTS, 
    ADD_POST, 
    DELETE_POST,
    LIKE_POST, 
    POSTS_LOADING } from './types';

export const getPosts = () => dispatch => {
    dispatch(setpostsLoading());
    axios
        .get('/posts')
        .then(res => {
            // console.log(res.data)
            dispatch({
                type: GET_POSTS,
                payload: res.data
            })});
};

export const addPost = post => dispatch => {
    axios
        .post('/posts', post)
        .then(res => 
            dispatch({
                type: ADD_POST,
                payload: res.data
            }));
};

export const deletePost = id => dispatch => {
    console.log("ID", id)
    axios.delete(`/posts/${id}`)
        .then(res => 
            dispatch({
                type: DELETE_POST,
                payload: id
            }));
};

export const likePost = id => dispatch => {
    axios.put(`/posts/${id}`)
        .then(res => 
            dispatch({
                type: LIKE_POST,
                payload: res.data
            }));
};

export const setpostsLoading = () => {
    return {
        type: POSTS_LOADING
    };
};