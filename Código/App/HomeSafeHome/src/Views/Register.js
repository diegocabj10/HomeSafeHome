import React,{ Component }  from "react";
import { View } from "react-native";
import { Card, Button, FormLabel, FormInput, Text } from "react-native-elements";
import {NavigationBar} from 'react-native-navbar-color'
var myStyles = require('./Styles');
import { Actions } from 'react-native-router-flux';
import { onSignIn } from "../Functions/auth";
import { AsyncStorage } from "react-native";
import axios from 'axios';

class Register extends Component{

    constructor(props) {
        super(props);
        this.state = {
        nombre : '',
        apellido : '',
        email : '',
        password: '',
        error: ''
        }
    }   

    

    render(){
        return (
  <View style={ myStyles.container}>
    <View style={myStyles.loginFormContainer}>
      
      <FormInput inputStyle={myStyles.loginFormInputs} placeholderTextColor='#6289A3' placeholder="Nombre" onChangeText={(nombre) => this.setState({nombre})}/>

      <FormInput inputStyle={myStyles.loginFormInputs} placeholderTextColor='#6289A3' placeholder="Apellido" onChangeText={(apellido) => this.setState({apellido})}/>
     
      <FormInput inputStyle={myStyles.loginFormInputs} placeholderTextColor='#6289A3' placeholder="Email" onChangeText={(email) => this.setState({email})}/>

      <FormInput inputStyle={myStyles.loginFormInputs} placeholderTextColor='#6289A3' secureTextEntry placeholder="password" onChangeText={(password) => this.setState({password})} />
      
      <Text >{this.state.error}</Text>
      
      <Button
       buttonStyle={myStyles.buttonNew}
       title="Registrarse"
        onPress={() => {
           // this.ingresar();
        }}
      />
    </View>
  </View>
        );
     }
    }
    export default Register;