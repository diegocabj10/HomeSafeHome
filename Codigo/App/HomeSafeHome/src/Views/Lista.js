import React, { Component } from 'react';
import { FlatList, ScrollView, View, Picker, Button, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Fila from './Fila';
import { Card,Divider,Text,Icon } from 'react-native-elements';
import RenderIf from './RenderIf'

import { Actions } from 'react-native-router-flux';
var myStyles = require('./Styles');
class Lista extends Component {
  constructor(props){
    super(props);
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
  }
  
  state = {
    idUsuario:global.idUsuario,
    listaElementos: null,
    entidad: '',
    vacio: false,
    refreshing: false,
    registros: 1,
    pagina: 1,
    ultima: 1,
    parametroBusqueda: '',
    nombreBuscado: '',
    idBuscado: '',
    messageContacto: '',
    mensaje: '',
    error: ''
  };
  

  componentWillMount() {
    this.makeRemoteRequest();
 
  }

  componentWillFocus() {
    this.makeRemoteRequest()
  }
 

  
  makeRemoteRequest = () => {  
  axios.get(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}?numeroPagina=${this.state.pagina}&IdUsuario=${this.state.idUsuario}`)
  .then(response => {     
  if (response.data.Lista && response.data.TotalRegistrosListado) {
          this.setState({
            listaElementos: response.data.Lista,
            vacio: false,
            refreshing: false,
            registros: response.data.TotalRegistrosListado,
            ultima: Math.ceil(response.data.TotalRegistrosListado / 10)
          });
        }
      }
   )
   .catch(err => {
    this.setState({
      //photoset: null,
      vacio: true,
      refreshing: false
    });
   })
  }
    
  

  handleRefreshing = () => {
    this.setState({
      refreshing: true
    },
      () => {
        this.makeRemoteRequest();
      }
    );
  }
  
  consultarPagina = (x) => {
    if(x>0 && x<=this.state.ultima && x != this.state.pagina){
      this.setState ({pagina: x});
      this.handleRefreshing();
    }
  };

  comprobarTexto = (x) => {
    if(!isNaN(x)){
      this.consultarPagina(x);
    }
  };
  
  renderPaginador = () => {
    return (
      <View>
        
        <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
      }}>
        <Icon
        reverse
        name='first-page'
        color='#2E4452'
        size={18}
        onPress={() => this.consultarPagina(1)} 
        />

        <Icon
        reverse
        name='navigate-before'
        color='#2E4452'
        size={18}
        onPress={() => this.consultarPagina(this.state.pagina - 1)}
         />


        <Icon
        reverse
        name='navigate-next'
        color='#2E4452'
        size={18} 
        onPress={() => this.consultarPagina(this.state.pagina + 1)}
        />

        <Icon
        reverse
        name='last-page'
        color='#2E4452'
        size={18}
        onPress={() => this.consultarPagina(this.state.ultima)}
        />
        {this.verBotones()}
         </View>

          <View style={{
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 10
      }}>
                
                  <Text>
                    Total de {this.props.entidad}: {this.state.registros}
                    </Text>
                    <Text>
                    Total de pág.: {this.state.ultima}           
                  </Text>
                  <Text>
                  Página actual:{this.state.pagina}
                  </Text>
                
        </View>
      </View>
      
    );
  };

  verBotones = () => {
    if(this.props.entidad != 'Eventos'  ){
      if ((this.props.entidad == 'Contactos') || (this.props.entidad == 'Dispositivos') || (this.props.entidad == 'Reclamos' && global.nuevoreclamo == 'true') || (this.props.entidad == 'Avisos' && global.nuevoaviso  == 'true')){
      return (
      <Icon
      reverse
      name='add'
      color='#2E4452'
      size={18}
      onPress={() => Actions.nuevo({entidad: this.props.entidad, title:'Nuevo '+this.props.entidad.toString().slice(0,-1).toLowerCase()})}
      />   );  
     }
    }
    return null;
  }



  cargarDatos = (item) => {
    if(this.props.entidad == 'Eventos'){
      return (
        <View  key={item.Id}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>         
                <Text key={item.Id}>
                  ID Evento: {item.Id} 
                </Text>
            </View>         
            <View style={{flex: 1}}>       
                <Text style={styles.textDerecha}>
                    {item.FechaNotificacion.toString().replace('T',' ')}
                </Text>
            </View> 
          </View> 
          <View  key={item.Id} style={{flex: 1,flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <Text  key={item.IdDispositivo}>
                  Título: {item.Titulo}
                </Text>
            </View>
            <View style={{flex: 1}}>
                <Text  style={styles.textDerecha} key={item.IdDispositivo}>
                  Dispositivo: {item.NombreDispositivo} 
                </Text>
            </View>
          </View>
        </View> 
      );
    }
    if(this.props.entidad == 'Reclamos' || this.props.entidad == 'Avisos'){
      var fecha = item.FechaReclamo
      if(this.props.entidad == 'Avisos'){
        fecha = item.FechaAviso
      }
      return (
        <View  key={item.Id}>
          <View style={{flex: 1, flexDirection: 'row'}}>
            <View style={{flex: 1}}>         
                <Text key={item.Id}>
                  ID: {item.Id} 
                </Text>
            </View>         
            <View style={{flex: 1}}>       
                <Text style={styles.textDerecha}>
                    {fecha.toString().replace('T',' ')}
                </Text>
            </View> 
          </View> 
          <View  key={item.Id} style={{flex: 1,flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <Text  key={item.Id} style={styles.textCentro}>
                  Título: {item.Titulo}
                </Text>
            </View>
           
          </View>
        </View> 
      );
    }
    if(this.props.entidad == 'Contactos'){
      return (
        <View  key={item.Id}>  
          <View key={item.Id} style={{flex: 1,flexDirection: 'row'}}>
          <View style={{flex: 1}}>         
                  <Text key={item.Id}>
                    ID Contacto: {item.Id} 
                  </Text>
              </View>   
              <View style={{flex: 1}}>       
                  <Text style={styles.textDerecha}>
                  {(item.FechaInicio != null) ?  item.FechaInicio.toString().replace('T','   ') : 'Sin cargar'}                    
                  </Text>
              </View>     
          
          </View>

            <View  key={item.Id} style={{flex: 1,flexDirection: 'row'}}>
            <View style={{flex: 1}}>
                <Text style={styles.textCentro}>
                  Nombre: {item.PersonaNombre}
                </Text>
            </View>
            </View>
        </View>        
      );
    }

    if(this.props.entidad == 'Dispositivos'){
      return (
        <View key={item.Id} style={{flex: 1,flexDirection: 'row'}}>
          <Text key={item.Id}>
            {item.Id} - {item.FechaInicio}
          </Text>
          <Text key={item.Id} >
            {item.Nombre}
          </Text>
        </View>
      );
    }
  };

  render() {    
    if (this.state.vacio) {
      return (
        <View  style={{flex: 1, flexDirection: 'row'}}>
          <View>
          <Text style={{marginTop:10,marginLeft:10,fontWeight:'bold',textAlign:'center'}}>
            No hay {this.props.entidad.toLowerCase()}

					</Text>
          </View>
          <View style={{position: 'absolute', right: 0}}>
          {this.verBotones()}
            </View>
        </View>
      );
    }

    if (!this.state.listaElementos && !this.state.vacio) {
      return (
        <View>
          <Text>
            Cargando {this.props.entidad}...
					</Text>
          <ActivityIndicator size="large" color="#2E4452" />
        </View>
      );
    }


    return (
      <View>
       
          <FlatList
            keyExtractor={item => item.Id}
            data={this.state.listaElementos}
            renderItem={({ item}) => (
            
              <Fila key={item.Id} contenido={ this.cargarDatos(item) } filaId={item.Id} entidad={this.props.entidad} />
            )}
            
            onRefresh={this.handleRefreshing}
            refreshing={this.state.refreshing}
            ListHeaderComponent={this.renderPaginador}
          />
      
      </View>
    );
  }
}

const styles = {


  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    //height: 50,
    width: 50,
    justifyContent: 'center'
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },

  textDerecha:{
    textAlign:'right'
  },
  textCentro:{
    textAlign:'center'
  }
  ,
  textStyle: {
    //alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    paddingTop: 10,
    paddingBottom: 10
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#007aff',
    marginLeft: 5,
    marginRight: 5
  }
};

export default Lista;