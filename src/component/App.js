import React, { Component } from 'react';
import Gallery from './Gallery.js';

class App extends Component {

    constructor(){
        super()
    }

    render() {
        return (
            <div className="App">
                <Gallery />
            </div>
        );
    }
}

export default App;