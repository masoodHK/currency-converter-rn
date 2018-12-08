import React, { Component } from 'react'
import { ScrollView, Text, Button, View, ActivityIndicator } from 'react-native'
import { connect } from "react-redux";
import { Cell, Section, TableView } from 'react-native-tableview-simple';
import regression from 'regression'
const moment = require("moment");

import styles from '../styles';
import { HISTORY_URL } from '../../configs/constants';
import { getDataForPreviousDays } from "../../store/actions";

class ForecastScreen extends Component {

  constructor(props) {
    super(props)

    this.state = {
      dates: [],
      data: {}
    };
  };

  componentDidMount = () => {
    const { getDataForPreviousDays } = this.props;
    const { getParam } = this.props.navigation;
    const from = getParam("from");
    getDataForPreviousDays(HISTORY_URL, from)
  };

  static getDerivedStateFromProps(nextProps, prevState) {

    if (JSON.stringify(nextProps.data) === JSON.stringify(prevState.data)) return null
    else {
      return {
        dates: Object.keys(nextProps.data.rates),
        data: nextProps.data
      };
    };
  };

  showPredictions(ofDate) {
    const { getParam } = this.props.navigation;
    const { data, dates } = this.state;
    console.log(ofDate);

    const dataset = [];
    const value = parseInt(ofDate.split("-").join(""));
    console.log(value);
    const to = getParam("to");

    dates.map(date => {
      dataset.push([parseInt(date.split("-").join()), data.rates[date][to]])
    });
    console.log(dataset);

    const val = regression.linear(dataset, {
      precision: 10
    });
    console.log(val);

    let result = val.predict(value);
    console.log(result);
    return result[1];
  }

  render() {
    const { goBack, getParam } = this.props.navigation;
    const { data, dates } = this.state;

    const from = getParam("from");
    const to = getParam("to");
    const convertedRate = getParam("convertedRate");
    if (data !== undefined) {
      return (
        <ScrollView>
          <View style={styles.forecastContainer}>
            <Text>Converted from {from} to {to}</Text>
            <Text>Result: {convertedRate}</Text>
            <Text style={styles.headerText}>Previous Rates</Text>
          </View>
          <TableView>
            <Section headerComponent={<View style={{ alignItems: "center", paddingVertical: 10 }}>
                                        <Text style={styles.headerText}>{to}</Text>
                                      </View>} >
              {dates.map(date => <Cell key={date}
                                    cellStyle="RightDetail"
                                    title={moment(date, "YYYY-MM-DD").format("MMMM Do YYYY")}
                                    detail={data.rates[date][to]} /> )}
            </Section>
          </TableView>
          <View style={styles.forecastContainer}>
            <Text style={styles.headerText}>Predictions for few days</Text>
          </View>
          <TableView>
            <Section headerComponent={<View style={{ alignItems: "center" }}>
                                        <Text style={styles.headerText}>{to}</Text>
                                      </View>}>
              {dates.map((date, index) => {
                const dateFormatted = moment(dates[dates.length - 1], "YYYY-MM-DD").add(index + 1, "days")
                return <Cell key={date} cellStyle="RightDetail" title={dateFormatted.format("MMMM Do YYYY")} detail={this.showPredictions(dateFormatted.format("YYYY-MM-DD"))} />;
              })}
            </Section>
          </TableView>
          <Button title="Go Back" onPress={() => goBack()} />
        </ScrollView>
      );
    }
    else {
      <View style={styles.container}>
        <ActivityIndicator animating={loading} size="large" />
      </View>
    }
  };
};

const mapStateToProps = state => {
  return {
    data: state.forecastReducer.dataOfPreviousDays
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getDataForPreviousDays: (url, base) => dispatch(getDataForPreviousDays(url, base))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForecastScreen);
