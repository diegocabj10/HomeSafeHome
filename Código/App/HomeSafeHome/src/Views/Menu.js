import React from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'HOMESAFEHOME/src/assets/avatar.png';

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

export default function Menu({ onItemSelected }) {

  
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../assets/avatar.png')}
        />
        <Text style={styles.name}>Franco Luna</Text>
      </View>

      <View style={styles.itemsContainer}>
          <View style={styles.menuItem} >
              <Image
                  onPress={() => onItemSelected('Eventos')}
                  style={{height:30, width:30}}
                  source={require('../assets/eventos.png')}
                />
              <Text
                onPress={() => onItemSelected('Eventos')}
                style={styles.item}
              >
                Eventos
              </Text>
          </View>

      <View style={styles.menuItem} >
              <Image
                  onPress={() => onItemSelected('Notificaciones')}
                  style={{height:30, width:30}}
                  source={require('../assets/notificaciones.png')}
                />
              <Text
                onPress={() => onItemSelected('Notificaciones')}
                style={styles.item}
              >
                Notificaciones
              </Text>
          </View>

       <View style={styles.menuItem} >
              <Image
                  onPress={() => onItemSelected('Reclamos')}
                  style={{height:30, width:30}}
                  source={require('../assets/reclamos.png')}
                />
              <Text
                onPress={() => onItemSelected('Reclamos')}
                style={styles.item}
              >
                Reclamos
              </Text>
          </View>

         <View style={styles.menuItem} >
              <Image
                  onPress={() => onItemSelected('Contactos')}
                  style={{height:30, width:30}}
                  source={require('../assets/contactos.png')}
                />
              <Text
                onPress={() => onItemSelected('Contactos')}
                style={styles.item}
              >
                Contactos
              </Text>
          </View>

         <View style={styles.menuItem} >
              <Image
                  onPress={() => onItemSelected('Configuracion')}
                  style={{height:30, width:30}}
                  source={require('../assets/configuracion.png')}
                />
              <Text
                onPress={() => onItemSelected('Configuracion')}
                style={styles.item}
              >
                Configuración
              </Text>
          </View>    


      <Text
        onPress={() => onItemSelected('Vista1')}
        style={styles.item}
      >
        Cambio de vista
      </Text>
      </View>
     

    </ScrollView>
  );
}

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};