import { AsyncStorage } from "react-native";
import axios from 'axios';
import { parse } from "path-to-regexp";
//KEYS PARA AsyncStorage
export const FLAGLOGUEADO = "logueado";
export const EMAIL = "email";
export const PASSWORD = "password";
//export var logueado=false;
//export var datos='';


export const onSignOut = () => AsyncStorage.removeItem(FLAGLOGUEADO);

export const isSignedIn = () => {
  return new Promise((resolve, reject) => {
    AsyncStorage.getItem(FLAGLOGUEADO)
      .then(res => {
        if (res !== null) {
          resolve(true);
        } else {
          resolve(false);
        }
      })
      .catch(err => reject(err));
  });
};

/*
export const variable = '';

export const menuList = () => {
 
 _retrieveData().then(res => {
   return res}
 // return ( menuJSON.map(item => <Text>{item.Nombre.toLowerCase()}</Text> ))

}

_retrieveData = async () => {
  var load;
  try {
    const value = await AsyncStorage.getItem('menu');
    if (value !== null) {
      // We have data!!
      //return JSON.parse(value);
     return value;
    }
   } catch (error) {
     return {Error: 'Menu sin guardar'}
   }
}*/