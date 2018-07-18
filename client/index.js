import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureStore } from './store/configureStore';
import Breadcrumb from './components/breadcrumb';
import Header from './components/header';
import Routes from './routes';

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <div>
                <Header/>
                <Breadcrumb/>
                <Routes/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);