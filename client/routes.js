import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Groups from "./components/groups";
import Users from "./components/users";
import Home from "./components/home";


export default class Routes extends Component{
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route path="/users" component={Users}/>
                <Route path="/groups" component={Groups}/>
            </Switch>
        )
    }
}