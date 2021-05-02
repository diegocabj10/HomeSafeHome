import React from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { NOTIFICATIONS } from '@config';
import { getAllWithFilter } from '@services/baseServices'
const Notifications = ({ navigation }) => {
    const [notifications, setNotifications] = React.useState({});
    const [page, setPage] = React.useState(0);
    const [size, setSize] = React.useState(10);
    const [title, setTitle] = React.useState('sarasa');
    const [totalPages, setTotalPages] = React.useState(0);
    const [totalItems, settTotalItems] = React.useState(0);

    React.useEffect(async () => {
        const { totalItems, list, totalPages, currentPage } = await getAllWithFilter(NOTIFICATIONS, page, size, title);
        setPage(currentPage);
        setTotalPages(totalPages);
        settTotalItems(totalItems);
        setNotifications(list);
    }, [page]);

    const keyExtractor = (item, index) => index.toString()

    const renderItem = ({ item }) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>Fecha: {item.date}</ListItem.Title>
                <ListItem.Title>{item.title}</ListItem.Title>
                <ListItem.Subtitle>{item.message}</ListItem.Subtitle>
            </ListItem.Content>
            <ListItem.Chevron />
        </ListItem>
    )

    const FooterComponent = () => {
        return (<View>
            <Text>Total Items: {totalItems} - Page: {page} - TotalPages: {totalPages}</Text>
        </View>);
    }

    return (
        <View>

            <FlatList
                keyExtractor={keyExtractor}
                data={notifications}
                renderItem={renderItem}
                ListFooterComponent={<FooterComponent />}
                ListFooterComponentStyle={{ flex: 1, justifyContent: 'flex-end', height: 20 }}
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


export default Notifications;