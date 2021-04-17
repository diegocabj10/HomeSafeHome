import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config/config';
import reducer, { initialState, LOG_IN, LOG_OUT } from "./auth.reducer";

import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../core/auth.header'

const AuthContext = React.createContext();

const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState || {});

    //stores the token and user's data, sets axios auth header and dispatches the user's data to the reducer to be saved
    const handleLogIn = async (data) => {

        const accessToken = await EncryptedStorage.setItem(ACCESS_TOKEN, data.headers[ACCESS_TOKEN]);
        const refreshToken = await EncryptedStorage.setItem(REFRESH_TOKEN, data.headers[ACCESS_TOKEN]);

        console.log(accessToken, refreshToken);
        // axios.defaults.headers.common['x-access-token'] = response.headers.get(ACCESS_TOKEN);
        // axios.defaults.headers.common['x-refresh-token'] = response.headers.get(REFRESH_TOKEN);

        dispatch({ type: LOG_IN, accessToken, refreshToken });
    };

    const handleLogOut = async () => {
        await EncryptedStorage.removeItem(ACCESS_TOKEN);
        await EncryptedStorage.removeItem(REFRESH_TOKEN);
        dispatch({ type: LOG_OUT });
    };

    const handleRegister = async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        // dispatch({ type: 'SIGN_IN', accessToken: '' });
    };

    //returns user data if logged in
    const getAuthState = async () => {
        let accessToken = await EncryptedStorage.getItem(ACCESS_TOKEN);
        let refreshToken = await EncryptedStorage.getItem(REFRESH_TOKEN);
        if (accessToken === null || refreshToken === null) await logOut;
    };

    const authContext = React.useMemo(() => {
        return { state, getAuthState, handleLogIn, handleLogOut, handleRegister };
    }, [state]);

    return (
        <AuthContext.Provider value={authContext}>
            {props.children}
        </AuthContext.Provider>
    )
}

const useAuth = () => { return React.useContext(AuthContext); }

export { AuthContext, useAuth };
export default AuthProvider;