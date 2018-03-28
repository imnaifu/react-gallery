import { applyMiddleware, combineReducers, createStore } from 'redux';

const imgDataReducer = (state=[], action) => {

	//do not modify state directly, or it will not able to 'time travel'
	switch (action.type) {
		case label_1:
			// statements_1
			break;
		default:
			// statements_def
			break;
	}
	return state;
}

const reducers = combineReducers({
	imgData: imgDataReducer
})

const store = createStore(reducers);

store.subscribe(() => {
	console.log('store changed', store.getState());
})

export {store, }