import React, { Component } from 'react';
import {  View, TextInput,  ActivityIndicator, ScrollView } from 'react-native';
import axios from 'axios';
import { Card,Divider,Text,Icon,Button } from 'react-native-elements';
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
      cargando: false,
      parametroBusqueda: '',
    nombreBuscado: '',
    idBuscado: '',
    messageContacto: '',
    mensaje: '',
    error: '',
    idUsuario:global.idUsuario
    };

  validar = () => {
    var error = '';
    if(!this.state.titulo){ error += "Ingresar Título\n"; }
    if(!this.state.mensaje){ error += "Ingresar Mensaje"}
    if(error == ''){
      this.setState({cargando:true});
      this.guardarMensaje();
    }
    else{
      this.setState({error: error})
    }
  }

  guardarMensaje = () => {
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

  guardarContacto = () => {
    if(this.state.guardar){
  
      axios.post(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}`, {
          id: 0,
          idDuenio: this.state.idUsuario,
          idContacto: this.state.idBuscado
      }).then(response => { 
        if (response.status == 201){
          this.setState({mensaje: this.props.entidad.slice(0,-1) + ' agregado',error : ''});              
        }      
      });
      //this.makeRemoteRequest();
      }
    else{
      this.setState({mensaje: '' , error: 'No se puede agregar el contacto'});
      
    }
  }

  buscarUsuario = () => {
      
      axios.get(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}?email=${this.state.parametroBusqueda}`)
      .then(response => {
        
        if(response.status) {
        
          this.setState({
            idBuscado: response.data.Lista[0].Id,
            descripcionBuscado: response.data.Lista[0].PersonaNombre,
            mensaje: 'El usuario si existe',
            error: '',
            guardar: true
          });

        } 
      })
      .catch(resp => {
        this.setState({
          refreshing: false,
          error: 'El usuario no existe',
          mensaje: '',
          guardar: false
        });
      });
          
  }

  
  guardarDispositivo = () => {
    if(this.state.guardar){
  
      axios.post(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}`, {
          id: 0,
          idUsuario: this.state.idUsuario,
          IdDispositivo: this.state.idBuscado
      }).then(response => { 
        if (response.status == 201){
          this.setState({mensaje: this.props.entidad.slice(0,-1) + ' agregado',error : ''});              
        }      
      });
      //this.makeRemoteRequest();
      }
    else{
      this.setState({mensaje: '' , error: 'No se puede agregar el dispositivo'});
      
    }
  }


  buscarDispositivo = () => {
      
    axios.get(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}?numeroPagina=1&descripcion=${this.state.parametroBusqueda}`)
    .then(response => {
      
      if(response.status) {
        
        this.setState({
          idBuscado: response.data.Lista[0].Id,
          descripcionBuscado: response.data.Lista[0].Nombre,
          mensaje: 'El dispositivo si existe',
          error: '',
          guardar: true
        });

      } 
    })
    .catch( () => {
      this.setState({
        refreshing: false,
        error: 'El dispositivo no existe',
        mensaje: '',
        guardar: false
      });
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
          <Button title="Guardar"  onPress={() => this.validar()} buttonStyle={myStyles.buttonAdd}/>
          
          </Card>
          
        </ScrollView>
      );
    }
    if(this.props.entidad == 'Contactos' || this.props.entidad == 'Dispositivos'){
      return(
        <ScrollView>
           <Card title={'Agregar '+this.props.entidad.toString().slice(0,-1).toLowerCase()} containerStyle={myStyles.cardsAgregar}>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
          {RenderIf(this.props.entidad == "Dispositivos",  <TextInput placeholder="Descripción" value={this.state.parametroBusqueda} 
           onChangeText={(texto) => this.setState({parametroBusqueda: texto}) } />)}
             {RenderIf(this.props.entidad == "Contactos",  <TextInput placeholder="Email" value={this.state.parametroBusqueda} 
           onChangeText={(texto) => this.setState({parametroBusqueda: texto}) } />)}
          {RenderIf(this.props.entidad == "Contactos", 
           <Icon
        reverse
        name='search'
        color='#2E4452'
        size={14}
        onPress= {() => this.buscarUsuario()}
        />)}
        {RenderIf(this.props.entidad == "Dispositivos", 
           <Icon
        reverse
        name='search'
        color='#2E4452'
        size={14}
        onPress= {() => this.buscarDispositivo()}
        />)}


          </View>
          <Divider style={{ backgroundColor: '#EBEBEB',marginTop:10 }} />
          <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>         
           <Text style={{marginTop:10,fontWeight:'bold'}}>{this.state.descripcionBuscado}</Text>
           {RenderIf(this.props.entidad == "Contactos", 
           <Icon
        reverse
        name='add'
        color='#2E4452'
        size={14}
        onPress= {() => this.guardarContacto()}
        />)}
         {RenderIf(this.props.entidad == "Dispositivos", 
           <Icon
        reverse
        name='add'
        color='#2E4452'
        size={14}
        onPress= {() => this.guardarDispositivo()}
        />)}
           </View>
    {RenderIf(this.state.mensaje != '', <Text style={myStyles.message}>{this.state.mensaje}</Text> )}
    
    {RenderIf(this.state.error != '', <Text style={myStyles.messageError}>{this.state.error}</Text> )}
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