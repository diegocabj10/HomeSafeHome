import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Constants } from 'expo';
import { Router, Scene } from 'react-native-router-flux';
import Inicio from './components/Inicio';
import Lista from './components/Lista';
import Elemento from './components/Elemento';

// You can import from local files
import AssetExample from './components/AssetExample';

// or any pure javascript modules available in npm
import { Card } from 'react-native-elements'; // 0.19.1

export default class App extends React.Component {
  render() {
    return (
      <Router>
        <Scene key="root">
          <Scene key="inicio" component={Inicio} title="Inicio" initial={true} />
          <Scene key="lista" component={Lista} title="Lista" />
          <Scene key="elemento" component={Elemento} title="Elemento" />
        </Scene>
      </Router>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
