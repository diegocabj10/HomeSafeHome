import React from 'react';
import { Text, View } from 'react-native';

const Elemento = ({ id, tipo }) => {
    return (
        <View>
            <Text>{tipo}: {id}</Text>
            <Text>Mostrar datos de {tipo}</Text>
        </View>
    )
};

export default Elemento;