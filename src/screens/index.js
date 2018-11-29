import {
    createMaterialTopTabNavigator,
    createAppContainer,
    createStackNavigator
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

const searchStack = createStackNavigator({
    Main: SearchScreen,
    Forecast: ForecastScreen
}, {
    headerMode: "none"
})

const tabNavigator = createMaterialTopTabNavigator({
    Home: {
        screen: MainScreen,
    },
    Search: {
        screen: searchStack
    },
}, tabNavigatorConfig);

export default createAppContainer(tabNavigator);