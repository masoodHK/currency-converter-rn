import React from 'react';
import { Text, View, ActivityIndicator } from 'react-native';

import { retreiveData, isLoading } from "../../store/actions";

import { connect } from "react-redux";

import styles from '../styles';

const URL = "https://api.exchangeratesapi.io/latest"

class MainScreen extends React.Component {
  state = {
    data: [],
    base: "GBP",
    error: false
  }

  componentDidMount = () => {
    this.props.isLoading(true);
    setTimeout(() => {
      this.props.isLoading(false);
    }, 2500);
  }
  
  render = () => {
    const { error, data } = this.state
    if(this.props.loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={this.props.loading}/>
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
    data: state.dataReducer.data,
    loading: state.dataReducer.loading
  };
}

const mapDispatchToProps = dispatch => {
  return {
    retrieveData: (url) => dispatch(retreiveData(url)),
    isLoading: (boolean) => dispatch(isLoading(boolean)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);