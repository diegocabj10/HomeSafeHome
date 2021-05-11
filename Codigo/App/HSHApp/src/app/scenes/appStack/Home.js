import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Button } from 'react-native-elements';
import { AuthContext, useAuth } from '../../providers/auth/auth';
import { TITLE_ENDPOINT } from '@config';

const Home = ({ navigation }) => {
    const { getAuthState, state } = useAuth();
    const { handleLogOut } = useAuth();

    return (
        <View>
            <Header
                rightComponent={{ icon: 'logout', color: '#fff', onPress: () => handleLogOut(), }}
            />
            <Button type="clear" titleStyle={{ color: 'white' }}
                title="Reclamos"
                onPress={() => navigation.navigate('GenericList', { title: TITLE_ENDPOINT.find(element => element.key == 'claims').title })} />
            <Button type="clear" titleStyle={{ color: 'white' }}
                title="Avisos"
                onPress={() => navigation.navigate('GenericList', { title: TITLE_ENDPOINT.find(element => element.key == 'notices').title })} />
            <Button type="clear" titleStyle={{ color: 'white' }}
                title="Notificaciones"
                onPress={() => navigation.navigate('GenericList', { title: TITLE_ENDPOINT.find(element => element.key == 'notifications').title })} />
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