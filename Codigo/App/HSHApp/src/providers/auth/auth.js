import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

import { LOGIN } from '../../config/endpoints';
import reducer, { initialState, LOG_IN, LOG_OUT } from "./auth.reducer";

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../core/auth.header'

//example to follow: https://betterprogramming.pub/how-to-add-authentication-to-your-react-native-app-with-react-hooks-and-react-context-api-46f57aedbbd
const AuthContext = React.createContext();

const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState || {});


    const logIn = async data => {
        const url = LOGIN;
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json'
            },
            method: 'POST',
            body: JSON.stringify(data),
        });
//TODO obtain from header los jwt
        await EncryptedStorage.setItem(ACCESS_TOKEN, '');

        let accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN);
        let refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN);

        dispatch({ type: LOG_IN, accessToken, refreshToken });
    };

    const logOut = async () => {
        await EncryptedStorage.removeItem(ACCESS_TOKEN);
        await EncryptedStorage.removeItem(REFRESH_TOKEN);
        dispatch({ type: LOG_OUT });
    };

    const register = async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', accessToken: '' });
    };

    const getAuthState = async () => {
        let accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN);
        let refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN);
        if (accessToken === null || refreshToken === null) await logOut;
    };

    const authContext = React.useMemo(() => {
        return { state, getAuthState, logIn, logOut, register };
    }, [state]);

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

const useAuth = () => React.useContext(AuthContext);
export { AuthContext, useAuth }
export default AuthProvider;