import React, { Component } from 'react';
import { FlatList, Text, View, Picker, Button, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Fila from './Fila';
import { List, Icon } from "react-native-elements";
import { Actions } from 'react-native-router-flux';

class Lista extends Component {
  constructor(props){
    super(props);
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
  }
  
  state = {
    listaElementos: null,
    entidad: '',
    vacio: false,
    refreshing: false,
    registros: 1,
    pagina: 1,
    ultima: 1
  };
  

  componentWillMount() {
    this.makeRemoteRequest()
  }
  
  makeRemoteRequest = () => {  
  axios.get(`http://proyectofinal2018.ddns.net:8080/api/${this.props.entidad}?numeroPagina=${this.state.pagina}`).then(response => {
        if (response.data.Lista && response.data.TotalRegistrosListado) {
          this.setState({
            listaElementos: response.data.Lista,
            vacio: false,
            refreshing: false,
            registros: response.data.TotalRegistrosListado,
            ultima: Math.ceil(response.data.TotalRegistrosListado / 10)
          })
        } else {
          this.setState({
            photoset: null,
            vacio: true,
            refreshing: false
          })
        }
      });
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
      }}>

         <Text>
          Total de {this.props.entidad}: {this.state.registros}
          </Text>
          <Text>
          Total de páginas: {this.state.ultima}           
        </Text>
        <Text>
        Página actual:{this.state.pagina}
        </Text>
      
        </View>
      </View>
      
    );
  };

  verBotones = () => {
    if(this.props.entidad != 'Eventos'){

      return (
      <Icon
      reverse
      name='add'
      color='#2E4452'
      size={18}
      onPress={() => Actions.nuevo({entidad: this.props.entidad})}
      />   );  
    }
    return null;
  }

  cargarDatos = (item) => {
    if(this.props.entidad == 'Eventos'){
      return (
        <View  key={item.Id}>
          <Text key={item.Id}>
            {item.Id} - {item.FechaEvento}
          </Text>
          <Text  key={item.IdDispositivo}>
            Dispositivo: {item.IdDispositivo} - Señal: {item.NombreSenial}
          </Text>
        </View>
      );
    }
    if(this.props.entidad == 'Reclamos' || this.props.entidad == 'Avisos'){
      var fecha = item.FechaReclamo
      if(this.props.entidad == 'Avisos'){
        fecha = item.FechaAviso
      }
      return (
        <View key={item.Id}>
          <Text key={item.Id}>
            {item.Id} - {fecha}
          </Text>
          <Text key={item.Id}>
            {item.Titulo}
          </Text>
        </View>
      );
    }
    if(this.props.entidad == 'Usuarios'){
      return (
        <View key={item.Id}>
          <Text key={item.Id}>
            {item.Id} - {item.FechaInicio}
          </Text>
          <Text key={item.Id}>
            {item.Email}
          </Text>
        </View>
      );
    }
  };

  render() {    
    if (this.state.vacio) {
      return (
        <View>
          <Text>
            No hay {this.props.entidad}
					</Text>
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
            data={this.state.listaElementos}
            renderItem={({ item }) => (
              <Fila key={item.Id} contenido={ this.cargarDatos(item) } filaId={item.Id} entidad={this.props.entidad} />
            )}
            keyExtractor={item => item.id}
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