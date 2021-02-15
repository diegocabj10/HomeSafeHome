import React,{ Component }  from "react";
import { View,ActivityIndicator } from "react-native";
import { Card, Button, FormLabel, FormInput, Text } from "react-native-elements";
import { Actions } from 'react-native-router-flux';
import { onSignInAuth } from "../Functions/auth";
import { AsyncStorage, Image, StatusBar } from "react-native";
import axios from 'axios';
import RenderIf from './RenderIf';
var myStyles = require('./Styles');
export const FLAGLOGUEADO = "logueado";
export const EMAIL = "email";
export const PASSWORD = "password";
export const MENU = "menu";
export const NOMBRE = "nombre";
export const IDUSUARIO = "idusuario";
export const NUEVOAVISO = "nuevoaviso";
export const NUEVORECLAMO = "nuevoreclamo";
export var logueado=false;
export var datos='';
const image = require('../assets/logoHomeSafeHome.png');

class Login extends Component{

    constructor(props) {
        super(props);
        this.state = {
        email : '',
        password : '',
        error: '',
        logueado: 'false',
        cargando:false
        }
        
    }   

    _onSignIn(emailPar , passwordPar) { 
         /*axios({
         method: 'post',
        url: `http://proyectofinal2018.ddns.net:8080/api/Utiles`,
        data: {
          email: emailPar,
          password: passwordPar,
          //other data key value pairs
        },
        config: {
          timeout: 5000
           }*/
           axios
           .post(`http://proyectofinal2018.ddns.net:8080/api/Utiles`, {
             email: emailPar,
             password: passwordPar,
             //other data key value pairs

       }).then(response => { 
          AsyncStorage.setItem(FLAGLOGUEADO, "true");
          var itemsMenu = "";
          var boolAviso='false';
          var boolReclamo='false';
          var nada='';

          response.data.Usuario.IdPerfiles.map(elemento =>  {
            switch(elemento)
            {
              case 1: boolAviso='true'; boolReclamo='true'; break;
              case 2: boolAviso='true'; break;
              case 3: boolReclamo='true'; break;
             // case 4: {if (boolAviso == 'false') boolAviso='false'; if (boolReclamo == 'false') boolReclamo='false'; break;}
             // case 5: {if (boolAviso == 'false') boolAviso='false'; if (boolReclamo == 'false') boolReclamo='false'; break;}
              default : nada=''; break;
            }  
          }
          );

         
          
          itemsMenu=JSON.stringify(response.data.Menu[0].Hijos);
          AsyncStorage.setItem(EMAIL, emailPar);
          AsyncStorage.setItem(PASSWORD, passwordPar);
          AsyncStorage.setItem(MENU, itemsMenu);
          AsyncStorage.setItem(NOMBRE, response.data.Usuario.PersonaNombre);
          AsyncStorage.setItem(IDUSUARIO, response.data.Usuario.Id);
          AsyncStorage.setItem(NUEVOAVISO, boolAviso);
          AsyncStorage.setItem(NUEVORECLAMO, boolReclamo);
          global.nombreUsuario= response.data.Usuario.PersonaNombre;
          global.idUsuario= response.data.Usuario.Id;
          global.menu= response.data.Menu[0].Hijos;
          global.nuevoaviso= boolAviso;
          global.nuevoreclamo= boolReclamo;
          logueado=true;        
          this.setState({cargando:false}); 
          this.setState( {error : itemsMenu});      
          Actions.inicio();         
        }).catch(error => {          
          logueado=false;
          datos=error.response.data.Message; 
          this.setState({cargando:false});       
          this.setState({error : datos});           
        });          
  }

    validar(){
      if (this.state.email != '' && this.state.password != ''){
        if (this.state.email.trim() != '' && this.state.password.trim() != ''){
            return true;
        }
      }
      return false;
    }

    ingresar(){   
      if (this.validar()){
      this.setState({cargando:true, error:''});        
      this._onSignIn(this.state.email.toLowerCase().trim(), this.state.password.toLowerCase().trim());   
    }else{
      this.setState({error: 'Ambos campos son obligatorios'});
    }         
    }

    render(){
        return (
  <View style={ myStyles.container}>
    <StatusBar
          backgroundColor={myStyles.container.backgroundColor}
          barStyle="light-content"
         />

    <View style={myStyles.loginLogoContainer}>
    <Image
            source={image}
            style={{ width: 164, height: 164 }}
          />
    </View>      

    <View style={myStyles.loginFormContainer}>
      
      <FormInput inputStyle={myStyles.loginFormInputs} placeholderTextColor='#6289A3' placeholder="email" onChangeText={(email) => this.setState({email})}/>
     
      <FormInput  inputStyle={myStyles.loginFormInputs} placeholderTextColor='#6289A3' secureTextEntry placeholder="password" onChangeText={(password) => this.setState({password})} />
      
      <Text style={myStyles.messageError} >{this.state.error}</Text>
      
      {RenderIf(this.state.cargando, <ActivityIndicator  size="small" color="#EBEBEB" /> )}
      
      
      <Button
        buttonStyle={myStyles.buttonSubmit}
        title="Ingresar"
        onPress={() => {
            this.ingresar();
        }}
      />

       <Button        
       buttonStyle={myStyles.buttonNew}
        title="Registrarse"
        onPress={() => {
            Actions.register();
        }}
      />
    </View>
  </View>
        );
     }
    }
    export default Login;