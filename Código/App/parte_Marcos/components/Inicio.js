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
              onPress={() => Actions.lista({entidad: 'Notificaciones', clave: 'lista', titulo: 'Lista de Notificaciones'})}  
               title='Notificaciones' />
              <Button 
              onPress={() => Actions.lista({entidad: 'Reclamos', clave: 'lista', titulo: 'Lista de Reclamos'})}
               title='Reclamos' />
            </View>
        );
    }
}

export default Inicio;