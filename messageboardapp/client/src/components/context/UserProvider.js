import React, { useState, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    const token = localStorage.getItem('token')
    config.headers.Authorization = `Bearer ${token}`
    return config
});

export default function UserProvider(props) {
    const initState = {
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        comments: [],
        errMsg: ''
    };

    const [ userState, setUserState ] = useState(initState);
    const [ isLoading, setIsLoading ] = useState(true);
    // for auth
    function signup(credentials) {
        axios.post('/auth/signup', credentials)
        .then(res => {
            const {user, token} = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    };

    function login(credentials) {
        axios.post('/auth/login', credentials)
            .then(res => {
            const { user, token } = res.data
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        })
        .catch(err => handleAuthError(err.response.data.errMsg))
    };

    function logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        setUserState({
            user: {},
            token: '',
        })
    };

    //err
    function handleAuthError(errMsg) {
        setUserState(prevState => ({
            ...prevState,
            errMsg
        }))
    };

    function resetAuthError() {
        setUserState(prevState => ({
            ...prevState,
            errMsg: ''
        }))
    };

    return(
        <UserContext.Provider
        value={{
            ...userState,
            userState,
            setUserState,
            signup,
            login,
            logout,
            userAxios,
            isLoading,
            setIsLoading,
            handleAuthError,
            resetAuthError,
        }}>
            { props.children }
        </UserContext.Provider>
    )
};