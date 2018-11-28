import React from 'react';
import { Text, View, ActivityIndicator, Picker, TextInput, Button } from 'react-native';
import { connect } from "react-redux";

import styles from '../styles';

const URL = "https://api.exchangeratesapi.io/latest"

class SearchScreen extends React.Component {
  state = {
    convertedRate: 0,
    query: "",
    to: "",
    from: "",
    resultLoading: false
  };

  convertRate = (data) => {
    const { to, from, query } = this.state;
    let number = parseFloat(query);
    let convertedRate = number * data.rates[from];
    this.setState({
      convertedRate,
      resultLoading: false
    })
  }

  convert = () => {
    const { data } = this.props;
    const { to, from } = this.state;

    fetch(`${URL}?base=${data.base}&symbols=${from},${to}`)
      .then(response => {
        if (!response.ok) {
          throw Error(response.statusText);
        }

        return response;

      })
      .then(response => response.json())
      .then(result => {
        this.setState({resultLoading: true})
        setTimeout(() => {
          this.convertRate(result);
        }, 3500);
      })
      .catch(error => console.log(error));
  }

  render() {
    const { error, data, loading } = this.props;
    const { convertedRate, query, to, from, resultLoading } = this.state

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
      if (!convertedRate && !resultLoading) {
        return (
          <View style={styles.searchContainer}>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.searchHeaderText}>From</Text>
              <Picker
                style={styles.searchInput}
                selectedValue={from ? from : data.base}
                onValueChange={(itemValue, itemPosition) => this.setState({ from: itemValue })} >
                {rates.map(rate => <Picker.Item key={rate} value={rate} label={rate} />)}
              </Picker>
            </View>
            <View style={{ marginVertical: 10 }}>
              <Text style={styles.searchHeaderText}>To</Text>
              <Picker
                style={styles.searchInput}
                selectedValue={to ? to : data.base}
                onValueChange={(itemValue, itemPosition) => this.setState({ to: itemValue })} >
                {rates.map(rate => <Picker.Item key={rate} value={rate} label={rate} />)}
              </Picker>
            </View>
            <View style={{ marginVertical: 10 }}>
              <TextInput
                style={styles.searchInput}
                value={query}
                keyboardType="numeric"
                onChangeText={(text) => this.setState({ query: text })} />

              <Button title="Convert" onPress={(ev) => console.log(ev)} />
            </View>
          </View>
        );
      }
      else if(resultLoading) {
        <View style={styles.container}>
          <ActivityIndicator animating={loading} size="large" />
        </View>
      }
      else {
        return (
          <View style={styles.searchContainer}>
            <Text>Converted: {query} from {from} to {from}</Text>
            <Text>Result: {convertedRate}</Text>
          </View>
        )
      }
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