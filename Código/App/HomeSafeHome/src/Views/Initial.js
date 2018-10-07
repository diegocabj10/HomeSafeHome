import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar
} from 'react-native';
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
    };
  }

  handleOnNavigateBack = (foo) => {
    this.setState({isOpen:false});
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
    const menu = <Menu onItemSelected={this.onMenuItemSelected} />;
   

    return (
      
      <SideMenu
        menu={menu}
        isOpen={this.state.isOpen}
        onChange={isOpen => this.updateMenuState(isOpen)}
      >
                    
      {RenderIf(this.state.selectedItem == "Vista1", <ViewOne /> )}
     
      {RenderIf(!(this.state.selectedItem == "Vista1"), 
                    
        <View style={styles.container}>
          <StatusBar
          backgroundColor="#2E4452"
          barStyle="light-content"
         />

          <Text style={styles.welcome}>
               {this.state.selectedItem}
          </Text>
          
          <Text style={styles.instructions}>
            La opción seleccionada fue: {this.state.selectedItem}
          </Text>
        </View>

          )}

          

        
        <TouchableOpacity
          onPress={this.toggle}
          style={styles.button}
        >
        <View style={myStyles.titleContainerHSH}>
        
          <Image
            source={image}
            style={{ width: 32, height: 32 }}
          />
          <Text style={myStyles.titleHSH}> Home Safe Home </Text>
          </View>
        </TouchableOpacity>
      </SideMenu>
    );
  }
}
