import React, { Component }  from 'react';

import {
    StyleSheet,
    
    View,
    Image,
    TouchableOpacity,
    Switch
  } from 'react-native';
  import { Card,Divider,Text, Button } from 'react-native-elements';
  import { Actions } from 'react-native-router-flux';
  import { onSignOut, menuList } from "../Functions/auth";
  import { AsyncStorage } from "react-native";
  import SideMenu from 'react-native-side-menu';
  import Menu from './Menu';
  import Lista from './Lista';
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


class Contactos extends Component{
    
  constructor(props) {
    super(props);



    this.state = {
      isOpen: false,
      selectedItem: '',
      menu: '',
      estado:'Desactivado'
    };
  }
  
    render(){
        const helloMessage = 'Contactos';
      
        return (
     
                        <View style={styles}>
                         <Lista entidad= 'Contactos' clave= 'lista' titulo= 'Contactos de Confianza' />                                                    
                        </View>


          
        );
    }
}
export default Contactos;