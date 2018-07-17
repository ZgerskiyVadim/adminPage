import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Groups from "./components/groups";
import Group from "./components/group";
import Users from "./components/users";
import User from "./components/user";
import Home from "./components/home";


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