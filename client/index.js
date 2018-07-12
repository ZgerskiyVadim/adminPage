import React from 'react';
import {render} from 'react-dom';
import Home from './components/home';
import Users from './components/users';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { createStore } from 'redux';
import reducer from './reducers';


const store = createStore(reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/api/users" component={Users}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);