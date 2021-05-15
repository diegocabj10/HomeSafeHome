import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { getAllWithFilter } from '@services/baseServices'
import { TITLE_ENDPOINT } from '@config';


const GenericList = ({ navigation, route }) => {
    const [data, setData] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(10);
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalItems, settTotalItems] = React.useState(0);

    React.useEffect(async () => {
        //TODO dynamic filter
        const { totalItems, list, totalPages, currentPage } = await getAllWithFilter(route.params.title, page, size);
        setPage(currentPage);
        setTotalPages(totalPages);
        settTotalItems(totalItems);
        setData(list);
    }, [page]);

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem onPress={() => navigation.navigate('GenericItemDetail', { title: TITLE_ENDPOINT.find(element => element.title == route.params.title).detailTitle, id: item.id })} bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>Fecha: {item.date}</ListItem.Subtitle>
                <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    const HeaderComponent = () => {
        return (<View>
            <Text>Total Items: {totalItems} - Page: {page} - TotalPages: {totalPages}</Text>
        </View>);
    }

    return (
        <View>
            {/* TODO filter */}
            <FlatList
                keyExtractor={keyExtractor}
                data={data}
                renderItem={renderItem}
                ListHeaderComponent={<HeaderComponent />}
                ListHeaderComponentStyle={{ flex: 1, justifyContent: 'flex-end', height: 20, backgroundColor: 'white' }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})


export default GenericList;