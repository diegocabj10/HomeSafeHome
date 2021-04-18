import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';

import { ACCESS_TOKEN_SECRET, REFRESH_TOKEN_SECRET } from '../../config/config';
import reducer, { initialState, LOG_IN, LOG_OUT } from "./auth.reducer";

import { ACCESS_TOKEN, REFRESH_TOKEN, USER_LOGGED } from '../../config/auth.header'

const AuthContext = React.createContext();

const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState || {});

    const handleLogIn = async (data) => {

        await EncryptedStorage.setItem(ACCESS_TOKEN, data.accessToken);
        await EncryptedStorage.setItem(REFRESH_TOKEN, data.refreshToken);
        await EncryptedStorage.setItem(USER_LOGGED, data.userLogged);

        axios.defaults.headers.common[ACCESS_TOKEN] = data.accessToken;
        axios.defaults.headers.common[REFRESH_TOKEN] = data.refreshToken;

        dispatch({ type: LOG_IN, userLogged: data.userLogged });
    };

    const handleLogOut = async () => {
        await EncryptedStorage.removeItem(ACCESS_TOKEN);
        await EncryptedStorage.removeItem(REFRESH_TOKEN);
        await EncryptedStorage.removeItem(USER_LOGGED);

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
        let userLogged = await EncryptedStorage.getItem(USER_LOGGED);

        if (accessToken !== null || refreshToken !== null) await handleLogIn({ accessToken, refreshToken, userLogged })
        else await handleLogOut();

        return {userLogged}
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