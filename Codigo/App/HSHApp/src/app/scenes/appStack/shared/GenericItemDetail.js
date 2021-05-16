import React from 'react';
import { Badge, Card, PricingCard, Text } from 'react-native-elements';
import { StyleSheet, View } from 'react-native';
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
                <Text h3 h3Style={styles.title}>{data.title}</Text>
                <Card.Divider />
                <Text h4 h4Style={styles.subtitle}>Fecha</Text>
                <Text>{data.date}</Text>
                <Card.Divider />
                <Text h4 h4Style={styles.subtitle}>Mensaje</Text>
                <Text>{data.message}</Text>
                {
                    route.params.title === 'Reclamo' ?
                        (<>
                            <Text h4 h4Style={styles.subtitle}>Respuesta</Text>
                            <Text>{data.response}</Text>
                        </>
                        )
                        : (<></>)
                }
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
        borderRadius: 10,
    },
    title: {
        fontSize: 22,
        color: 'black',
        textAlign: 'center'
    },
    subtitle: {
        fontSize: 14,
        color: '#667F90'
    }
});

export default GenericItemDetail;


