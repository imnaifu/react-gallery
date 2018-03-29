import { combineReducers } from 'redux';
import imgDataReducer from './imgDataReducer';


const reducers = combineReducers({
	imgData: imgDataReducer
});

export default reducers;
