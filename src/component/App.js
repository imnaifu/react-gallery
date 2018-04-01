import React, { Component } from 'react';
import { Provider } from 'react-redux';

import store from '../redux/store.js';
import Gallery from './Gallery.js';

class App extends Component {

    render() {
        return (
            <div className="App">
                <Provider store={store}>
                    <Gallery />
                </Provider>
            </div>
        );
    }
}

export default App;