import React from 'react';
import { Text, View, Image, Linking, Touch, TouchableOpacity,} from 'react-native';
import { Actions } from 'react-native-router-flux';

const Fila = ({ contenido, filaId, entidad }) => {
  const {
    headerContentStyle,
    headerTextStyle,
    imageStyle
  } = styles;

  return (
    <View key={filaId} style={[styles.buttonStyle, styles.textStyle]}>
      <TouchableOpacity key={filaId}
       onPress={() => Actions.elemento({id: filaId, tipo: entidad, title:'Detalle del '+entidad.toString().slice(0,-1).toLowerCase()})} >
        {contenido}
      </TouchableOpacity>
    </View>
  );
};

const styles = {
  headerContentStyle: {
    flexDirection: 'column',
    justifyContent: 'space-around'
  },
  headerTextStyle: {
    fontSize: 18
  },
  thumbnailStyle: {
    height: 50,
    width: 50
  },
  thumbnailContainerStyle: {
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10
  },
  imageStyle: {
    height: 300,
    flex: 1,
    width: null
  },
  textStyle: {
    //alignSelf: 'center',
    color: '#007aff',
    fontSize: 16,
    fontWeight: '600',
    padding: 10,
    
  },
  buttonStyle: {
    flex: 1,
    alignSelf: 'stretch',
    backgroundColor: '#fff',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#2E4452',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10
  }
};

export default Fila;
