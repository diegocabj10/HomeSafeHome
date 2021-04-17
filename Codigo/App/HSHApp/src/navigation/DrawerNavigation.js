import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '../scenes/appStack/Home';
import Notifications from '../scenes/appStack/Notifications';


const Drawer = createDrawerNavigator();

const DrawerNavigation = ({navigation}) => {
    return (
        <Drawer.Navigator initialRouteName="Home" drawerStyle={{}}>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Notifications" component={Notifications} />
        </Drawer.Navigator>
    )
}

export default DrawerNavigation;

// options={{
//     title: 'Home', headerLeft: () => (
//         <Button
//             onPress={() => alert('This is a button!')}
//             title="Info"
//             color="#fff"
//         />
//     ),
// }}