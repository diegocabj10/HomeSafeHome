import React from 'react';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import { Icon, Input, ListItem } from 'react-native-elements';
import { getAllWithFilter } from '@services/baseServices'
import { TITLE_ENDPOINT } from '@config';
import { ScrollView } from 'react-native';

const GenericList = ({ navigation, route }) => {
    const [formGenericList, setFormGenericList] = React.useState({
        data: {},
        title: '',
        page: 0,
        size: 6,
        totalPages: 0,
        totalItems: 0,
    });


    React.useEffect(async () => {
        const { totalItems, data, totalPages } = await getAllWithFilter(route.params.title, formGenericList.page, formGenericList.size, formGenericList.title);
        setFormGenericList({ ...formGenericList, totalItems, totalPages, data });
    }, [formGenericList.page]);

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem onPress={() =>
            navigation.navigate('GenericItemDetail',
                { title: TITLE_ENDPOINT.find(element => element.title == route.params.title).detailTitle, id: item.id }
            )}
            bottomDivider>
            <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>Fecha: {item.date}</ListItem.Subtitle>
                <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    const Paginator = () => (
        <>
            <Text style={{ textAlign: 'right' }}>Total: {formGenericList.totalItems}</Text>
            <View style={styles.sameLine}>
                <Icon
                    reverse
                    color='#667F90'
                    size={16}
                    name='angle-double-left'
                    type='font-awesome'
                    disabled={formGenericList.page === 0}
                    onPress={() => { setFormGenericList({ ...formGenericList, page: 0 }) }} />
                <Icon
                    reverse
                    color='#667F90'
                    size={16}
                    name='angle-left'
                    type='font-awesome'
                    disabled={formGenericList.page === 0}
                    onPress={() => { setFormGenericList({ ...formGenericList, page: (formGenericList.page - 1) }) }} />
                <Text>{(formGenericList.page + 1)}/{formGenericList.totalPages}</Text>
                <Icon
                    reverse
                    color='#667F90'
                    size={16}
                    name='angle-right'
                    type='font-awesome'
                    disabled={formGenericList.page === (formGenericList.totalPages - 1)}
                    onPress={() => { setFormGenericList({ ...formGenericList, page: (formGenericList.page + 1) }) }} />
                <Icon
                    reverse
                    color='#667F90'
                    size={16}
                    name='angle-double-right'
                    type='font-awesome'
                    disabled={formGenericList.page === (formGenericList.totalPages - 1)}
                    onPress={() => { setFormGenericList({ ...formGenericList, page: (formGenericList.totalPages - 1) }) }} />
            </View>
        </>
    )

    return (
        <SafeAreaView style={styles.container}>
            <Input
                placeholder='Buscar por título'
                onChangeText={(value) => setFormGenericList({ ...formGenericList, title: value })}
                rightIcon={<Icon
                    reverse
                    color='#667F90'
                    size={16}
                    name='search'
                    type='font-awesome'
                    onPress={() => { setFormGenericList({ ...formGenericList, page: 0 }) }} />
                }

            />
            <FlatList
                keyExtractor={keyExtractor}
                contentContainerStyle={styles.listFooter}
                data={formGenericList.data}
                renderItem={renderItem}
            />
            <Paginator />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    sameLine: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
})

export default GenericList;