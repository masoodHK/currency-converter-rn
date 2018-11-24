import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { retreiveData } from "../../store/actions";

import { connect } from "react-redux";

import styles from '../styles';

const URL = "https://api.exchangeratesapi.io/latest"

class MainScreen extends React.Component {
  state = {
    data: [],
    base: "GBP",
    loading: true,
    error: false
  }

  componentDidMount = () => {
    const { loading } = this.state
    console.log(this.props, this.state);
    this.setState({ loading: false });
  }
  
  render = () => {
    const { loading, error, data } = this.state
    if(loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={loading}/>
        </View>
      )
    }
    return (
      <View style={styles.container}>
        <Text>Main Screen</Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  console.log(state.dataReducer);
  return {
    data: state.dataReducer.data
  };
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveData: retreiveData
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);