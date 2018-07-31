import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Groups from './containers/groups';
import GroupPage from './containers/groupPage';
import Users from './containers/users';
import UserPage from './containers/userPage';
import Home from './containers/home';
import CreateUser from './containers/createUserPage';
import CreateGroup from './containers/createGroupPage';
import NotFound from './containers/notFound';


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <Route exact path="/" component={Home}/>
                <Route exact path="/users" component={Users}/>
                <Route path="/users/:id" component={UserPage}/>
                <Route exact path="/groups" component={Groups}/>
                <Route path="/groups/:id" component={GroupPage}/>
                <Route exact path="/create-user" component={CreateUser}/>
                <Route exact path="/create-group" component={CreateGroup}/>
                <Route path="*" component={NotFound} />
            </Switch>
        );
    }
}
