import React from 'react';
import { StyleSheet, Text, View, ActivityIndicator, StatusBar, Image } from 'react-native';
const image = require('../../assets/logoHSH.png');
const Splash = () => {
    

    return (                
        <View style={[styles.container, styles.vertical]}>
        <StatusBar hidden />        
        <Image
                    source={image}
                    style={{ width: 200, height: 200 }}
                />
        <ActivityIndicator size="large" color="#2d5164" style={{marginTop:100}} />
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