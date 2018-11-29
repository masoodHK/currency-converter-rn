import React from 'react';
import { Text, View, ActivityIndicator, Picker, TextInput, Button } from 'react-native';
import { connect } from "react-redux";

import styles from '../styles';
import { LATEST_URL } from '../../configs/constants';

class SearchScreen extends React.Component {
  state = {
    query: "",
    to: "",
    from: ""
  };

  convertRate = (data, to, from) => {
    const { query } = this.state;
    let number = parseFloat(query);
    let convertedRate = number * data.rates[to];
    this.setState({
      query: "",
      to: "",
      from: ""
    });

    this.props.navigation.navigate("Forecast", {
      to,
      from,
      convertedRate
    })
  };

  convert = () => {
    const { data } = this.props;
    const { to, from } = this.state;

    let toSymbol = to ? to : data.base;
    let fromSymbol = from ? from : data.base;
    
    if(toSymbol === data.base) {
      this.convertRate(data, toSymbol, fromSymbol);
    }
    else {
      fetch(`${LATEST_URL}?base=${fromSymbol}`)
        .then(res => res.json())
        .then(result => {
          this.convertRate(result, toSymbol, fromSymbol);
        })
    }

    
  };

  render() {
    const { error, data, loading } = this.props;
    const { query, to, from } = this.state

    if (loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={loading} size="large" />
        </View>
      );
    };

    if (error) {
      return (
        <View style={styles.container}>
          <Text>Error: {error}</Text>
        </View>
      );
    };

    if (data !== undefined) {
      const rates = Object.keys(data.rates);
      return (
        <View style={styles.searchContainer}>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.searchHeaderText}>From</Text>
            <Picker
              style={styles.searchInput}
              selectedValue={from ? from : data.base}
              onValueChange={(itemValue) => this.setState({ from: itemValue })} >
              {rates.map(rate => <Picker.Item key={rate} value={rate} label={rate} />)}
            </Picker>
          </View>
          <View style={{ marginVertical: 10 }}>
            <Text style={styles.searchHeaderText}>To</Text>
            <Picker
              style={styles.searchInput}
              selectedValue={to ? to : data.base}
              onValueChange={(itemValue) => this.setState({ to: itemValue })} >
              {rates.map(rate => <Picker.Item key={rate} value={rate} label={rate} />)}
            </Picker>
          </View>
          <View style={{ marginVertical: 10 }}>
            <TextInput
              style={styles.searchInput}
              value={query}
              keyboardType="numeric"
              onChangeText={(text) => this.setState({ query: text })} />
          </View>
          <View>
            <Button title="Convert" onPress={() => this.convert()} />
          </View>
        </View>
      );
    };
  };
};

const mapStateToProps = state => {
  return {
    data: state.dataReducer.data,
    error: state.dataReducer.error,
    loading: state.dataReducer.loading
  };
};

export default connect(mapStateToProps, null)(SearchScreen);