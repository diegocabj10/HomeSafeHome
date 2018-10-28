import React from 'react';
import { View, Text, Image, StyleSheet,  TouchableOpacity, } from 'react-native';
import { Actions } from 'react-native-router-flux';

const iconos = {
  'inicio': require('../assets/inicio.png'),
  'eventos': require('../assets/eventos.png'),
  'avisos': require('../assets/avisos.png'),
  'reclamos': require('../assets/reclamos.png'),
  'contactos': require('../assets/contactos.png'),
  'configuracion': require('../assets/configuracion.png'),
  'dispositivos': require('../assets/dispositivos.png'),
};

const ItemMenu = ({name}) => {
     
    return (
      <TouchableOpacity onPress={() => Actions[name].call()}>
      <View style={styles.menuItem}>
      
      <Image                  
                  style={{height:30, width:30}}
                  source={iconos[name]}
                />
       <Text style={styles.item} > 
                {name[0].toUpperCase()+name.substr(1)}
              </Text>
      

      </View>
      </TouchableOpacity>    
    );
  };

  const styles = StyleSheet.create({
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
  export default ItemMenu;