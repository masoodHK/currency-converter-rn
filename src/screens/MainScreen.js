import React from 'react';
import { Text, View, ActivityIndicator, ScrollView } from 'react-native';
import { connect } from "react-redux";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
const moment = require("moment");

import { retreiveData } from "../../store/actions";
import styles from '../styles';
import { LATEST_URL } from '../../configs/constants';

class MainScreen extends React.Component {
  state = {
    base: "GBP"
  };

  componentDidMount = () => {
    const { base } = this.state;
    this.props.retreiveData(`${LATEST_URL}?base=${base}`)
  };
  
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
      return (
        <ScrollView>
          <TableView>
            <Section headerComponent={<View style={styles.headerStyle}>
              <Text style={styles.headerText}>Date: {moment(data.date, "YYYY-MM-DD").format("MMMM Do YYYY")}</Text>
              <Text style={styles.headerText}>Base: {data.base}</Text>
            </View>}>
              {rates.map(rate => <Cell key={rate} cellStyle="RightDetail" title={rate} detail={data.rates[rate]} />)}
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