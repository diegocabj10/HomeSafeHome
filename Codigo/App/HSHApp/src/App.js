import 'react-native-gesture-handler';
import React from 'react';
import {
  Text,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ThemeProvider } from 'react-native-elements';

import EncryptedStorage from 'react-native-encrypted-storage';
import SetCookie from 'set-cookie-parser';

import HomeScreen from './Screens/AfterLogin/Home';

import LoginScreen from './Screens/BeforeLogin/Login';
import RegistreScreen from './Screens/BeforeLogin/Register';

const Stack = createStackNavigator();
const AuthContext = React.createContext();

const theme = {
  colors: {
    primary: '#667F90',
  },
  Button: {
    raised: true,
  },
  Input: {
    labelStyle: {
      color: 'white',
    }

  }
};

const App = () => {

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        // case 'RESTORE_TOKEN':
        //   return {
        //     ...prevState,
        //     isLoading: false,
        //     accessToken: action.accessToken,
        //     refreshToken: action.refreshToken,
        //   };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            accessToken: action.accessToken,
            refreshToken: action.refreshToken,
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

  // React.useEffect(() => {
  //   // Fetch the token from storage then navigate to our appropriate place
  //   const bootstrapAsync = async () => {
  //     let accessToken = EncryptedStorage.getItem('accessToken');
  //     let refreshToken = EncryptedStorage.getItem('refreshToken');

  //     // This will switch to the App screen or Auth screen and this loading
  //     // screen will be unmounted and thrown away.
  //     dispatch({ type: 'RESTORE_TOKEN', accessToken, refreshToken });
  //   };

  //   bootstrapAsync();
  // }, []);


  const authContext = React.useMemo(
    () => ({
      signIn: async data => {
        const url = 'http://192.168.0.113:8080/api/authentications/login';
        const response = await fetch(url, {
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include',
          method: 'POST',
          body: JSON.stringify(data),
        });

        let combinedCookieHeader = response.headers.get('set-cookie');
        let splitCookieHeaders = SetCookie.splitCookiesString(combinedCookieHeader);
        let cookies = SetCookie.parse(splitCookieHeaders);

        cookies.forEach(async (cookie) => {
          await EncryptedStorage.setItem(cookie.name, JSON.stringify(cookie));
        });
        let accessToken = EncryptedStorage.getItem('accessToken');
        let refreshToken = EncryptedStorage.getItem('refreshToken');

        dispatch({ type: 'SIGN_IN', accessToken, refreshToken });
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      signUp: async data => {
        // In a production app, we need to send user data to server and get a token
        // We will also need to handle errors if sign up failed
        // After getting token, we need to persist the token using `SecureStore`
        // In the example, we'll use a dummy token

        dispatch({ type: 'SIGN_IN', accessToken: '' });
      },
    }),
    []
  );



  return (
    <>
      <ThemeProvider theme={theme}>
        <NavigationContainer>
          <AuthContext.Provider value={authContext}>
            <Stack.Navigator >
              {state.accessToken !== null ? (
                <>
                  <Stack.Screen name="Home" component={HomeScreen} />
                </>)
                : (
                  <>
                    <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
                    <Stack.Screen name="Register" component={RegistreScreen} options={{ headerShown: false }} />
                  </>
                )}
            </Stack.Navigator>
          </AuthContext.Provider>
        </NavigationContainer>
      </ThemeProvider>
    </>
  );
};
export { AuthContext };

export default App;
