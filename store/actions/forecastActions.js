import firebase from '../../configs/firebase'
const moment = require("moment");
const database = firebase.database();

import { isLoading, errorFound } from './commonActions'

function retreiveData(data) {
	database.ref(`prevDays/${data.base}`).set({
		rates: data.rates,
	})
	return {
		type: "GET_HISTORY",
		dataOfPreviousDays: data,
	};
};

export default function getDataForPreviousDays(url, base) {
	const startTime = moment().subtract(4, "days");
	const endTime = moment().subtract(1, "days");
	return (dispatch, getState) => {
		database.ref(`prevDays/${base}`)
			.orderByKey()
			.startAt(startTime.format("YYYY-MM-DD"))
			.endAt(endTime.format("YYYY-MM-DD")).on("value", snapshot => {
				if(snapshot.exists()) {
					console.log(snapshot.val());
					const data = {
						base: snapshot.key,
						rates: snapshot.val().rates
					};
					
				}
				else {
					fetch(`${url}?start_at=${startTime.format("YYYY-MM-DD")}&end_at=${endTime.format("YYYY-MM-DD")}&base=${base}`)
						.then(response => response.json())
						.then(data => {
							console.log(data.rates)
							dispatch(retreiveData(data))
						})
				}
			})
	}
};