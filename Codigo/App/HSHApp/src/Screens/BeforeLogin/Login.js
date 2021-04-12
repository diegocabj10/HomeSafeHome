import React from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Input, Text } from 'react-native-elements';
import { AuthContext } from '../../App';


const LoginScreen = ({ navigation }) => {
  const [formLogin, setFormLogin] = React.useState({
    email: '',
    password: ''
  })

  const { email, password } = formLogin;

  const { signIn } = React.useContext(AuthContext);



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
        onPress={() => signIn({ email, password })}
        containerStyle={{ width: '100%' }} />

      <View style={styles.buttons}>
        <Button type="clear" titleStyle={{ color: 'white' }} title="Has olvidad la contraseña?" onPress={() => console.log('Cambiar contraseña')} />
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


export default LoginScreen;