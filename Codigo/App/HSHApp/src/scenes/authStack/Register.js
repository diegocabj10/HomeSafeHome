import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const Register = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.childContainer}>
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


export default Register;