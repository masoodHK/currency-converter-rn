import {
    createMaterialTopTabNavigator,
    createAppContainer
} from "react-navigation";

import MainScreen from './MainScreen';
import SearchScreen from './SearchScreen'

const tabNavigatorConfig = {
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
        },
        tabStyle: {
            height: 60,
            marginTop: 20
        },
    }
};

const tabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: MainScreen,
    },
    Search: {
        screen: SearchScreen
    },
}, tabNavigatorConfig);

export default createAppContainer(tabNavigator);