import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import CookieManager from '@react-native-cookies/cookies';
const AuthContext = React.createContext();

const [state, dispatch] = React.useReducer(
    (prevState, action) => {
        switch (action.type) {
            case 'RESTORE_TOKEN':
                return {
                    ...prevState,
                    isLoading: false,
                    accessToken: action.accessToken,
                    userRefreshToken: action.refreshToken,
                };
            case 'SIGN_IN':
                return {
                    ...prevState,
                    isSignout: false,
                    accessToken: action.accessToken,
                    userRefreshToken: action.refreshToken,
                };
            case 'SIGN_OUT':
                return {
                    ...prevState,
                    isSignout: true,
                    accessToken: null,
                    refreshToken: null,
                };
        }
    },
    {
        isLoading: true,
        isSignout: false,
        accessToken: null,
        refreshToken: null,
    }
);

React.useEffect(() => {
    // Fetch the token from storage then navigate to our appropriate place
    const bootstrapAsync = async () => {
        let accessToken;

        try {
            accessToken = EncryptedStorage.getItem('accessToken');
        } catch (e) {
            // Restoring token failed
        }

        // After restoring token, we may need to validate it in production apps

        // This will switch to the App screen or Auth screen and this loading
        // screen will be unmounted and thrown away.
        dispatch({ type: 'RESTORE_TOKEN', accessToken: accessToken });
    };

    bootstrapAsync();
}, []);


const authContext = React.useMemo(
    () => ({
        signIn: async data => {
            // In a production app, we need to send some data (usually username, password) to server and get a token
            // We will also need to handle errors if sign in failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token
            try {
                const url = 'http://localhost:8080/api/authentications/login'
                const response = await fetch(url, {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    credentials: 'include',
                    method: 'POST',
                    body: data,
                })
            } catch (err) {
                console.log(err.message);
            }

            dispatch({ type: 'SIGN_IN', accessToken: 'accessToken', refreshToken: 'refreshToken' });
        },
        signOut: () => dispatch({ type: 'SIGN_OUT' }),
        signUp: async data => {
            // In a production app, we need to send user data to server and get a token
            // We will also need to handle errors if sign up failed
            // After getting token, we need to persist the token using `SecureStore`
            // In the example, we'll use a dummy token

            dispatch({ type: 'SIGN_IN', accessToken: 'dummy-auth-token' });
        },
    }),
    []
);


export { AuthContext, authContext };
