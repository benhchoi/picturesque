import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Header from './layout/Header';

import { Provider } from 'react-redux';
import store from '../store';

class App extends Component {
    render() {
        <Provider store={store}>
            return <Header />
        </Provider>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));