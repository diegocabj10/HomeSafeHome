import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import * as api from '../../services/auth.services';
import { useAuth } from '../../providers/auth/auth';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../../config/auth.header';

const LogIn = ({ navigation }) => {
  const [formLogin, setFormLogin] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = formLogin;

  const { handleLogIn } = useAuth();


  const logIn = async (formLogin) => {
    let response = await api.logInService(formLogin);

    let accessToken = response.headers[ACCESS_TOKEN];
    let refreshToken = response.headers[REFRESH_TOKEN];

    //TODO decode accessToken
    let userLogged = 'diego';
    await handleLogIn({ accessToken, refreshToken, userLogged });
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