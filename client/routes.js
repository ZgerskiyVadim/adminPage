import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Groups from "./containers/groups";
import Group from "./containers/group";
import Users from "./containers/users";
import User from "./containers/user";
import Home from "./containers/home";


export default class Routes extends Component{
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/users" component={Users}/>
                <Route path="/users/:id" component={User}/>
                <Route exact path="/groups" component={Groups}/>
                <Route path="/groups/:id" component={Group}/>
            </Switch>
        )
    }
}