/** @format */

import React, {Component} from 'react';
import {AppRegistry} from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Login from './src/Views/Login';
import Eventos from './src/Views/Eventos';
import Register from './src/Views/Register';
import Configuracion from './src/Views/Configuracion';
import Notificaciones from './src/Views/Notificaciones';
import Contactos from './src/Views/Contactos';
import Reclamos from './src/Views/Reclamos';
import Initial from './src/Views/Initial';
import Splash from './src/Views/Splash';
import {name as appName} from './app.json';
import { AsyncStorage } from "react-native";
import { isSignedIn } from "./src/Functions/auth";
export const FLAGLOGUEADO = "logueado";
var myStyles = require('./src/Views/Styles');

class Index extends Component{
state = {
    logged: false,
    loading: true
};
constructor(props, context) {
    super(props, context);
    this.state = {
      logged: false,
      loading: true,
    };
  };

  componentWillMount(){
    self = this;   
    AsyncStorage.getItem(FLAGLOGUEADO)
    .then( (value) =>{
        if (value != null){
          this.setState({
            logged: true,
            loading: false,
          });
        } else{
          this.setState({
            loading: false,
          })
        }
      }
    );
  };

  render (){
    return (

        <Router 
        navigationBarStyle={myStyles.navBar}
        titleStyle={myStyles.navBarTitle}
        barButtonTextStyle={myStyles.barButtonTextStyle}
        barButtonIconStyle={myStyles.barButtonIconStyle}
        tintColor='white'
        headerBackTitle={'Tilbage'}
        >
        <Stack key="root">
          <Scene key="login" component={Login} title="Ingreso" hideNavBar={true} initial={!this.state.logged} type='reset' /> 
         {// <Scene key="splash" component={Splash} hideNavBar={true} initial={this.state.loading} type='reset' /> 
         }
          <Scene key="register" component={Register} title="Registro" back  /> 
          <Scene key="configuracion" component={Configuracion} title="Configuracion"  back />
          <Scene key="eventos" component={Eventos} title="Eventos"  back />  
          <Scene key="contactos" component={Contactos} title="Contactos"  back />
          <Scene key="reclamos" component={Reclamos} title="Reclamos"  back />
          <Scene key="notificaciones" component={Notificaciones} title="Notificaciones"  back />
          <Scene key="inicio" component={Initial} title="Inicio" initial={this.state.logged} hideNavBar={true} type='reset'/>  
        </Stack>
        
      </Router>

    )
  }
}
//const App = () => ();

AppRegistry.registerComponent(appName, () => Index);