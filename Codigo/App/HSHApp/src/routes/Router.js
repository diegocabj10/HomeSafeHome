import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthContext, useAuth } from '../providers/auth/auth';

import Home from '../scenes/appStack/Home';

import LogIn from '../scenes/authStack/LogIn';
import Register from '../scenes/authStack/Register';
import ChangePassword from '../scenes/authStack/ChangePassword';

const Stack = createStackNavigator();

const Router = () => {

    const { state } = useAuth();
    return (
        <NavigationContainer>
            <Stack.Navigator >
                {state.accessToken !== null ? (
                    <>
                        <Stack.Screen name="Home" component={Home} />
                    </>)
                    : (
                        <>
                            <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }} />
                            <Stack.Screen name="Register" component={Register} options={{ title: 'Registrarse', headerStyle: { backgroundColor: '#667F90' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' }} />
                            <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Cambiar contraseña', headerStyle: { backgroundColor: '#667F90' }, headerTitleStyle: { color: 'white' }, headerTintColor: 'white' }} />

                        </>
                    )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default Router;