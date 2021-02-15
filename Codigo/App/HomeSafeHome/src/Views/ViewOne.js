import React, { Component }  from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';

  const styles = StyleSheet.create({
    button: {
      position: 'absolute',
      top: 20,
      padding: 10,
    },
    caption: {
      fontSize: 20,
      fontWeight: 'bold',
      alignItems: 'center',
    },
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#F5FCFF',
    },
    welcome: {
      fontSize: 20,
      textAlign: 'center',
      margin: 10,
    },
    instructions: {
      textAlign: 'center',
      color: '#333333',
      marginBottom: 5,
    },
  });


class ViewOne extends Component{
    render(){
        const helloMessage = 'Hola, esto cambia la view sin pasar a otra escena :)';
        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>{helloMessage}</Text>
            </View>
        );
    }
}
export default ViewOne;