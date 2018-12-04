import { isLoading, errorFound } from './commonActions'
import firebase from '../../configs/firebase'
const database = firebase.database();
const moment = require("moment");

export default function retreiveData(url) {
	return (dispatch) => {
		const currentDay = moment().format("YYYY-MM-DD");
		dispatch(isLoading());
		database.ref(`main/${currentDay}`).on('value', snapshot => {
			if (snapshot.exists()) {
				console.log(snapshot.val());
				const data = {
					date: snapshot.key,
					rates: snapshot.val().rates,
					base: snapshot.val().base
				};
				dispatch(addData(data));
			}
			else {
				fetch(url)
					.then(response => {
						if (!response.ok) {
							throw Error(response.statusText);
						}

						return response;

					}).then(res => res.json()).then(data => {
						dispatch(addData(data));
					})
					.catch(error => dispatch(errorFound(error)))
			}
		});
	};
};

function addData(data) {
	database.ref(`main/${data.date}`).set({
		base: data.base,
		rates: data.rates
	});

	return {
		type: "ADD_DATA",
		data,
	};
};