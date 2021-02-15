import React, { Component } from 'react';
import { Text, View, Button } from 'react-native';
import axios from 'axios';
import { Actions } from 'react-native-router-flux';

class Inicio extends Component {
    render(){
        return (
            <View>
              <Button 
              onPress={() => Actions.lista({entidad: 'Eventos', clave: 'lista', titulo: 'Lista de Eventos'})} 
              title='Eventos' />
              <Button 
              onPress={() => Actions.lista({entidad: 'Avisos', clave: 'lista', titulo: 'Lista de Avisos'})}  
               title='Avisos' />
              <Button 
              onPress={() => Actions.lista({entidad: 'Reclamos', clave: 'lista', titulo: 'Lista de Reclamos'})}
               title='Reclamos' />
              <Button 
              onPress={() => Actions.lista({entidad: 'Usuarios', clave: 'lista', titulo: 'Lista de Usuarios'})}
               title='Usuarios' />
               <Button 
              onPress={() => Actions.lista({entidad: 'Contactos', clave: 'lista', titulo: 'Lista de Contactos'})}
               title='Contactos' />
            </View>
        );
    }
}

export default Inicio;