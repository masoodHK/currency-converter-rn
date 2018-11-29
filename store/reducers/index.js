import { combineReducers } from "redux";

import dataReducer from './dataReducer';
import forecastReducer from './forecastReducer';

export default combineReducers({
	dataReducer,
	forecastReducer,
});