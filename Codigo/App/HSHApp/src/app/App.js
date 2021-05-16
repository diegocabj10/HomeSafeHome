import 'react-native-gesture-handler';
import React from 'react';

import { ThemeProvider } from 'react-native-elements';

import AuthProvider from './providers/auth/auth';

import StackNavigator from './navigation/StackNavigator';

const theme = {
  Button: {
    raised: true,
  },
  Input: {
    labelStyle: {
      color: 'white',
    }
  },
  Header:{
    backgroundColor: '#667F90',
  },
};

const App = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <StackNavigator />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default App;
