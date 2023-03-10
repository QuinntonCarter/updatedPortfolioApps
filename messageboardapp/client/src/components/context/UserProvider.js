import React, { useState, createContext } from 'react';
import axios from 'axios';

export const UserContext = createContext();

const userAxios = axios.create()
userAxios.interceptors.request.use(config => {
    // **fix: setup with cookies **
    const token = localStorage.getItem('token')
    // ** * * * **
    config.headers.Authorization = `Bearer ${token}`
    return config
});

export default function UserProvider(props) {
    const initState = {
        // **fix: setup with cookies **
        user: JSON.parse(localStorage.getItem('user')) || {},
        token: localStorage.getItem('token') || '',
        // ** * * * **
        // comments: [],
        errMsg: ''
    };

    const [ userState, setUserState ] = useState(initState);
    const [ isLoading, setIsLoading ] = useState(true);
    // for auth
    async function signup(credentials) {
        try {
            const { 
                data: { user, token }
            } = await axios.post('/auth/signup', credentials)
            // const { user, token } = data
            // **fix: setup with cookies **
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            // ** * * * **
            await setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        } catch (error) {
            throw new Error("Error with signup", { cause: error })
        }
        // .catch(err => handleAuthError(err.response.data.errMsg))
    };

    async function login(credentials) {
        try {
            const {
                data: { user, token }
            } = await axios.post('/auth/login', credentials)
            // **fix: setup with cookies **
            localStorage.setItem('token', token)
            localStorage.setItem('user', JSON.stringify(user))
            // ** * * * **
            await setUserState(prevUserState => ({
                ...prevUserState,
                user,
                token
            }))
        } catch (error) {
            throw new Error("", { cause: error })
            // .catch(err => handleAuthError(err.response.data.errMsg))
        }
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

    return (
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
            }}
        >
            { props.children }
        </UserContext.Provider>
    )
};