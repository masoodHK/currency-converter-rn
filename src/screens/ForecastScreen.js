import React, { Component } from 'react'
import { ScrollView, Text, Button, View, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";
import { Cell, Section, TableView } from 'react-native-tableview-simple';

import styles from '../styles';
import { HISTORY_URL } from '../../configs/constants';
import { getDataForPreviousDays } from "../../store/actions";

class ForecastScreen extends Component {

  componentDidMount = () => {
    const { getDataForPreviousDays } = this.props;
    const { getParam } = this.props.navigation;
    const from = getParam("from");
    getDataForPreviousDays(HISTORY_URL, from)
  }

  render() {
    const { goBack, getParam } = this.props.navigation;
    const { loading, error, data } = this.props;

    const from = getParam("from");
    const to = getParam("to");
    const convertedRate = getParam("convertedRate");
    console.log(data)
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
      const dates = Object.keys(data.rates);
      console.log(dates)
      return (
        <ScrollView>
          <Text>Converted from {from} to {to}</Text>
          <Text>Result: {convertedRate}</Text>
          <Text style={styles.headerText}>Previous Rates</Text>
          <TableView>
            <Section headerComponent={<View><Text style={styles.headerText}>{to}</Text></View>}>
              {dates.map(date => {
                console.log(date)
                console.log(data.rates[date][to])
                return <Cell key={date} cellStyle="RightDetail" title={date} detail={data.rates[date][to]} />
              })}
            </Section>
          </TableView>
          <TableView>
            <Section headerComponent={<View><Text style={styles.headerText}>{from}</Text></View>}>
              {dates.map(date => <Cell key={date} cellStyle="RightDetail" title={date} detail={data.rates[date][from]} />)}
            </Section>
          </TableView>
          <Button title="Go Back" onPress={() => goBack()} />
        </ScrollView>
      );
    }
  };
};

const mapStateToProps = state => {
  console.log(state.forecastReducer)
  return {
    data: state.forecastReducer.dataOfPreviousDays,
    error: state.forecastReducer.error,
    loading: state.forecastReducer.loading
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForPreviousDays: (url, base) => dispatch(getDataForPreviousDays(url, base))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForecastScreen);
