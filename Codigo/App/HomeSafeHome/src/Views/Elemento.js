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
        <ScrollView style={{ backgroundColor: '#EBEBEB' }}>
          <Card title={"Datos del Contacto".toUpperCase()} containerStyle={{padding: 20 }} >
          <View style={{flex:1, flexDirection:'row'}}>
          <Text style={{marginTop:10,fontWeight:'bold'}}>Id: </Text>
          <Text style={{marginTop:10}}> {this.state.datos.Id} </Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
          <Text style={{marginTop:10,fontWeight:'bold'}}>Fecha Alta:</Text> 
          <Text style={{marginTop:10}}> {(this.state.datos.FechaInicio != null) ?  this.state.datos.FechaInicio.toString().replace('T','   ') : 'Sin cargar'} </Text>
          </View>
         <View style={{flex:1, flexDirection:'row'}}>
          <Text style={{marginTop:10,fontWeight:'bold'}}>Usuario: </Text>
          <Text style={{marginTop:10}}> {this.state.datos.PersonaNombre} </Text>
          </View>
          <View style={{flex:1, flexDirection:'row'}}>
          <Text style={{marginTop:10,fontWeight:'bold'}}>Email:  </Text>
          <Text style={{marginTop:10}}> {this.state.datos.Email}   </Text>
          </View>
          </Card>

        </ScrollView>
      )
    }
    if(this.props.tipo == 'Dispositivos'){
      return (
        <ScrollView style={{ backgroundColor: '#EBEBEB' }}>
              <Card title={"Datos del Dispositivo".toUpperCase()} containerStyle={{padding: 20 }} >
              <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{marginTop:10,fontWeight:'bold'}}>Id: </Text>
              <Text style={{marginTop:10}}> {this.state.datos.Id} </Text>
              </View>
              <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{marginTop:10,fontWeight:'bold'}}>Fecha de Alta: </Text> 
              <Text style={{marginTop:10}}> {(this.state.datos.FechaInicio != null) ?  this.state.datos.FechaInicio.toString().replace('T','   ') : 'Sin cargar'}</Text>
              </View>
              <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{marginTop:10,fontWeight:'bold'}}>Nombre: </Text>
              <Text style={{marginTop:10}}> {this.state.datos.Nombre} </Text>
              </View>
              <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />              
              <Text style={{marginTop:10,fontWeight:'bold',textAlign:'center'}}>Alarma de Intrusiones </Text>
              
              <View style={{flex:1, flexDirection:'row'}}>
              <Text style={{marginTop:10,fontWeight:'bold'}}>Alarma Activada: </Text>
              <Text style={{marginTop:10}}> {this.state.datos.Activo}  </Text> 
              </View>
              <View style={{flex:1, flexDirection:'row'}}>      
              <Text style={{marginTop:10,fontWeight:'bold'}}>Última vez Activada: </Text>
             <Text style={{marginTop:10}}> {(this.state.datos.FechaAfueraCasa != null) ?  this.state.datos.FechaAfueraCasa.toString().replace('T','   ') : 'Sin cargar'}   </Text>
             </View>
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