const initialState = {
	dataOfPreviousDays: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "GET_HISTORY_OF_PREVIOUS_DAYS":
			return {
				...state,
				dataOfPreviousDays: action.dataOfPreviousDays
			};
		default: return state
	};
};