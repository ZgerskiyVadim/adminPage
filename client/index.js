import React from 'react';
import {render} from 'react-dom';
import {Provider} from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { configureStore } from './store/configureStore';
import Home from './components/home';
import Users from './components/users';
import Groups from './components/groups';


const store = configureStore();

render(
    <Provider store={store}>
        <Router>
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/groups" component={Groups}/>
            </Switch>
        </Router>
    </Provider>,
    document.getElementById('root')
);