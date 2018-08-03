import React from 'react';
import {render, createPortal} from 'react-dom';
import {Provider} from 'react-redux';
import {BrowserRouter as Router} from 'react-router-dom';

import {configureStore} from './store/configureStore';
import Breadcrumb from './components/breadcrumb';
import LoadingSpinner from './components/loadingSpinner';
import Routes from './routes';

const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <div>
                <Breadcrumb/>
                <LoadingSpinner/>
                <Routes/>
            </div>
        </Router>
    </Provider>,
    document.getElementById('root')
);
