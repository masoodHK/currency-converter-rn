const moment = require("moment");

import { isLoading, errorFound } from './commonActions'

function retreiveData(type, data) {
	return {
		type,
		data,
	};
};

export default function getDataForPreviousDays(url, currentDate) {
	const startTime = moment(currentDate, "YYYY-MM_DD").subtract(4, "days");
	const endTime = moment(currentDate, "YYYY-MM_DD").subtract(1, "days");
	return (dispatch, getState) => {
		dispatch(isLoading())
		fetch(`url?start_at=${startTime}&end_at=${endTime}`)
			.then(response => response.json())
			.then(data => dispatch(retreiveData("GET_HISTORY_OF_PREVIOUS_DAYS", data)))
			.catch(error => dispatch(errorFound(error)));
	}
};