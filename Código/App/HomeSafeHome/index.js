/** @format */
import React from 'react';
import {AppRegistry} from 'react-native';
import { Router, Scene, Stack } from 'react-native-router-flux';
import Initial from './src/Views/Initial';
import {name as appName} from './app.json';

const Route = () => (
    <Router>
      <Stack key="root">
        <Scene key="App" component={Initial} title="App"  initial={true} />        
      </Stack>
    </Router>
);

AppRegistry.registerComponent(appName, () => Initial);
