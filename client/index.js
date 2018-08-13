import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import {configureStore} from './store/configureStore';
import Header from './components/header';
import Breadcrumb from './components/breadcrumb';
import Routes from './routes';
import history from './services/history';

const store = configureStore();

render(
    <Provider store={store}>
        <Router history={history}>
            <div>
                <Header/>
                <Breadcrumb/>
                <Routes/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
