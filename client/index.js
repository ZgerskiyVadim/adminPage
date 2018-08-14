import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import {Router} from 'react-router-dom';

import {configureStore} from './store/configureStore';
import Header from './components/Header';
import Breadcrumb from './components/Breadcrumb';
import Routes from './routes';
import history from './services/history';
import {configureAxios} from './services/configureAxios';

const store = configureStore();
configureAxios();

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

