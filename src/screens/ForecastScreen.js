import React, { Component } from 'react'
import { ScrollView, Text, Button } from 'react-native'
import { connect } from "react-redux";
import { Cell, Section, TableView } from 'react-native-tableview-simple';

import styles from '../styles';
import { HISTORY_URL } from '../../configs/constants';

export default class ForecastScreen extends Component {

  componentDidMount = () => {

  }
  
  render() {
    const { goBack, getParam } = this.props.navigation;
    // const { loading, error, data } = this.props;

    const from = getParam("from");
    const to = getParam("to");
    const convertedRate = getParam("convertedRate");

    return (
      <ScrollView contentContainerStyle={styles.container}>
        <Text>Converted from {from} to {to}</Text>
        <Text>Result: {convertedRate}</Text>
        <Button title="Go Back" onPress={() => goBack()} />
      </ScrollView>
    );
  };
};

// const mapStateToProps = state => {
//   return {
//     data: state.forecastReducer.data,
//     error: state.dataReducer.error,
//     loading: state.dataReducer.loading
//   };
// };

// export default connect(mapStateFromProps, null)(ForecastScreen);
