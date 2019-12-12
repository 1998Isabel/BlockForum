import axios from 'axios';
import { 
    GET_USER, 
    ADD_USER, 
    USER_LOADING } from './types';

export const getUser = (addr) => dispatch => {
    dispatch(setUserLoading());
    axios
        .get(`/user/${addr}`)
        .then(res => {
            dispatch({
                type: GET_USER,
                payload: res.data[0]
            })});
};

export const addUser = user => dispatch => {
    axios
        .post('/users', user)
        .then(res => 
            dispatch({
                type: ADD_USER,
                payload: res.data
            }));
};

export const setUserLoading = () => {
    return {
        type: USER_LOADING
    };
};