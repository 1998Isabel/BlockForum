import axios from 'axios';
import {
    LOAD_WEB3,
    GET_USER, 
    ADD_USER, 
    USER_LOADING } from './types';
import getWeb3 from "./../utils/getWeb3";

export const loadWeb3 = () => async dispatch => {
    dispatch(setUserLoading());
    try {
        const web3 = await getWeb3();
        const accounts = await web3.eth.getAccounts();
        const serverAccount = (await axios.get('/address')).data;
        const username = (await axios.get(`/user/${accounts[0]}`)).data;
        const duration = (await axios.get("/duration")).data;
        console.log(username)
        dispatch({
            type: LOAD_WEB3,
            payload: {
                web3: web3,
                username: username,
                myAccount: accounts[0],
                serverAccount: serverAccount,
                duration: duration
            }
        })
    } catch (error) {
        alert(
            `Failed to load web3, accounts. Check console for details.`,
        );
        console.error(error);
    }
}

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
    console.log("USER", user)
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