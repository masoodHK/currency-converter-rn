const moment = require("moment");

import { isLoading, errorFound } from './commonActions'

function retreiveData(data) {
	return {
		type: "GET_HISTORY",
		dataOfPreviousDays: data,
	};
};

export default function getDataForPreviousDays(url, base) {
	const startTime = moment().subtract(4, "days");
	const endTime = moment().subtract(1, "days");
	return (dispatch, getState) => {
		fetch(`${url}?start_at=${startTime.format("YYYY-MM-DD")}&end_at=${endTime.format("YYYY-MM-DD")}&base=${base}`)
			.then(response => response.json())
			.then(data => {
				console.log(data.rates)
				dispatch(retreiveData(data))
			})
			.catch(error => dispatch(errorFound(error)));
	}
};