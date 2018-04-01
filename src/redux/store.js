import { applyMiddleware, createStore, compose } from 'redux';
import { createLogger } from 'redux-logger';

import rootRecuder from './reducers/rootRecuder.js';

const initialState = {};

const middleware = applyMiddleware(createLogger());

export default createStore(
    rootRecuder, 
    initialState,
    compose(
        middleware,
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
);