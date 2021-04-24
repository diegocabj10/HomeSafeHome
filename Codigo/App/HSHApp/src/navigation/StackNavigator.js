import React from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Button, Input, Text } from 'react-native-elements';

import { AuthContext, useAuth } from '../providers/auth/auth';

import DrawerNavigation from './DrawerNavigation';

import LogIn from '../scenes/authStack/LogIn';
import Register from '../scenes/authStack/Register';
import ChangePassword from '../scenes/authStack/ChangePassword';

const Stack = createStackNavigator();
const MyTheme = {
    ...DefaultTheme,
    colors: {
        ...DefaultTheme.colors,
        primary: 'white',
        background: '#667F90',
        card: '#667F90',
        text: 'white',
    },
};

const StackNavigator = () => {

    const { getAuthState, state } = useAuth();
    React.useEffect(async () => {
         await getAuthState();
    }, []);

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator >
                {state.userLogged !== null ? (
                    <>
                        <Stack.Screen name="DrawerNavigation" component={DrawerNavigation} options={{ headerShown: false }} />
                    </>)
                    : (
                        <>
                            <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }} />
                            <Stack.Screen name="Register" component={Register} options={{ title: 'Registrarse' }} />
                            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Cambiar contraseña' }} />

                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigator;