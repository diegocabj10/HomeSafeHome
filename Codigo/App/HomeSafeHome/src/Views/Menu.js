import React from 'react';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import ItemMenu from './ItemMenu';
import {
  Dimensions,
  StyleSheet,
  ScrollView,
  View,
  Image,
  Text,
  AsyncStorage,
  TouchableOpacity,
  
} from 'react-native';

const window = Dimensions.get('window');
const uri = 'HOMESAFEHOME/src/assets/avatar.png';

const styles = StyleSheet.create({
  menu: {
    //flex: 1,
    width: window.width,
    height: window.height,
    backgroundColor: '#EBEBEB'
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
    backgroundColor: '#EBEBEB'
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

export default function Menu({ onItemSelected, items, nombre }) {
 
  return (
    <ScrollView scrollsToTop={false} style={styles.menu}>
      <View style={styles.avatarContainer}>
        <Image
          style={styles.avatar}
          source={require('../assets/avatar.png')}
        />    
        <Text style={styles.name}>{nombre}</Text>
      </View>

      <View style={styles.itemsContainer}>
         
      
      {renderItems(items)}
      </View>
     

    </ScrollView>
  );
}

export function renderItems(items){
  if (!items) return null;
  return (
    items.map(item =>
      <ItemMenu key={item.Nombre} name={item.Nombre.toLowerCase()} />      
    )
  );
}

/*
export function _retrieveData(){
  try {
    AsyncStorage.getItem('email')
      .then(value => {
        return (<Text> sd{value} </Text>);
      }
    ).catch(err => {
      return (<Text> qwe{err} </Text>);
    });}
    catch (error) {
      return (<Text> 1{error} </Text>);
   }
}*/

Menu.propTypes = {
  onItemSelected: PropTypes.func.isRequired,
};