import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Input, Text } from 'react-native-elements';
import * as api from '../../services/auth.services';
import { useAuth } from '../../providers/auth/auth';


const LogIn = ({ navigation }) => {
  const [formLogin, setFormLogin] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = formLogin;

  const { handleLogIn } = useAuth();


  const logIn = async (formLogin) => {
    let response = await api.logInService(formLogin);
    await handleLogIn(response);
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
    backgroundColor: '#667F90',
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