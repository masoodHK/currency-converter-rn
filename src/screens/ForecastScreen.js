import React, { Component } from 'react'
import { View, Text } from 'react-native'
// import { connect } from 'react-redux'

import styles from '../styles';

export default class ForecastScreen extends Component {

  render() {
    return (
      <View style={styles.container}>
        <Text> Forecast Screen </Text>
      </View>
    );
  };
};

// const mapStateToProps = (state) => ({
  
// });

// export default connect(mapStateToProps, null)(ForecastScreen)
