import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';
import { AuthContext, useAuth } from '../../providers/auth/auth';

const Home = ({ navigation }) => {
    const { getAuthState, state } = useAuth();
    const { handleLogOut } = useAuth();

    return (
        <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: () => navigation.toggleDrawer(), }}
                centerComponent={{ text: 'HOME', style: { color: '#fff' } }}
                rightComponent={{ icon: 'logout', color: '#fff', onPress: () => handleLogOut(), }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default Home;