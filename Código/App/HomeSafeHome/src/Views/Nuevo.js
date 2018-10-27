import React, { Component } from 'react';
import {  View, TextInput,  ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card,Divider,Text, Button } from 'react-native-elements';
import RenderIf from './RenderIf';
var myStyles = require('./Styles');

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
      error: null,
      cargando: false
    };

  validar = () => {
    var error = '';
    if(!this.state.titulo){ error += "Ingresar Título\n"; }
    if(!this.state.mensaje){ error += "Ingresar Mensaje"}
    if(error == ''){
      this.setState({cargando:true});
      this.guardar();
    }
    else{
      this.setState({error: error})
    }
  }

  guardar = () => {
    axios.post(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}`, {
        id: 0,
        idUsuario: global.idUsuario,
        Titulo: this.state.titulo.trim(),
        Mensaje: this.state.mensaje.trim()
  }).then(response => { 
    if (response.status == 201){
      this.setState({message: this.props.entidad.toString().slice(0,-1) + ' creado correctamente',error : '',cargando:false,titulo:'',mensaje:''});    
    }      
   });
  }

  render(){
    if(this.props.entidad == 'Avisos' || this.props.entidad == 'Reclamos'){
      return(
        <ScrollView>
          <Card title='Complete los datos'containerStyle={{padding: 20 }} >
      
          <TextInput placeholder="Título" value={this.state.titulo}
           onChangeText={(texto) => this.setState({titulo: texto}) } />
           <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
          <TextInput placeholder="Mensaje" value={this.state.mensaje}
          style={{marginTop:10 }}
           onChangeText={(texto) => this.setState({mensaje: texto}) } />
           <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
                
          {RenderIf(this.state.cargando, <ActivityIndicator  size="small" color="#2E4452" style={{ marginTop:10}} /> )}
          {RenderIf(this.state.error != '', <Text style={myStyles.messageError} >{this.state.error}</Text> )}
          {RenderIf(this.state.message != '', <Text style={myStyles.message} >{this.state.message}</Text> )}
          <Button title="Guardar" onPress={() => this.validar()} buttonStyle={myStyles.buttonAdd}/>
          
          </Card>
        </ScrollView>
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