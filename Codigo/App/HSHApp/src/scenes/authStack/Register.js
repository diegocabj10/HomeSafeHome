import React from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'

const Register = () => {
    return (
        <ScrollView>
            <View style={styles.childContainer}>
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    childContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    }
})


export default Register;