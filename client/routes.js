import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';
import LoggedRedirectOnUsersPage from './components/LoggedRedirectOnUsersPage';
import GroupsTablePage from './containers/GroupsTablePage';
import GroupPage from './containers/GroupPage';
import UsersTablePage from './containers/UsersTablePage';
import UserPage from './containers/UserPage';
import CreatePage from './containers/CreatePage';
import LoginPage from './containers/LoginPage';
import CreateUser from './containers/CreateUserPage';
import CreateGroup from './containers/CreateGroupPage';
import NotFoundPage from './containers/NotFoundPage';


export default class Routes extends Component {
    render() {
        return (
            <Switch>
                <LoggedRedirectOnUsersPage exact path="/" component={LoginPage}/>
                <Route exact path="/create" component={CreatePage}/>
                <PrivateRoute exact path="/users" component={UsersTablePage}/>
                <PrivateRoute path="/users/:id" component={UserPage}/>
                <PrivateRoute exact path="/groups" component={GroupsTablePage}/>
                <PrivateRoute path="/groups/:id" component={GroupPage}/>
                <PrivateRoute exact path="/create-user" component={CreateUser}/>
                <PrivateRoute exact path="/create-group" component={CreateGroup}/>
                <Route path="*" component={NotFoundPage} />
            </Switch>
        );
    }
}
