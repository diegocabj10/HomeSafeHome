import React, { Component } from 'react';
import { FlatList, Text, View, Picker, Button, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Fila from './Fila';
import { List } from "react-native-elements";
import { Actions } from 'react-native-router-flux';

class Lista extends Component {
  constructor(props){
    super(props);
    this.makeRemoteRequest = this.makeRemoteRequest.bind(this);
  }
  
  state = {
    listaElementos: null,
    entidad: '',
    vacio: true,
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
        <Text>
          Total de {this.props.entidad}: {this.state.registros}
            - {this.props.titulo}
        </Text>
        <Button onPress={() => this.consultarPagina(1)} 
          style={[styles.buttonStyle, styles.thumbnailStyle]}
          title="|<-"
        />
        <Button
          onPress={() => this.consultarPagina(this.state.pagina - 1)}
          style={[styles.buttonStyle, styles.thumbnailStyle]}
          title="<-"
        />
        <TextInput placeholder={'' + this.state.pagina} onChangeText={this.comprobarTexto.bind(this)}/>
        <Text>
          /{this.state.ultima}
        </Text>
        <Button 
          onPress={() => this.consultarPagina(this.state.pagina + 1)}
          title="->"
        />
        <Button 
          onPress={() => this.consultarPagina(this.state.ultima)}
          title="->|"
        />
        {this.verBotones()}
      </View>
      
    );
  };

  verBotones = () => {
    if(this.props.entidad != 'Eventos'){
      return <Button onPress={() => Actions.nuevo({entidad: this.props.entidad})}
        title="Nuevo" />
    }
    return null;
  }

  cargarDatos = (item) => {
    if(this.props.entidad == 'Eventos'){
      return (
        <View>
          <Text>
            {item.Id} - {item.FechaEvento}
          </Text>
          <Text>
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
        <View>
          <Text>
            {item.Id} - {fecha}
          </Text>
          <Text>
            {item.Titulo}
          </Text>
        </View>
      );
    }
    if(this.props.entidad == 'Usuarios'){
      return (
        <View>
          <Text>
            {item.Id} - {item.FechaInicio}
          </Text>
          <Text>
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
          <ActivityIndicator size="large" color="#00ccff" />
        </View>
      );
    }


    return (
      <View>
        <List>
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
        </List>
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