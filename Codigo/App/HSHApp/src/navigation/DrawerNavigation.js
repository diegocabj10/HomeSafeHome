import * as React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Home from '@appStack/Home';
import Notifications from '@appStack/Notifications';


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