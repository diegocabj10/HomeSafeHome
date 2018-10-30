import React, { Component } from 'react';
import {
  StyleSheet,
  
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  AsyncStorage,
  Switch
} from 'react-native';
import { Card,Divider,Text, Button } from 'react-native-elements';
import SideMenu from 'react-native-side-menu';
import ViewOne from './ViewOne';
import Menu from './Menu';
import RenderIf from './RenderIf';
var myStyles = require('./Styles');
const image = require('../assets/menu.png');

const styles = StyleSheet.create({
  button: {
    position: 'absolute',
    
    padding: 10,
  },
  caption: {
    fontSize: 20,
    fontWeight: 'bold',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2E4452',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

export default class Initial extends Component {
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);

    this.state = {
      isOpen: false,
      selectedItem: 'Initial',
      menu: '',
      nombre:'',
      estado:'Desactivado',
      resumen:null
    };
  }

  componentWillMount(){
    this._retrieveData();
    this._retrieveDataNombreUsuario();
}

  _retrieveData = async () => {
    try {
      const value = await AsyncStorage.getItem('menu');
      if (value !== null) {
        // We have data!!
        this.setState({menu : JSON.parse(value)}); 
      }
     } catch (error) {
       // Error retrieving data
     }
  }

  _retrieveDataNombreUsuario = async () => {
    try {
      const value = await AsyncStorage.getItem('nombre');
      if (value !== null) {
        // We have data!!
        global.nombreUsuario= value;
        this.setState({nombre : value}); 
      }
     } catch (error) {
       // Error retrieving data
     }
  }

listarItems(){
  if (!this.state.menu) return ( "Cargando" );
  return (
    this.state.menu.map(item =>
      <Text key={item.Nombre}> {item.Nombre.toLowerCase()} </Text> 
    )
  )
}  

  
    
  toggleActivate() {
    this.setState({resumen:'CLICKEO'});
    if( this.state.estado === "Activado")
    this.setState({ estado: "Desactivado"});
    else
    this.setState({ estado: "Activado"});
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  updateMenuState(isOpen) {
    this.setState({ isOpen });
  }

  onMenuItemSelected = item =>
    this.setState({
      isOpen: false,
      selectedItem: item,
    });

  render() {
    const menu = <Menu onItemSelected={this.onMenuItemSelected} items={global.menu} nombre={this.state.nombre}/>;
    

    return (
     
     
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
                    

        <View style={styles.container}>
          <StatusBar
          backgroundColor="#2E4452"
          barStyle="light-content"
         />

          <Card title='Intrusiones' containerStyle={myStyles.cardsInicio} >  
            <View  style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View ><Text style={{fontWeight:'bold'}}>Estado:</Text>
            </View>
            <View >
              {RenderIf(this.state.estado=='Activado',<Text style={{fontWeight:'bold',color:'green'}}>{this.state.estado}</Text>)}
              {RenderIf(this.state.estado=='Desactivado',<Text style={{fontWeight:'bold',color:'red'}}>{this.state.estado}</Text>)}
            </View>            
            <View >
            <Switch
           value={this.state.estado === "Activado" ? true : false }
           onValueChange = {(bool) => bool ? this.setState({estado: "Activado"}) :  this.setState({estado: "Desactivado"})}/>
            </View>
            </View>
          </Card>

          <Card title='Resúmen de eventos' containerStyle={myStyles.cardsInicio} >  
          <Text style={{fontWeight:'bold'}}>No posees resúmen de eventos</Text>
          <Text style={{fontWeight:'bold'}}>{this.state.resumen}</Text>
          </Card>

          <Card title='Resúmen de avisos/reclamos' containerStyle={myStyles.cardsInicio} >  
          <Text style={{fontWeight:'bold'}}>No posees nuevos avisos/reclamos</Text>
          </Card>

         
         
        </View>

        

          

        
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
        <View style={myStyles.titleContainerHSH}>
        
          <Image
            source={image}
            style={{ width: 20, height: 20 }}
          />
          <Text style={myStyles.titleHSH}> Home Safe Home </Text>
          </View>
        </TouchableOpacity>
      </SideMenu>
      
    );
  }
}
