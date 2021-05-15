import React from 'react';
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { useAuth } from '../providers/auth/auth';

import LogIn from '@authStack/LogIn';
import Register from '@authStack/Register';
import ChangePassword from '@authStack/ChangePassword';
import Splash from '@authStack/Splash';

import Home from '@appStack/Home';
import GenericList from '@appStack/shared/GenericList';
import GenericItemDetail from '@appStack/shared/GenericItemDetail';

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
        await new Promise(resolve => setTimeout(resolve, 1500));
        await getAuthState();
    }, []);

    return (
        <NavigationContainer theme={MyTheme}>
            <Stack.Navigator>
                {!state.isLoading ? (
                    state.userLogged !== null ? (
                        <>
                            <Stack.Screen name="Home" component={Home}  />
                            <Stack.Screen name="GenericList" component={GenericList} options={({ route }) => ({ title: route.params.title })} />
                            <Stack.Screen name="GenericItemDetail" component={GenericItemDetail} options={({ route }) => ({ title: route.params.title })} />
                        </>)
                        : (
                            <>
                                <Stack.Screen name="Login" component={LogIn} options={{ headerShown: false }} />
                                <Stack.Screen name="Register" component={Register} options={{ title: 'Registrarse' }} />
                                <Stack.Screen name="ChangePassword" component={ChangePassword} options={{ title: 'Cambiar contraseña' }} />
                            </>
                        )
                ) : (
                    <Stack.Screen name="Splash" component={Splash} options={{ headerShown: false, headerStatusBarHeight: 0 }} />
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}
export default StackNavigator;