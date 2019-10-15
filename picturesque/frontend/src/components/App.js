import React, { Component, Fragment } from 'react';
import ReactDOM from 'react-dom';

import { Provider as AlertProvider } from 'react-alert';
import AlertTemplate from 'react-alert-template-basic';

import Header from './layout/Header';

import { Provider } from 'react-redux';
import store from '../store';

// alert options
const alertOptions = {
    timeout: 3000,
    position: 'top center',
}

class App extends Component {
    render() {
        <Provider store={store}>
            <AlertProvider template={AlertTemplate} {...alertOptions}>
                <Fragment>
                    return <Header />
                </Fragment>
            </AlertProvider>
        </Provider>
    }
}

ReactDOM.render(<App />, document.getElementById('app'));