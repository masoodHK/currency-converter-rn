import React from 'react';
import { Text, View, ActivityIndicator, Picker, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
const moment = require("moment");

import { retreiveData } from "../../store/actions";
import styles from '../styles';

const URL = "https://api.exchangeratesapi.io/latest"

class MainScreen extends React.Component {
  state = {
    base: "GBP"
  };

  componentDidMount = () => {
    const { base } = this.state;
    this.props.retreiveData(`${URL}?base=${base}`)
  }
  
  render = () => {
    const { error, data, loading } = this.props;
    
    if(loading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator animating={loading} size="large"/>
        </View>
      )
    }

    if(error) {
      return (
        <View style={styles.container}>
          <Text>Error: {error}</Text>
        </View>
      )
    };
    
    if(data !== undefined) {
      const rates = Object.keys(data.rates);
      console.log(rates);
      return (
        <ScrollView>
          <TableView>
            <Section headerComponent={<View style={styles.headerStyle}>
              <Text style={styles.headerText}>Date: {data.date}</Text>
              <Text style={styles.headerText}>Base: {data.base}</Text>
            </View>}>
              {rates.map(rate => {
                return <Cell key={rate} cellStyle="RightDetail" title={rate} detail={data.rates[rate]} />
              })}
            </Section>
          </TableView>
        </ScrollView>
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

const mapDispatchToProps = dispatch => {
  return {
    retreiveData: (url) => dispatch(retreiveData(url))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(MainScreen);