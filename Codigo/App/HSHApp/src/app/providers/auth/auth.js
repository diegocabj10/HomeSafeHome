import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

import { ACCESS_TOKEN, REFRESH_TOKEN } from '@config/';
import reducer, { initialState, LOG_IN, LOG_OUT } from "./authReducer";

const AuthContext = React.createContext();

const AuthProvider = (props) => {

    const [state, dispatch] = React.useReducer(reducer, initialState || {});

    const handleLogIn = async (data) => {
        await EncryptedStorage.setItem(ACCESS_TOKEN, data.accessToken);
        await EncryptedStorage.setItem(REFRESH_TOKEN, data.refreshToken);

        axios.defaults.headers.common[ACCESS_TOKEN] = data.accessToken;
        axios.defaults.headers.common[REFRESH_TOKEN] = data.refreshToken;

        if (data.accessToken) {
            let { userLogged } = jwtDecode(data.accessToken);
            dispatch({ type: LOG_IN, userLogged });
        }
    };

    const handleLogOut = async () => {
        await EncryptedStorage.clear();
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

        if (accessToken === null && refreshToken === null) {
            await handleLogOut();
        } else {
            await handleLogIn({ accessToken, refreshToken });
        }

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