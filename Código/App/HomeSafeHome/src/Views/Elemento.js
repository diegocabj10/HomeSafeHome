import React, { Component } from 'react';
import { Text, View } from 'react-native';
import axios from 'axios';

class Elemento extends Component {
  constructor(props){
    super(props)
  }
  
  state = {
      datos: []
    };

  componentWillMount() {
    this.consultarId()
  }

  consultarId = () => {  
    axios.get(`http://proyectofinal2018.ddns.net:8080/api/${this.props.tipo}/${this.props.id}`).then(response => {
        if (response.data) {
          console.log(response.data);
          this.setState({
            datos: response.data,
            vacio: false
          })
        } else {
          this.setState({
            vacio: true,
            refreshing: false
          })
        }
      });
  }

  render(){
    if(this.props.tipo == 'Eventos'){
      return (
        <View>
          <Text>{this.props.tipo}</Text>
          <Text>_____________________</Text>
          <Text>Id: {this.state.datos.Id}</Text>
          <Text>Fecha: {this.state.datos.FechaEvento}</Text>
          <Text>Señal Id: {this.state.datos.IdSenial} - {this.state.datos.NombreSenial} 
          </Text>
          <Text>Dispositivo Id: {this.state.datos.IdDispositivo} - {this.state.datos.NombreDispositivo}
          </Text>
          <Text>Valor: {this.state.datos.Valor}</Text>
        </View>
      )
    }
    if(this.props.tipo == 'Avisos'){
      return (
        <View>
          <Text>{this.props.tipo}</Text>
          <Text>_____________________</Text>
          <Text>Id: {this.state.datos.Id}</Text>
          <Text>Fecha: {this.state.datos.FechaAviso}</Text>
          <Text>Título: {this.state.datos.Titulo}</Text>
          <Text>Mensaje: {this.state.datos.Mensaje}</Text>
        </View>
      )
    }
    if(this.props.tipo == 'Reclamos'){
      return (
        <View>
          <Text>{this.props.tipo}</Text>
          <Text>_____________________</Text>
          <Text>Id: {this.state.datos.Id}</Text>
          <Text>Fecha: {this.state.datos.FechaReclamo}</Text>
          <Text>Título: {this.state.datos.Titulo}</Text>
          <Text>Mensaje: {this.state.datos.Mensaje}</Text>
        </View>
      )
    }
    if(this.props.tipo == 'Usuarios'){
      return (
        <View>
          <Text>{this.props.tipo}</Text>
          <Text>Id: {this.state.datos.Id}</Text>
          <Text>Usuario: {this.state.datos.Nombre} {this.state.datos.Apellido}</Text>
          <Text>Email: {this.state.datos.Email}</Text>
          <Text>Perfil Id: {this.state.datos.IdPerfil}</Text>
        </View>
      )
    }
    return (
        <View>
            <Text>{this.props.tipo}: {this.props.id}</Text>
            <Text>Mostrar datos de {this.props.tipo}</Text>
        </View>
    )
  }
}

export default Elemento;