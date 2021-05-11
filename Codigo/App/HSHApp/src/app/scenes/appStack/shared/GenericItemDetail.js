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
        <View>
            <Card>
                <Text>Fecha: {data.date}</Text>
                <Card.Title>{data.title}</Card.Title>
                <Card.Divider />
                <Text>{data.message}</Text>
                <Text>{data.response}</Text>
            </Card>
        </View>
    )
}

const styles = StyleSheet.create({});

export default GenericItemDetail;


