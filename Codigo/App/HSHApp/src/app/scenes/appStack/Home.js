import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { AuthContext, useAuth } from '../../providers/auth/auth';

const Home = ({ navigation }) => {
    const { getAuthState, state } = useAuth();
    const { handleLogOut } = useAuth();

    return (
        <View>
            <Header
                rightComponent={{ icon: 'logout', color: '#fff', onPress: () => handleLogOut(), }}
            />
            <Button type="clear" titleStyle={{ color: 'white' }}
                title="Claims"
                onPress={() => navigation.navigate('Claims')} />
            <Button type="clear" titleStyle={{ color: 'white' }}
                title="Notices"
                onPress={() => navigation.navigate('Notices')} />
            <Button type="clear" titleStyle={{ color: 'white' }}
                title="Notifications"
                onPress={() => navigation.navigate('Notifications')} />
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