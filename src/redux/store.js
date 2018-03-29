import { applyMiddleware, createStore } from 'redux';
import reducers from './reducers/index.js';


const store = createStore(reducers);

store.subscribe(() => {
	console.log('store changed', store.getState());
})

export default store;