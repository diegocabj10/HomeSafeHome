import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { getById } from '@services/baseServices'
import { TITLE_ENDPOINT } from '@config';

const GenericItemDetail = ({ navigation, route }) => {
    const [data, setData] = React.useState({});

    //TODO ver como es cada respuesta y en base a eso armar la view
    React.useEffect(async () => {
        const response = await getById(TITLE_ENDPOINT.find(element => element.detailTitle == route.params.title).title, route.params.id);
        console.log(response);
        setData(response);
    }, []);




    return (
        <View>
            <Text></Text>
        </View>
    )
}

const styles = StyleSheet.create({});

export default GenericItemDetail;