import React, { Component } from 'react';
import {  View,ActivityIndicator,ScrollView } from 'react-native';
import axios from 'axios';
import { Card,Divider,Text } from 'react-native-elements';
import Actions from 'react-native-router-flux'; 

class Elemento extends Component {
  constructor(props){
    super(props)
  }
  
  state = {
      datos: null
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
    if (!this.state.datos) {
    return (
      <View>
        <Text>
          Cargando {this.props.entidad}...
        </Text>
        <ActivityIndicator size="large" color="#2E4452" />
      </View>
    );
  }

    if(this.props.tipo == 'Eventos'){
     
      return (
        <ScrollView style={{ backgroundColor: '#EBEBEB' }}>
          <Card title={this.state.datos.Titulo} containerStyle={{padding: 20 }} >          
          <Text style={{marginTop:10,fontWeight:'bold'}}>Mensaje: </Text>
          <Text style={{marginTop:10}}>{this.state.datos.Mensaje}</Text>
          <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
          <Text style={{marginTop:10,fontWeight:'bold'}}>Datos del Evento: </Text>
          <Text style={{marginTop:10}}>Id: {this.state.datos.Id}</Text>
          <Text >Fecha: {this.state.datos.FechaNotificacion.toString().replace('T','   ')}  </Text>    
          <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
          <Text style={{marginTop:10,fontWeight:'bold'}}>Datos del Dispositivo: </Text>
          <Text style={{marginTop:10}}>Dispositivo: {this.state.datos.NombreDispositivo}
          </Text>
          
          </Card>

        </ScrollView>
      )
    }
    if(this.props.tipo == 'Avisos'){
      return (
        <ScrollView style={{ backgroundColor: '#EBEBEB' }}>
          <Card title={this.state.datos.Titulo} containerStyle={{padding: 20 }} >          
          <Text style={{marginTop:10,fontWeight:'bold'}}>Mensaje: </Text>
          <Text style={{marginTop:10}}>{this.state.datos.Mensaje}</Text>
          <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
          <Text style={{marginTop:10,fontWeight:'bold'}}>Datos del Aviso: </Text>
          <Text style={{marginTop:10}}>Id: {this.state.datos.Id}</Text>
          <Text >Fecha: {this.state.datos.FechaAviso.toString().replace('T','   ')}  </Text>                       
          </Card>
        </ScrollView>
      )
    }
    if(this.props.tipo == 'Reclamos'){
      return (
        <ScrollView style={{ backgroundColor: '#EBEBEB' }}>
          <Card title={this.state.datos.Titulo} containerStyle={{padding: 20 }} >          
          <Text style={{marginTop:10,fontWeight:'bold'}}>Mensaje: </Text>
          <Text style={{marginTop:10}}>{this.state.datos.Mensaje}</Text>
          <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
          <Text style={{marginTop:10,fontWeight:'bold'}}>Datos del Reclamo: </Text>
          <Text style={{marginTop:10}}>Id: {this.state.datos.Id}</Text>
          <Text >Fecha: {this.state.datos.FechaReclamo.toString().replace('T','   ')}  </Text>                       
          </Card>

          <Card title={'Respuesta'} containerStyle={{padding: 20 }} >          
          <Text style={{marginTop:10,fontWeight:'bold'}}>El reclamo aún no ha sido contestado</Text>
          </Card>

        </ScrollView>
      )
    }
    if(this.props.tipo == 'Contactos'){
      return (
        <ScrollView>
          <Card title="Datos del Contacto"containerStyle={{padding: 20 }} >
          <Text style={{marginTop:10,fontWeight:'bold'}}>Datos del Contacto: </Text>
          <Text style={{marginTop:10}}>Id: {this.state.datos.Id}</Text>
          <Text>Fecha: {this.state.datos.FechaInicio}  </Text> 
          <Text>Usuario: {this.state.datos.PersonaNombre}</Text>
          <Text>Email: {this.state.datos.Email}  </Text>
          </Card>

        </ScrollView>
      )
    }
    if(this.props.tipo == 'Dispositivos'){
      return (
        <ScrollView>
          <Card title="Datos del Dispositivo"containerStyle={{padding: 20 }} >
          <Text style={{marginTop:10,fontWeight:'bold'}}>Datos del Dispositivo: </Text>
          <Text style={{marginTop:10}}>Id: {this.state.datos.Id}</Text>
          <Text>Fecha de Alta: {this.state.datos.FechaInicio}  </Text> 
          <Text>Nombre: {this.state.datos.Nombre}</Text>
          <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
          <Card title="Alarma de Intrusiones"containerStyle={{padding: 20 }} >
            <Text>Alarma Activada: {this.state.datos.Activo}</Text>
            <Text>Última vez Activada: {this.state.datos.FechaAfueraCasa}</Text>
          </Card>
          </Card>

        </ScrollView>
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