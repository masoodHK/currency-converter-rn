import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    forecastContainer: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20
    },
    headerStyle: {
        flex: 1,
        flexDirection: "row",
        padding: 12,
        justifyContent: "space-around"
    },
    headerText: {
        fontWeight: "bold",
        fontSize: 16
    },
    searchContainer: {
        padding: 12
    },
    searchHeaderText: {
        fontSize: 16
    },
    searchInput: {
        backgroundColor: "#EEEEEE",
        padding: 10
    }
});

export default styles;