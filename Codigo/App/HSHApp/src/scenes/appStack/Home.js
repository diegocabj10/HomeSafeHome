import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Header, Icon } from 'react-native-elements';

const Home = ({ navigation }) => {
    return (
        <View>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', onPress: () => navigation.toggleDrawer(), }}
                centerComponent={{ text: 'MY TITLE', style: { color: '#fff' } }}
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