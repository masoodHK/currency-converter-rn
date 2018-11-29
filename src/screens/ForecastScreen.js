import React, { Component } from 'react'
import { View, Text, Button } from 'react-native'

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
      <View style={styles.container}>
        <Text>Converted from {from} to {to}</Text>
        <Text>Result: {convertedRate}</Text>
        <Button title="Go Back" onPress={() => goBack()} />
      </View>
    );
  };
};
