import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import { configureStore } from './store/configureStore';
import Routes from './routes';


const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <Routes/>
        </Router>
    </Provider>,
    document.getElementById('root')
);