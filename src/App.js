import React, { Component } from 'react';
import { ConnectedRouter } from 'connected-react-router';
import { Provider } from 'react-redux';
import { ThemeProvider, injectGlobal } from 'styled-components';

import store from './redux/index';
import history from './routes/history';
import theme from './components/theme';

import MainRoute from './routes/main';

import 'react-circular-progressbar/dist/styles.css';
import 'react-toastify/dist/ReactToastify.css';
import 'rc-slider/assets/index.css';

injectGlobal`
    *, *::before, *::after{
        margin: 0;
        font-size: 16px;
        font-family: 'Roboto', 'Helvetica', 'Arial', sans-serif;
        box-sizing: border-box;
        -webkit-tap-highlight-color: rgba(0,0,0,0);
        -webkit-font-smoothing: antialiased;
    }
`;

const TOKEN = localStorage.getItem('@DOMUS:TOKEN');
if (TOKEN) {
    store.dispatch({
        type: 'REQUEST_LOGIN_TOKEN',
        TOKEN
    });
}

store.dispatch({
    type: 'REQUEST_SWITCH_LOGIN'
});

store.dispatch({
    type: 'REQUEST_LIGHT_LOGIN'
});

window.addEventListener('push', event => {
    const data = event.data.json();
    const { title } = data;

    const body = {
        body: data.body,
        icon: data.icon
    };

    event.waitUntil(window.registration.showNotification(title, body));
});

export default class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <ThemeProvider theme={theme}>
                    <ConnectedRouter history={history}>
                        <MainRoute />
                    </ConnectedRouter>
                </ThemeProvider>
            </Provider>
        );
    }
}
