import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Card, Input, Overlay, Text } from 'react-native-elements';
import * as api from '../../services/authServices';
import { useAuth } from '../../providers/auth/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '@config';

const LogIn = ({ navigation }) => {
  const [formLogin, setFormLogin] = React.useState({
    email: '',
    password: ''
  })
  const [visible, setVisible] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState('');


  const { email, password } = formLogin;

  const { handleLogIn } = useAuth();

  const toggleOverlay = () => {
    setVisible(!visible);
  };

  const logIn = async (formLogin) => {
    let response;
    try {
      response = await api.logInService(formLogin);
      if (response) {
        let accessToken = response.headers[ACCESS_TOKEN];
        let refreshToken = response.headers[REFRESH_TOKEN];

        await handleLogIn({ accessToken, refreshToken });
      }
    } catch (error) {
      setErrorMessage(error.message);
      toggleOverlay();
    }
  }


  return (
    <View style={styles.container}>
      <Text h3 h3Style={{ color: 'white' }}>Iniciar sesión</Text>
      <Input
        label="Email"
        onChangeText={value => setFormLogin({ ...formLogin, email: value })}
      />
      <Input
        label="Contraseña"
        onChangeText={value => setFormLogin({ ...formLogin, password: value })}
        secureTextEntry
      />
      <Button
        type="outline"
        title="Entrar"
        onPress={() => logIn({ email, password })}
        containerStyle={{ width: '100%' }} />

      <View style={styles.buttons}>
        <Button type="clear" titleStyle={{ color: 'white' }} title="Has olvidado la contraseña?" onPress={() => navigation.navigate('ChangePassword')} />
        <Button type="clear" titleStyle={{ color: '#432F26' }} title="Registrarse" onPress={() => navigation.navigate('Register')} />
      </View>
      <Overlay isVisible={visible} onBackdropPress={toggleOverlay}>
        <Card>
          <Card.Title>Error</Card.Title>
          <Text>{errorMessage}</Text>
          <Button type="clear" title="Aceptar" onPress={() => toggleOverlay()} ></Button>
        </Card>
      </Overlay>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttons: {
    flexDirection: "row",
    paddingTop: 50,
    marginLeft: 10,
    justifyContent: 'space-evenly'
  },
})


export default LogIn;