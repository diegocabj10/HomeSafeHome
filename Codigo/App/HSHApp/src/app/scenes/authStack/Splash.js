import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Image } from 'react-native';
import image from '@assets/icon.png'
const Splash = () => {

    return (
        <View style={[styles.container, styles.vertical]}>
            <StatusBar hidden />
            <Image
                source={image}
                style={{ width: 200, height: 200 }}
            />
            <ActivityIndicator size="large" color="#ffffff" style={{ marginTop: 100 }} />
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


export default Splash;