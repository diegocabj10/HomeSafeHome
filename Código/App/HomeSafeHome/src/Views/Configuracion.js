import React, { Component }  from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
  import { Card, Button, FormLabel, FormInput } from "react-native-elements";
  import { onSignOut } from "../Functions/PersistenciaLocal";
  import { Actions } from 'react-native-router-flux';
  import SideMenu from 'react-native-side-menu';
  import Menu from './Menu';

  var myStyles = require('./Styles');
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


class Configuracion extends Component{
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'Initial',
      menu: ''
    };
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    }); 
  salir() {
    onSignOut();
    Actions.login();
}

    render(){
        const helloMessage = 'Hola, esta es la vista Configuracion';
      
        return (
         
                        <View style={myStyles.container}>
                
                <Button
        buttonStyle={{ marginTop: 20 }}
        backgroundColor="#03A9F4"
        title="LOG OUT"
        onPress={() => {
         this.salir();
        }}
      />
            </View>

    
          
        );
        
    }
}
export default Configuracion;