'use strict';
import {Dimensions} from 'react-native';
var React = require('react-native');
const window = Dimensions.get('window');
var {
  StyleSheet,
} = React;

module.exports = StyleSheet.create({
    navBar:{
        backgroundColor: '#2E4452',
    },
    navBarTitle: {
        color: '#EBEBEB',
        fontSize: 20
        },
    barButtonTextStyle: {
            color: 'red'
            },
    barButtonIconStyle: {
            tintColor: '#EBEBEB'
            },

    fondo: {
      backgroundColor: '#2E4452',
    }  ,  

    container: {
        flex: 1,
        backgroundColor: '#2E4452',
        justifyContent: 'center',
        alignItems: 'center',
      },

      loginLogoContainer: {
        
        paddingTop: 20,
        backgroundColor: '#2E4452',
      },   

      cardsInicio:{
        width: window.width*0.8,
        height: window.height*0.2,
        padding:20
      },
      cardsAgregar:{     
        padding:20
      },
      
      loginFormContainer: {
        //width: window.width*0.8,        
        backgroundColor: '#2E4452',
      },   

      loginFormInputs: {
        marginTop: 20 ,
        color:'#EBEBEB',
        textAlign: 'center',
        backgroundColor:'#3E5B6E',
        width: window.width*0.7, 
        borderRadius: 30 
      },   
      registerFormInputs: {
        marginTop: 20 ,
        color:'#EBEBEB',
        textAlign: 'center',
        backgroundColor:'#3E5B6E',
        width: window.width*0.7, 
        borderRadius: 30 
      },   
      buttonSubmit: {
        backgroundColor: '#3899C4',
        marginTop: 20,
        width: window.width*0.7,  
        borderRadius: 30 
      },
      buttonNew: {
        backgroundColor: '#47B840',
        marginTop: 20,
        width: window.width*0.7, 
        borderRadius: 30 
      },
      buttonAdd: {
        backgroundColor: '#2E4452',
        marginTop: 20,
        width: window.width*0.7,  
        borderRadius: 30 
      },
      buttonActivate: {
        backgroundColor: '#47B840',                
        borderRadius: 30,
       
      },
      buttonDesactivate: {
        backgroundColor: '#DC1625',                
        borderRadius: 30,
                
      },
      


      
    menu: {
        //flex: 1,
        width: window.width,
        height: window.height,
        backgroundColor: '#c2c5c7'
        //padding: 20,
      },
      avatarContainer: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
        height: window.height*0.2,
        padding: 20,
        backgroundColor: '#15232c',
          
      },
      titleContainerHSH: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',        
      },
      titleHSH: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#c2c5c7',      
        fontFamily: 'Roboto',
        paddingLeft: 10
      },

      menuItem: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      itemsContainer: {
        flex: 2,
        paddingLeft: 20,
        backgroundColor: '#c2c5c7'
      },
      avatar: {
        width: window.height*0.1,
        height: window.height*0.1,
        //resizeMode: 'contain',
        borderRadius: 24,
      },
      messageError:{
        fontSize: 12,
        paddingTop:20,
        color: '#DC1625',
        textAlign: 'center'
      },
      message:{
        fontSize: 12,
        paddingTop:20,
        color: '#009900',
        textAlign: 'center'
      },
      
      name: {
        marginLeft: 10,
        fontSize: 15,
        color: '#c2c5c7'
      },
      item: {
        fontSize: 15,
        marginLeft: 10
      },

});