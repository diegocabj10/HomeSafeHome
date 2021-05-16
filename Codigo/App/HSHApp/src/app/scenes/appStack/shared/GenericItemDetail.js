import React from 'react';
import { Card } from 'react-native-elements';
import { StyleSheet, Text, View } from 'react-native';
import { getById } from '@services/baseServices';
import { TITLE_ENDPOINT } from '@config';

const GenericItemDetail = ({ navigation, route }) => {
    const [data, setData] = React.useState({});

    React.useEffect(async () => {
        const response = await getById(TITLE_ENDPOINT.find(element => element.detailTitle == route.params.title).title, route.params.id);
        setData(response);
    }, []);


    return (
        <View style={styles.container}>
            <Card containerStyle={styles.roundedCard}>
                <Text>Fecha</Text>
                <Card.Title>{data.date}</Card.Title>
                <Card.Divider />
                <Text>Título</Text>
                <Card.Title>{data.title}</Card.Title>
                <Card.Divider />
                <Text>Mensaje</Text>
                <Card.Title>{data.message}</Card.Title>
                <Text>Respuesta</Text>
                <Card.Title>{data.response}</Card.Title>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    roundedCard: {
        borderRadius: 10
    }
});

export default GenericItemDetail;


