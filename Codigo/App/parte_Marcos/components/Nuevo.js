import React, { Component } from 'react';
import { Text, View, TextInput, Button, ActivityIndicator } from 'react-native';
import axios from 'axios';

class Nuevo extends Component {
  constructor(props){
    super(props)
  }
  
  state = {
      datos: [],
      id: 0,
      titulo: null,
      mensaje: null,
      message: null,
      error: null
    };

  validar = () => {
    var error = '';
    if(!this.state.titulo){ error += "Ingresar Título\n"; }
    if(!this.state.mensaje){ error += "Ingresar Mensaje"}
    if(error == ''){
      this.guardar()
    }
    else{
      this.setState({message: error})
    }
  }

  guardar = () => {
    axios.post(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}`, {
        id: 0,
        Titulo: this.state.titulo,
        Mensaje: this.state.mensaje
  }).then(response => { 
    if (response.status == 201){
      this.setState({message: this.props.entidad + ' creado correctamente',error : ''});
      //this.setState({error : ''});        
    }      
   });
  }

  render(){
    if(this.props.entidad == 'Avisos' || this.props.entidad == 'Reclamos'){
      return(
        <View>
          <Text>Nuevo {this.props.entidad} </Text>
          <TextInput placeholder="Título"
           onChangeText={(texto) => this.setState({titulo: texto.trim()}) } />
          <TextInput placeholder="Mensaje"
           onChangeText={(texto) => this.setState({mensaje: texto.trim()}) } />
          <Button title="Guardar" onPress={() => this.validar()}/>
          <Text>{this.state.message}</Text>
        </View>
      );
    }
    return(
      <View>
        <Text>Nuevo {this.props.entidad} </Text>
      </View>
    );
  }

}

export default Nuevo;