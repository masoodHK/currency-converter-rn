import React from 'react';
import { Text, View, ActivityIndicator, Picker } from 'react-native';
import { connect } from "react-redux";

import { retreiveData } from "../../store/actions";
import styles from '../styles';

const URL = "https://api.exchangeratesapi.io/latest"

class MainScreen extends React.Component {
  state = {
    data: [],
    base: "GBP",
    error: false
  }
  
  render = () => {
    const { loading, error, data } = this.props
    
    if(loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={loading}/>
        </View>
      )
    }

    if(error) {
      return (
        <View style={styles.container}>
          <Text>Error: Unable to retreive data</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <Picker>
          <Picker.Item></Picker.Item>
        </Picker>
        <Text>Main Screen</Text>
      </View>
    );
  };
}

const mapStateToProps = state => {
  console.log(state.dataReducer);
  return {
    data: state.dataReducer.data,
    loading: state.dataReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    retrieveData: (url) => dispatch(retreiveData(url)),
    isLoading: (boolean) => dispatch(isLoading(boolean)),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);