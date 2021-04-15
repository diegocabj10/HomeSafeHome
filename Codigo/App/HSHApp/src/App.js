import 'react-native-gesture-handler';
import React from 'react';

import { ThemeProvider } from 'react-native-elements';

import AuthProvider from './providers/auth/auth';

import Router from './routes/Router';

const theme = {
  Button: {
    raised: true,
  },
  Input: {
    labelStyle: {
      color: 'white',
    }
  },
};

const App = () => {
  return (
    <>
      <AuthProvider>
        <ThemeProvider theme={theme}>
          <Router />
        </ThemeProvider>
      </AuthProvider>
    </>
  );
};

export default App;
