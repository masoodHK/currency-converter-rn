import {
    createMaterialTopTabNavigator,
    createAppContainer,
    createDrawerNavigator
} from "react-navigation";

import MainScreen from './MainScreen';
import SearchScreen from './SearchScreen'
import ForecastScreen from './ForecastScreen'

const tabNavigatorConfig = {
    tabBarOptions: {
        labelStyle: {
            fontSize: 14,
        },
        tabStyle: {
            height: 60,
            marginTop: 20
        },
    },
    lazy: true
};

const tabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: MainScreen,
    },
    Search: {
        screen: SearchScreen
    },
}, tabNavigatorConfig);

const drawerNavigator = createDrawerNavigator({
    Homepage: tabNavigator,
    Forecasts: ForecastScreen
}, {});

export default createAppContainer(tabNavigator);