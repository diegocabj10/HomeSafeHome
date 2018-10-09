import React,{ Component }  from "react";
import { View, TextInput } from "react-native";
import { Card, Button, FormLabel, FormInput, Text } from "react-native-elements";
//import ValidationComponent from 'react-native-form-validator';
//import ValidateTextInput from "react-native-validate-textinput";
import {NavigationBar} from 'react-native-navbar-color'
var myStyles = require('./Styles');
import RenderIf from './RenderIf' 
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
        password2: '',
        error: 'Complete todos los campos',
        message: ''
        };
        //this.state = {nombre : "My name",apellido : "My name", email: "tibtib@gmail.com", password:"1234", password2:"1234"}
      
    }   

    /*
    validarCampo = (campo,valor) => {
        if (valor === '') this.setState({error: 'El campo '+campo+' es obligatorio'})
    }

    onEndEditing={this.validarCampo('Nombre',this.state.nombre)}
    */

   _onSignUp(nombrePar , apellidoPar, emailPar , passwordPar) { 
   
      axios
      .post(`http://proyectofinal2018.ddns.net:8080/api/Usuarios`, {
        id: 0,
        nombre: nombrePar,
        apellido: apellidoPar,
        email: emailPar,
        password: passwordPar,
        //other data key value pairs

  }).then(response => { 
    if (response.status == 201){
      this.setState({message: 'Usuario creado correctamente',error : ''});
      //this.setState({error : ''});  
      
    }      
   }).catch(error => {          
     logueado=false;
     datos=error.response.data.Message;          
     this.setState({error : datos, message: ''});           
   });          
}

registrar(){        
  //this._onSignUp(this.state.nombre, this.state.apellido, this.state.email, this.state.password);    
  var a;
  a=this.validar();
  if (a == ''){
    this._onSignUp(this.state.nombre, this.state.apellido, this.state.email, this.state.password); 
  }else{
     this.setState({error: a, message: ''});
  }
 
 }
 
  validar = () => {
   var errores = '';
   if (this.state.nombre == '') {errores+=`El campo nombre es obligatorio\n`;out=false;}
    if (this.state.apellido == '') {errores+=`El campo apellido es obligatorio\n`;out=false;}
     if (this.state.email == '') {errores+=`El campo email es obligatorio\n`;out=false;}
      if (this.state.password == '') {errores+=`El campo password es obligatorio\n`;out=false;}
      if (this.state.password != this.state.password2) {errores+=`La password no coincide\n`;out=false;}
      //this.setState({error: errores});
   return errores;
 };
   
    

    render(){
      
        return (
  <View style={ myStyles.container}>
    <View style={myStyles.loginFormContainer}>
               
      <FormInput ref="nombre" inputStyle={myStyles.registerFormInputs} placeholderTextColor='#6289A3' placeholder="Nombre"   onChangeText={(varia) => this.setState({nombre: varia.trim()})} />

      <FormInput ref="apellido" inputStyle={myStyles.registerFormInputs} placeholderTextColor='#6289A3' placeholder="Apellido" onChangeText={(varia) => this.setState({apellido: varia})} />
     
      <FormInput ref="email" inputStyle={myStyles.registerFormInputs} placeholderTextColor='#6289A3' placeholder="Email" onChangeText={(varia) => this.setState({email: varia})} />

      <FormInput ref="password" inputStyle={myStyles.registerFormInputs} placeholderTextColor='#6289A3' secureTextEntry placeholder="Password" onChangeText={(varia) => this.setState({password: varia})} />

      <FormInput ref="password2" inputStyle={myStyles.registerFormInputs} placeholderTextColor='#6289A3' secureTextEntry placeholder="Repita la password" onChangeText={(varia) => this.setState({password2: varia})}  />

      {RenderIf(this.state.error != '',
      <Text style={myStyles.messageError} >{this.state.error}</Text>
        )}
      {RenderIf(this.state.message != '',
      <Text style={myStyles.message} >{this.state.message}</Text>
      )}

      <Button
       buttonStyle={myStyles.buttonNew}
       title="Registrarse"
       disabled={false}
       onPress={() => {
        this.registrar();
    }}
      />
    </View>
  </View>
        );
     }
    }
    export default Register;