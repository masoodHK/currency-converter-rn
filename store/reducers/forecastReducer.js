const initialState = {
	dataOfPreviousDays: {}
};

export default (state = initialState, action) => {
	switch (action.type) {
		case "GET_HISTORY":
			return {
				...state,
				dataOfPreviousDays: action.dataOfPreviousDays,
			};
		default: return state
	};
};