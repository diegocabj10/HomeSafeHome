import React, { Component }  from 'react';
import { Card, Button, FormLabel, FormInput } from "react-native-elements";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import { Actions } from 'react-native-router-flux';
  import { onSignOut, menuList } from "../Functions/auth";
  import { AsyncStorage } from "react-native";
  import SideMenu from 'react-native-side-menu';
  import Menu from './Menu';

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


class Nofiticaciones extends Component{
    
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

  

    render(){
        const helloMessage = 'Hola, esta es la vista Nofiticaciones';
        const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
        return (
          <SideMenu
          menu={menu}
          isOpen={this.state.isOpen}
          onChange={isOpen => this.updateMenuState(isOpen)}
          >
                        <View style={styles.container}>
                            <Text style={styles.welcome}>{helloMessage}</Text>
                          
                          
                        </View>

             
        </SideMenu>
          
        );
    }
}
export default Nofiticaciones;