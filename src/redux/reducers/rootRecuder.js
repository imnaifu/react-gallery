import { combineReducers } from 'redux';
import img from './imgReducer';
import stage from './stageReducer';

const rootReducer = combineReducers({
	img,
	stage,
});

export default rootReducer;
