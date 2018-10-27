import { AsyncStorage } from "react-native";
import axios from 'axios';
import { parse } from "path-to-regexp";
//KEYS PARA AsyncStorage
export const FLAGLOGUEADO = "logueado";
export const EMAIL = "email";
export const PASSWORD = "password";
export const MENU = "menu";
export const NOMBRE = "nombre";
export const IDUSUARIO = "idusuario";
export var logueado=false;
export var datos='';

export const onSignOut = () => {
    AsyncStorage.removeItem(FLAGLOGUEADO);
    AsyncStorage.removeItem(MENU);
    AsyncStorage.removeItem(IDUSUARIO);
}

export const isSignedIn = () => {
    return new Promise((resolve, reject) => {
      AsyncStorage.getItem(FLAGLOGUEADO)
        .then(res => {
          if (res !== null) {
            _retrieveData();  
            _retrieveDataIdUsuario();
            _retrieveDataNombreUsuario();
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch(err => reject(err));
    });
  };

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem(MENU);
      if (value !== null) {
        // We have data!!
        
        global.menu=JSON.parse(value);
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  _retrieveDataIdUsuario = async () => {
    try {
      const value = await AsyncStorage.getItem(IDUSUARIO);
      if (value !== null) {
        // We have data!!
        global.idUsuario= value;        
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  _retrieveDataNombreUsuario = async () => {
    try {
      const value = await AsyncStorage.getItem(NOMBRE);
      if (value !== null) {
        // We have data!!
        global.nombreUsuario= value;
      }
     } catch (error) {
       // Error retrieving data
     }
  }