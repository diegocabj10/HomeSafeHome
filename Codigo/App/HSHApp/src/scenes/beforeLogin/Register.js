import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const RegisterScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.childContainer}>
                <Text h3 h3Style={{ color: 'black' }}>Registrarse</Text>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#667F90',
    },
    childContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default RegisterScreen;