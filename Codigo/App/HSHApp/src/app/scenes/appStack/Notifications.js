import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const Notifications = ({navigation}) => {
    return (
        <View>
            <Header
                leftComponent={{ icon: 'back', color: '#fff', onPress: () => navigation.navigate('Home'), }}
                centerComponent={{ text: 'NOTIFICATIONS', style: { color: '#fff' } }}
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


export default Notifications;